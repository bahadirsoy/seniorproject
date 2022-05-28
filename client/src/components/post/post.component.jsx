
//import react
import React, { useEffect, useState } from 'react';

//import styles
import './post.styles.css'

//import reactstrap components
import { Container, Row, Col, Card, Button, InputGroup, FormControl, Accordion, Carousel } from 'react-bootstrap';

//import axios for api request
import Axios from 'axios'

//import react router
import { Link } from 'react-router-dom';

//import custom components
import Comment from '../comment/comment.component';
import AddComment from '../addComment/addcomment';

//import random id generator
import uuid from 'react-uuid'

//import fontawesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments } from '@fortawesome/free-solid-svg-icons'


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
            comments.push({
                postcommentId: response.data.insertId,
                postId: props.postId,
                userId: props.userIdCookie,
                commentContent: newComment,
                commentTime: "Just Now"
            })
            setNewComment("")
        })
    }

    //convert timestamp to understandable date format
    const convertTime = (date) => {
        const splittedDate = date.split("-")
        let dateString = "" + splittedDate[0] + " of "
        
        switch(splittedDate[1]){
            case "01":
                dateString += "January"
                break;
            case "02":
                dateString += "February"
                break;
            case "03":
                dateString += "March"
                break;
            case "04":
                dateString += "April"
                break;
            case "05":
                dateString += "May"
                break;
            case "06":
                dateString += "June"
                break;
            case "07":
                dateString += "July"
                break;
            case "08":
                dateString += "August"
                break;
            case "09":
                dateString += "September"
                break;
            case "10":
                dateString += "October"
                break;
            case "11":
                dateString += "November"
                break;
            case "12":
                dateString += "December"
                break;
            default:
                break;

        }
        return dateString
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
                            
                            <Carousel variant='info'>
                            {
                                props.postImages ?
                                props.postImages.split(" ").map((image) => {
                                    return(
                                        <Carousel.Item key={uuid()}>
                                            <img
                                            className="d-block w-100 image"
                                            src={`https://soyisibucket.s3.eu-central-1.amazonaws.com/images/${image}`}
                                            alt="img not found"
                                            />
                                        </Carousel.Item>
                                    )
                                }) :
                                null
                            }
                            </Carousel>

                            <div className='mt-4'>
                            <Link to={`/userInformations/${username}`}>
                                <Button>
                                    Profile
                                </Button>
                            </Link>
                            </div>
                        </Card.Body>

                        <Card.Footer className="text-muted">
                            {convertTime(props.postTime)}
                        </Card.Footer>
                    </Card>


                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">
                            <FontAwesomeIcon className='mx-4' icon={faComments} />
                        </InputGroup.Text>
                        <FormControl
                            placeholder="Add new comment..."
                            aria-describedby="basic-addon1"
                            onChange = {(e) => {setNewComment(e.target.value)}}
                        />
                        <Button onClick={insertPostComment} variant="outline-secondary" id="basic-addon1">
                            Add
                        </Button>
                    </InputGroup>
                        
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>See comments</Accordion.Header>
                            <Accordion.Body>
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
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                        
                </Col>
            </Row>
        </Container> 
    )
}

export default Post;