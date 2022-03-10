
//import styles
import './App.css';

//import custompages
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.';

//import react router components
import {
  BrowserRouter as Router,
  Routes,                   // Switch = Routes
  Route, 
  Link
} from 'react-router-dom'

function App() {
  return (
    <div>
      <Header></Header>

      <Routes>
        <Route path='/' element={<HomePage/>}/>
      </Routes>
    </div>
  );
}

export default App;
