const buttonAddBook = document.getElementById("button-add")
const containerBooks = document.getElementById("content-books")
const formBooks = document.getElementById("form-books")
let inputTitle = "";
let inputAuthor = "";
const books = {
    show_books: function() {
        containerBooks.innerHTML = ""
        this.get_localstorage().forEach( function(book, index) {
            console.log(book, index)
            containerBooks.innerHTML +=
            "<div class='card-book' id='book-"+index+"'><strong class='book-title'>"+book[0]+"</strong>"+
            "<p class='book-author'>"+book[1]+"</p>"+
            "<button type='button' id='button-remove-"+index+"' onclick='books.remove_book_by_index("+index+")'>Remove</button></div><hr>";
        })
    },
    add_new_book: function() {
        inputTitle = document.getElementById("input-title").value
        inputAuthor = document.getElementById("input-author").value
        newBook = [[inputTitle, inputAuthor]]
        //newRegister = this.get_localstorage()
        this.save_localstorage(newBook)
        this.show_books()
        formBooks.reset()
    },
    remove_book_by_index: function(index) {
        if (index > -1) {
            new_data = this.get_localstorage()
            new_data.splice(index, 1)
            this.update_localstorage(new_data)
            this.show_books()
        }
    },
    save_localstorage: function(data) {
        all_books = this.get_localstorage()
        if (all_books.length !== 0){
            localStorage.setItem( "all_books", JSON.stringify(all_books.concat(data)) )
        }
        else {
            localStorage.setItem( "all_books", JSON.stringify(data) )
        }
    },
    get_localstorage: function() {
        if (localStorage.getItem("all_books")) {
            return JSON.parse ( localStorage.getItem("all_books") )
        }
        else {
            return []
        }
    },
    update_localstorage: function(data) {
        localStorage.clear();
        localStorage.setItem( "all_books", JSON.stringify(data) )
    }
}
buttonAddBook.onclick = function() {books.add_new_book()};
books.show_books()