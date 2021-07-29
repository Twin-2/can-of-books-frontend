import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/BestBooks.css';
import axios from 'axios';
import BookCarousel from './BookCarousel.js'
import BookFormModal from './BookFormModal';
import { Button, Modal } from 'react-bootstrap';

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showModal: false,
    }
  }

  componentDidMount() {
    // this.getBooks();
    // https://can-of-books-dw.herokuapp.com/
    // http://localhost:3333
    let baseURL = `http://localhost:3333`
    axios.get(`${baseURL}/books`)
      .then(books => {
        this.setState({ books: books.data[0].books })
      })
  }
  updateBooks = (data) => {
    this.setState({ books: data })
  }
  showModal = () => {
    this.setState({ showModal: true })
  }
  closeModal = () => {
    this.setState({ showModal: false })
  }


  render() {
    return (
      <div id='favoriteBookPage'>
        <h1 >My Favorite Books</h1>
        <button variant='primary' onClick={this.showModal}>Add Book</button>
        {this.state.books.length > 0 && <BookCarousel books={this.state.books} />}
        <Modal show={this.state.showModal} onHide={this.closeModal}><BookFormModal updateBooks={this.updateBooks} closeModal={this.closeModal} /></Modal>
      </div>
    )
  }
}

export default MyFavoriteBooks;
