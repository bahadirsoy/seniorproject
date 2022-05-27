
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
        <Card className="mt-2 ml-5">
            <Card.Title className='mt-1'>
                {commentUsername} 
            </Card.Title>

            <Card.Text className='mt-2'>
                {props.commentContent}
            </Card.Text>

            <Card.Footer className="text-muted">
                {convertTime(props.commentTime)}
            </Card.Footer>
        </Card>
    )
}

export default Comment;