
//import react
import React, { useState } from 'react';

//import styles
import './sharepostpanel.styles.css'

//import reactstrap component
import { Container, Row } from 'react-bootstrap';

//import fontawesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'

//import axios
import Axios from 'axios'


function SharePostPanel(props){

    //hold post variables
    const [postContent, setPostContent] = useState('')
    const [image, setImage] = useState()

    const onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
          const img = event.target.files[0];
          setImage(URL.createObjectURL(img))
        }
    };

    //upload post to db
    const insertPost = () => {
        Axios.post('http://localhost:3001/api/insertPost', {
            userId: props.userIdCookie,
            postContent: postContent,
            postImg: image
        }).then((response) => { //feedback from api
            console.log(response)
        })
    }


    return(
        <Container>
            <img src={image} />
            <Row>
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
                                <input type="file" name="myImage" onChange={onImageChange} />
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
                        </div>
                    </div>
                </div>
            </Row>
        </Container>
    )
}

export default SharePostPanel;