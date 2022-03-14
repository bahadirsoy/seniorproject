
//import react
import React, { useEffect, useState } from 'react';

//import styles
import './homepage.styles.css'

//import custom components
import SharePostPanel from '../../components/sharepostpanel/sharepostpanel.component';
import Post from '../../components/post/post.component';

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
            params: {
                userId: props.userIdCookie
            }
        })
        .then((response) => {
            response.data.map((post) => {
                posts.push(post)
            })
            setIsLoading(1)
        })
    }

    return(
        <div>
            Homepage {props.userIdCookie}
            
            <SharePostPanel />
            
            {
                isLoading ?
                posts.map((info) => {
                    console.log(info)
                    return(
                        <Post 
                            key = {info.postId}
                            postContent = {info.postContent}
                            postTime = {info.postTime}
                            userId = {info.userId}
                        />)
                }) :
                "Loading..."
            }

        </div>
    )
}

export default HomePage;