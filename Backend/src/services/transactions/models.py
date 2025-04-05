from django.db import models

class Transaction(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'pending'),
        ('COMPLETED', 'completed'),
        ('FAILED', 'failed'),
    ]

    user = models.CharField(max_length=255)
    product = models.ManyToManyField('product.Product')
    payment_method = models.CharField(
        max_length=50,
        choices=[('stripe', 'Stripe')],
        default='stripe',
    )
    payment_amount = models.DecimalField(max_digits=10, decimal_places=2)
    transaction_id = models.CharField(max_length=255, unique=True)  # This will store Stripe payment intent ID
    status = models.CharField(
        max_length=50,
        choices=STATUS_CHOICES, 
        default='PENDING',
    )
    stripe_payment_intent = models.CharField(max_length=255, blank=True, null=True)  # Store Stripe intent ID
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.transaction_id} - {self.payment_method} - {self.status}'
