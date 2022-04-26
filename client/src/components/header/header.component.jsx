
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
                location.pathname.includes("admin") ? 

                <div className="header">
                    <a className="logo">CompanyLogo</a>
                    {
                        props.usernameCookie ?
                        <a className='float-left'> Welcome {props.usernameCookie} </a> :
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

                                <a onClick={logout}>
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
                
                :

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

                            <a onClick={logout}>
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