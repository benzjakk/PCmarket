import React, { Component, Fragment } from "react";
import firebase from "../firebase/Firebase.js";
import "./style/registerFormstyles.css";
class RegisterForm extends Component {
  state = {
    email: "",
    password: "",
  };
  onChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        // ...
      });
  };
  render() {
    return (
      <div className="registerForm">
        <label>Registration</label>
        <form onSubmit={this.onSubmit} className="loginForm">
          <input
            placeholder=" Email"
            className="input"
            type="email"
            name="email"
            onChange={this.onChange}
          />

          <input
            placeholder=" Password"
            type="password"
            name="password"
            onChange={this.onChange}
          />

          <button>Register</button>
        </form>
      </div>
    );
  }
}

export default RegisterForm;
