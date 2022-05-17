
//import react
import React, { useEffect, useState } from 'react';

//import styles
import './addcomment.styles.css'

//import reactstrap components
import { Container, Row, Col, Card, Button, InputGroup, FormControl } from 'react-bootstrap';

//import axios for api request
import Axios from 'axios'

//import react router
import { Link } from 'react-router-dom';

//import custom components
import Comment from '../comment/comment.component';



function AddComment(props){

    //state value for comment input
    const [newComment, setNewComment] = useState('')

    //insert new comment
    const insertPostComment = () => {
        Axios.post('http://bezkoder-server.herokuapp.com/api/insertPostComment', {
            newComment: newComment,
            postId: props.postId,
            userId: props.userIdCookie
        }).then((response) => { //feedback from api
            console.log(response)
        })
    }
    
    return(
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
    )
}

export default AddComment;