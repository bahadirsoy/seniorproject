
//import react
import React from 'react';

//import styles
import './homepage.styles.css'

//import custom components
import SharePostPanel from '../../components/sharepostpanel/sharepostpanel.component';
import Post from '../../components/post/post.component';


function HomePage(){
    return(
        <div>
            Homepage

            <SharePostPanel />
            <Post />

        </div>
    )
}

export default HomePage;