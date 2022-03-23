
//import react
import React, { useEffect, useState } from 'react';

//import styles
import './post.styles.css'

//import reactstrap components
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

//import axios for api request
import Axios from 'axios'

//import react router
import { Link } from 'react-router-dom';



function Post(props){

    const [username, setUsername] = useState('')

    //get username with userId so that username can be shown in post components
    useEffect(() => {
        Axios.get("http://localhost:3001/api/getUsernameFromId", {
            params: {
                userId: props.userId
            }
        })
        .then((response) => {
            setUsername(response.data[0].username)
        })
    }, [])
    
    return(
        <Container>
            <Row>
                <Col>
                    <Card className="mt-5">
                    <Card.Body>
                        <Card.Title> {username} </Card.Title>
                        <Card.Text className='mt-4'>
                            {props.postContent}
                        </Card.Text>
                        
                        <Card.Img 
                            
                        />
                        <div className='mt-4'>
                        <Link to="/userInformations">
                            <Button>
                                Profile
                            </Button>
                        </Link>
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