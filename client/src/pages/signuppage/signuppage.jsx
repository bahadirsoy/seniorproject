
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
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')

    //signUp status
    const [signUpStatus, setSignUpStatus] = useState('')

    //navigate
    const navigate = useNavigate()

    //insert user api request
    const insertUser = () => {
        //trim all inputs
        const trimmedUsername = username.trim()
        const trimmedName = name.trim()
        const trimmedSurname = surname.trim()
        const trimmedEmail = email.trim()

        //check if passed variable contains any special char
        const checkSpecialCharacter = (variable) => {
            var pattern = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/); //unacceptable chars
            if (pattern.test(variable)) {
                return false;
            }
            return true; //good user input
        }

        //check if email is in correct format
        const validateEmail = (mail) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
            return true
        }
            return false
        }

        //check if all inputs are filled
        if(trimmedUsername == "" || !trimmedUsername || trimmedName == "" || !trimmedName || trimmedSurname == "" || !trimmedSurname || trimmedEmail == "" || !trimmedEmail){
            setSignUpStatus("emptyField")
            return
        } else if(!checkSpecialCharacter(trimmedUsername) || !checkSpecialCharacter(trimmedName) || !checkSpecialCharacter(trimmedSurname) || !checkSpecialCharacter(trimmedEmail)){ //check if there is special chars in inputs
            setSignUpStatus("specialChar")
            return
        } else if(!validateEmail(trimmedEmail)){ //check if email is in correct format
            setSignUpStatus("wrongEmailFormat")
            return
        } else{
            
        }
        Axios.post('http://localhost:3001/api/insertUser', {
            username: trimmedUsername, 
            password: password,
            name: trimmedName,
            surname: trimmedSurname,
            email: trimmedEmail
        }).then((response) => { //feedback from api
            if(response.data.error){
                if(response.data.error.sqlState == "23000"){ // if username is already taken
                    //show user an error
                    setSignUpStatus(23000)
                }
            } else{
                //get id of user
                Axios.get("http://localhost:3001/api/getId", {
                    params: {
                        username: username
                    }
                })
                .then((response) => {
                    //set userId cookie after signed up
                    props.setUserIdCookie("userId", response.data[0].userId)
                })

                //set cookies
                props.setUsernameCookie("username", username)

                //navigate user
                navigate("/")
            }
        })
    }

    return(
        props.usernameCookie ? window.location.href = "/" :

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
                            
                            signUpStatus == "emptyField" ?

                            <Alert variant="danger">
                            <Alert.Heading>Empty fields!</Alert.Heading>
                                <p>
                                    Please fill all inputs
                                </p>
                            </Alert> : 
                            
                            signUpStatus == "specialChar" ?

                            <Alert variant="danger">
                            <Alert.Heading>Special Characters</Alert.Heading>
                                <p>
                                    Your username, password, name, surname and email cannot contain any special char
                                </p>
                            </Alert> :

                            signUpStatus == "wrongEmailFormat" ?

                            <Alert variant="danger">
                            <Alert.Heading>Wrong E-mail format!</Alert.Heading>
                                <p>
                                    Please make seure that you have entered valid email
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

                        <CustomInput
                            type = "text"
                            name = "name"
                            //labelName = "Username"
                            inputName = "Name"
                            placeholder = "Enter your name"
                            formId = "form-name"
                            inputNameId = "input-name"
                            onchange = {(e) => {setName(e.target.value)}}
                        />
                        
                        <CustomInput
                            type = "text"
                            name = "surname"
                            //labelName = "Username"
                            inputName = "Surname"
                            placeholder = "Enter your surname"
                            formId = "form-surname"
                            inputNameId = "input-surname"
                            onchange = {(e) => {setSurname(e.target.value)}}
                        />

                        <CustomInput
                            type = "email"
                            name = "email"
                            //labelName = "Username"
                            inputName = "E-mail"
                            placeholder = "Enter your e-mail"
                            formId = "form-email"
                            inputNameId = "input-email"
                            onchange = {(e) => {setEmail(e.target.value)}}
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