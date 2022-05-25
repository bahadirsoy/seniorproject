//import styling
import './chatpage.styles.css'

//import react router components
import { useParams } from 'react-router-dom';

//import react bootsrap components
import { Container, Row, Col, Alert } from 'react-bootstrap';

//import useEffect
import { Fragment, useEffect, useState } from 'react';

//import Axios
import Axios from 'axios';

function ChatPage(props){

    //userId parameter to find out which user is chatting current user with
    const { userId } = useParams();

    //messages
    const [messages, setMessages] = useState([])

    //isloading
    const [isLoading, setIsLoading] = useState(0)

    useEffect(() =>{
        //get received messages
        Axios.get("http://localhost:3001/api/getChatMessages", {
            params: {
                senderId: userId,
                receiverId: props.userIdCookie
            }
        })
        .then((response) => {
            response.data.map(infos => {
                messages.push(infos)
            })
            //get received messages
            Axios.get("http://localhost:3001/api/getChatMessages", {
                params: {
                    senderId: props.userIdCookie,
                    receiverId: userId
                }
            })
            .then((response) => {
                response.data.map(infos => {
                    messages.push(infos)
                })
                messages.sort(custom_sort);
                setIsLoading(1)
            })
        })

        
    }, [])

    function custom_sort(a, b) {
        return new Date(a.messageTime).getTime() - new Date(b.messageTime).getTime();
    }

    return(
        props.userIdCookie !== userId ?
        <Container fluid className='mt-5'>
            <h1 className='mx-5'>Chat with Soyisi1</h1>
            
            <Row className='mt-5 chat-box'>
                {
                    messages ?
                    messages.map(infos => {
                        console.log(infos)
                        if(infos.receiverId == props.userIdCookie){
                            return(
                                <Fragment key={infos.chatId}>
                                    <Col xs={6}>
                                        <Alert variant="secondary">
                                            <Alert.Heading>{infos.message}</Alert.Heading>
                                        </Alert>
                                    </Col>
                                    <Col xs={6}></Col>
                                </Fragment>
                            )
                        } else{
                            return(
                                <Fragment key={infos.chatId}>
                                    <Col xs={6}></Col>
                                    <Col xs={6}>
                                        <Alert variant="secondary">
                                            <Alert.Heading>{infos.message}</Alert.Heading>
                                        </Alert>
                                    </Col>
                                </Fragment>
                            )
                        }
                        
                    }) : null
                }
            </Row>
        </Container>
        : "You cannot chat with your self"
    )
}

export default ChatPage