
//import react
import React, { useEffect, useState } from 'react';

//import styles
import './comment.styles.css'

//import reactstrap components
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

//import axios for api request
import Axios from 'axios'

//import react router
import { Link } from 'react-router-dom';



function Comment(props){

    useEffect(() => {
        getCommentUsername()
     }, [])

    //comment username
    const [commentUsername, setCommentUsername] = useState('')

    const getCommentUsername = () => {
        Axios("http://localhost:3001/api/getUsernameFromId", {
            params: {
                userId: props.commentUserId
            }
        }).then((response) => {
            setCommentUsername(response.data[0].username)
        })
    }

    return(
        <Card className="mt-2 ml-5">
            <Card.Title className='mt-1'>
                {commentUsername} 
            </Card.Title>

            <Card.Text className='mt-2'>
                {props.commentContent}
            </Card.Text>

            <Card.Footer className="text-muted">
                {props.commentTime}
            </Card.Footer>
        </Card>
    )
}

export default Comment;