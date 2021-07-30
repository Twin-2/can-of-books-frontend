import React from 'react';
import axios from 'axios'
import { withAuth0 } from '@auth0/auth0-react';
import { Form, Button, Modal } from 'react-bootstrap'

class BookFormModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // email: "",
            name: "",
            author: "",
            genre: "",
            description: "",
            status: "",
        }
    }

    updateEmail = (e) => {
        this.setState({ email: e.target.value })
    }
    updateName = (e) => {
        this.setState({ name: e.target.value })
    }
    updateAuthor = (e) => {
        this.setState({ author: e.target.value })
    }
    updateGenre = (e) => {
        this.setState({ genre: e.target.value })
    }
    updateDescription = (e) => {
        this.setState({ description: e.target.value })
    }
    updateStatus = (e) => {
        this.setState({ status: e.target.value })
    }

    submitForm = (e) => {
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

    render() {
        return (
            <div>
                <Modal.Header >
                    <Modal.Title>Add A Book to Your Collection</Modal.Title>
                </Modal.Header>
                <Form>
                    {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={this.updateEmail} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group> */}

                    <Form.Group className="mb-3">
                        <Form.Label>Book Name</Form.Label>
                        <Form.Control placeholder="Required" onChange={this.updateName} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Book Author</Form.Label>
                        <Form.Control placeholder="Optional" onChange={this.updateAuthor} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Book Genre</Form.Label>
                        <Form.Control placeholder="Optional" onChange={this.updateGenre} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Book Description</Form.Label>
                        <Form.Control placeholder="Required" onChange={this.updateDescription} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Book Status</Form.Label>
                        <Form.Control placeholder="Required" onChange={this.updateStatus} />
                    </Form.Group>

                    <Button variant="primary" type='submit' onClick={this.submitForm}>
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}


export default withAuth0(BookFormModal);

// type="submit"