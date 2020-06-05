import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class Header extends Component {
  state = {
    user: true,
  };

  componentDidMount = () => {
    console.log(localStorage.getItem("user"));

    this.setState({ user: localStorage.getItem("user") });
  };

  logOut = () => {
    this.setState({ user: null });
  };
  render() {
    if (!this.state.user) {
      return <Redirect to="/" />;
    }
    return (
      <nav className="navbar navbar-light bg-dark">
        <button type="button" className="btn btn-primary">
          welcome {localStorage.getItem("user")}
        </button>
        <ul className="navbar-nav">
          <li className="nav-item active">
            <button onClick={this.logOut}>Sign out!</button>
          </li>
          <li></li>
        </ul>
      </nav>
    );
  }
}
