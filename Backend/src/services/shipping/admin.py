from django.contrib import admin
from django.utils.html import format_html
from .models import ShippingDetail


@admin.register(ShippingDetail)
class ShippingDetailAdmin(admin.ModelAdmin):
    list_display = (
        'transaction_choice', 'get_products', 'address', 'phone_number', 'status', 'tracking_number',
        'screenshot_thumbnail', 'created_at'
    )
    list_filter = ('status', 'created_at')
    search_fields = ('address', 'phone_number', 'tracking_number')
    ordering = ('-created_at',)
    readonly_fields = ('created_at',)

    def screenshot_thumbnail(self, obj):
        if obj.screenshot:
            return format_html('<img src="{}" width="100" height="100" />', obj.screenshot.url)
        return 'No Image'

    screenshot_thumbnail.short_description = 'Screenshot'

    def get_products(self, obj):
        """Custom method to display a list of product names."""
        print(type(obj))  # Debugging line
        return ", ".join([product.name for product in obj.product.all()])

    get_products.short_description = 'Products'

    def get_readonly_fields(self, request, obj=None):
        if obj:
            return self.readonly_fields + ('transaction_choice',)
        return self.readonly_fields
