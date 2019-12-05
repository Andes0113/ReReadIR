class Book{
    constructor(name, author, date, agerange){
        this.name = name;
        this.author = author;
        this.date = date;
        this.agerange = agerange;
    }

    get name(){
        return this._name;
    }
    set name(name){
        this._name = name;
    }
    get date(){
        return this._date;
    }
    set date(date){
        this._date = date;
    }
    get author(){
        return this._author;
    }
    set author(author){
        this._author = author;
    }
    get agerange(){
        return this._agerange;
    }
    set agerange(agerange){
        this._agerange = agerange;
    }
}
