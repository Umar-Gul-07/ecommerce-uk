from django.db import models
from rest_framework import serializers

from ..core.models import ContactForm, GalleryForm
from ..services.blogs.models import Blogs
from ..services.product.models import Product, Category
from ..services.shipping.models import ShippingDetail
from ..services.transactions.models import Transaction
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken


class StaffLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')
        user = authenticate(username=username, password=password)
        if user and user.is_staff and not user.is_superuser:
            refresh = RefreshToken.for_user(user)
            return {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
        else:
            raise serializers.ValidationError('Invalid credentials or not a staff member.')


class ProductSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()
    discounted_price = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = '__all__'

    def get_discounted_price(self, obj):
        """Return the discounted price for a single product, if applicable."""
        # Ensure we are working with a single Product instance
        if isinstance(obj, Product):
            return obj.get_discounted_price()
        return None


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name']


class TransactionSerializer(serializers.ModelSerializer):
    product = ProductSerializer(many=True)

    class Meta:
        model = Transaction
        fields = ['id', 'user', 'product', 'payment_method', 'payment_amount', 'transaction_id', 'status', 'created_at']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        products = instance.product.all()  # Get the related products
        product_data = ProductSerializer(products, many=True).data  # Serialize each product
        representation['product'] = product_data  # Add serialized products
        return representation


class ShippingDetailSerializer(serializers.ModelSerializer):
    product = ProductSerializer(many=True, read_only=True)  # Use the ProductSerializer to get full product details

    class Meta:
        model = ShippingDetail
        fields = "__all__"


class ContactFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactForm
        fields = '__all__'


class BlogsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blogs
        fields = '__all__'


class GallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryForm
        fields = '__all__'
