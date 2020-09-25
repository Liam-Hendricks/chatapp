import React from 'react';
import {PropTypes} from 'prop-types';
const SignOut=({auth})=>{
    return auth.currentUser && (
      <button onClick={()=>auth.signOut()}> Sign Out</button>
    )
  }

SignOut.defaultProps = {
    auth: {}
};
SignOut.propTypes = {
    auth: PropTypes.object
};
export default SignOut;