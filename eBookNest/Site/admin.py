from django.contrib import admin
from .models import Book
from .models import Categorys,User
# Register your models here.\
admin.site.register(Book)
admin.site.register(Categorys)
admin.site.register(User)
