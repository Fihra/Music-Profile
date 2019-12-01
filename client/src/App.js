import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom'

import Navbar from './components/Navbar';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';

class App extends React.Component {
  render(){
    return (
      <Router>
        <Navbar />
        <Home />
        {/* <Route path="/" component={Home}/> */}
        <Route path="/login" exact component={Login}/>
        <Route path="/signup" exact component={Signup}/>
      </Router>

    );
  }

}

export default App;
