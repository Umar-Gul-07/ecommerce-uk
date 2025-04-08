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
category_names = ["Men", "Women", "Kids", "Accessories", "Footwear"]
categories = []

# Create categories
for name in category_names:
    slug = slugify(name)
    cat, created = Category.objects.get_or_create(name=name, slug=slug)
    categories.append(cat)

# Define sample clothing product names
product_names = [
    "Cotton T-Shirt", "Denim Jacket", "Hoodie", "Leather Belt", "Sneakers",
    "Summer Dress", "Wool Sweater", "Chinos", "Tank Top", "Sandals",
    "Formal Shirt", "Jeans", "Socks", "Beanie", "Blazer"
]

# Create 15 clothing products
for name in product_names:
    desc = fake.text(max_nb_chars=150)
    price = round(random.uniform(20.0, 200.0), 2)
    stock = random.randint(1, 100)
    slug = slugify(name + "-" + str(random.randint(1000, 9999)))
    category = random.choice(categories)
    discount = random.choice([None, 5, 10, 15, 20])
    discount_active = bool(discount)
    featured = random.choice([True, False])

    Product.objects.create(
        name=name,
        description=desc,
        price=Decimal(price),
        stock=stock,
        category=category,
        slug=slug,
        discount_percentage=discount,
        discount_active=discount_active,
        featured_product=featured
    )

print("✅ 15 clothing-related products and 5 categories added.")
