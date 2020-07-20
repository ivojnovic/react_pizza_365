import React, { useEffect } from 'react';
import './App.css';
import VrstaDropdown from './components/VrstaDropdown';
import Title from './components/Title';
import Logo from './components/Logo';
import Rezultat from './components/Rezultat';
import Proizvodac from './components/Proizvodac';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Auth from './Auth';
import Login from './Login';
import Register from './Register';


function App() {
  const user = useState(JSON.parse(localStorage.getItem("user")));
  
  useEffect(() => {
    if (user[0] === null) {
      localStorage.removeItem("user");
      navigate("/login");
    } else {
      localStorage.setItem("user", JSON.stringify(user[0]));
      navigate("/");
    }
  }, user);
  
  return (
    <Router>
    <div className="App">
      <Logo />
      <Title />
      <Route path="/login"></Route>
      <VrstaDropdown />
      <Rezultat path="/proizvod/:id"></Rezultat>
      <Proizvodac path="/proizvodac/:id" component={Proizvodac}></Proizvodac>
      <Login path="/login" component={Login}></Login>
      <Logout path="/logout" component={Logout}></Logout>
      <Register path="/register" component={Register}></Register>
    </div>
    </Router>
  );
}

export default App;
