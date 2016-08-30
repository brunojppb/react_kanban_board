import React, { Component } from 'react';

const styles = {
  root: {
    textAlign: 'center',
  },
  alert: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#e9ab2b'
  }
};

class ServerError extends Component {

  render() {
    return(
      <div style={styles.root}>
        <div style={styles.alert}>&#9888; </div>
        {/* &#9888; is the html entity code for the warning character */}
        <h1>Ops, We hava problem</h1>
        <p>Sorry, we couldn't access the repositories. Please trye again in a few seconds</p>
      </div>
    );
  }

}

export default ServerError;
