
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

    return(
        <Card className="mt-4 ml-5">
            <Card.Title className='mt-1'>
                {props.commentUsername} 
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