
//import react
import { React, useEffect, useState, useRef } from 'react';

//import styles
import './profilepage.styles.css'

//import custom components
import CustomInput from '../../components/custominput/custominput.component';

//import react strap components
import { Container, Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';

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

    }

    //update name
    const updateSurname = () => {

    }

    //update name
    const updateEmail = () => {

    }

    //update name
    const updatePhone = () => {

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