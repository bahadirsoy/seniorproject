//import styling
import './chatpage.styles.css'

//import react router components
import { useParams } from 'react-router-dom';

//import react bootsrap components
import { Container, Row, Col, Alert, InputGroup, FormControl, Button } from 'react-bootstrap';

//import useEffect
import { Fragment, useEffect, useState } from 'react';

//import fontawesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage } from '@fortawesome/free-solid-svg-icons'

//import Axios
import Axios from 'axios';

function ChatPage(props){

    //userId parameter to find out which user is chatting current user with
    const { userId } = useParams();

    //messages
    const [messages, setMessages] = useState([])

    //isloading
    const [isLoading, setIsLoading] = useState(0)

    //new message
    const [newMessage, setNewMessage] = useState('')

    //which user we are chatting with
    const [username, setUsername] = useState('')

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

        Axios.get("http://localhost:3001/api/getUsernameFromId", {
                params: {
                    userId: userId
                }
            })
            .then((response) => {
                setUsername(response.data[0].username)
            })
        
    }, [])

    //send a message
    const sendMessage = () => {
        if(newMessage.trim() == "" || !newMessage){
            return
        }

        Axios.post('http://localhost:3001/api/sendMessage', {
            senderId: props.userIdCookie,
            receiverId: userId,
            message: newMessage
        }).then((response) => { //feedback from api
            messages.push({
                chatId: 50,
                message: newMessage
            })
            setNewMessage("")
        })
    }

    function custom_sort(a, b) {
        return new Date(a.messageTime).getTime() - new Date(b.messageTime).getTime();
    }

    return(
        props.userIdCookie !== userId ?
        <Container fluid className='mt-5'>
            <h1 className='mx-5'>Chat with {username}</h1>
            
            <Row className='mt-5 chat-box'>
                {
                    messages ?
                    messages.map(infos => {
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
            <InputGroup className="my-5">
                <InputGroup.Text id="basic-addon1">
                    <FontAwesomeIcon className='mx-4' icon={faMessage} />
                </InputGroup.Text>
                <FormControl
                    placeholder="Send a message"
                    aria-describedby="basic-addon1"
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                />
                <Button onClick={sendMessage} variant="outline-secondary" id="basic-addon1">
                    Add
                </Button>
            </InputGroup>
        </Container>
        : "You cannot chat with your self"
    )
}

export default ChatPage