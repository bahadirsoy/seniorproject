
//import react
import { React, useEffect, useState, useRef } from 'react';

//import styles
import './userinformations.styles.css'

//import custom components
import CustomInput from '../../components/custominput/custominput.component';
import UserReview from '../../components/userreview/userreview.component';

//import react strap components
import { Container, Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';

//import axios
import Axios from 'axios'

//import react router
import { useParams } from 'react-router-dom';


function UserInformations(props){
    
    //username parameter for userinformations page. It will be used for fetchined specific user information
    const { username } = useParams();

    //user informations
    const [userInformations, setUserInformations] = useState()

    //user reviews
    const [userReviews, setUserReviews] = useState()

    //new review
    const [newReview, setNewReview] = useState()

    //specific user information using username which is link parameter
    useEffect(() => {
        getUserInformations()
        getUserReviews()
    }, [userInformations, username])

    //get all user profile informations and set state
    const getUserInformations = () => {
        if(userInformations) return
        Axios.get("http://localhost:3001/api/getUserInformations", {
            params: {
                username: username
            }
        })
        .then((response) => {
            setUserInformations({
                userId: response.data[0].userId,
                username: response.data[0].username,
                name: response.data[0].name,
                surname: response.data[0].surname,
                email: response.data[0].email,
                phone: response.data[0].phone,
            })
        })
    }

    //get all user reviews
    const getUserReviews = () => {
        if(!userInformations) return

        Axios.get("http://localhost:3001/api/getUserReviews", {
            params: {
                reviewedId: userInformations.userId
            }
        })
        .then((response) => {
            setUserReviews(response.data)
        })
    }

    //add new review with axios
    const addNewReview = () => {
        Axios.post('http://localhost:3001/api/insertReview', {
            reviewedId: userInformations.userId,
            reviewerId: props.userIdCookie,
            reviewContent: newReview
        }).then((response) => { //feedback from api
            console.log(response)
        })
    }

    return(
        <div className='mt-5'>
            <Container>
                <Row>
                    
                    <h1 className='mb-5'>User Informations</h1>
                    
                    <Col>
                        {props.userIdCookie}
                        {userInformations ? userInformations.userId : null}
                    </Col>

                    <Col xs={10}>
                        <CustomInput
                            inputName = "Username: "
                            placeholder = {userInformations ? userInformations.username : null}
                            readonly = {1}
                        />

                        <CustomInput
                            inputName = "Name: "
                            placeholder = {userInformations ? userInformations.name : null}
                            readonly = {1}
                        />

                        <CustomInput
                            inputName = "Surname: "
                            placeholder = {userInformations ? userInformations.surname : null}
                            readonly = {1}
                        />
                        
                        <CustomInput
                            inputName = "E-mail: "
                            placeholder = {userInformations ? userInformations.email : null}
                            readonly = {1}
                        />

                        <CustomInput
                            inputName = "Phone: "
                            placeholder = {userInformations ? userInformations.phone : null}
                            readonly = {1}
                        />
                    </Col>

                    <Col>
                        
                    </Col>
                </Row>
            </Container>{userInformations ? userInformations.userId : null} {props.userIdCookie} {newReview}

            <Container className='mt-5'>
                <Row>
                    <Col xs={10}>
                        <h3>User reviews</h3>

                        <InputGroup className="my-5">
                            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                            <FormControl
                                placeholder="Add new review..."
                                aria-describedby="basic-addon1"
                                onChange={(e) => setNewReview(e.target.value)}
                            />
                            <Button onClick={addNewReview} variant="outline-secondary" id="basic-addon1">
                                Add
                            </Button>
                        </InputGroup>

                        {userReviews ? userReviews.map((review) => {
                            return(
                                <UserReview
                                    key = {review.userreviewId}
                                    reviewerId = {review.reviewerId}
                                    reviewContent = {review.reviewContent}
                                    reviewTime = {review.reviewTime}
                                />
                            )
                        }) : null}

                    </Col>

                    <Col xs={2}>
                        
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default UserInformations;