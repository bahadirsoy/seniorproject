
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
import { useNavigate, useLocation } from 'react-router-dom';


function Header(props){

    //get location
    const location = useLocation();

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
            {
                //if it is admin page
                location.pathname.includes("admin") ? 

                <div className="header">
                    <a className="logo">CompanyLogo</a>
                    {
                        props.usernameCookie ?
                        <a className='float-left'> Welcome {props.usernameCookie} {props.userIdCookie} </a> :
                        null
                    }
                    
                    <div className="header-right">

                        <Link to='/adminHomePage' >
                            Home
                        </Link>
                        
                        {
                            props.usernameCookie ?

                            <span>

                                <Link to="/adminProfile">
                                    Activity
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
                
                :

                //if it is user page
                <div className="header">
                <a className="logo">CompanyLogo</a>
                {
                    props.usernameCookie ?
                    <a className='float-left'> Welcome {props.usernameCookie} {props.userIdCookie} </a> :
                    null
                }
                
                <div className="header-right">

                    <Link to='/'>
                        Home
                    </Link>
                    
                    {
                        props.usernameCookie ?

                        <span>
                            <Link to="/profile">
                                Profile
                            </Link>

                            <Link to="/searchUser">
                                Search User
                            </Link>

                            <a onClick={logout} className="pointer">
                                Log out
                            </a>
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
            }
        </div>
    )
}

export default Header;