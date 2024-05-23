function go_to_bookDescription() {
    window.location.href = "../Adimn_Home_page/Select.html";
}
class book{
    constructor(Bookname, Id, author, categoreys, description1, description2, rating, no_pages, BookCover) {
        this.Bookname = Bookname;
        this.Id = Id;
        this.author = author;
        this.categoreys = categoreys;
        this.description1 = description1;
        this.description2 = description2;
        this.rating = rating;
        this.no_pages = no_pages;
        this.BookCover = BookCover;
    }
}
let allbooks = JSON.parse(sessionStorage.getItem("books"));
let books4 = JSON.parse(sessionStorage.getItem("borrowedbooks"));
let books5 = JSON.parse(sessionStorage.getItem("availablebooks"));


sessionStorage.setItem("availablebooks",JSON.stringify(books5));
sessionStorage.setItem("borrowedbooks",JSON.stringify(books4));
var bookHtml = document.getElementById("book");
var bookimage = document.getElementById("image");
var buttonHtml = document.getElementById("button");
var userType = JSON.parse(sessionStorage.getItem("userType"));
var booktype = JSON.parse(sessionStorage.getItem("booktype"));
function getbookAndbutton(selectedBook) {
    bookimage.innerHTML = ``;
    let booksHtml = `
        `;
    if(userType==="user"){
        
    }
    else if (userType==="admin"){
        
    }
    return booksHtml;
}
var willDeletebook = JSON.parse(sessionStorage.getItem("details"))
function DeleteavailableBook(){
    var selectedBook = books5.find(function (book) {
        return book.Id === willDeletebook.Id;
    });
    books4.push(selectedBook);
    books5 = books5.filter(function (book) {
        return book.Id !== willDeletebook.Id;
    });
    sessionStorage.setItem("availablebooks",JSON.stringify(books5));
    sessionStorage.setItem("borrowedbooks",JSON.stringify(books4));
    window.history.back();
}
function DeleteBorrowBook(){
    var selectedBook = books4.find(function (book) {
        return book.Id === willDeletebook.Id;
    });
    books5.push(selectedBook);
    books4 = books4.filter(function (book) {
        return book.Id !== willDeletebook.Id;
    });
    sessionStorage.setItem("availablebooks",JSON.stringify(books5));
    sessionStorage.setItem("borrowedbooks",JSON.stringify(books4));
    window.history.back();
}
function deletebook(){
    allbooks = allbooks.filter(function (book) {
        return book.Id !== willDeletebook.Id;
    });
    sessionStorage.setItem("books",JSON.stringify(allbooks));
        
    window.history.back();
}
function changeColor1() {
    var fa = document.getElementById("fa");
    if(fa.style.color === "red"){
        fa.style.color = "white";
    }
    else{
        fa.style.color = "red";
    }
}
function changeColor(){
    var fa = document.getElementById("fa");
    if(fa.style.color === "red"){
        fa.style.color = "white";
    }
    else{
        fa.style.color = "red";
    }
}

function renderbookAndbutton() {
    var selectedBook = JSON.parse(sessionStorage.getItem("details"));
    bookHtml.innerHTML = getbookAndbutton(selectedBook);
}

renderbookAndbutton();


function Go_back(){
    window.history.back();
}
function go_to_Edit(){
    window.location.href = "../Adimn_Home_page/Edit.html";
}