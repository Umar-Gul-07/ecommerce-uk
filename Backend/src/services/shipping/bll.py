from datetime import timedelta
from django.utils import timezone
from .models import ShippingDetail


def get_weekly_shipping():
    now = timezone.now()
    one_week_ago = now - timedelta(days=7)
    return ShippingDetail.objects.filter(created_at__gte=one_week_ago)


def get_monthly_shipping():
    now = timezone.now()
    one_month_ago = now - timedelta(days=30)
    return ShippingDetail.objects.filter(created_at__gte=one_month_ago)


def get_yearly_shipping():
    now = timezone.now()
    one_year_ago = now - timedelta(days=365)
    return ShippingDetail.objects.filter(created_at__gte=one_year_ago)
