
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
    const [posts, setPosts] = useState()

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
            console.log(response)
        })
    }

    return(
        <div>
            Homepage {props.userIdCookie}
            
            <SharePostPanel />
            <Post 
                usernameCookie = {props.usernameCookie}
            />

        </div>
    )
}

export default HomePage;