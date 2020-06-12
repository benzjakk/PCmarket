import React from "react";
import firebase from "../firebase/Firebase.js";
import "./style/loginFormstyles.css";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      currentUser: null,
      message: "",
    };
  }
  logout = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signOut()
      .then((response) => {
        this.setState({
          currentUser: null,
          email: "",
          password: "",
        });
      });
  };
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          currentUser: user,
        });
      }
    });
  }

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
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        console.log(response);
        this.setState({
          currentUser: response.user,
        });
      })
      .catch((error) => {
        this.setState({
          message: error.message,
        });
      });
  };

  render() {
    const { message, currentUser } = this.state;
    if (currentUser) {
      return (
        <div className="loginForm">
          <p>Hello {currentUser.email}</p>
          <button onClick={this.logout}>Logout</button>
        </div>
      );
    }
    return (
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

        <button>Login</button>
      </form>
    );
  }
}

export default LoginForm;
