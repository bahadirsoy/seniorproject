
//import react
import React from 'react';

//import styles
import './header.styles.css'

//import react router
import { Link } from 'react-router-dom';

//import session
import Session from 'react-session-api'

//import navigate
import { useNavigate } from 'react-router-dom';


function Header(){

    //navigate
    const navigate = useNavigate()

    //logout function
    const logout = () => {
        Session.clear()
        navigate('/')
    }

    return(
        <div>
            <div className="header">
                <a className="logo">CompanyLogo</a>
                <a className="float-left">{Session.get("username")}</a>
                
                <div className="header-right">
                    <Link to='/' className="active">
                        Home
                    </Link>

                    <Link to="/signin">
                        Sign in
                    </Link>

                    <Link to="/signup">
                        Sign up
                    </Link>

                    <Link to="/" onClick={logout}>
                        Log out
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Header;