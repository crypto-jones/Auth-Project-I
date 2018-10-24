import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';
import Welcome from './components/Welcome/Welcome';
import Unauthorized from './components/Unauthorized/Unauthorized';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Login} />
          <Route exact path="/welcome" component={Welcome} />
          <Route exact path="/unauthorized" component={Unauthorized} />
        </div>
      </Router>
    );
  }
}

export default App;
