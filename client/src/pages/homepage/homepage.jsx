
//import react
import React from 'react';

//import styles
import './homepage.styles.css'

//import custom components
import SharePostPanel from '../../components/sharepostpanel/sharepostpanel.component';
import Post from '../../components/post/post.component';


function HomePage(props){
    return(
        <div>
            Homepage
            
            <SharePostPanel />
            <Post 
                usernameCookie = {props.usernameCookie}
            />

        </div>
    )
}

export default HomePage;