
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


function UserInformations(props){

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
                            placeholder = "username"
                            readonly = {1}
                        />

                        <InputGroup className='mb-3'>
                            <FormControl
                                name = "name"
                                placeholder = "name"
                                id = "form-name"
                                aria-describedby = "input-name"
                            />
                        </InputGroup>

                        <InputGroup className='mb-3'>
                            <FormControl
                                name = "surname"
                                placeholder = "surname"
                                id = "form-surname"
                                aria-describedby = "input-surname"
                            />
                        </InputGroup>
                        
                        <InputGroup className='mb-3'>
                            <FormControl
                                name = "email"
                                placeholder = "email"
                                id = "form-email"
                                aria-describedby = "input-email"
                            />
                        </InputGroup>

                        <InputGroup className='mb-3'>
                            <FormControl
                                name = "phone"
                                placeholder = "phone"
                                id = "form-phone"
                                aria-describedby = "input-phone"
                            />
                        </InputGroup>
                    </Col>

                    <Col>
                        
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default UserInformations;