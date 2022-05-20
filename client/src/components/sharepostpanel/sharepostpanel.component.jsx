
//import react
import React, { useState } from 'react';

//import styles
import './sharepostpanel.styles.css'

//import reactstrap component
import { Container, Row, Alert } from 'react-bootstrap';

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

        Axios.post('http://localhost:3001/api/insertPost', {
            userId: props.userIdCookie,
            postContent: postContent
        }).then((response) => { //feedback from api
            console.log(response)
            window.location.reload()
        })
    }

    const [userInfo, setuserInfo] = useState({
        file: [],
    });

    const handleInputChange = (e) => {
        setuserInfo({
            ...userInfo,
            file: e.target.files[0]
        })
    }

    const submit = async (e) => {
        
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
                            placeholder="Share what you've been up to..."
                            className="form-control"
                            onChange = {(e) => {setPostContent(e.target.value)}}>
                        </textarea>
                        <div className="actions">
                            <div className="btn-group">
                                <a type="button" className="btn-link" title="" data-toggle="tooltip" data-original-title="Post an Video">
                                    <FontAwesomeIcon color='white' size="lg" icon={faImage} />
                                </a>
                                <a type="button" className="btn-link" title="" data-toggle="tooltip" data-original-title="Post an Idea">
                                    <FontAwesomeIcon color='white' size="lg" icon={faImage} />
                                </a>
                                <a type="button" className="btn-link" title="" data-toggle="tooltip" data-original-title="Post an Question">
                                    <FontAwesomeIcon color='white' size="lg" icon={faImage} />
                                </a>
                            </div>
                            <button onClick={insertPost} className="btn btn-sm btn-rounded btn-info">
                                Post
                            </button>
                            <label>Select Image</label>
                            <input type="file" className='form-control' name="upload_file" onChange={handleInputChange}/>
                            <button className='btn btn-dark' onClick={() => submit()}>Save</button>
                        </div>
                    </div>
                </div>

            </Row>
        </Container>
    )
}

export default SharePostPanel;