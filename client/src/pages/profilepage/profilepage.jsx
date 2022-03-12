
//import react
import { React, useEffect, useState, useRef } from 'react';

//import styles
import './profilepage.styles.css'

//import custom components
import CustomInput from '../../components/custominput/custominput.component';

//import react strap components
import { Container, Row, Col } from 'react-bootstrap';

//import axios
import Axios from 'axios'


function ProfilePage(props){

    //user informations
    const [userInformations, setUserInformations] = useState()

    //get user informations
    useEffect(() => {
        Axios.get("http://localhost:3001/api/getUserInformations", {
            params: {
                username: props.usernameCookie
            }
        })
        .then((response) => {
            setUserInformations({
                username: response.data[0].username
            })
        })
    }, [setUserInformations])

    return(
        <div className='mt-5'>
            <Container>
                <Row>

                    <h1 className='mb-5'>Profile Page</h1>

                    <Col>
                        
                    </Col>

                    <Col xs={10}>
                        <CustomInput
                            inputName = "Username"
                            placeholder = {userInformations ? userInformations.username : null}
                        />
                    </Col>

                    <Col>
                        
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ProfilePage;