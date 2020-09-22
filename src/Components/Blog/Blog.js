import React from 'react';
import { Button, Card } from 'react-bootstrap';


const Blog = (props) => {
    const { hotelFirstPic, hotelFirstName, hotelFirstDesc, hotelFirstReview, hotelFirstPrice } = props.hotel;

    return (
        <div style={{margin: '20px 50px', backgroundColor: 'floralWhite'}}>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={hotelFirstPic} />
                <Card.Body>
                    <Card.Title>{hotelFirstName}</Card.Title>
                    <Card.Text>
                        <p>{hotelFirstDesc}</p>
                        <p>{hotelFirstReview}</p>
                    </Card.Text>
                    <Button variant="primary">{hotelFirstPrice}</Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Blog;