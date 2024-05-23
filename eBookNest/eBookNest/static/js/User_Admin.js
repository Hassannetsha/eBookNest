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
var book1 = new book("Circe",1,"Madeline Miller","Fantasy","Personal Finance, Parenting, and Investing.","Robert's story of growing up with two dads — his real father and the father of his best friend, his rich dad — and the ways in which both men shaped his thoughts about money and investing"
,7,100,"../images/OIP.jpeg"
)
var book2 = new book("Game of Thrones",2,"George R.R. Martin","Fantasy","Personal Finance, Parenting, and Investing.","Robert's story of growing up with two dads — his real father and the father of his best friend, his rich dad — and the ways in which both men shaped his thoughts about money and investing",
10,200,"../images/x960.jpg"
)
var book3 = new book("The Hitchhiker’s Guide to the Galaxy",3,"Douglas Adams","Science Fiction","Personal Finance, Parenting, and Investing.","Robert's story of growing up with two dads — his real father and the father of his best friend, his rich dad — and the ways in which both men shaped his thoughts about money and investing",
10,200,"../images/13.jpg"
)
var book4 = new book("The Atlantis Gene",4,"A.G. Riddle","Science Fiction","Personal Finance, Parenting, and Investing.","Robert's story of growing up with two dads — his real father and the father of his best friend, his rich dad — and the ways in which both men shaped his thoughts about money and investing",
10,200,"../images/1940026016.jpg"
)
var book5 = new book("Gone Girl",5,"Gillian Flynn","Mystery / Thriller","Personal Finance, Parenting, and Investing.","Robert's story of growing up with two dads — his real father and the father of his best friend, his rich dad — and the ways in which both men shaped his thoughts about money and investing",
10,200,"../images/Gone-girl-pdf.jpg"
)
var book6 = new book("The Girl with the Dragon Tattoo",6,"Stieg Larsson","Mystery / Thriller","Personal Finance, Parenting, and Investing.","Robert's story of growing up with two dads — his real father and the father of his best friend, his rich dad — and the ways in which both men shaped his thoughts about money and investing",
10,200,"../images/OIP (1).jpeg"
)
let allbooks = JSON.parse(sessionStorage.getItem("books")) || [book1, book2, book3, book4, book5, book6];
// let allbooks = [book1, book2, book3, book4, book5, book6];
sessionStorage.setItem("books", JSON.stringify(allbooks));
// console.log(allbooks);

let books9 = JSON.parse(sessionStorage.getItem("availablebooks"))||allbooks.slice(allbooks.length / 2);
let books8 = JSON.parse(sessionStorage.getItem("borrowedbooks"))|| allbooks.slice(0, allbooks.length / 2);
sessionStorage.setItem("availablebooks",JSON.stringify(books9));
sessionStorage.setItem("borrowedbooks",JSON.stringify(books8));

let books4 = JSON.parse(sessionStorage.getItem("borrowedbooks"));
let books5 = JSON.parse(sessionStorage.getItem("availablebooks"));
// console.log(books4);
// console.log(books5);


function getBooks(category){
    for (let j = 0; j < allbooks.length; j++) {
        const book = allbooks.filter(book => book.categoreys.includes(category));
        let booksHtml = book.map((book) => {
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
                            <a href="../User_Home_page/bookdetails.html" class="see"  onclick="details(this)">
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
    }
}
var booklistPart1 = document.getElementById("Fantasy");
var booklistPart2 = document.getElementById("Science Fiction");
var booklistPart3 = document.getElementById("Mystery / Thriller");
function renderBooks(){
    booklistPart1.innerHTML = getBooks("Fantasy")
    booklistPart2.innerHTML = getBooks("Science Fiction")
    booklistPart3.innerHTML = getBooks("Mystery / Thriller")
}
renderBooks();
var userType = JSON.parse(sessionStorage.getItem("userType"));
// !getnavbar();
if (userType === "admin") {
    document.getElementById("Admin_page").style.display = "block";
} else if (userType === "user") {
    document.getElementById("user_page").style.display = "block";
} else {
    alert("Invalid user type in URL!");
}

function check(parentid,ctn) {
    if (parentid === "Fantasy"&&ctn==0) {
        var books1Elements = document.getElementsByClassName("books1");
        
        for (var i = 0; i < books1Elements.length; i++) {
            books1Elements[i].style.transition = 'opacity 0.5s, height 0.5s';
            books1Elements[i].style.opacity = '0';
            books1Elements[i].style.height = '0';
        }
        document.getElementById("Fantasy").style.display = "none";
        return;
    } 
    if (parentid === "Science Fiction"&&ctn==0) {
        var books1Elements = document.getElementsByClassName("books2");
        
        for (var i = 0; i < books1Elements.length; i++) {
            books1Elements[i].style.transition = 'opacity 0.5s, height 0.5s';
            books1Elements[i].style.opacity = '0';
            books1Elements[i].style.height = '0';
        }
        document.getElementById("Science Fiction").style.display = "none";
    } 
    if (parentid === "Mystery / Thriller"&&ctn==0) {
        var books1Elements = document.getElementsByClassName("books3");
        
        for (var i = 0; i < books1Elements.length; i++) {
            books1Elements[i].style.transition = 'opacity 0.5s, height 0.5s';
            books1Elements[i].style.opacity = '0';
            books1Elements[i].style.height = '0';
        }
        document.getElementById("Mystery / Thriller").style.display = "none";
    } 
}

function checkFantasy(){
    if(booklistPart1.innerHTML===""){
        var books1Elements = document.getElementsByClassName("books1");
        
        for (var i = 0; i < books1Elements.length; i++) {
            books1Elements[i].style.transition = 'opacity 0.5s, height 0.5s';
            books1Elements[i].style.opacity = '0';
            books1Elements[i].style.height = '0';
        }
        document.getElementById("Fantasy").style.display = "none";
    }
    if(booklistPart2.innerHTML===""){
        var books1Elements = document.getElementsByClassName("books2");
        
        for (var i = 0; i < books1Elements.length; i++) {
            books1Elements[i].style.transition = 'opacity 0.5s, height 0.5s';
            books1Elements[i].style.opacity = '0';
            books1Elements[i].style.height = '0';
        }
        document.getElementById("Science Fiction").style.display = "none";
    }
    if(booklistPart3.innerHTML===""){
        var books1Elements = document.getElementsByClassName("books3");
        
        for (var i = 0; i < books1Elements.length; i++) {
            books1Elements[i].style.transition = 'opacity 0.5s, height 0.5s';
            books1Elements[i].style.opacity = '0';
            books1Elements[i].style.height = '0';
        }
        document.getElementById("Mystery / Thriller").style.display = "none";
    }
}
checkFantasy();
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
        let books6 =allbooks.slice(allbooks.length / 2);
        let books7 =allbooks.slice(0, allbooks.length / 2);
        sessionStorage.setItem("availablebooks",JSON.stringify(books6));
        sessionStorage.setItem("borrowedbooks",JSON.stringify(books7));
        check(category,ctn);
    }, 500);
}

if(userType=="user"){function getborrowbooks(){
    let books6 = JSON.parse(sessionStorage.getItem("availablebooks"))||allbooks.slice(allbooks.length / 2);
    let books7 = JSON.parse(sessionStorage.getItem("borrowedbooks"))|| allbooks.slice(0, allbooks.length / 2);
    sessionStorage.setItem("availablebooks",JSON.stringify(books6));
    sessionStorage.setItem("borrowedbooks",JSON.stringify(books7));
    let booksHtml = books4.map((book) => {
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
                            <a href="../User_Home_page/bookdetails.html" class="see"  onclick="details(this)">
                                See More..
                            </a>
                        </div>
                    </div>
                </div>
                <p>${book.Bookname}</p>
                <button onclick="DeleteBorrowBook(this)">Return</button>
            </div>`
        );
    }).join('');
    return booksHtml;
}

function getavailablebooks(){
    let books6 = JSON.parse(sessionStorage.getItem("availablebooks"))||allbooks.slice(allbooks.length / 2);
    let books7 = JSON.parse(sessionStorage.getItem("borrowedbooks"))|| allbooks.slice(0, allbooks.length / 2);
    sessionStorage.setItem("availablebooks",JSON.stringify(books6));
    sessionStorage.setItem("borrowedbooks",JSON.stringify(books7));
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
                            <a href="../User_Home_page/bookdetails.html" class="see"  onclick="details(this)">
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
var booklistborrow1 = document.getElementById("borrowBooks");
var booklistavailable1 = document.getElementById("availablebooks");
function renderborrowBooks(){
    booklistborrow1.innerHTML = getborrowbooks()
}
renderborrowBooks();

function renderavailablebooks(){
    booklistavailable1.innerHTML = getavailablebooks()
}

renderavailablebooks();

function checkBorrow() {
    if (books4.length === 0) {
        document.getElementById("Borrow").style.display = "none";
        document.getElementById("hide").style.display = "none";
    } 

}
function DeleteBorrowBook(button){
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
        var selectedBook = books4.find(function (book) {
            return book.Id === lastCharInt;
        });
        // Move the selected book from books4 to books5
        if(books5.length===0){
            document.getElementById("Available").style.display = "flex";
            document.getElementById("availablebooks").style.display = "flex";
            document.getElementById("hide1").style.display = "block";
            document.getElementById("Borrow").style.marginTop = "112px";
        }
        books5.push(selectedBook);
        renderavailablebooks();
        // Remove the selected book from books4
        books4 = books4.filter(function (book) {
            return book.Id !== lastCharInt;
        });
        sessionStorage.setItem("availablebooks",JSON.stringify(books5));
        sessionStorage.setItem("borrowedbooks",JSON.stringify(books4));
        checkBorrow();
    }, 500);
}
function checkavailble(){
    if (books5.length === 0) {
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
        renderborrowBooks();
        // Remove the selected book from books4
        books5 = books5.filter(function (book) {
            return book.Id !== lastCharInt;
        });
        sessionStorage.setItem("availablebooks",JSON.stringify(books5));
        sessionStorage.setItem("borrowedbooks",JSON.stringify(books4));
        checkavailble();
    }, 500);

}
function checkBorrowhead(){
    var div = document.getElementById("borrowBooks");
    if(div.innerHTML===""){
        document.getElementById("Borrow").style.display = "none";
        document.getElementById("hide").style.display = "none";
    }
}

function checkavailablehead(){
    var div = document.getElementById("availablebooks");
    if(div.innerHTML===""){
        document.getElementById("Available").style.display = "none";
        document.getElementById("availablebooks").style.display = "none";
        document.getElementById("hide1").style.display = "none";
        document.getElementById("Borrow").style.marginTop = "0px";
    }
}

checkBorrowhead();
checkavailablehead();
function Search(){

}}
function getnavbar(){
    var navbar = document.getElementById("navbaradmin");
    navbar.innerHTML = ``;
    navbar = document.getElementById("navbaruser");
    navbar.innerHTML = ``;
}
function check_empty(){
    if(booklistPart1.innerHTML===""){
        var books1Elements = document.getElementsByClassName("books1");
        
        for (var i = 0; i < books1Elements.length; i++) {
            books1Elements[i].style.transition = 'opacity 0.5s, height 0.5s';
            books1Elements[i].style.opacity = '0';
            books1Elements[i].style.height = '0';
        }
        document.getElementById("Fantasy").style.display = "none";
    }
    if(booklistPart2.innerHTML===""){
        var books1Elements = document.getElementsByClassName("books2");
        
        for (var i = 0; i < books1Elements.length; i++) {
            books1Elements[i].style.transition = 'opacity 0.5s, height 0.5s';
            books1Elements[i].style.opacity = '0';
            books1Elements[i].style.height = '0';
        }
        document.getElementById("Science Fiction").style.display = "none";
    }
    if(booklistPart3.innerHTML===""){
        var books1Elements = document.getElementsByClassName("books3");
        
        for (var i = 0; i < books1Elements.length; i++) {
            books1Elements[i].style.transition = 'opacity 0.5s, height 0.5s';
            books1Elements[i].style.opacity = '0';
            books1Elements[i].style.height = '0';
        }
        document.getElementById("Mystery / Thriller").style.display = "none";
    }
}
check_empty();
function details(button){
    
    var bookDiv = button.parentElement.parentElement.parentElement.parentElement;

    
    var parentId = bookDiv.id;

    
    var lastChar = parentId.charAt(parentId.length - 1);
    var lastCharInt = parseInt(lastChar);

    
    var selectedBook = allbooks.find(function (book) {
        return book.Id === lastCharInt;
    });
    if(userType === "user"){var booktype = bookDiv.parentElement.id;
    sessionStorage.setItem("booktype", JSON.stringify(booktype));}
    sessionStorage.setItem("details", JSON.stringify(selectedBook));
}
const Categoryes = ['Fantasy', 'Science Fiction', 'Mystery / Thriller']
function searchItems(query) {
    const filteredCategoryesItems = Categoryes.filter(item => item.toLowerCase().includes(query.toLowerCase()));
    const filteredBooksesItems = allbooks.filter(book => {
        return book.Bookname.toLowerCase().includes(query.toLowerCase());
    });

    if(filteredCategoryesItems != ""){
        if(filteredCategoryesItems[0].toLowerCase()==Categoryes[0].toLowerCase()){
        var books1Elements = document.getElementsByClassName("books2");
        
        for (var i = 0; i < books1Elements.length; i++) {
            books1Elements[i].style.transition = 'opacity 0.5s, height 0.5s';
            books1Elements[i].style.opacity = '0';
            books1Elements[i].style.height = '0';
        }
        document.getElementById("Science Fiction").style.display = "none";
        var books1Elements = document.getElementsByClassName("books3");
        
        for (var i = 0; i < books1Elements.length; i++) {
            books1Elements[i].style.transition = 'opacity 0.5s, height 0.5s';
            books1Elements[i].style.opacity = '0';
            books1Elements[i].style.height = '0';
        }
        document.getElementById("Mystery / Thriller").style.display = "none";
        }
        else if(filteredCategoryesItems[0].toLowerCase()==Categoryes[1].toLowerCase()){
            var books1Elements = document.getElementsByClassName("books1");
            
            for (var i = 0; i < books1Elements.length; i++) {
                books1Elements[i].style.transition = 'opacity 0.5s, height 0.5s';
                books1Elements[i].style.opacity = '0';
                books1Elements[i].style.height = '0';
            }
            document.getElementById("Fantasy").style.display = "none";
            var books1Elements = document.getElementsByClassName("books3");
            
            for (var i = 0; i < books1Elements.length; i++) {
                books1Elements[i].style.transition = 'opacity 0.5s, height 0.5s';
                books1Elements[i].style.opacity = '0';
                books1Elements[i].style.height = '0';
            }
            document.getElementById("Mystery / Thriller").style.display = "none";
        }
        else if(filteredCategoryesItems[0].toLowerCase()==Categoryes[2].toLowerCase()){
            var books1Elements = document.getElementsByClassName("books1");
            
            for (var i = 0; i < books1Elements.length; i++) {
                books1Elements[i].style.transition = 'opacity 0.5s, height 0.5s';
                books1Elements[i].style.opacity = '0';
                books1Elements[i].style.height = '0';
            }
            document.getElementById("Fantasy").style.display = "none";
            var books1Elements = document.getElementsByClassName("books2");
            
            for (var i = 0; i < books1Elements.length; i++) {
                books1Elements[i].style.transition = 'opacity 0.5s, height 0.5s';
                books1Elements[i].style.opacity = '0';
                books1Elements[i].style.height = '0';
            }
            document.getElementById("Science Fiction").style.display = "none";
        }
    }
    else if(filteredBooksesItems!=""){
        booklistPart1.innerHTML = ``;
        booklistPart2.innerHTML = ``;
        booklistPart3.innerHTML = ``;
        for (let i = 0; i < filteredBooksesItems.length; i++) {
            if(filteredBooksesItems[i].categoreys.toLowerCase()==Categoryes[0].toLowerCase()){
                booklistPart1.innerHTML+=  `<div class="cards" id="book${filteredBooksesItems[i].Id}">
                <div class="flip-card">
                    <div class="flip-card-inner">
                            <div class="flip-card-front">
                            <img src="${filteredBooksesItems[i].BookCover}" alt="Avatar" style="width:300px;height:300px;">
                            </div>
                            <div class="flip-card-back">
                                <h1>${filteredBooksesItems[i].Bookname}</h1>
                                <p>${filteredBooksesItems[i].description1}</p>
                                <p>${filteredBooksesItems[i].description2}</p>
                                <a href="../User_Home_page/bookdetails.html" class="see"  onclick="details(this)">
                                        See More..
                                </a>
                            </div>
                        </div>
                    </div>
                    <p>${filteredBooksesItems[i].Bookname}</p>
                    <div class="Edit_Delete_buttns">
                        <button class="buttns" onclick="go_to_bookDescription()">Edit</button>
                        <button class="buttns" onclick="deletebook(this)"><i class="fa fa-trash-o" style="font-size:25px"></i></button>
                    </div>
                </div>`;
                check_empty();
                
            }
            else if(filteredBooksesItems[i].categoreys.toLowerCase()==Categoryes[1].toLowerCase()){
                booklistPart2.innerHTML+=  `<div class="cards" id="book${filteredBooksesItems[i].Id}">
                <div class="flip-card">
                    <div class="flip-card-inner">
                            <div class="flip-card-front">
                            <img src="${filteredBooksesItems[i].BookCover}" alt="Avatar" style="width:300px;height:300px;">
                            </div>
                            <div class="flip-card-back">
                                <h1>${filteredBooksesItems[i].Bookname}</h1>
                                <p>${filteredBooksesItems[i].description1}</p>
                                <p>${filteredBooksesItems[i].description2}</p>
                                <a href="../User_Home_page/bookdetails.html" class="see"  onclick="details(this)">
                                        See More..
                                </a>
                            </div>
                        </div>
                    </div>
                    <p>${filteredBooksesItems[i].Bookname}</p>
                    <div class="Edit_Delete_buttns">
                        <button class="buttns" onclick="go_to_bookDescription()">Edit</button>
                        <button class="buttns" onclick="deletebook(this)"><i class="fa fa-trash-o" style="font-size:25px"></i></button>
                    </div>
                </div>`;
                check_empty();
            }
            else if(filteredBooksesItems[i].categoreys.toLowerCase()==Categoryes[2].toLowerCase()){
                booklistPart3.innerHTML+=  `<div class="cards" id="book${filteredBooksesItems[i].Id}">
                <div class="flip-card">
                    <div class="flip-card-inner">
                            <div class="flip-card-front">
                            <img src="${filteredBooksesItems[i].BookCover}" alt="Avatar" style="width:300px;height:300px;">
                            </div>
                            <div class="flip-card-back">
                                <h1>${filteredBooksesItems[i].Bookname}</h1>
                                <p>${filteredBooksesItems[i].description1}</p>
                                <p>${filteredBooksesItems[i].description2}</p>
                                <a href="../User_Home_page/bookdetails.html" class="see"  onclick="details(this)">
                                        See More..
                                </a>
                            </div>
                        </div>
                    </div>
                    <p>${filteredBooksesItems[i].Bookname}</p>
                    <div class="Edit_Delete_buttns">
                        <button class="buttns" onclick="go_to_bookDescription()">Edit</button>
                        <button class="buttns" onclick="deletebook(this)"><i class="fa fa-trash-o" style="font-size:25px"></i></button>
                    </div>
                </div>`;
                check_empty();
            }
        }
    }
}
var hasTyped = false;
document.querySelector('#SBar').addEventListener('keypress', function(event) {
    if (document.getElementById('SBar').value.trim() !== "") {
        hasTyped = true;
    } else {
        hasTyped = false;
    }
    if (event.keyCode === 13&&hasTyped) {
        
        const query = this.value.trim();
        searchItems(query);
    }
});
document.getElementById('SBar').addEventListener("input", function() {
    hasTyped = document.querySelector('#SBar').value.trim() !== "";
    if(document.querySelector('#SBar').value.trim() === ""){
        renderBooks();
        var see = document.getElementsByClassName("see");
        for (var i = 0; i < see.length; i++) {
            see[i].style.marginTop = "1.5%";
        }
        var books1Elements = document.getElementsByClassName("books3");
        
        for (var i = 0; i < books1Elements.length; i++) {
            books1Elements[i].style.transition = 'opacity 0.5s, height 0.5s';
            books1Elements[i].style.opacity = '1';
            books1Elements[i].style.height = '1';
        }
        document.getElementById("Mystery / Thriller").style.display = "flex";
        books1Elements = document.getElementsByClassName("books2");
        
        for (var i = 0; i < books1Elements.length; i++) {
            books1Elements[i].style.transition = 'opacity 0.5s, height 0.5s';
            books1Elements[i].style.opacity = '1';
            books1Elements[i].style.height = '1';
        }
        document.getElementById("Science Fiction").style.display = "flex";
        books1Elements = document.getElementsByClassName("books1");
        
        for (var i = 0; i < books1Elements.length; i++) {
            books1Elements[i].style.transition = 'opacity 0.5s, height 0.5s';
            books1Elements[i].style.opacity = '1';
            books1Elements[i].style.height = '1';
        }
        document.getElementById("Fantasy").style.display = "flex";
    }
});