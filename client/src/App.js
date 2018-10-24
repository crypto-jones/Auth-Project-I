import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Welcome from './components/Welcome/Welcome';
import Unauthorized from './components/Unauthorized/Unauthorized';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/welcome" component={Welcome} />
          <Route exact path="/unauthorized" component={Unauthorized} />
        </div>
      </Router>
    );
  }
}

export default App;
