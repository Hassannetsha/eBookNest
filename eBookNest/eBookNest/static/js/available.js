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
// let allbooks = [book1, book2, book3, book4, book5, book6];
// sessionStorage.setItem("books", JSON.stringify(allbooks));

// var booklistPart1 = document.getElementById("availablebooks");
// function renderBooks(){
//     booklistPart1.innerHTML = getavailablebooks()
// }
// renderBooks();

let books4 = JSON.parse(sessionStorage.getItem("borrowedbooks"));
let books5 = JSON.parse(sessionStorage.getItem("availablebooks"));


sessionStorage.setItem("availablebooks",JSON.stringify(books5));
// sessionStorage.setItem("borrowedbooks",JSON.stringify(books4));
// sessionStorage.clear();



function getavailablebooks(){
    if (userType === "admin") {
        let booksHtml = allbooks.map((book) => {
            return `<div class="cards" id="book${book.Id}">
            <div class="flip-card">
                <div class="flip-card-inner">
                        <div class="flip-card-front">
                        <img src="${book.BookCover}" alt="Avatar" style="width:300px;height:300px;">
                        </div>
                        <div class="flip-card-back">
                            <h1>${book.Bookname}</h1>
                            <p>${book.description1}</p>
                            <p>${book.description2}</p>
                            <a href="../User_Home_page/bookdetails.html" class="see" onclick="details(this)">
                                    See More..
                            </a>
                        </div>
                    </div>
                </div>
                <p>${book.Bookname}</p>
                <div class="Edit_Delete_buttns">
                    <button class="buttns" onclick="go_to_bookDescription()">Edit</button>
                    <button class="buttns" onclick="deletebook(this)"><i class="fa fa-trash-o" style="font-size:25px"></i></button>
                </div>
            </div>`;
        }).join('');
        return booksHtml;
    } else if (userType === "user") {
        let booksHtml = books5.map((book) => {
            return (
                `<div class="card" id="book${book.Id}">
                    <div class="flip-card">
                        <div class="flip-card-inner">
                            <div class="flip-card-front">
                                <img src="${book.BookCover}" alt="Avatar" style="width:300px;height:300px;">
                            </div>
                            <div class="flip-card-back">
                                <h1>${book.author}</h1>
                                <p>${book.description1}</p>
                                <p>${book.description2}</p>
                                <a href="../User_Home_page/bookdetails.html" class="see" onclick="details(this)">
                                    See More..
                                </a>
                            </div>
                        </div>
                    </div>
                    <p>${book.Bookname}</p>
                    <button onclick="DeleteavailableBook(this)">Borrow</button>
                </div>`
            );
        }).join('');
        return booksHtml;
    }
}
function deletebook(button){
    var bookDiv = button.parentElement.parentElement;
    // console.log(bookDiv.id);
    bookDiv.style.transition = 'opacity 0.5s, height 0.5s';
    bookDiv.style.opacity = '0';
    bookDiv.style.height = '0';
    var category = button.parentElement.parentElement.parentElement.id;
    setTimeout(function() {
        bookDiv.remove();
        // console.log(parentid);
        var parentId = bookDiv.id;
        var lastChar = parentId.charAt(parentId.length - 1);
        var lastCharInt = parseInt(lastChar);
        allbooks = allbooks.filter(function (book) {
            return book.Id !== lastCharInt;
        });
        var ctn = 0;
        sessionStorage.setItem("books",JSON.stringify(allbooks));
        for (let i = 0; i < allbooks.length; i++) {
            const book = allbooks[i];
            if(book.categoreys.includes(category)){
                ctn++;
            }
        }
        
    }, 500);
}

// var booklistborrow1 = document.getElementById("borrowBooks");
var booklistavailable1 = document.getElementById("availablebooks");
// function renderborrowBooks(){
//     booklistborrow1.innerHTML = getborrowbooks()
// }
// renderborrowBooks();

function renderavailablebooks(){
    booklistavailable1.innerHTML = getavailablebooks()
}

renderavailablebooks();
function checkavailble(){
    if (books5.length === 0) {
        // var books1Elements = document.getElementsByClassName("books1");
        
        // for (var i = 0; i < books1Elements.length; i++) {
        //     books1Elements[i].style.transition = 'opacity 0.5s, height 0.5s';
        //     books1Elements[i].style.opacity = '0';
        //     books1Elements[i].style.height = '0';
        // }
        document.getElementById("Available").style.display = "none";
        document.getElementById("availablebooks").style.display = "none";
        document.getElementById("hide1").style.display = "none";
        document.getElementById("Borrow").style.marginTop = "0px";
    } 
}
function DeleteavailableBook(button){
    var bookDiv = button.parentElement;
    var parentId = bookDiv.id;
    var lastChar = parentId.charAt(parentId.length - 1);
    var lastCharInt = parseInt(lastChar);

    bookDiv.style.transition = 'opacity 0.5s, height 0.5s';
    bookDiv.style.opacity = '0';
    bookDiv.style.height = '0';

    setTimeout(function () {
        bookDiv.remove();
        // Find the book in books4 with the corresponding ID
        var selectedBook = books5.find(function (book) {
            return book.Id === lastCharInt;
        });
        // Move the selected book from books4 to books5
        if(books4.length===0){
            document.getElementById("Borrow").style.display = "flex";
        document.getElementById("hide").style.display = "block";
        }
        books4.push(selectedBook);
        // renderborrowBooks();
        // Remove the selected book from books4
        books5 = books5.filter(function (book) {
            return book.Id !== lastCharInt;
        });
        sessionStorage.setItem("availablebooks",JSON.stringify(books5));
        sessionStorage.setItem("borrowedbooks",JSON.stringify(books4));
        checkavailble();
    }, 500);

}
function details(button){
    // Get the parent element of the button, which should be the div containing book details
    var bookDiv = button.parentElement.parentElement.parentElement.parentElement;

    // Extract the id of the parent div
    var parentId = bookDiv.id;

    // Extract the last character of the parentId and convert it to an integer
    var lastChar = parentId.charAt(parentId.length - 1);
    var lastCharInt = parseInt(lastChar);

    // Find the book with the matching id in the allbooks array
    var selectedBook = allbooks.find(function (book) {
        return book.Id === lastCharInt;
    });

    // Log the values for debugging purposes
    // console.log("Parent ID:", parentId);
    // console.log("Last Character:", lastCharInt);
    // console.log("Book:", selectedBook);
    // Save the book details to sessionStorage
    if(userType === "user"){var booktype = bookDiv.parentElement.id;
        sessionStorage.setItem("booktype", JSON.stringify(booktype));}
        sessionStorage.setItem("details", JSON.stringify(selectedBook));
}