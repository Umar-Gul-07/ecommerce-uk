from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.views.decorators.http import require_GET
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from ..core.models import ContactForm, GalleryForm
from ..services.blogs.models import Blogs
from ..services.product.models import Product, Category
from .serializers import ProductSerializer, TransactionSerializer, ShippingDetailSerializer, ContactFormSerializer, \
    BlogsSerializer, CategorySerializer, GallerySerializer, StaffLoginSerializer
from ..services.shipping.bll import get_weekly_shipping, get_monthly_shipping, get_yearly_shipping
from ..services.shipping.models import ShippingDetail
from ..services.transactions.bll import get_total_earnings, get_monthly_transactions, get_yearly_transactions, \
    get_weekly_transactions, get_weekly_earnings, get_monthly_earnings
from ..services.transactions.models import Transaction
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.core.mail import send_mail


class ContactFormView(generics.CreateAPIView):
    queryset = ContactForm.objects.all()
    serializer_class = ContactFormSerializer


class ProductListView(generics.ListAPIView):
    queryset = Product.objects.filter(is_available=True)
    serializer_class = ProductSerializer


class CategoriesListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class TransactionCreateView(generics.CreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer


class TransactionListView(generics.ListAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer


class ShippingListView(generics.ListAPIView):
    queryset = ShippingDetail.objects.all()
    serializer_class = ShippingDetailSerializer


@method_decorator(csrf_exempt, name='dispatch')
class ShippingCreateView(generics.CreateAPIView):
    queryset = ShippingDetail.objects.all()
    serializer_class = ShippingDetailSerializer

    def create(self, request, *args, **kwargs):
        # Call the parent class's create method to create the shipping detail
        response = super().create(request, *args, **kwargs)

        # Extract user email from the request data
        user_email = request.data.get('email')  # Assuming 'email' field exists in your shipping details

        # Send email only if email is provided
        if user_email:
            subject = 'Shipping Details Created Successfully'
            message = 'Your shipping details have been created successfully. Thank you for your order!<br/>we let you know when its Approved by Admin'
            from_email = 'cui1234567890987654321@gmail.com'  # Replace with your from email

            try:
                send_mail(subject, message, from_email, [user_email])
                print(f"Email sent to {user_email}")
            except Exception as e:
                print(f"Failed to send email: {str(e)}")

        return response


class BlogsListView(generics.ListAPIView):
    queryset = Blogs.objects.all()
    serializer_class = BlogsSerializer


class BlogsRecentPostsView(APIView):
    def get(self, request):
        recent_posts = Blogs.objects.all().order_by('-created_at')[:3]
        serializer = BlogsSerializer(recent_posts, many=True)
        return Response(serializer.data)


class GalleryView(generics.ListAPIView):
    queryset = GalleryForm.objects.all()
    serializer_class = GallerySerializer


"""FUNCTIONS"""


class StaffLoginView(APIView):
    def post(self, request):
        serializer = StaffLoginSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@require_GET
def check_stock(request):
    product_id = request.GET.get('product_id')
    if not product_id:
        return JsonResponse({'error': 'Product ID is required'}, status=400)

    try:
        product = Product.objects.get(id=product_id)
        in_stock = product.stock > 0
        return JsonResponse({'in_stock': in_stock, 'stock': product.stock})
    except Product.DoesNotExist:
        return JsonResponse({'error': 'Product out of Stock'}, status=404)


@require_GET
def dashboard(request):
    context = {
        'total_earnings': float(get_total_earnings()),
        'weekly_shipping': get_weekly_shipping().count(),
        'monthly_shipping': get_monthly_shipping().count(),
        'yearly_shipping': get_yearly_shipping().count(),
        'weekly_transactions': get_weekly_transactions().count(),
        'monthly_transactions': get_monthly_transactions().count(),
        'yearly_transactions': get_yearly_transactions().count(),
        'weekly_data': get_weekly_earnings(),
        'monthly_data': get_monthly_earnings()
    }

    print(context)

    return JsonResponse({'data': context})


@api_view(['POST'])
def upload_receipt(request, id):
    """Upload receipt screenshot for the shipping request."""
    shipping_detail = get_object_or_404(ShippingDetail, id=id)

    if request.method == 'POST':
        screenshot = request.FILES.get('receipt')
        if screenshot:
            shipping_detail.screenshot = screenshot
            shipping_detail.save()
            return JsonResponse({'message': 'Receipt uploaded successfully!'}, status=200)
        return JsonResponse({'error': 'No screenshot provided!'}, status=400)


@api_view(['POST'])
def accept_shipping(request, id):
    """Accept the shipping request."""
    shipping_detail = get_object_or_404(ShippingDetail, id=id)
    shipping_detail.status = 'COMPLETED'
    shipping_detail.save()

    # Send email notification for acceptance
    send_mail(
        subject='Shipping Request Accepted',
        message=f'Your shipping request with ID {id} has been accepted.',
        from_email="cui1234567890987654321@gmail.com",
        recipient_list=[shipping_detail.email],
        fail_silently=False,
    )

    return JsonResponse({'message': 'Shipping request accepted!'}, status=200)


@api_view(['POST'])
def reject_shipping(request, id):
    """Reject the shipping request."""
    shipping_detail = get_object_or_404(ShippingDetail, id=id)
    shipping_detail.status = 'FAILED'
    shipping_detail.save()

    # Send email notification for rejection
    send_mail(
        subject='Shipping Request Rejected',
        message=f'Your shipping request with ID {id} has been rejected.',
        from_email="cui1234567890987654321@gmail.com",
        recipient_list=[shipping_detail.email],
        fail_silently=False,
    )

    return JsonResponse({'message': 'Shipping request rejected!'}, status=200)
