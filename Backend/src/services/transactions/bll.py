from datetime import timedelta
from django.utils import timezone
from .models import Transaction
from django.db.models import Sum


def get_total_earnings():
    total_earnings = Transaction.objects.filter(status='COMPLETED').aggregate(Sum('payment_amount'))[
        'payment_amount__sum']
    return total_earnings or 0


def get_weekly_transactions():
    now = timezone.now()
    one_week_ago = now - timedelta(days=7)
    return Transaction.objects.filter(created_at__gte=one_week_ago)


def get_monthly_transactions():
    now = timezone.now()
    one_month_ago = now - timedelta(days=30)
    return Transaction.objects.filter(created_at__gte=one_month_ago)


def get_yearly_transactions():
    now = timezone.now()
    one_year_ago = now - timedelta(days=365)
    return Transaction.objects.filter(created_at__gte=one_year_ago)


def get_weekly_earnings():
    today = timezone.now()
    start_of_week = today - timedelta(days=today.weekday())  # Start of the week (Monday)

    weekly_earnings = []
    for i in range(7):  # Loop through each day of the week
        day = start_of_week + timedelta(days=i)
        earnings = Transaction.objects.filter(created_at__date=day).aggregate(Sum('payment_amount'))[
                       'payment_amount__sum'] or 0
        weekly_earnings.append({"day": day.strftime("%A"), "earnings": earnings})

    return weekly_earnings


def get_monthly_earnings():
    today = timezone.now()
    start_of_month = today.replace(day=1)

    monthly_earnings = []
    for i in range(12):  # Loop through each month of the year
        month = start_of_month.replace(month=i + 1) if i + 1 <= 12 else start_of_month.replace(year=today.year + 1,
                                                                                               month=1)
        earnings = Transaction.objects.filter(created_at__year=month.year, created_at__month=month.month).aggregate(
            Sum('payment_amount'))['payment_amount__sum'] or 0
        monthly_earnings.append({"month": month.strftime("%B"), "earnings": earnings})

    return monthly_earnings
