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
        // create_datatable(); // Create datatable function call on books add
        move(); // Show progress bar on successfull submit
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
        uiString += `<tr class="tableTr" id="table_tr_${index + 1}">
                            <th scope="row">${index + 1}</th>
                            <td>${element.name}</td>
                            <td>${element.author}</td>
                            <td>${element.type} </td>
                            <td id="butt">
                           <button class="btn btn-success" id="editBookButton" onclick="editBooks(${index});focusOnEdit(${index});">Edit</button>
                           <button class="btn btn-danger" id="deleteBookButton" onclick="deleteBooks(${index})">Delete</button>
                           </td>
                        </tr>`;
    });

    let tableBody = document.getElementById("tableBody");
    // let noResultMsg = document.getElementById("noResultMsg");
    if (bookObj.length != 0) {
        tableBody.innerHTML = uiString; // If books are present in bookObj add uiString to tableBody
        // noResultMsg.innerHTML = ""; // No result message empty when books added to tableBody
        // console.log(bookObj.length);
    } else {
        tableBody.innerHTML = ""; // Table body is cleared when no books stored
        // Display no books to show when no books are stored in localStorage
        // noResultMsg.innerHTML = ` <td colspan="5"> Nothing to show! Use "Add Book" section above to add books.</td>`;
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
    move(); //Show Progressbar
    // create_datatable(); // Create datatable function call on books delete
}

// // Search functionality implementation
// let search = document.getElementById("searchTxt");
// search.addEventListener("input", function () {
//     let inputVal = search.value.toLowerCase();
//     //   console.log("Input event fired", inputVal);
//     let tableTr = document.getElementsByClassName("tableTr");

//     Array.from(tableTr).forEach(function (element) {
//         let td = element.getElementsByTagName("td")[0].innerText;

//         if (td.includes(inputVal)) {
//             element.style.display = "table-row";
//         } else {
//             element.style.display = "none";
//         }
//         // console.log(cardTxt);
//     });
// });

// Search Functionality
function searchTable() {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchTxt");
    filter = input.value.toUpperCase();
    table = document.getElementById("bookTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

// Create object datatable When domcontentloaded

document.addEventListener("DOMContentLoaded", function () {
    // Create datatable function call on dom content loaded
    create_datatable();
});

// Create DataTable Function
function create_datatable() {
    let table = new DataTable("#bookTable");
}

// Progressbar
let progress_i = 0;
let progress = document.getElementById("progressBar");
function move() {
    if (progress_i == 0) {
        progress_i = 1;

        let width = 1;
        let id = setInterval(frame, 5);
        let removeProgress = setTimeout(function () {
            progress.style.width = "0%";
            // progress.style.display = "none";
        }, 500);
        function frame() {
            if (width >= 100) {
                clearInterval(id);
                progress_i = 0;
            } else {
                width = width + 5;
                progress.style.width = width + "%";
            }
        }
    }
}

// Function to edit books
function editBooks(index) {
    let books = localStorage.getItem("books"); // Get books from localStorage
    if (books == null) {
        bookObj = []; // If localstorage is empty set bookObj as empty array
    } else {
        bookObj = JSON.parse(books); // If books are present in local storage parse them into objects
    }
    // bookObj.forEach(function (element, index) {

    // Check type and show first on option
    let typeStringFiction = ""; // Variable for selected value storing
    let typeStringProgramming = "";
    let typeStringFinance = "";
    if (bookObj[index].type == "Fiction") {
        typeStringFiction = `selected`;
    } else if (bookObj[index].type == "Programming") {
        typeStringProgramming = "selected";
    } else if (bookObj[index].type == "Finance") {
        typeStringFinance = "selected";
    }

    // UIString For changing the ui when edit action performed
    let uiString = "";
    uiString += `<tr class="tableTr">
                            <th scope="row">${index + 1}</th> 
                            <td><input type="text" id="editName_${
                                index + 1
                            }" class="form-control" value="${
        bookObj[index].name
    }" onfocus="this.setSelectionRange(this.value.length,this.value.length);"
                            ></td>
                            <td><input type="text" id="editAuthor_${
                                index + 1
                            }" class="form-control" value="${
        bookObj[index].author
    }"></td>
                            <td><select class="form-select" name="type" id="type_edit_${
                                index + 1
                            }">
                            <option id="edit_fiction" value="Fiction" ${typeStringFiction}>Fiction</option>
                            <option id="edit_programming" value="Programming" ${typeStringProgramming}>Computer Programming</option>
                            <option id="edit_finance" value="Finance" ${typeStringFinance}>Finance</option>
                          </select></td>
                            <td id="butt">
                           <button class="btn btn-primary" id="saveBookButton" onclick="saveBooks(${index});showAfterEdit(${index})">Save</button>
                           <button class="btn btn-danger" id="cancelBookButton" onclick="showAfterEdit(${index})">Cancel</button>
                           </td>
                        </tr>`;
    // });

    let editTableTr = document.getElementById(`table_tr_${index + 1}`); // Array Index starts from 0 so 1 is added to get exact id

    if (bookObj.length != 0) {
        editTableTr.innerHTML = uiString; // If books are present in bookObj add uiString to tableBody
        // noResultMsg.innerHTML = ""; // No result message empty when books added to tableBody
        // console.log(bookObj.length);
    }
}

function saveBooks(index) {
    let name = document.getElementById(`editName_${index + 1}`).value; //Get value from input no (index+1)
    let author = document.getElementById(`editAuthor_${index + 1}`).value;

    let select = document.getElementById(`type_edit_${index + 1}`);
    let type = select.value;

    let book = new Book(name, author, type); // Create a Book object named book
    if (book.name.length > 2 && book.author.length > 2) {
        let books = localStorage.getItem("books"); // Get books from localStorage
        if (books == null) {
            bookObj = [];
        } else {
            bookObj = JSON.parse(books); // Parse books as object
            // Replace Name,Author And Type on values edited
            bookObj[index].name = bookObj[index].name.replace(
                `${bookObj[index].name}`,
                `${book.name}`
            );
            bookObj[index].author = bookObj[index].author.replace(
                `${bookObj[index].author}`,
                `${book.author}`
            );
            bookObj[index].type = bookObj[index].type.replace(
                `${bookObj[index].type}`,
                `${book.type}`
            );
        }

        // Experimenting for allowing index edit also (not functional)
        // // bookObj.splice(index,1);
        // if (new_index >= bookObj.length) {
        //     var k = new_index - bookObj.length + 1;
        //     while (k--) {
        //         bookObj.push(undefined);
        //     }
        // }
        // bookObj.splice(new_index, 0, bookObj.splice(bookObj.indexOf(bookObj[index]+1), 1)[0]);
        // // return arr; // for testing

        // bookObj.push(book);
        localStorage.setItem(`books`, JSON.stringify(bookObj)); // Convert object into string and store in localStorage
        create_datatable(index); // Create datatable function call on books add
        move(); // Show progress bar on successfull submit
        // console.log(bookObj);
    }

    // create display object
    let display = new Display();
    if (display.validate(book)) {
        display.show("success", "Your book has been successfully updated"); // Show success message
    } else {
        // SHow error to user
        display.show("danger", "Sorry you cannot update this book"); // Show error message
    }
    console.log("Save", index);
}

// Function to change ui after edit book
function showAfterEdit(index) {
    // Function to show books after edit
    let books = localStorage.getItem("books"); // Get books from localStorage
    if (books == null) {
        bookObj = []; // If localstorage is empty set bookObj as empty array
    } else {
        bookObj = JSON.parse(books); // If books are present in local storage parse them into objects
    }

    // UIString For changing the ui when edit action completed and back to normal ui
    let uiString = "";
    uiString += `<tr class="tableTr" id="table_tr_${index + 1}">
        <th scope="row">${index + 1}</th>
        <td>${bookObj[index].name}</td>
        <td>${bookObj[index].author}</td>
        <td>${bookObj[index].type} </td>
        <td id="butt">
       <button class="btn btn-success" id="editBookButton" onclick="editBooks(${index});focusOnEdit(${index});">Edit</button>
       <button class="btn btn-danger" id="deleteBookButton" onclick="deleteBooks(${index})">Delete</button>
       </td>
    </tr>`;

    // });
    // console.log(bookObj.indexOf(bookObj[index]));
    let editTableTr = document.getElementById(`table_tr_${index + 1}`);
    // let noResultMsg = document.getElementById("noResultMsg");
    if (bookObj.length != 0) {
        editTableTr.innerHTML = uiString; // If books are present in bookObj add uiString to tableTr
        // noResultMsg.innerHTML = ""; // No result message empty when books added to tableBody
        // console.log(bookObj.length);
    }
}

// Function to focus on edit button clicked (Experimental)
function focusOnEdit(index) {
    // Focus On edit name section on clicking edit button
    document.getElementById(`editName_${index + 1}`).focus();
}
