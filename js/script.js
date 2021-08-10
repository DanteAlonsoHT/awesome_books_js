const buttonAddBook = document.getElementById('button-add');
const containerBooks = document.getElementById('content-books');
const formBooks = document.getElementById('form-books');
let inputTitle = '';
let inputAuthor = '';
let newBook; let newData; let allBooks;
const books = {
  show_books() {
    containerBooks.innerHTML = '';
    this.get_localstorage().forEach((book, index) => {
      containerBooks.innerHTML
            += `<div class='card-book' id='book-${index}'><strong class='book-title'>${book[0]}</strong>`
            + `<p class='book-author'>${book[1]}</p>`
            + `<button type='button' id='button-remove-${index}' onclick='books.remove_book_by_index(${index})'>Remove</button></div><hr>`;
    });
  },
  add_new_book() {
    inputTitle = document.getElementById('input-title').value;
    inputAuthor = document.getElementById('input-author').value;
    newBook = [[inputTitle, inputAuthor]];
    this.save_localstorage(newBook);
    this.show_books();
    formBooks.reset();
  },
  remove_book_by_index(index) {
    if (index > -1) {
      newData = this.get_localstorage();
      newData.splice(index, 1);
      this.update_localstorage(newData);
      this.show_books();
    }
  },
  save_localstorage(data) {
    allBooks = this.get_localstorage();
    if (allBooks.length !== 0) {
      localStorage.setItem('all_books', JSON.stringify(allBooks.concat(data)));
    } else {
      localStorage.setItem('all_books', JSON.stringify(data));
    }
  },
  get_localstorage() {
    if (localStorage.getItem('all_books')) {
      return JSON.parse(localStorage.getItem('all_books'));
    }

    return [];
  },
  update_localstorage(data) {
    localStorage.clear();
    localStorage.setItem('all_books', JSON.stringify(data));
  },
};
buttonAddBook.onclick = function add() { books.add_new_book(); };
books.show_books();