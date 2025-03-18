from django.urls import path

from .views import TransactionCreateView, TransactionListView, ShippingListView, ShippingCreateView, ContactFormView, \
    BlogsListView, BlogsRecentPostsView, CategoriesListView, check_stock, GalleryView, dashboard, upload_receipt, \
    accept_shipping, reject_shipping, StaffLoginView
from ..api.views import ProductListView

urlpatterns = [
    path('admin-login/', StaffLoginView.as_view(), name='admin-login'),
    path('contact-us/', ContactFormView.as_view(), name='contact-form'),
    path('blogs-list/', BlogsListView.as_view(), name='blogs-list'),
    path('gallery-list/', GalleryView.as_view(), name='gallery-list'),
    path('products-list/', ProductListView.as_view(), name='products-list'),
    path('categories-list/', CategoriesListView.as_view(), name='categories-list'),
    path('transactions/create/', TransactionCreateView.as_view(), name='transaction-create'),
    path('transactions-list/', TransactionListView.as_view(), name='transaction-retrieve'),
    path('shipping-create/', ShippingCreateView.as_view(), name='shipping-create'),
    path('shipping-list/', ShippingListView.as_view(), name='shipping-list'),
]

urlpatterns += [
    path('blogs/recent-posts/', BlogsRecentPostsView.as_view(), name='blogs-recent-posts'),
    path('check-stock/', check_stock, name='check_stock'),
    path('dashboard/', dashboard, name='dashboard'),
    path('upload-receipt/<int:id>/', upload_receipt, name='upload-receipt'),
    path('accept-shipping/<int:id>/', accept_shipping, name='accept-shipping'),
    path('reject-shipping/<int:id>/', reject_shipping, name='reject-shipping'),
]
