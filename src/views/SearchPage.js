import React, { Component } from 'react'
import { search } from '../BooksAPI';
import Book from '../components/Book';

export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      books: []

    }
  }
  handleChange = async e => {
    try {
      const query = e.target.value;
      this.setState({ query })
      if (query.trim()) {

        const results = await search(query)
        if (results.err) {
          this.setState({ books: [] })
        }
        else {
          this.setState({ books: results })
        }

      }
      else{
        this.setState({books:[]})
      }
    }
    catch (err) {
      console.log(err)
    }
  }
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" href="/">Close Search</a>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={this.handleChange} value={this.state.query? this.state.query:""} />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.length >0  && this.state.books.map(book=><Book key={book.id} {...book} moveBook={this.props.moveBook}/>)}
          </ol>
        </div>
      </div>
    )
  }
}
