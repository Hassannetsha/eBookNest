from django.db import models

# Create your models here.
class Categorys(models.Model):
    Category_name = models.CharField(max_length=200)
    def __str__(self):
        return self.Category_name

class Book(models.Model):
    Book_name = models.CharField(max_length=200)
    Book_author = models.CharField(max_length=200)
    no_page = models.IntegerField()
    BookCover = models.ImageField(upload_to='book_covers/' ,null=True , blank =True )
    Category = models.ForeignKey(Categorys, on_delete=models.CASCADE, related_name="Books")
    description = models.TextField()
    Available = models.BooleanField(default=True)
    def __str__(self):
        return self.Book_name
# class usertype(models.Model):
#     type = models.BooleanField(default=True)
class User(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    address = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=15)
    isUser = models.BooleanField(default=True)
    def str(self):
        return self.email