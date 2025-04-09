from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.views.decorators.http import require_GET
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
import json

from ..core.models import ContactForm, GalleryForm
from ..services.product.models import Product, Category
from .serializers import ProductSerializer, TransactionSerializer, ShippingDetailSerializer, ContactFormSerializer, CategorySerializer, GallerySerializer, StaffLoginSerializer
from ..services.shipping.models import ShippingDetail

from ..services.transactions.models import Transaction
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.core.mail import send_mail
from django.conf import settings
import stripe
from django.http import JsonResponse


stripe.api_key = settings.STRIPE_SECRET_KEY


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


stripe.api_key = settings.STRIPE_SECRET_KEY

@csrf_exempt
def create_payment(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            amount = int(data.get("amount", 0) * 100)  # Convert to cents

            # Create a payment intent
            intent = stripe.PaymentIntent.create(
                amount=amount,
                currency='usd',  # or your currency
                payment_method_types=["card"]
            )

            return JsonResponse({'clientSecret': intent.client_secret})
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
        

@csrf_exempt
def save_transaction(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')  # Get user's email

            transaction = Transaction.objects.create(
                user=data.get('user', 'guest'),
                payment_amount=data['payment_amount'],
                transaction_id=data['transaction_id'],
                status=data['status'],
                stripe_payment_intent=data['transaction_id'],
            )

            # Optional: Send email
            if email:
                subject = 'Your Order Confirmation'
                message = f"""
                Thank you for your purchase!

                Transaction ID: {transaction.transaction_id}
                Amount Paid: {transaction.payment_amount}
                Status: {transaction.status}

                We’ll send you tracking info soon.
                """
                send_mail(subject, message, 'no-reply@yourshop.com', [email])

            return JsonResponse({'message': 'Transaction saved'}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

