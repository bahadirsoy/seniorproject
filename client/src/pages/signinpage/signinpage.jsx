
//import react
import React from 'react';

//import styles
import './signinpage.styles.css'

//import custom components
import CustomInput from '../../components/custominput/custominput.component';

//import react strap components
import { Container, Row, Col } from 'react-bootstrap';


function SignInPage(){
    return(
        <div className='mt-5'>


            <Container>
                <Row>
                    
                    <h1 className='mb-5'>Sign In Page</h1>

                    <Col>
                        
                    </Col>

                    <Col xs={10}>
                        <CustomInput
                            //labelName = "Username"
                            inputName = "Username"
                            placeholder = "Enter username"
                            formId = "form-username"
                            inputNameId = "input-username"
                        />
                        
                    </Col>

                    <Col>
                        
                    </Col>
                </Row>
            </Container>

            
        </div>
    )
}

export default SignInPage;