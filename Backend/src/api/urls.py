from django.urls import path

from .views import TransactionCreateView, TransactionListView, ShippingListView, ShippingCreateView, ContactFormView, \
     CategoriesListView, check_stock,save_transaction,   GalleryView, StaffLoginView,create_payment
from ..api.views import ProductListView

urlpatterns = [
    path('admin-login/', StaffLoginView.as_view(), name='admin-login'),
    path('contact-us/', ContactFormView.as_view(), name='contact-form'),
    path('gallery-list/', GalleryView.as_view(), name='gallery-list'),
    path('products-list/', ProductListView.as_view(), name='products-list'),
    path('categories-list/', CategoriesListView.as_view(), name='categories-list'),
    path('transactions/create/', TransactionCreateView.as_view(), name='transaction-create'),
    path('transactions-list/', TransactionListView.as_view(), name='transaction-retrieve'),
]

urlpatterns += [
    path('check-stock/', check_stock, name='check_stock'),
    path("create-payment/", create_payment, name="create-payment"),
    path("save-transaction/", save_transaction, name="save-transaction"),

]
