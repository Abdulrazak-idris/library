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
    const inputs = document.querySelectorAll("input");
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

    // Delete book.
    const deleteBtns = document.querySelectorAll(".btn-delete");
    const deleteBtn = Array.from(deleteBtns);
    for (const btn of deleteBtn) {
    btn.addEventListener("click", (event) => {
        const parent = event.target.parentNode;
        const grandParent = parent.parentNode;
        grandParent.remove();
        })
    }

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
        const cardContainer = document.createElement("div");
        const newDiv = document.createElement("div");
        const readOrDelete = document.createElement("div");
        const dlt_btn = document.createElement("button");
        const readBtn = document.createElement("button");
        cardContainer.classList.add('card-container');
        newDiv.classList.add('card');
        readOrDelete.classList.add('readOrDelete-container');
        dlt_btn.classList.add('btn', 'btn-delete');
        readBtn.classList.add('btn', 'btn-read');
        const userInput = ["title", "author", "pages", "readStatus"];
        userInput.forEach(item => {
            const inputTest = document.createElement("div");
            inputTest.textContent = `${item} : ${library[0][item]}`;
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
}