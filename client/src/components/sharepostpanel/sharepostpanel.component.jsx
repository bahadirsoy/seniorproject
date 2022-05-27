
//import react
import React, { useState } from 'react';

//import styles
import './sharepostpanel.styles.css'

//import reactstrap component
import { Container, Row, Alert, Button } from 'react-bootstrap';

//import fontawesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'

//import axios
import Axios from 'axios'


function SharePostPanel(props){

    //hold post variables
    const [postContent, setPostContent] = useState('')

    //post content states
    const [state, setState] = useState()

    //upload post to db
    const insertPost = () => {
        if(postContent == "" || !postContent){
            setState("emptyPostContent")
            return
        }

        const formData = new FormData();
        formData.append('userId', props.userIdCookie)
        formData.append('postContent', postContent)
        Object.values(images).forEach(file => {
            formData.append("images", file);
        })

        Axios.post('http://localhost:3001/api/insertPost', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => { //feedback from api
            console.log(response)
            window.location.reload()
        })
    }

    const [images, setImages] = useState([])

    const handleInputChange = (e) => {
        setImages(e.target.files)
    }

    return(
        <Container>
            <Row>
            
                {
                
                state == "emptyPostContent" ? 

                <Alert variant="danger mt-5">
                    
                <Alert.Heading>
                    Field is empty
                </Alert.Heading>

                    <p>
                        Type something to post
                    </p>
                </Alert> : null
                
                }

                <div className="panel-content panel-activity">
                    <div className="panel-activity__status">
                        <textarea 
                            name="user_activity" 
                            placeholder="Type your message here..."
                            className="form-control"
                            onChange = {(e) => {setPostContent(e.target.value)}}>
                        </textarea>
                        <div className="actions">
                            <label htmlFor="filePicker" className='btn btn-warning'>
                                Add images to your post
                            </label>
                            <input type="file" multiple className='form-control' name="images" onChange={handleInputChange} id="filePicker" style={{visibility:"hidden"}}/>
                            <button onClick={insertPost} className="btn btn-rounded btn-info">
                                Send Post
                            </button>
                        </div>
                    </div>
                </div>

            </Row>
        </Container>
    )
}

export default SharePostPanel;