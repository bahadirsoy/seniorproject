//import react components
import React, { useState, useEffect } from 'react';

//import styles
import './adminuserinformations.styles.css'

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

//import react router
import { Link, useParams } from 'react-router-dom';



function AdminUserInformations(props){

    //username parameter for userinformations page. It will be used for fetch specific user information
    const { username } = useParams();

    //user informations
    const [userInformations, setUserInformations] = useState()

    useEffect(() => {
        Axios.get("http://bezkoder-server.herokuapp.com/api/getUserInformations", {
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
    }, [])

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
        </div>
    )
}

export default AdminUserInformations;