import React from "react";
import firebase from "firebase/app";
import { PropTypes } from "prop-types";

const SignIn = ({ auth }) => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return <button onClick={signInWithGoogle}>Sign in with Google</button>;
};

SignIn.defaultProps = {
  auth: {},
};
SignIn.propTypes = {
  auth: PropTypes.object,
};

export default SignIn;
