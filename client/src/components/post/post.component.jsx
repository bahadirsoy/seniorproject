
//import react
import React, { useEffect, useState } from 'react';

//import styles
import './post.styles.css'

//import reactstrap components
import { Container, Row, Col, Card, Button } from 'react-bootstrap';



function Post(props){

    
    return(
        <Container>
            <Row>
                <Col>
                    <Card className="mt-5">
                    <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        <Card.Text className='mt-4'>
                            Post content Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem, quia.
                        </Card.Text>
                        <Card.Img style={{ width: '18rem' }} src='data:image/jpeg;base64,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' />
                        <div className='mt-4'>
                        <Button variant="primary">Send message to username</Button>
                        </div>
                    </Card.Body>
                    <Card.Footer className="text-muted">2 days ago</Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Post;