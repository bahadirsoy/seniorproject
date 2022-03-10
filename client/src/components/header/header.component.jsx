
//import react
import React from 'react';

//import styles
import './header.styles.css'


function Header(){
    return(
        <div>
            <div className="header">
                <a className="logo">CompanyLogo</a>
                <div className="header-right">
                    <a className="active">Home</a>
                    <a>Contact</a>
                    <a>About</a>
                </div>
            </div>
        </div>
    )
}

export default Header;