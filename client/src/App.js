
//import styles
import './App.css';

//import custompages
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage';
import SignInPage from './pages/signinpage/signinpage';
import SignUpPage from './pages/signuppage/signuppage';
import ProfilePage from './pages/profilepage/profilepage';
import UserInformations from './pages/userinformationspage/userinformationspage';
import SignInAdminPage from './pages/signinadminpage/signinadminpage';
import AdminHomePage from './pages/adminhomepage/adminhomepage';
import AdminUserInformations from './pages/adminuserinformations/adminuserinformations';
import ChatPage from './pages/chatpage/chatpage';
import SearchUser from './pages/searchuserpage/searchuser';

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
        <Route path='/userInformations/:username' element={
          <UserInformations
            usernameCookie = {usernameCookie.username}
            userIdCookie = {userIdCookie.userId}
          />}
        />
        <Route path='/signinadminpage' element={
          <SignInAdminPage 
            setUsernameCookie = {setUsernameCookie}
          />
        }
        />
        <Route path='/adminHomePage' element={
          <AdminHomePage 
            setUsernameCookie = {setUsernameCookie}
          />
        }
        />
        <Route path='/adminUserInformations/:username' element={
          <AdminUserInformations 
            
          />
        }
        />
        <Route path='/chat/:userId' element={
          <ChatPage 
            usernameCookie = {usernameCookie.username}
            userIdCookie = {userIdCookie.userId}
          />
        }
        />
        <Route path='/searchUser' element={
          <SearchUser 
            usernameCookie = {usernameCookie.username}
            userIdCookie = {userIdCookie.userId}
          />
        }
        />
      </Routes>

      
    </div>
  );
}

export default App;
