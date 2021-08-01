import React from 'react';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel, Card, Button } from 'react-bootstrap';


class BookCarousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
        }
    }
    handleSelect = (selectedIndex, e) => {
        this.setState({ index: selectedIndex });
    };


    handleDeleteBook = (id) => {
        axios.delete(`http://localhost:3333/books?id=${id}&email=${this.props.auth0.user.email}`)
            .then(results => this.props.resetBooks(results.data))
            .catch(err => console.log(err))
    }

    updateBookButton = (idx) => {
        this.props.showModal();
        this.props.toggleNewBook();
        this.props.updateIndex(idx);
    }

    render() {
        return (
            <div>
                <Carousel id='bookCarousel' activeIndex={this.state.index} onSelect={this.handleSelect}>
                    {this.props.books.map((value, idx) =>
                        <Carousel.Item key={idx}>
                            <Card border='dark' id='bookCard'>
                                <Card.Body>
                                    <form>
                                        <Card.Title>{value.name}</Card.Title>
                                        <Card.Text>
                                            <div>
                                                <p>By: {value.author}</p>
                                                <p>Genre: {value.genre}</p>
                                                <p>{value.description} </p>
                                                <p>Status: {value.status}</p>
                                            </div>
                                        </Card.Text>
                                    </form>
                                </Card.Body>
                                <div>
                                    <Button variant='danger' id="deleteButton" onClick={() => this.handleDeleteBook(value._id)}>Delete Book</Button>
                                    <Button id='updateBook' onClick={() => this.updateBookButton(idx)}> Update Book</Button>
                                </div>
                            </Card>
                        </Carousel.Item>
                    )}
                </Carousel>

            </div>
        )
    }

}


export default withAuth0(BookCarousel);

