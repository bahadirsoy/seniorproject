
//import react
import React, { useEffect, useState } from 'react';

//import styles
import './homepage.styles.css'

//import custom components
import SharePostPanel from '../../components/sharepostpanel/sharepostpanel.component';
import Post from '../../components/post/post.component';

//import react bootstrap components
import { Container, Row, Col } from 'react-bootstrap';

//import images
import logo from '../../images/akdenizLogo.jpg'

//import axios for api request
import Axios from 'axios'

function HomePage(props){

    //posts
    const [posts, setPosts] = useState([])

    //check if data is fetched
    const [isLoading, setIsLoading] = useState(0)

    //get all posts from DB with useeffect
    useEffect(() => {
        getPosts()
    }, [])

    //get all posts from db
    const getPosts = () => {
        Axios.get("http://localhost:3001/api/getPosts", {
            
        })
        .then((response) => {
            response.data.map((post) => {
                posts.push(post)
            })
            setIsLoading(1)
        })
    }

    return(
        
        props.userIdCookie ? 

        <>
            <SharePostPanel
                userIdCookie = {props.userIdCookie}
            />
            
            {
                isLoading ?
                posts.map((info) => {
                    return(
                        <Post 
                            key = {info.postId}
                            postId = {info.postId}
                            postContent = {info.postContent}
                            postTime = {info.postTime}
                            
                            userId = {info.userId}
                            userIdCookie = {props.userIdCookie}
                        />)
                }) :
                "Loading..."
            }

        </> :

        <Container>
            <Row>
                <Col xs={6}>
                    <img className='akdenizLogo' src={logo} />
                </Col>

                <Col className='mt-5' xs={6}>
                    <h1 className='text-center'>Welcome</h1>

                    <div className='welcome-line mt-4'>
                        FB is social media like program that helps you to find roommate. You must sign in to continue
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default HomePage;