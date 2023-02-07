let books = []

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

Book.prototype.toggleRead = function () {
    if (this.read == true) {
        this.read = false
    } else {
        this.read = true
    }
}

Book.prototype.addBookToLibrary = function () {
    books.unshift(this)
}


const btn = document.querySelector("#button")
const submitBtn = document.querySelector("#submit-btn")
const main = document.querySelector("#main")
const modal = document.querySelector(".modal")
const overlay = document.querySelector(".overlay")
const bookTitle = document.querySelector("#book-title")
const bookAuthor = document.querySelector("#book-author")
const bookPages = document.querySelector("#book-pages")
const checkbox = document.querySelector("#read")
const form = document.querySelector("form")
const bookshelf = document.querySelector(".bookshelf")

const addBookCards = function() {
    removeCards()
    books.forEach((book) => {
        bookshelf.appendChild(createBookCard(book))
    })
}

const removeCards = function() {
    while (bookshelf.firstChild) {
        bookshelf.removeChild(bookshelf.firstChild)
    }
}

const createBookCard = function(book) {
    const card = document.createElement("div")
    const title = document.createElement("span")
    const author = document.createElement("span")
    const pages = document.createElement("span")
    const toggleRead = document.createElement("button")
    const removeButton = document.createElement("button")

    card.appendChild(title)
    card.appendChild(author)
    card.appendChild(pages)
    card.appendChild(toggleRead)
    card.appendChild(removeButton)

    card.classList.add("bookCard")
    title.classList.add("cardText")
    author.classList.add("cardText")
    pages.classList.add("cardText")
    toggleRead.classList.add("cardButton")
    removeButton.classList.add("cardButton")

    title.textContent = `Title: ${book.title}`
    author.textContent =`Author: ${book.author}`
    pages.textContent = `Pages: ${book.pages}`
    removeButton.textContent = `remove`

    toggleRead.addEventListener("click", changeReadButtonStatus)
    removeButton.addEventListener("click", removeBook)

    if (book.read) {
        toggleRead.textContent = "Read"
        toggleRead.classList.add("read")
    } else {
        toggleRead.textContent = "Not read"
        toggleRead.classList.add("notRead")
    }

    return card
}

const removeBook = function(){
    let bookTitle = this.parentNode.children[0].textContent.slice(7)
    let bookAuthor = this.parentNode.children[1].textContent.slice(8)
    let bookIndex = findBook(bookTitle , bookAuthor)
    books.splice(bookIndex,1)

    this.parentNode.remove()
}

const createBookObj = function () {  
    let book = new Book(bookTitle.value, bookAuthor.value, bookPages.value, checkbox.checked)
    book.addBookToLibrary()
    console.log(books)
}

const openModal = function () {
    modal.classList.remove("hidden")
    overlay.classList.remove("hidden")
}

const closeModal = function () {
    modal.classList.add("hidden")
    overlay.classList.add("hidden")
}

const clearInput = function () {
    form.reset()
}

const findBook = function (title, author) {
    let bookIndex = null
    books.forEach((book, i) => {
        if (book.title == title && book.author == author) {
            bookIndex = i
        }
    })

    return bookIndex
}

const changeReadButtonStatus = function () {
    let bookTitle = this.parentNode.children[0].textContent.slice(7)
    let bookAuthor = this.parentNode.children[1].textContent.slice(8)

    let bookIndex = findBook(bookTitle, bookAuthor)
    let book = books[bookIndex]

    book.toggleRead()

    if (book.read) {
        this.textContent = "Read"
    } else {
        this.textContent = "Not read"
    }

    this.classList.toggle("read")
    this.classList.toggle('notRead')

}

form.addEventListener("submit", (e) => {
    e.preventDefault()
    createBookObj()
    addBookCards()
    clearInput()
    closeModal()
})

let cardsButtons = document.querySelectorAll(".cardButton")



btn.addEventListener("click", openModal)
overlay.addEventListener("click" , closeModal)

