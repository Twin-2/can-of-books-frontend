import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/BestBooks.css';
import axios from 'axios';
import BookCarousel from './BookCarousel.js'
import BookFormModal from './BookFormModal';
import { withAuth0 } from '@auth0/auth0-react';
import { Button, Modal } from 'react-bootstrap';

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showModal: false,
      newBook: true,
      bookIndex: -1,
    }
  }

  componentDidMount() {
    // this.getBooks();
    // https://can-of-books-dw.herokuapp.com/
    // http://localhost:3333
    let baseURL = `http://localhost:3333`
    axios.get(`${baseURL}/books?user=${this.props.auth0.user.email}&name=${this.props.auth0.user.given_name}`)
      .then(users => {
        this.setState({ books: users.data[0].books })
      })
  }
  updateBooks = (data) => {
    this.setState({ books: data })
  }
  resetBooks = (data) => {
    this.setState({ books: data })
  }
  showModal = () => {
    this.setState({ showModal: true })
  }
  closeModal = () => {
    this.setState({ showModal: false })
  }

  toggleNewBook = () => {
    this.setState({ newBook: false })
  }
  updateIndex = (idx) => {
    this.setState({ bookIndex: idx })
  }

  render() {
    return (
      <div id='favoriteBookPage'>
        <h1 >My Favorite Books</h1>
        <button variant='primary' onClick={() => this.setState({ showModal: true, newBook: true, bookIndex: -1 })}>
          Add Book
        </button>
        {<BookCarousel
          books={this.state.books}
          resetBooks={this.resetBooks}
          toggleNewBook={this.toggleNewBook}
          showModal={this.showModal}
          updateIndex={this.updateIndex} />}
        <Modal
          show={this.state.showModal}
          onHide={this.closeModal}>
          <BookFormModal
            newBook={this.state.newBook}
            updateBooks={this.updateBooks}
            closeModal={this.closeModal}
            book={this.state.books[this.state.bookIndex]} /></Modal>
      </div>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
