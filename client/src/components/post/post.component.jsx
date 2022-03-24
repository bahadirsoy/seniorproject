
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

    //username is fetched with useeffect using userId
    const [username, setUsername] = useState('')

    //comments
    const [comments, setComments] = useState([])
    
    //check if comments are fetched
    const [isLoading, setIsLoading] = useState(1)
    

    //get username with userId so that username can be shown in post components
    useEffect(() => {
       getUsernameFromId()
       fetchComments()
    }, [])

    //get getUsernameFromId
    const getUsernameFromId = (() => {
        Axios.get("http://localhost:3001/api/getUsernameFromId", {
            params: {
                userId: props.userId
            }
        })
        .then((response) => {
            setUsername(response.data[0].username)
        })
    })

    //fetch comments
    const fetchComments = () => {
        Axios.get("http://localhost:3001/api/getPostComments", {
            params: {
                postId: props.postId
            }
        })
        .then((response) => {
            setComments(response.data)
        })
    }
    
    return(
        <Container>
            <Row>
                <Col>
                    <Card className="mt-5">
                        <Card.Body>
                            
                            <Card.Title>
                                {username} 
                            </Card.Title>

                            <Card.Text className='mt-4'>
                                {props.postContent}
                            </Card.Text>
                            
                            <Card.Img 
                                
                            />

                            <div className='mt-4'>
                            <Link to={`/userInformations/${username}`}>
                                <Button>
                                    Profile
                                </Button>
                            </Link>
                            </div>
                        </Card.Body>

                        <Card.Footer className="text-muted">
                            {props.postTime}
                        </Card.Footer>

                        show comments

                        {
                            comments.map(comment => {
                                return(
                                    <Card>
                                        <Card.Title className='mt-1'>
                                            {comment.userId} 
                                        </Card.Title>

                                        <Card.Text className='mt-2'>
                                            {comment.commentContent}
                                        </Card.Text>

                                        <Card.Footer className="text-muted">
                                            {comment.commentTime}
                                        </Card.Footer>
                                    </Card>
                                )
                            })

                        }
                        
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Post;