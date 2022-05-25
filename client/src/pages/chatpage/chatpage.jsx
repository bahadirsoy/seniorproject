//import styling
import './chatpage.styles.css'

//import react router components
import { useParams } from 'react-router-dom';

//import react bootsrap components
import { Container, Row, Col, Alert } from 'react-bootstrap';

//import useEffect
import { useEffect } from 'react';

function ChatPage(props){

    //userId parameter to find out which user is chatting current user with
    const { userId } = useParams();

    useEffect(() =>{
        
    })

    return(
        <Container fluid className='mt-5'>
            <h1 className='mx-5'>Chat with Soyisi1</h1>

            <Row>
                <Col>
                    <Alert variant="secondary">
                        <Alert.Heading>Hey, nice to see you</Alert.Heading>
                    </Alert>
                </Col>
            </Row>
        </Container>
    )
}

export default ChatPage