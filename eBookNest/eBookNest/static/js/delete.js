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

let allbooks = JSON.parse(sessionStorage.getItem("books")) || [book1, book2, book3, book4, book5, book6];
sessionStorage.setItem("books",JSON.stringify(allbooks));
function getnavbar(){
    var navbar = document.getElementById("navbar");
    navbar.innerHTML = `<div class="logoandsearch">
    <a href="../home_page/home.html" class="LogoIcon">
<img src="../images/logopng-removebg.png" alt="can't display image">
</a>
<a href="../home_page/home.html" class="Logo">eBookNest</a>

</div>

<div class="bottomline">
   <a href="../home_page/home.html" class="quick" title="Admin Homepage">Home</a>
<a href="add.html" class="quick" title="add a new book">Add Book</a>

<a href="Edit.html" class="quick" title="edit an existing book">Edit Book</a>

<a href="delete.html" class="quick" title="remove a book from the list" style="
color: #ffffff;
text-decoration: underline;
font-size: 38px;
color: burlywood;
padding-bottom: 0px;
text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
text-underline-offset: 12.5px;">Delete Book</a>





<a href="../html/main-sign-page.html" class="quick" title="log out">Sign Out</a>
<label for="Search" class="srch">Search:</label>
<input type="text" id="SBar" name="Search Bar" placeholder="Search for a book title...">
</div>
`;
    navbar = document.getElementById("form");
    navbar.innerHTML = `<h2>Delete by entering the following: </h2>
    <br>
    <br>
    <div class="input">
        <label for="BookName">Book name: </label>
        <input type="text" id="BookName" required placeholder="enter book name">
    </div>
    
    <br>
    <br>
    <div class="input">
        <label for="BookId">Book ID: </label>
    <input type="text" id="BookId" name="Bookid" required placeholder="enter book ID">
    </div>

   <p class="invalidinput"><p>
   <br><br>
    <div class="box"> 
        <div class="wrap">
    <button id = "deletebtn" type="submit">
        Submit
    </button>
</div>
<div class="wrap">
    <button type="submit">
        Reset
    </button>
</div>
</div>`;
}
getnavbar();

var idElem = document.getElementById("BookId")
var btn = document.getElementById("deletebtn")
var para = document.getElementsByClassName("invalidinput")[0]
btn.addEventListener('click', (event) => {
    for (let i = 0; i < allbooks.length; i++) {
        if(allbooks[i].Id == idElem.value)
        {
            allbooks = allbooks.filter((book) => {
                return book.Id != idElem.value;
            })
            sessionStorage.setItem("books",JSON.stringify(allbooks));
            let books6 =allbooks.slice(allbooks.length / 2);
            let books7 =allbooks.slice(0, allbooks.length / 2);
            sessionStorage.setItem("availablebooks",JSON.stringify(books6));
            sessionStorage.setItem("borrowedbooks",JSON.stringify(books7));
            return
        }
    }
    para.innerHTML = `*Book not found`
    event.preventDefault();
})
