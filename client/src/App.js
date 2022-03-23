
//import styles
import './App.css';

//import custompages
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage';
import SignInPage from './pages/signinpage/signinpage';
import SignUpPage from './pages/signuppage/signuppage';
import ProfilePage from './pages/profilepage/profilepage';
import UserInformations from './pages/userinformationspage/userinformationspage';

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
        <Route path='/' element={
          <HomePage
            usernameCookie = {usernameCookie.username}
            userIdCookie = {userIdCookie.userId}
          />
        }/>
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
            setUserIdCookie = {setUserIdCookie}
          />}
        />
        <Route path='/profile' element={
          <ProfilePage
            usernameCookie = {usernameCookie.username}
          />}
        />
        <Route path='/userInformations' element={
          <UserInformations
            
          />}
        />
      </Routes>

      
    </div>
  );
}

export default App;
