import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  state = {
    username: '',
    password: '',
    loggedIn: false
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const login = {
      username: this.state.username,
      password: this.state.password
    };

    axios
      .post('http://localhost:5300/api/login', login)
      .then(res => {
        console.log(res.data);
        if (res.data.welcome !== '') {
          this.setState({ loggedIn: true });
          this.props.history.push('/welcome');
        } else {
          this.props.history.push('/register');
        }
      })
      .catch(err => {
        this.props.history.push('/unauthorized');
      });
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button onClick={this.handleSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}

export default Login;
