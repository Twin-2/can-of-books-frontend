import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel, Card } from 'react-bootstrap';


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

    render() {
        return (
            <div>
                <Carousel id='bookCarousel' activeIndex={this.state.index} onSelect={this.handleSelect}>
                    {this.props.books.map((value, idx) =>
                        <Carousel.Item key={idx}>
                            <Card border='dark' id='bookCard'>
                                <Card.Body>
                                    <Card.Title>{value.name}</Card.Title>
                                    <Card.Text>
                                        By: {value.author}<br />
                                        {value.description}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Carousel.Item>
                    )}
                </Carousel>

            </div>
        )
    }

}


export default BookCarousel;

