
//import react
import {React, useContext} from 'react';

//import styles
import './header.styles.css'

//import react router
import { Link } from 'react-router-dom';

//import session
import Session from 'react-session-api'
import { Cookies, useCookies } from 'react-cookie';

//import navigate
import { useNavigate } from 'react-router-dom';


function Header(props){

    //navigate
    const navigate = useNavigate()

    //logout function
    const logout = () => {
        props.removeUsernameCookie("username")
        props.removeUsernameCookie("userId")
        navigate('/')
    }

    return(
        <div>
            <div className="header">
                <a className="logo">CompanyLogo</a>
                {
                    props.usernameCookie ?
                    <a className='float-left'> {props.userIdCookie} Welcome {props.usernameCookie} </a> :
                    null
                }
                
                <div className="header-right">

                    <Link to='/' className="active">
                        Home
                    </Link>

                    {
                        props.usernameCookie ?

                        <span>
                            <Link to="/profile">
                                Profile
                            </Link>

                            <Link to="/activities">
                                Activities
                            </Link>

                            <Link to="/" onClick={logout}>
                                Log out
                            </Link>
                        </span> :

                        <span>
                            <Link to="/signin">
                                Sign in
                            </Link>

                            <Link to="/signup">
                                Sign up
                            </Link>
                        </span>
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default Header;