
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

//import custom components
import Comment from '../comment/comment.component';



function Post(props){

    //username is fetched with useeffect using userId
    const [username, setUsername] = useState('')

    //comments
    const [comments, setComments] = useState([])

    //comment username
    const [commentUsername, setCommentUsername] = useState('')

    //check if comments are loaded
    const [isLoaded, setIsLoaded] = useState(0)
    

    //get username with userId so that username can be shown in post components
    useEffect(() => {
       getUsernameFromId()
       fetchComments()
       setIsLoaded(1)
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
            
            if(response.data.length > 0){
                setComments(response.data)
                Axios("http://localhost:3001/api/getUsernameFromId", {
                    params: {
                        userId: response.data[0].userId
                    }
                }).then((response) => {
                    setCommentUsername(response.data[0].username)
                })
            }
            
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
                            isLoaded ? comments.map(comment => {
                                return(
                                    <Comment
                                        key={comment.commentId}
                                        commentUsername={commentUsername} 
                                        commentContent={comment.commentContent}
                                        commentTime={comment.commentTime}
                                    />
                                )
                            }) : "Loading..."

                        }
                        
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Post;