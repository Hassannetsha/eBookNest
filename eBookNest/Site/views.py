from django.shortcuts import get_object_or_404, redirect, render
from django.http import JsonResponse
from django.urls import reverse
import json
from .models import Book,Categorys,User
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
def index(request):
    return render(request,'main-sign-page.html')

def signinAdmin(request):
    return render(request,'signinadmin.html')
def signUpAdmin(request):
    return render(request,'signup-admin.html')
def signinUser(request):
    users = User.objects.all()
    
    return render(request,'signin-user.html',{'users':users})
def signUpUser(request):
    return render(request,'signup-user.html')
# def test(request):
#     books = Book.objects.all()  # or any other queryset
#     return render(request, 'test.html', {'books': books})
def home(request,Id):
    books = Book.objects.all()  # or any other queryset
    categories = Categorys.objects.all()
    user = get_object_or_404(User, pk=Id)
    return render(request, 'home.html', {'books': books,'categories': categories,"user":user})

def category_data(request):
    categories = list(Categorys.objects.values())
    return JsonResponse(categories, safe=False)

def book_data(request):
    books = list(Book.objects.values())
    return JsonResponse(books, safe=False)

def Convert(request, Id):
    if request.method == "PATCH":
        book = get_object_or_404(Book, pk=Id)
        book.Available = not book.Available
        book.save()
        return JsonResponse({'status': 'Book updated'}, status=200, content_type='application/json') 
    return JsonResponse({'status': 'Invalid request'}, status=400)

def delete_book(request, book_id):
    if request.method == "DELETE":
        book = get_object_or_404(Book, id=book_id)
        book.delete()
        return JsonResponse({'status': 'Book deleted'})
    return JsonResponse({'status': 'Invalid request'}, status=400)

def getbooks(request):
    books = Book.objects.all()
    Categoryies = Categorys.objects.all()
    return JsonResponse({"books":list(books.values()),
        "categories":list(Categoryies.values())}, status=200)
def Availableallbooks(request,userId):
    books = Book.objects.all()
    categories = Categorys.objects.all()
    user = get_object_or_404(User, pk=userId)
    return render(request, 'availavbleBooks.html', {'books': books,'categories': categories,"user":user})
def Borrowedbooks(request,userId):
    books = Book.objects.all()
    user = get_object_or_404(User, pk=userId)
    return render(request, 'borrowedBooks.html', {'books': books,"user":user})
def selectBook(request,userId):
    books = Book.objects.all()
    categories = Categorys.objects.all()
    user = get_object_or_404(User, pk=userId)
    return render(request, 'Select.html', {'books': books,'categories': categories,"user":user})
def Details(request, bookId, userId):
    book = get_object_or_404(Book, pk=bookId)
    category = book.Category
    user = get_object_or_404(User, pk=userId)
    return render(request, 'bookdetails.html', {"book": book, "category": category,"user":user})
def Bookdetails(request, bookId, userId):
    book = get_object_or_404(Book, pk=bookId )
    category = book.Category
    user = get_object_or_404(User, pk=userId)
    return render(request, 'bookdetails.html', {"book": book, "category": category,"user":user})
# def toggleusertype(request,ID):
#     if request.method == "PATCH":
#         return JsonResponse({'status': 'user updated'}, status=200, content_type='application/json') 
#     return JsonResponse({'status': 'Invalid request'}, status=400)
@csrf_exempt
def save_user(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            data = User.objects.create(
                first_name=data.get('first_name'),
                last_name=data.get('last_name'),
                email=data.get('email'),
                password=data.get('password'),
                address=data.get('address'),
                phone_number=data.get('phone_number'),
                isUser=data.get('isUser'),
            )
            data.save()
            return JsonResponse({'status': 'success'})
        except Exception as e:
            return JsonResponse({'status': 'success'})
    
def get_users_json(request):
    user = User.objects.all()
    user_json = serializers.serialize('json', user)
    return JsonResponse(user_json, safe=False)

def EditBook(request, Id):
    book = get_object_or_404(Book, pk=Id)
    category = get_object_or_404(Categorys, pk=book.Category_id)
    return render(request, 'Edit.html', {'book': book, 'category': category})
    # return render(request,'Edit.html',{'book':book,"user":user})


def addBook(request, userId):
    user = get_object_or_404(User, pk=userId)
    print(5)
    return render(request, "add.html", {'user': user})


@csrf_exempt
def save_book(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.POST['str'])
            if Book.objects.filter(pk=data.get('ID')).count():
                return JsonResponse({'status': 'failed', 'message': 'Id already exists'})
            cat = data.get('Category')
            zeftID = 0
            catid = Categorys.objects.filter(Category_name=cat)
            if not catid.count():
                catid = Categorys.objects.create(
                    Category_name=cat
                )
                catid.save()
                zeftID = catid.id
            else:
                zeftID = catid[0].id
            newBook = Book.objects.create(
                id=data.get('ID'),
                Book_name=data.get('Title'),
                Book_author=data.get('Author'),
                no_page=data.get('Pages'),
                BookCover=request.FILES['image'],
                Category=Categorys.objects.get(pk=zeftID),
                description=data.get('Description')
            )
            newBook.save()
            return JsonResponse({'status': 'success', 'message': 'Book Added Successfully'})
        except Exception as e:
            print(e)
            return JsonResponse({'status': 'failed', 'message': '*Failed to add book'})


def modifyBook(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.POST['str'])
            cat = data.get('Category')
            zeftID = 0
            catid = Categorys.objects.filter(Category_name=cat)
            if not catid.count():
                q = Categorys.objects.get(
                    Category_name=Categorys.objects.last())
                if q is None:
                    q = 1
                else:
                    q = q.id + 1

                catid = Categorys.objects.create(
                    id=q,
                    Category_name=cat
                )
                catid.save()
            else:
                zeftID = catid[0].id
            newBook = Book.objects.get(pk=data.get('ID'))
            newBook.Book_name = data.get('Title')
            newBook.Book_author = data.get('Author')
            newBook.no_page = data.get('Pages')
            newBook.BookCover = request.FILES['image']
            newBook.Category = Categorys.objects.get(pk=zeftID)
            newBook.description = data.get('Description')
            newBook.save()
            return JsonResponse({'status': 'success', 'message': 'Book edited Successfully'})
        except Exception as e:
            print(e)
            return JsonResponse({'status': 'failed', 'message': '*Failed to edit book'})
