
//import react components
import React, { useState, useEffect } from 'react';

//import styles
import './signinpage.styles.css'

//import custom components
import CustomInput from '../../components/custominput/custominput.component';

//import react strap components
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';

//import axios
import Axios from 'axios'

//import navigate
import { useNavigate } from 'react-router-dom';

//import session and cookies
import { useCookies } from 'react-cookie';


function SignInPage(props){

    //user inputs
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    //login status
    const [loginStatus, setLoginStatus] = useState()

    //navigate
    const navigate = useNavigate()

    //insert user api request
    const login = () => {
        Axios.post('http://localhost:3001/api/login', {
            username: username, 
            password: password
        }).then((response) => { //feedback from api
            //if succesful login
            if(response.data.isLoginSuccessful){
                //set cookies
                props.setUsernameCookie("username", response.data.result[0].username)
                props.setUsernameCookie("userId", response.data.result[0].userId)

                //navigate user
                navigate("/")
            } else if(!response.data.isLoginSuccessful){ //if unsuccesful login
                setLoginStatus(0)
            }
        })
    }

    return(
        <div className='mt-5'>


            <Container>
                <Row>
                    
                    <h1 className='mb-5'>Sign In Page</h1>

                    <Col>
                        
                    </Col>

                    <Col xs={10}>

                        {
                            loginStatus == 0 ?

                            <Alert variant="danger">
                            <Alert.Heading>Wrong username or password</Alert.Heading>
                                <p>
                                    Please try again
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

                        <Button onClick={login} variant="primary">Sign in</Button>
                    </Col>

                    <Col>
                        
                    </Col>
                </Row>
            </Container>

            
        </div>
    )
}

export default SignInPage;