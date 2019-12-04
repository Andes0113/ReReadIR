class Catalog{
    constructor(books){
        this.books = books;
    }
    addBook(book){
        this._books.push(book);
    }
    get books(){
        return this._books;
    }
    set books(books){
        this._books = books;
    }
}