import React from 'react';
import axios from 'axios'
import { withAuth0 } from '@auth0/auth0-react';
import { Form, Button, Modal } from 'react-bootstrap'


//change this component to have true/false statements for every state based on if it's a new book or not.
//new books should start with an empty state that can then be updated.
//not new books should have state set by the books state from the parent
class BookFormModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.newBook ? '' : this.props.book.name,
            author: this.props.newBook ? '' : this.props.book.author,
            genre: this.props.newBook ? '' : this.props.book.genre,
            description: this.props.newBook ? '' : this.props.book.description,
            status: this.props.newBook ? '' : this.props.book.status,
        }
    }


    // change to a creatBook function
    addBook = (e) => {
        e.preventDefault();
        const config = {
            method: 'post',
            // headers: { 'Authorization': `Bearer ${jwt}` },
            baseURL: 'http://localhost:3333',
            url: '/books'
        }
        let bookData = {
            "email": this.props.auth0.user.email,
            "data": {
                "name": this.state.name,
                "author": this.state.author,
                "genre": this.state.genre,
                "description": this.state.description,
                "status": this.state.status
            }
        }
        axios.post(`http://localhost:3333/books`, bookData)
            .then(books => {
                console.log('books')
                this.props.updateBooks(books.data)
            })
            .catch(err => console.error(err))
        this.props.closeModal()

    }
    updateBook = (e) => {
        e.preventDefault();
        const config = {
            method: 'put',
            // headers: { 'Authorization': `Bearer ${jwt}` },
            baseURL: 'http://localhost:3333',
            url: '/books'
        }
        let bookData = {
            "id": this.props.book._id,
            "email": this.props.auth0.user.email,
            "data": {
                "name": this.state.name,
                "author": this.state.author,
                "genre": this.state.genre,
                "description": this.state.description,
                "status": this.state.status
            }
        }
        axios.put(`http://localhost:3333/books`, bookData)
            .then(book => {
                console.log('books')
                this.props.updateBooks(book.data)
            })
            .catch(err => console.error(err))
        this.props.closeModal()

    }

    render() {
        return (
            <div>
                <Modal.Header >
                    <Modal.Title>{this.props.newBook ? 'Add A Book to Your Collection' : 'Update Book'}</Modal.Title>
                </Modal.Header>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Book Name</Form.Label>
                        <Form.Control placeholder={this.props.newBook ? "Required" : this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Book Author</Form.Label>
                        <Form.Control placeholder={this.props.newBook ? "Optional" : this.state.author} onChange={(e) => this.setState({ author: e.target.value })} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Book Genre</Form.Label>
                        <Form.Control placeholder={this.props.newBook ? "optional" : this.state.genre} onChange={(e) => this.setState({ genre: e.target.value })} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Book Description</Form.Label>
                        <Form.Control placeholder={this.props.newBook ? "Required" : this.state.description} onChange={(e) => this.setState({ description: e.target.value })} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Book Status</Form.Label>
                        <Form.Control placeholder={this.props.newBook ? "Required" : this.state.status} onChange={(e) => this.setState({ status: e.target.value })} />
                    </Form.Group>
                    {/*  change to a conditional to create a new book or update this book */}
                    <Button variant="primary" type='submit' onClick={this.props.newBook ? this.addBook : this.updateBook}>
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}


export default withAuth0(BookFormModal);

