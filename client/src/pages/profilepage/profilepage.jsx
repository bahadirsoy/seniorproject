
//import react
import { React, useEffect, useState, useRef } from 'react';

//import styles
import './profilepage.styles.css'

//import custom components
import CustomInput from '../../components/custominput/custominput.component';

//import react strap components
import { Container, Row, Col, Button, InputGroup, FormControl, Alert } from 'react-bootstrap';

//import axios
import Axios from 'axios'


function ProfilePage(props){

    //states for inputs
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    //user informations
    const [userInformations, setUserInformations] = useState()

    //variable for input validity
    const [inputValidity, setInputValidity] = useState('')

    //check if passed variable contains any special char
    const checkSpecialCharacter = (variable) => {
        var pattern = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/); //unacceptable chars
        if (pattern.test(variable)) {
            return false;
        }
        return true; //good user input
    }

    //update user function
    const updateUser = () => {
        Axios.put("http://localhost:3001/api/updateUser", {
            name: name,
            surname: surname,
            email: email,
            phone: phone,
            username: userInformations.username
        }).then((response) => {
            console.log(response)
        })
    }

    //update name
    const updateName = () => {

        //trim name and check validity
        const trimmedName = name.trim()

        if(trimmedName == "" || !trimmedName){
            setInputValidity("nameEmpty")
            return
        } else if(!checkSpecialCharacter(trimmedName)){
            setInputValidity("nameSpecialChar")
            return
        } else{
            setInputValidity("nameSuccess")
        }
        
        Axios.put("http://localhost:3001/api/updateName", {
            name: trimmedName,
            username: userInformations.username
        }).then((response) => {
            console.log(response)
        })
    }

    //update surname
    const updateSurname = () => {
        //trim surname and check validity
        const trimmedSurname = surname.trim()

        if(trimmedSurname == "" || !trimmedSurname){
            setInputValidity("surnameEmpty")
            return
        } else if(!checkSpecialCharacter(trimmedSurname)){
            setInputValidity("surnameSpecialChar")
            return
        } else{
            setInputValidity("surnameSuccess")
        }

        Axios.put("http://localhost:3001/api/updateSurname", {
            surname: trimmedSurname,
            username: userInformations.username
        }).then((response) => {
            console.log(response)
        })
    }

    //check if email is in correct format
    const validateEmail = (mail) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
            return true
        }
            return false
        }

    //update email
    const updateEmail = () => {
        //trim email and check validity
        const trimmedEmail = email.trim()

        if(trimmedEmail == "" || !trimmedEmail){
            setInputValidity("emailEmpty")
            return
        } else if(!checkSpecialCharacter(trimmedEmail)){
            setInputValidity("emailSpecialChar")
            return
        } else if(!validateEmail(trimmedEmail)){
            setInputValidity("wrongEmailFormat")
            return
        } else{
            setInputValidity("emailSuccess")
        }

        Axios.put("http://localhost:3001/api/updateEmail", {
            email: email,
            username: userInformations.username
        }).then((response) => {
            console.log(response)
        })
    }

    //update phone
    const updatePhone = () => {
        //trim email and check validity
        const trimmedPhone = phone.trim()

        if(trimmedPhone == "" || !trimmedPhone){
            setInputValidity("phoneEmpty")
            return
        } else if(!/^\d+$/.test(trimmedPhone)){
            setInputValidity("invalidPhone")
            return
        } else{
            setInputValidity("phoneSuccess")
        }

        Axios.put("http://localhost:3001/api/updatePhone", {
            phone: phone,
            username: userInformations.username
        }).then((response) => {
            console.log(response)
        })
    }

    //get user informations
    useEffect(() => {
        Axios.get("http://localhost:3001/api/getUserInformations", {
            params: {
                username: props.usernameCookie
            }
        })
        .then((response) => {
            setUserInformations({
                username: response.data[0].username,
                name: response.data[0].name,
                surname: response.data[0].surname,
                email: response.data[0].email,
                phone: response.data[0].phone,
            })
        })
    }, [])

    return(
        <div className='mt-5'>
            <Container>
                <Row>

                    <h1 className='mb-5'>Profile Page</h1>

                    <Col>
                        
                    </Col>

                    <Col xs={10}>

                        {
                            //feedback alerts for name
                            inputValidity == "nameEmpty" ?

                            <Alert variant="danger">
                            <Alert.Heading>Empty name field!</Alert.Heading>
                                <p>
                                    Name input is empty
                                </p>
                            </Alert> : 

                            inputValidity == "nameSpecialChar" ?

                            <Alert variant="danger">
                            <Alert.Heading>Unvalid name!</Alert.Heading>
                                <p>
                                    Name contains special characters
                                </p>
                            </Alert> :

                            inputValidity == "nameSuccess" ?

                            <Alert variant="success">
                            <Alert.Heading>Success!</Alert.Heading>
                                <p>
                                    Your name is changed
                                </p>
                            </Alert> : 

                            //feedback alerts for surname
                            inputValidity == "surnameEmpty" ?

                            <Alert variant="danger">
                            <Alert.Heading>Empty surname field!</Alert.Heading>
                                <p>
                                    Surname input is empty
                                </p>
                            </Alert> : 

                            inputValidity == "surnameSpecialChar" ?

                            <Alert variant="danger">
                            <Alert.Heading>Invalid surname!</Alert.Heading>
                                <p>
                                    Surname contains special characters
                                </p>
                            </Alert> :

                            inputValidity == "surnameSuccess" ?

                            <Alert variant="success">
                            <Alert.Heading>Success!</Alert.Heading>
                                <p>
                                    Your surname is changed
                                </p>
                            </Alert> : 

                            //feedback alerts for email
                            inputValidity == "emailEmpty" ?

                            <Alert variant="danger">
                            <Alert.Heading>Empty email field!</Alert.Heading>
                                <p>
                                    E-mail input is empty
                                </p>
                            </Alert> : 

                            inputValidity == "emailSpecialChar" ?

                            <Alert variant="danger">
                            <Alert.Heading>Unvalid email!</Alert.Heading>
                                <p>
                                    E-mail contains special characters
                                </p>
                            </Alert> :

                            inputValidity == "wrongEmailFormat" ?

                            <Alert variant="danger">
                            <Alert.Heading>Invalid E-mail!</Alert.Heading>
                                <p>
                                    Your email is invalid
                                </p>
                            </Alert> : 

                            inputValidity == "emailSuccess" ?

                            <Alert variant="success">
                            <Alert.Heading>Success!</Alert.Heading>
                                <p>
                                    Your e-mail is changed
                                </p>
                            </Alert> : 

                            //feedback alerts for phone
                            inputValidity == "phoneEmpty" ?

                            <Alert variant="danger">
                            <Alert.Heading>Empty phone field!</Alert.Heading>
                                <p>
                                    Phone input is empty
                                </p>
                            </Alert> : 

                            inputValidity == "invalidPhone" ?

                            <Alert variant="danger">
                            <Alert.Heading>Invalid phone!</Alert.Heading>
                                <p>
                                    Phone can contain only numeric characters
                                </p>
                            </Alert> : 

                            inputValidity == "phoneSuccess" ?

                            <Alert variant="success">
                            <Alert.Heading>Success!</Alert.Heading>
                                <p>
                                    Your phone is changed
                                </p>
                            </Alert> : null

                        }

                        <CustomInput
                            inputName = "Username: "
                            placeholder = {userInformations ? userInformations.username : null}
                            readonly = {1}
                        />

                        <InputGroup className='mb-3'>
                            <Button onClick={updateName} variant="secondary">Update name</Button>
                            <FormControl
                                name = "name"
                                placeholder = {userInformations ? userInformations.name : null}
                                id = "form-name"
                                aria-describedby = "input-name"
                                onChange = {(e) => {setName(e.target.value)}}
                            />
                        </InputGroup>

                        <InputGroup className='mb-3'>
                            <Button onClick={updateSurname} variant="secondary">Update Surname</Button>
                            <FormControl
                                name = "surname"
                                placeholder = {userInformations ? userInformations.surname : null}
                                id = "form-surname"
                                aria-describedby = "input-surname"
                                onChange = {(e) => {setSurname(e.target.value)}}
                            />
                        </InputGroup>
                        
                        <InputGroup className='mb-3'>
                            <Button onClick={updateEmail} variant="secondary">Update e-mail</Button>
                            <FormControl
                                name = "email"
                                placeholder = {userInformations ? userInformations.email : null}
                                id = "form-email"
                                aria-describedby = "input-email"
                                onChange = {(e) => {setEmail(e.target.value)}}
                            />
                        </InputGroup>

                        <InputGroup className='mb-3'>
                            <Button onClick={updatePhone} variant="secondary">Update phone</Button>
                            <FormControl
                                name = "phone"
                                placeholder = {userInformations ? userInformations.phone : null}
                                id = "form-phone"
                                aria-describedby = "input-phone"
                                onChange = {(e) => {setPhone(e.target.value)}}
                            />
                        </InputGroup>

                        <Button onClick={updateUser} variant="info">Update All</Button>
                    </Col>

                    <Col>
                        
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ProfilePage;