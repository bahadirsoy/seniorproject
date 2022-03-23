
//import react
import React, { useEffect, useState } from 'react';

//import styles
import './post.styles.css'

//import reactstrap components
import { Container, Row, Col, Card, Button } from 'react-bootstrap';



function Post(props){

    //get username with userId so that username can be shown in post components
    
    return(
        <Container>
            <Row>
                <Col>
                    <Card className="mt-5">
                    <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        <Card.Text className='mt-4'>
                            {props.postContent}
                        </Card.Text>
                        
                        <Card.Img 
                            
                        />
                        <div className='mt-4'>
                        <Button variant="primary">Send message to username</Button>
                        </div>
                    </Card.Body>
                    <Card.Footer className="text-muted">{props.postTime}</Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Post;