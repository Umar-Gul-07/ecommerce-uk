from django.contrib import admin

from .models import (
    Country, Application, ContactForm, GalleryForm
)


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ('name', 'short_name', 'tagline', 'is_active', 'created_on')


@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = ('name', 'short_name', 'language', 'currency', 'phone_code', 'is_active', 'created_on')


@admin.register(ContactForm)
class ContactFormAdmin(admin.ModelAdmin):
    list_display = ('fullname', 'subject', 'message', 'email', 'phone')
    search_fields = ('fullname', 'email')
    list_filter = ('fullname', 'email')


@admin.register(GalleryForm)
class GalleryAdmin(admin.ModelAdmin):
    list_display = ('image',)
