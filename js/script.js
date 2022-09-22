console.log("This is before es6 version");

// Todos
// store all the data to localStorage
// Give an option to delete a book
// add a scrollbar to the view



// Constructor
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

// Display constructor
function Display() {}

// Add methods to display prototypes
Display.prototype.add = function (book) {
    console.log("Adding to ui");
    let tableBody = document.getElementById("tableBody");
    let uiString = `
                    <tr>
                        <td>${book.name}</td>
                        <td>${book.author}</td>
                        <td>${book.type}</td>
                    </tr>`;

    tableBody.innerHTML += uiString;
};

// Implementing the clear function
Display.prototype.clear = function () {
    let libraryForm = document.getElementById("libraryForm");
    libraryForm.reset();
};

// Implementing the validate function
Display.prototype.validate = function (book) {
    if (book.name.length < 2 || book.author.length < 2) {
        return false;
    } else {
        return true;
    }
};

// Implementing the show function
Display.prototype.show = function (type, displaymessage) {
    let message = document.getElementById("message");
    message.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
        <strong>Message:</strong> ${displaymessage}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;

    setTimeout(() => {
        message.innerHTML = "";
    }, 5000);
};
// Add submit event listener to libraryForm
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log("You have submitted library form");
    let name = document.getElementById("bookName").value;
    let author = document.getElementById("author").value;

    let fiction = document.getElementById("fiction");
    let programming = document.getElementById("programming");
    let finance = document.getElementById("finance");
    let type;

    if (fiction.checked) {
        type = fiction.value;
    } else if (programming.checked) {
        type = programming.value;
    } else if (finance.checked) {
        type = finance.value;
    }

    let book = new Book(name, author, type);

    console.log(book);

    let display = new Display();
    if (display.validate(book)) {
        display.add(book);
        display.clear();
        display.show("success", "Your book has been successfully added");
    } else {
        // SHow error to user
        display.show("danger", "Sorry you cannot add this book");
    }

    e.preventDefault();
}
