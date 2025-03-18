from django.db import models


class ShippingDetail(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'pending'),
        ('COMPLETED', 'completed'),
        ('FAILED', 'failed'),
    ]
    TRANSACTION_CHOICES = [
        ('bank', 'BANK'),
        ('cod', 'COD'),
    ]
    firstname = models.CharField(max_length=100, blank=True, null=True)
    lastname = models.CharField(max_length=100, blank=True, null=True)
    product = models.ManyToManyField('product.Product')
    address = models.TextField()
    town_or_city = models.CharField(max_length=200, blank=True, null=True)
    state = models.CharField(max_length=200, blank=True, null=True)
    postcode = models.IntegerField()
    email = models.EmailField()
    phone_number = models.CharField(max_length=20)
    transaction_choice = models.CharField(max_length=50, choices=TRANSACTION_CHOICES)
    tracking_number = models.CharField(max_length=255, blank=True, null=True)
    screenshot = models.ImageField(upload_to='screenshots/', blank=True, null=True)
    status = models.CharField(
        max_length=50,
        choices=STATUS_CHOICES,
        default='pending',
    )
    created_at = models.DateTimeField(auto_now_add=True)
