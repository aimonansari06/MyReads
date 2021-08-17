import React, { Component } from 'react'
import Shelf from '../components/Shelf'
import Search from '../components/Search';
import { getAll } from "../BooksAPI";


export default class HomePage extends Component {
    constructor() {
        super();
        this.state = {
            books: [],
            currentlyReading: [],
            wantToRead: [],
            read: [],
            addBooks:books=>{
                const currentlyReading=books.filter(book=>book.shelf==='currentlyReading');
                const wantToRead=books.filter(book=>book.shelf==='wantToRead');
                const read=books.filter(book=>book.shelf==='read');      
                this.setState({books, currentlyReading, read, wantToRead})
            },
            moveBook:(book,newshelf,allshelf)=>{
                //console.log(newshelf);
                const newBooks=this.state.books.map(allBooks=>{
                    const foundId=allshelf[newshelf].find(
                        bookID=>bookID===allBooks.id
                    );
                    if(foundId){
                        allBooks.shelf=newshelf;
                    }
                    return allBooks;
                })
                this.state.addBooks(newBooks);
            }
        }
    }
    
    async componentDidMount() {
        try {
            const books = await getAll();
           this.state.addBooks(books)
            console.log(books);
        }
        catch (err) {
            console.log(err)
        }
    }
    

    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <Shelf title="Currently Reading" books={this.state.currentlyReading} moveBook={this.state.moveBook} />
                    <Shelf title="Want To Read" books={this.state.wantToRead} moveBook={this.state.moveBook}/>
                    <Shelf title="Read" books={this.state.read} moveBook={this.state.moveBook}/>
                </div>
                <Search />
            </div>
        )
    }
}
