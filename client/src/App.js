import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom'

import Home from './components/Home';
import Signup from './components/Signup';

class App extends React.Component {
  render(){
    return (
      <Router>
        {/* <div>
        
        </div> */}
        <Route path="/" component={Home}/>
        <Route path="/signup" exact component={Signup}/>
      </Router>

    );
  }

}

export default App;
