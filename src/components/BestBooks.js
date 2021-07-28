import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/BestBooks.css';
import axios from 'axios';
import BookCarousel from './BookCarousel.js'

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  componentDidMount() {
    // this.getBooks();
    // https://can-of-books-dw.herokuapp.com/
    // http://localhost:3333
    let baseURL = `https://can-of-books-dw.herokuapp.com`
    axios.get(`${baseURL}/books`)
      .then(books => {
        this.setState({ books: books.data[0].books })
      })
  }

  // getBooks =() => {
  //   let baseURL = `http://localhost:3333`
  //   axios.get(`${baseURL}/books`)
  //     .then(books => {
  //       this.setState({ books: books.data})
  //     })
  // }

  render() {
    return (
      <div id='favoriteBookPage'>
        <h1 >My Favorite Books</h1>

        {this.state.books.length > 0 && <BookCarousel books={this.state.books} />}

      </div>
    )
  }
}

export default MyFavoriteBooks;
