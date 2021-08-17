import React from 'react'
import HomePage from './views/HomePage';
import SearchPage from './views/SearchPage';
import './App.css'

class BooksApp extends React.Component {
  

  render() {
    const showSearchPage=()=>{
      if(window.location.pathname==='/'){
        return <HomePage/>
      }
    }
    const showHomePage=()=>{
      if(window.location.pathname==='/search'){
        return <SearchPage/>
      }
    }
    return (
      <div className="app">
        {showHomePage()}
        {showSearchPage()}
      </div>
    )
  }
}

export default BooksApp
