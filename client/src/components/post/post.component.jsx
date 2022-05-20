
//import react
import React, { useEffect, useState } from 'react';

//import styles
import './post.styles.css'

//import reactstrap components
import { Container, Row, Col, Card, Button, InputGroup, FormControl } from 'react-bootstrap';

//import axios for api request
import Axios from 'axios'

//import react router
import { Link } from 'react-router-dom';

//import custom components
import Comment from '../comment/comment.component';
import AddComment from '../addComment/addcomment';



function Post(props){

    //username is fetched with useeffect using userId
    const [username, setUsername] = useState('')

    //comments
    const [comments, setComments] = useState([])

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
            }
            
        })
    }
    
    //state value for comment input
    const [newComment, setNewComment] = useState('')

    //insert new comment
    const insertPostComment = () => {
        if(newComment == "" || !newComment){
            return
        }

        Axios.post('http://localhost:3001/api/insertPostComment', {
            newComment: newComment,
            postId: props.postId,
            userId: props.userIdCookie
        }).then((response) => { //feedback from api
            console.log(response)
            window.location.reload()
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
                    </Card>


                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                        <FormControl
                            placeholder="Add new comment..."
                            aria-describedby="basic-addon1"
                            onChange = {(e) => {setNewComment(e.target.value)}}
                        />
                        <Button onClick={insertPostComment} variant="outline-secondary" id="basic-addon1">
                            Add
                        </Button>
                    </InputGroup>
                        

                        {
                            isLoaded ? comments.map(comment => {
                                return(
                                    <div key={comment.postcommentId}>
                                        <Comment
                                            commentUserId={comment.userId} 
                                            commentContent={comment.commentContent}
                                            commentTime={comment.commentTime}
                                        />
                                        
                                    </div>
                                )
                            }) : "Loading..."

                        }
                        
                </Col>
            </Row>
        </Container> 
    )
}

export default Post;