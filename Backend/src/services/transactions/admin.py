from django.contrib import admin
from .models import Transaction


@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = (
        'transaction_id', 'user', 'get_products', 'payment_method', 'payment_amount', 'status', 'created_at')
    list_filter = ('payment_method', 'status', 'created_at')
    search_fields = ('transaction_id', 'user', 'product__name')
    ordering = ('-created_at',)

    def get_products(self, obj):
        """Custom method to display a list of product names."""
        print(type(obj))  # Debugging line
        return ", ".join([product.name for product in obj.product.all()])

    get_products.short_description = 'Products'
