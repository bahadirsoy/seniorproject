
//import react components
import React, { useState, useEffect } from 'react';

//import styles
import './signuppage.styles.css'

//import custom components
import CustomInput from '../../components/custominput/custominput.component';

//import react strap components
import { Container, Row, Col, Button } from 'react-bootstrap';

//import axios
import Axios from 'axios'


function SignUpPage(){

    //user inputs
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    //insert user api request
    const insertUser = () => {
        Axios.post('http://localhost:3001/api/insertUser', {
            username: username, 
            password: password
        }).then((response) => { //feedback from api
            
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

                        <button onClick={insertUser}>submit</button>
                    </Col>

                    <Col>
                        
                    </Col>
                </Row>
            </Container>

            
        </div>
    )
}

export default SignUpPage;