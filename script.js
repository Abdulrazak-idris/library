function Book(title, author, pages, readStatus) {
    if (!new.target) {
        throw Error("You must use the 'New' operator to call the constructor.");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}

Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages ${this.readStatus}`
}

// My array of books.
const myLibrary = [];

// Get all Books.
function addBookToLibrary(book) {
    myLibrary.push(book)
}

// Save a Book.
const btn = document.querySelector(".btn-addNewBook");
const form = document.querySelector(".form");
btn.addEventListener("click", (event) => {
    const inputs = form.querySelectorAll("input");
    const arrayOfInputs = Array.from(inputs);
    const inputValues = [];
    for (const input of arrayOfInputs) {
        if (input.value) {
            inputValues.push(input.value);
        } else {
            return;
        }
    }
    form.reset()

    //New Book instance.
    const currentBook = new Book(...inputValues);
    currentBook.id = crypto.randomUUID();

    // addBookToLibrary
    addBookToLibrary(currentBook)
    
    showBooks(myLibrary)
    
    event.preventDefault();

})

// Slide out form input.
const newBook = document.querySelector(".btn-newBook");
newBook.addEventListener("click", function () {
    const sideNav = document.querySelector(".side-nav");
    const container = document.querySelector(".container");
    const isNavVisible = window.getComputedStyle(sideNav).display !== "none";
    if (!isNavVisible) {
        container.style["grid-template-columns"] = "270px 1fr";
        sideNav.style.display = "block";
    } else {
        sideNav.style.display = "none";
        container.style["grid-template-columns"] = "1fr";
    } 
})


//Display each book.
function showBooks(library) {
    const page = document.querySelector(".page");
        page.innerHTML = "";

        library.forEach((book) => {
            const cardContainer = document.createElement("div");
            cardContainer.dataset.id = book.id;
            const newDiv = document.createElement("div");
            const readOrDelete = document.createElement("div");
            const dlt_btn = document.createElement("button");
            const readBtn = document.createElement("button");

            cardContainer.classList.add('card-container');
            newDiv.classList.add('card');
            readOrDelete.classList.add('readOrDelete-container');
            dlt_btn.classList.add('btn', 'btn-delete');
            readBtn.classList.add('btn', 'btn-edit');

            const userInput = ["title", "author", "pages", "readStatus", "id"];

            userInput.forEach(item => {
                const inputTest = document.createElement("div");
                inputTest.textContent = `${item} -- ${book[item]}`;
                newDiv.appendChild(inputTest);
            });

            dlt_btn.textContent = "Delete";
            readBtn.textContent = "Edit";

            readOrDelete.appendChild(readBtn);
            readOrDelete.appendChild(dlt_btn);

            const childElements = [newDiv, readOrDelete];
            for (let i = 0; i < childElements.length; i++) {
                cardContainer.appendChild(childElements[i]);
            }
            page.appendChild(cardContainer);

        })
}

// Delete or Edit a Book
document.querySelector(".page").addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-delete")) {
        e.target.closest(".card-container").remove();
        
        // Remove from list also.
        const id = e.target.closest(".card-container").dataset.id;
        myLibrary = myLibrary.filter(item => item.id !== id)

    } else if (e.target.classList.contains("btn-edit")) {
        const dialogBox = document.querySelector(".edit-dialog")
        dialogBox.showModal();
    }
});
