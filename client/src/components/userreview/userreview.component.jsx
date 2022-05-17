
//import react
import { React, useEffect, useState, useRef } from 'react';

//import styles
import './userreview.styles.css'

//import custom components
import CustomInput from '../../components/custominput/custominput.component';

//import react strap components
import { Container, Row, Col, Button, InputGroup, FormControl, Card } from 'react-bootstrap';

//import axios
import Axios from 'axios'

//import react router
import { Link } from 'react-router-dom';


function UserReview(props){

    //get reviewer username from reviewer id
    const [reviewerUsername, setReviewerUsername] = useState('')

    //specific user information using username which is link parameter
    useEffect(() => {
        Axios.get("http://bezkoder-server.herokuapp.com/api/getUsernameFromId", {
            params: {
                userId: props.reviewerId
            }
        })
        .then((response) => {
            setReviewerUsername(response.data[0].username)
        })
    })
    
    return(
        <Card className="text-center mt-4">
            <Card.Body>
                <Card.Title>
                    {reviewerUsername}
                </Card.Title>

                <Card.Text>
                    {props.reviewContent}
                </Card.Text>

            </Card.Body>

            <Card.Footer className="text-muted">
                {props.reviewTime}
            </Card.Footer>
        </Card>
    )
}

export default UserReview;