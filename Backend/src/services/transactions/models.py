from django.db import models


class Transaction(models.Model):
    PAYMENT_METHOD_CHOICES = [
        ('cash', 'Cash on Delivery'),
        ('bank', 'Bank Transfer'),
    ]
    STATUS_CHOICES = [
        ('PENDING', 'pending'),
        ('COMPLETED', 'completed'),
        ('FAILED', 'failed'),
    ]

    user = models.CharField(max_length=255)
    product = models.ManyToManyField('product.Product')
    payment_method = models.CharField(
        max_length=50,
        choices=PAYMENT_METHOD_CHOICES,
        default='cash',
    )
    payment_amount = models.DecimalField(max_digits=10, decimal_places=2)
    transaction_id = models.CharField(max_length=255, unique=True)
    status = models.CharField(
        max_length=50,
        choices=STATUS_CHOICES,
        default='pending',
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.transaction_id} - {self.payment_method} - {self.status}'
