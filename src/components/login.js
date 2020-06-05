import React, { Component } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Redirect } from "react-router-dom";

firebase.initializeApp({
  apiKey: "AIzaSyAEb9BAOfMADsDd2nrSn5-8yWy00N3C-FI",
  authDomain: "fir-authentication-64ffa.firebaseapp.com",
});

export default class Login extends Component {
  state = { isSignedIn: false };
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccess: () => false,
    },
  };

  componentDidMount = () => {
    firebase.auth().signOut();
    localStorage.removeItem("user");
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ isSignedIn: !!user });
      console.log("user", user);
    });
  };

  render() {
    if (this.state.isSignedIn) {
      localStorage.setItem("user", firebase.auth().currentUser.displayName);
      return <Redirect to="/dashboard" />;
    }
    return (
      <div className="App">
        {this.state.isSignedIn ? (
          <span>
            <div>Signed In!</div>
            <h1>Welcome {}</h1>
          </span>
        ) : (
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}
      </div>
    );
  }
}
