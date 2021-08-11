const buttonAddBook = document.getElementById('button-add');
const containerBooks = document.getElementById('content-books');
const formBooks = document.getElementById('form-books');
const cardBook = document.getElementsByClassName('card-book');
let inputTitle = '';
let inputAuthor = '';
let newBook; let newData; let allBooks;

class Methods {
  addBook() {
    inputTitle = document.getElementById('input-title').value;
    inputAuthor = document.getElementById('input-author').value;
    newBook = [[inputTitle, inputAuthor]];
    this.saveLocalStorage(newBook);
    this.showBooks();
    formBooks.reset();
  }

  removeBook(index) {
    if (index > -1) {
      newData = this.getLocalStorage();
      newData.splice(index, 1);
      this.updateLocalStorage(newData);
      this.showBooks();
    }
  }

  showBooks() {
    containerBooks.innerHTML = '';
    this.getLocalStorage().forEach((book, index) => {
      containerBooks.innerHTML
            += `<div class='card-book' id='book-${index}'><div class='book-info'><strong class='book-title'>${book[0]}</strong>`
            + `<p class='book-author'>${book[1]}</p></div>`
            + `<button class='button-remove' type='button' id='button-remove-${index}' onclick='methods.removeBook(${index})'>Remove</button></div>`;
            if(index%2===0){
              document.getElementById(`book-${index}`).style.backgroundColor="blue";
              // console.log(cardBook);
            }else{
              document.getElementById(`book-${index}`).style.backgroundColor="red";
            }
    });
  }

  saveLocalStorage(data) {
    allBooks = this.getLocalStorage();
    if (allBooks.length !== 0) {
      localStorage.setItem('all_books', JSON.stringify(allBooks.concat(data)));
    } else {
      localStorage.setItem('all_books', JSON.stringify(data));
    }
  }

  getLocalStorage = () => {
    if (localStorage.getItem('all_books')) {
      return JSON.parse(localStorage.getItem('all_books'));
    }

    return [];
  }

  updateLocalStorage = (data) => {
    localStorage.clear();
    localStorage.setItem('all_books', JSON.stringify(data));
  }
}

const methods = new Methods();
buttonAddBook.onclick = function add() { methods.addBook(); };
methods.showBooks();
