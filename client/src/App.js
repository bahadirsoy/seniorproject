
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
import { createContext } from 'react';

//import cookies
import { useCookies } from 'react-cookie';


function App() {

  //cookies
  const [usernameCookie, setUsernameCookie, removeUsernameCookie] = useCookies(['cookies']);
  
  return (
    <div>

      <Header 
        usernameCookie = {usernameCookie.cookies}
        setUsernameCookie = {setUsernameCookie}
        removeUsernameCookie = {removeUsernameCookie}
      />

      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/signin' element={
          <SignInPage 
            usernameCookie = {usernameCookie.cookies}
            setUsernameCookie = {setUsernameCookie}
          />
        }/>
        <Route path='/signup' element={
          <SignUpPage 
            usernameCookie = {usernameCookie.cookies} 
            setUsernameCookie = {setUsernameCookie}
          />}
        />
        <Route path='/profile' element={
          <ProfilePage
            usernameCookie = {usernameCookie.cookies}
          />}
        />
      </Routes>

      
    </div>
  );
}

export default App;
