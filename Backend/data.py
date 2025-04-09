import os
import django
import random
from decimal import Decimal
from faker import Faker
from django.utils.text import slugify

# Set up Django environment
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")  # Replace with your Django project name
django.setup()

from src.services.product.models import Category, Product  # Adjust this path if needed

fake = Faker()

# Define clothing-related categories
category_names = ["Paints", "Shirts", "Jackets", "Trousers", "Shoes", "Belts"]
categories = []

# Create categories
for name in category_names:
    slug = slugify(name)
    cat, created = Category.objects.get_or_create(name=name, slug=slug)
    categories.append(cat)

# Define product names grouped according to their categories
category_products = {
    "Paints": ["Acrylic Paint", "Oil Paint"],
    "Shirts": ["Cotton T-Shirt", "Formal Shirt"],
    "Jackets": ["Denim Jacket", "Blazer"],
    "Trousers": ["Chinos", "Jeans"],
    "Shoes": ["Sneakers", "Sandals"],
    "Belts": ["Leather Belt", "Woven Belt"]
}

# Create products for each category
for category in categories:
    for product_name in category_products.get(category.name, []):
        desc = fake.text(max_nb_chars=150)
        price = round(random.uniform(20.0, 200.0), 2)
        stock = random.randint(1, 100)
        slug = slugify(product_name + "-" + str(random.randint(1000, 9999)))
        discount = random.choice([None, 5, 10, 15, 20])
        discount_active = bool(discount)
        featured = random.choice([True, False])

        Product.objects.create(
            name=product_name,
            description=desc,
            price=Decimal(price),
            stock=stock,
            category=category,
            slug=slug,
            discount_percentage=discount,
            discount_active=discount_active,
            featured_product=featured
        )

print("✅ 15 clothing-related products and 6 categories added.")
