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
sessionStorage.setItem("books",JSON.stringify(allbooks));
function getnavbar(){
    var navbar = document.getElementById("navbar");
    console.log(navbar);
    navbar.innerHTML = `<div class="logoandsearch">
    <a href="../home_page/home.html" class="LogoIcon">
<img src="../images/logopng-removebg.png" alt="can't display image">
</a>
<a href="../home_page/home.html" class="Logo">eBookNest</a>

</div>

<div class="bottomline">
<a href="../home_page/home.html" class="quick" title="Admin Homepage">Home</a>
<a href="add.html" class="quick" title="add a new book" style="
color: #ffffff;
text-decoration: underline;
font-size: 38px;
color: burlywood;
padding-bottom: 0px;
text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
text-underline-offset: 12.5px;">Add Book</a>

<a href="Edit.html" class="quick" title="edit an existing book">Edit Book</a>

<a href="delete.html" class="quick" title="remove a book from the list">Delete Book</a>


<a href="../html/main-sign-page.html" class="quick" title="log out">Sign Out</a>
<label for="Search" class="srch">Search:</label>
<input type="text" id="SBar" name="Search Bar" placeholder="Search for a book title...">
</div>
`;
    navbar = document.getElementById("form");
    navbar.innerHTML = `<div class="input">
    <label for="BookId"> Book Id:</label>
        <input type="text" required name="BookId" placeholder="enter book id" id="BookIdinp" name="bookid" autofocus>
    </div>
        
        <br>
        <br>
        
    <div class="input"> 
    <label for="BookName"> Book Name:</label>
        <input type="text" required name="BookName" placeholder="enter book name" id="BookName">
    </div>
        
        <br>
        <br>
        
    <div class="input">
    <label for="author"> Book's author:</label>
        <input type="text" required name="author" placeholder="enter book's author" id="author">
    </div>
        
        <br>
        <br>
        
    <div class="input">
    <label for="BookCategory"> Book Category:</label>
        <input type="text" required name="BookCategory" placeholder="enter book's category" id="BookCategory">
    </div>
        
        <br>
        <br>
        
    <div class="input">
    <label for="BookDescription"> Book Description:</label>
        <textarea name="comment--" id="BookDescription" cols="30" rows="10"
            placeholder="write book description"></textarea>
        </div>
        
        <br>
        <br>
        
    <div class="input"> 
    <label for="BookCover">Put book's cover image: </label>
        <input type="file" id="BookCover"  accept="image/jpg, image/png, image/jpeg">
    </div>
        
        <br>
        <br>
        <p class="invalidinput"></p>
        <div class="box"> <div class="wrap">
            <button type="submit" id = "addbtn" >
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

// console.log(document.getElementById(`BookId`).value);
// constructor(Bookname, Id, author, categoreys, description1, description2, rating, no_pages, BookCover) {
//     this.Bookname = Bookname;
//     this.Id = Id;
//     this.author = author;
//     this.categoreys = categoreys;
//     this.description1 = description1;
//     this.description2 = description2;
//     this.rating = rating;
//     this.no_pages = no_pages;
//     this.BookCover = BookCover;
// }
var para = document.getElementsByClassName("invalidinput")[0]; 
var btn = document.getElementById("addbtn")
btn.addEventListener('click',(event) => {
    for (let i = 0; i < allbooks.length; i++) {
        if(allbooks[i].Id == document.getElementById(`BookIdinp`).value)
        {
            console.log(`found`)
            para.innerHTML = `*Book already exists`
            event.preventDefault()
            return
        }
    }
    var bookelems = new book(document.getElementById("BookName").value,//book name
    document.getElementById(`BookIdinp`).value,// book id
    document.getElementById("author").value,// authour
    document.getElementById("BookCategory").value,// category
    document.getElementById("BookDescription").value,//description1
    ``,//description1
    5,//rating
    100,//no_page
    document.getElementById("BookCover").value)//bookcover
    console.log(bookelems)
    allbooks.push(bookelems);
    sessionStorage.setItem("books",JSON.stringify(allbooks));
    let books6 =allbooks.slice(allbooks.length / 2);
    let books7 =allbooks.slice(0, allbooks.length / 2);
    sessionStorage.setItem("availablebooks",JSON.stringify(books6));
    sessionStorage.setItem("borrowedbooks",JSON.stringify(books7));
})

