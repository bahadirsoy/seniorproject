
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
        console.log(props.usernameCookie)
        props.removeUsernameCookie("username")
        props.removeUsernameCookie("userId")
        console.log(props.usernameCookie)
        navigate('/')
    }

    return(
        <div>
            {
                location.pathname == "/adminHomePage" ? 

                <div className="header">
                    <a className="logo">CompanyLogo</a>
                    {
                        props.usernameCookie ?
                        <a className='float-left'> Welcome {props.usernameCookie} </a> :
                        null
                    }
                    
                    <div className="header-right">

                        <Link to='/' >
                            Home
                        </Link>
                        
                        {
                            props.usernameCookie ?

                            <span>
                                <Link to="/adminProfile">
                                    Profile
                                </Link>

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