from PIL import Image
from django.db import models
from django.utils.text import slugify


class Category(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField()
    category = models.ForeignKey('Category', related_name='products', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='products/', blank=True, null=True)
    is_available = models.BooleanField(default=True)
    slug = models.SlugField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    discount_percentage = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    discount_active = models.BooleanField(default=False)
    featured_product = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if self.stock == 0:
            self.is_available = False
        else:
            self.is_available = True

        if not self.slug:
            self.slug = slugify(self.name)

        super(Product, self).save(*args, **kwargs)

    def __str__(self):
        return self.name

    def resize_image(self):
        """Resize the uploaded image to a fixed size (e.g. 50x50)."""
        if self.image:  # Check if image exists
            image_path = self.image.path
            try:
                # Open the image file
                img = Image.open(image_path)

                # Resize image
                output_size = (50, 50)  # Define the target size
                img = img.resize(output_size, Image.ANTIALIAS)

                # Save the image back, preserving the format
                img.save(image_path, quality=95)  # Set quality for JPEG compression

            except Exception as e:
                print(f"Error resizing image: {e}")

    def get_absolute_url(self):
        return f"/products/{self.slug}/"

    def get_discounted_price(self):
        """Calculate the price after discount, if applicable."""
        if self.discount_active and self.discount_percentage:
            discount_amount = (self.price * self.discount_percentage) / 100
            return self.price - discount_amount
        return self.price
