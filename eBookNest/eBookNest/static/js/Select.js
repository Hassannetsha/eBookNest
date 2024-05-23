function go_to_bookDescription(button) {
    var bookDiv = button.parentElement.parentElement;
    var parentId = bookDiv.id;
    var lastChar = parentId.charAt(parentId.length - 1);
    var lastCharInt = parseInt(lastChar);
    sessionStorage.setItem("redirectid",JSON.stringify(lastCharInt));
    window.location.href = "../Adimn_Home_page/Edit.html"
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
                            <a href="../User_Home_page/bookdetails.html" class="see" onclick="details(this)">
                                    See More..
                            </a>
                        </div>
                    </div>
                </div>
                <p>${book.Bookname}</p>
                <div class="Edit_Delete_buttns">
                <button onclick="go_to_bookDescription(this)" class="buttns" type = "button">Select</button>
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
function check_empty(){
    if(booklistPart1.innerHTML===""){
        var books1Elements = document.getElementsByClassName("books1");
        
        for (var i = 0; i < books1Elements.length; i++) {
            books1Elements[i].style.transition = 'opacity 0.5s, height 0.5s';
            books1Elements[i].style.opacity = '0';
            books1Elements[i].style.height = '0';
        }
        document.getElementById("Fantasy").style.display = "none";
        return;
    }
    else if(booklistPart2.innerHTML===""){
        var books1Elements = document.getElementsByClassName("books2");
        
        for (var i = 0; i < books1Elements.length; i++) {
            books1Elements[i].style.transition = 'opacity 0.5s, height 0.5s';
            books1Elements[i].style.opacity = '0';
            books1Elements[i].style.height = '0';
        }
        document.getElementById("Science Fiction").style.display = "none";
    }
    else if(booklistPart3.innerHTML===""){
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
    sessionStorage.setItem("details", JSON.stringify(selectedBook));
}
// function getnavbar(){
//     var navbar = document.getElementById("navbar");
//     navbar.innerHTML = `            `;
// }
// getnavbar();




