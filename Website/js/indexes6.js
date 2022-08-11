console.log("This is es6 version");
showBooks();

class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

class Display {

    // Method to clear LibraryForm
    clear() {
        let libraryForm = document.getElementById("libraryForm");
        libraryForm.reset();
    }

    // Function to validate book name & author
    validate(book) {
        if (book.name.length < 2 || book.author.length < 2) {
            return false;
        } else {
            return true;
        }
    }

    // Function to show message on adding books (error or success)
    show(type, displaymessage) {
        let message = document.getElementById("message");
        let boldText;
        if (type === "success") {
            boldText = "Success";
        } else {
            boldText = "Error";
        }
        message.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            <strong>${boldText}:</strong> ${displaymessage}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`;

        setTimeout(() => {
            message.innerHTML = "";
        }, 5000);
    }
}

// Add submit event listener to libraryForm
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);

// Function which run when book add form submitted
function libraryFormSubmit(e) {
    // console.log("You have submitted library form");
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

    let book = new Book(name, author, type); // Create a Book object named book
    if (book.name.length > 2 && book.author.length > 2) {
        let books = localStorage.getItem("books"); // Get books from localStorage
        if (books == null) {
            bookObj = [];
        } else {
            bookObj = JSON.parse(books); // Parse books as object 
        }
        bookObj.push(book);
        localStorage.setItem("books", JSON.stringify(bookObj)); // Convert object into string and store in localStorage
        // console.log(bookObj);
    }

    // create display object
    let display = new Display();
    if (display.validate(book)) {
        // display.add(book)
        showBooks(); // SHow books function call
        display.clear(); // Clear the form
        display.show("success", "Your book has been successfully added"); // Show success message
    } else {
        // SHow error to user
        display.show("danger", "Sorry you cannot add this book"); // Show error message
    }

    e.preventDefault(); // Prevent page reload when form submitted
}


// Function to show books
function showBooks() {
    let books = localStorage.getItem("books"); // Get books from localStorage
    if (books == null) {
        bookObj = []; // If localstorage is empty set bookObj as empty array
    } else {
        bookObj = JSON.parse(books); // If books are present in local storage parse them into objects
    }
    let uiString = "";
    bookObj.forEach(function (element, index) {
        uiString += `<tr class="tableTr">
                            <th scope="row">${index + 1}</th>
                            <td>${element.name}</td>
                            <td>${element.author}</td>
                            <td>${element.type} </td>
                            <td><button class="btn btn-danger" onclick="deleteBooks()">Delete</button></td>
                        </tr>`;
    });
    let tableBody = document.getElementById("tableBody");
    let noResultMsg = document.getElementById('noResultMsg')
    if (bookObj.length != 0) {
        tableBody.innerHTML = uiString; // If books are present in bookObj add uiString to tableBody
        noResultMsg.innerHTML = "" // No result message empty when books added to tableBody
        // console.log(bookObj.length);

    } 
    else {
        tableBody.innerHTML = "" // Table body is cleared when no books stored
        // Display no books to show when no books are stored in localStorage
        noResultMsg.innerHTML = ` <td colspan="5"> Nothing to show! Use "Add Book" section above to add books.</td>`;
    }
}

// function to delete a book
function deleteBooks(index) {
    //   console.log("I'm deleting", index);
    let books = localStorage.getItem("books"); // Get books from localStorage
    if (books == null) {
        bookObj = [];
    } else {
        bookObj = JSON.parse(books);
    }
    bookObj.splice(index, 1); // Use splice function to delete 1 element from array with given index
    localStorage.setItem("books", JSON.stringify(bookObj));
    showBooks();
}

// Search functionality implementation

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  //   console.log("Input event fired", inputVal);
  let tableTr = document.getElementsByClassName("tableTr");

  Array.from(tableTr).forEach(function (element) {
    let td = element.getElementsByTagName("td")[0].innerText;

    if (td.includes(inputVal)) {
      element.style.display = "table-row"
    }else{
      element.style.display = "none";
    }
    // console.log(cardTxt);
  });
});



