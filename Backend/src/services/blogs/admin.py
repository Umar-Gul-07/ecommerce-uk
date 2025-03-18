from django.contrib import admin

from .models import Blogs


class BlogAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'category', 'is_published', 'published_at', 'created_at')
    list_filter = ('is_published', 'category', 'created_at', 'author')
    search_fields = ('title', 'content', 'tags', 'author__username')
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ('created_at', 'updated_at')
    date_hierarchy = 'published_at'
    ordering = ('-published_at',)


admin.site.register(Blogs, BlogAdmin)
