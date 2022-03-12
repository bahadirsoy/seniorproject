
//import react
import { React, useEffect, useState, useRef } from 'react';

//import styles
import './profilepage.styles.css'

//import custom components
import CustomInput from '../../components/custominput/custominput.component';

//import react strap components
import { Container, Row, Col, Button } from 'react-bootstrap';

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
                        {console.log(1)}
                    </Col>

                    <Col xs={10}>
                        <CustomInput
                            inputName = "Username: "
                            placeholder = {userInformations ? userInformations.username : null}
                            readonly = {1}
                        />

                        
                        <CustomInput
                            name = "name"
                            inputName = "Name: "
                            placeholder = {userInformations ? userInformations.name : null}
                            formId = "form-name"
                            inputNameId = "input-name"
                            onchange = {(e) => {setName(e.target.value)}}
                            readonly = {0}
                        />

                        <CustomInput
                            name = "surname"
                            inputName = "Surname: "
                            placeholder = {userInformations ? userInformations.surname : null}
                            formId = "form-surname"
                            inputNameId = "input-surname"
                            onchange = {(e) => {setSurname(e.target.value)}}
                            readonly = {0}
                        />
                        
                        <CustomInput
                            name = "email"
                            inputName = "E-mail: "
                            placeholder = {userInformations ? userInformations.email : null}
                            formId = "form-email"
                            inputNameId = "input-email"
                            onchange = {(e) => {setEmail(e.target.value)}}
                            readonly = {0}
                        />

                        <CustomInput
                            name = "phone"
                            inputName = "Phone: "
                            placeholder = {userInformations ? userInformations.phone : null}
                            formId = "form-phone"
                            inputNameId = "input-phone"
                            onchange = {(e) => {setPhone(e.target.value)}}
                            readonly = {0}
                        />

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