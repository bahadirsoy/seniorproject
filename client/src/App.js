
//import styles
import './App.css';

//import custompages
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage';
import SignInPage from './pages/signinpage/signinpage';
import SignUpPage from './pages/signuppage/signuppage';
import ProfilePage from './pages/profilepage/profilepage';

//import react router components
import {
  BrowserRouter as Router,
  Routes,                   // Switch = Routes
  Route, 
  Link,
  useInRouterContext
} from 'react-router-dom'

//import hooks
import { createContext, useEffect } from 'react';

//import cookies
import { useCookies } from 'react-cookie';


function App() {

  //cookies
  const [usernameCookie, setUsernameCookie, removeUsernameCookie] = useCookies(['username']);
  const [userIdCookie, setUserIdCookie, removeUserIdCookie] = useCookies(['userId']);

  return (
    <div>

      <Header 
        usernameCookie = {usernameCookie.username}
        setUsernameCookie = {setUsernameCookie}
        removeUsernameCookie = {removeUsernameCookie}
        userIdCookie = {userIdCookie.userId}
      />

      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/signin' element={
          <SignInPage 
            usernameCookie = {usernameCookie.username}
            setUsernameCookie = {setUsernameCookie}
          />
        }/>
        <Route path='/signup' element={
          <SignUpPage 
            usernameCookie = {usernameCookie.username} 
            setUsernameCookie = {setUsernameCookie}
          />}
        />
        <Route path='/profile' element={
          <ProfilePage
            usernameCookie = {usernameCookie.username}
          />}
        />
      </Routes>

      
    </div>
  );
}

export default App;
