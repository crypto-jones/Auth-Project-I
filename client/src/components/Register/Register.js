import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
  state = {
    username: '',
    password: '',
    loggedIn: false
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const register = {
      username: this.state.username,
      password: this.state.password
    };

    axios
      .post('http://localhost:5300/api/register', register)

      .then(res => {
        console.log(res);
        if (res.data.welcome !== '') {
          this.setState({ loggedIn: true });
          this.props.history.push('/welcome');
        } else {
          alert('Failed to register. Please try again.');
        }
      })
      .catch(err => {
        console.log('This is error: ', err);
        if (err) {
          alert('Username already exists');
        }
        this.props.history.push('/');
      });
  };

  handleRedirect = () => {
    this.props.history.push('/login');
  };

  render() {
    return (
      <div>
        <h2>Register</h2>
        <form>
          <input
            type="text"
            name="username"
            placeholder="Enter a username"
            onChange={this.handleChange}
            value={this.state.username}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter a password"
            onChange={this.handleChange}
            value={this.state.password}
          />
          <button onClick={this.handleSubmit}>Submit</button>
        </form>
        <div>
          <h4>Already have an account?</h4>
          <button onClick={this.handleRedirect}>Login</button>
        </div>
      </div>
    );
  }
}

export default Register;
