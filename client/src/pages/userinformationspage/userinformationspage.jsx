
//import react
import { React, useEffect, useState, useRef } from 'react';

//import styles
import './userinformations.styles.css'

//import custom components
import CustomInput from '../../components/custominput/custominput.component';

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

    //user id
    const [userId, setUserId] = useState()

    //specific user information using username which is link parameter
    useEffect(() => {
        getUserInformations()
        getUserReviews()
    }, [])

    //get all user profile informations and set state
    const getUserInformations = () => {
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
        Axios.get("http://localhost:3001/api/getUserReviews", {
            params: {
                userId: userInformations.userId
            }
        })
        .then((response) => {
            console.log(response)
        })
    }

    return(
        <div className='mt-5'>
            <Container>
                <Row>
                    
                    <h1 className='mb-5'>User Informations</h1>
                    
                    <Col>
                        
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
            </Container>

            <Container className='mt-5'>
                <Row>
                    <Col xs={10}>
                        <h3>User reviews</h3>


                    </Col>

                    <Col xs={2}>
                        a
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default UserInformations;