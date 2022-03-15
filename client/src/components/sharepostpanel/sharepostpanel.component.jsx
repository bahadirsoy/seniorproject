
//import react
import React, { useState } from 'react';

//import styles
import './sharepostpanel.styles.css'

//import reactstrap component
import { Container, Row } from 'react-bootstrap';

//import fontawesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'


function SharePostPanel(){

    //hold image
    const [image, setImage] = useState()

    //insert post to db
    const insertPost = () => {
        console.log("inserted")
    }

    const onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
          const img = event.target.files[0];
          setImage(URL.createObjectURL(img))
        }
    };

    //upload post to db
    


    return(
        <Container>
            <img src={image} />
            <Row>
                <div className="panel-content panel-activity">
                    <div className="panel-activity__status">
                        <textarea name="user_activity" placeholder="Share what you've been up to..." className="form-control"></textarea>
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