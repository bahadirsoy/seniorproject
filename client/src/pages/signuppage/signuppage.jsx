
//import react components
import React, { useState, useEffect } from 'react';

//import styles
import './signuppage.styles.css'

//import custom components
import CustomInput from '../../components/custominput/custominput.component';

//import react strap components
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';

//import axios
import Axios from 'axios'

//import navigate
import { useNavigate } from 'react-router-dom';

//import session
import Session from 'react-session-api'



function SignUpPage(props){

    //user inputs
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    //signUp status
    const [signUpStatus, setSignUpStatus] = useState('')

    //navigate
    const navigate = useNavigate()

    //insert user api request
    const insertUser = () => {
        Axios.post('http://localhost:3001/api/insertUser', {
            username: username, 
            password: password
        }).then((response) => { //feedback from api
            if(response.data.error){
                if(response.data.error.sqlState == "23000"){ // if username is already taken
                    //show user an error
                    setSignUpStatus(23000)
                }
            } else{
                //set cookies
                props.setUsernameCookie("username", username)

                //navigate user
                navigate("/")
            }
        })
    }

    return(
        <div className='mt-5'>


            <Container>
                <Row>
                    
                    <h1 className='mb-5'>Sign Up Page</h1>

                    <Col>
                    
                    </Col>

                    <Col xs={10}>

                        {
                            signUpStatus == 23000 ?

                            <Alert variant="danger">
                            <Alert.Heading>This username is already taken</Alert.Heading>
                                <p>
                                    Please sign up with another username
                                </p>
                            </Alert> :

                            null
                        }

                        <CustomInput
                            //labelName = "Username"
                            name = "username"
                            inputName = "Username"
                            placeholder = "Enter username"
                            formId = "form-username"
                            inputNameId = "input-username"
                            onchange = {(e) => {setUsername(e.target.value)}}
                        />
                        
                        <CustomInput
                            type = "password"
                            name = "password"
                            //labelName = "Username"
                            inputName = "Password"
                            placeholder = "Enter password"
                            formId = "form-password"
                            inputNameId = "input-password"
                            onchange = {(e) => {setPassword(e.target.value)}}
                        />

                        <Button onClick={insertUser} variant="primary">Sign up</Button>
                    </Col>

                    <Col>
                        
                    </Col>
                </Row>
            </Container>

            
        </div>
    )
}

export default SignUpPage;