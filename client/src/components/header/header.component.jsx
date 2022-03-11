
//import react
import React from 'react';

//import styles
import './header.styles.css'

//import react router
import { Link } from 'react-router-dom';


function Header(){
    return(
        <div>
            <div className="header">
                <a className="logo">CompanyLogo</a>
                <div className="header-right">
                    <Link to='/' className="active">
                        Home
                    </Link>
                    <a>Contact</a>
                    <a>About</a>
                </div>
            </div>
        </div>
    )
}

export default Header;