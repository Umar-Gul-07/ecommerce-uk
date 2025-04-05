from django.contrib import admin
from .models import Transaction

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('transaction_id', 'user', 'payment_amount', 'status', 'created_at')
    search_fields = ('transaction_id', 'user__username')
    list_filter = ('status', 'created_at')
    readonly_fields = ('transaction_id', 'stripe_payment_intent', 'created_at')

    def has_add_permission(self, request):
        """Prevent adding transactions manually from the admin panel."""
        return False
