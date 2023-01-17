import nav from './modules/nav-menu.js';
import Book from './modules/Book-storage.js';
import { DateTime } from './modules/luxon.js';
import store from './modules/store.js';

nav();

class UI {
  static displayBooks() {
    const books = store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('#data');

    const div = document.createElement('div');
    div.className = 'data-container';

    div.innerHTML = `
          <p>"${book.title}"</p>
          <p>by</p>
          <p>${book.authore}</p>
          <div><button id="remove-btn" class='delete'>Remove</button></div>
       `;

    list.appendChild(div);
  }

  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static clearField() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }
}

// store data in local storage

//  Event for display books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Add event listener to the add button
document.querySelector('#form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const authore = document.querySelector('#author').value;

  // Instatiate book
  const book = new Book(title, authore);

  // Add book data to screen
  UI.addBookToList(book);

  // Add book to store
  store.addBook(book);

  // clear fields
  UI.clearField();
});

// Event to remove books
const data = document.querySelector('#data');
data.addEventListener('click', (e) => {
  // Remove book from UI
  UI.deleteBook(e.target);
  // Remove book from local storage
  store.removeBook(e.target.parentElement.previousElementSibling.textContent);
});

// Luxon Date and time
const currentDate = DateTime.now().toLocaleString(DateTime.DATETIME_MED);
document.getElementById('timeText').innerHTML = currentDate;
