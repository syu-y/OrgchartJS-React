import React, { Component } from 'react';

class Login extends Component {


  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: "clientID", 
        scope: "email"
      }).then(() => {
        const auth = window.gapi.auth2.getAuthInstance();

        this.setState({ isSignedIn: auth.isSignedIn.get() });
      });
    });
  }

  renderAuth() {
    if (this.state.isSignedIn === null) {
      return <div>i dont know your google account</div>
    } else if (this.state.isSignedIn) {
      return <div>login with google!!</div>
    } else {
      return <div>I can not see your google account!!</div>
    }
  }

  loginWithGoogle = () => {
    window.gapi.auth2.getAuthInstance().signIn();
  }

  logoutFromGoogle = () => {
    window.gapi.auth2.getAuthInstance().signOut();
  }

  render() {
    return (
      <div>
        {this.renderAuth()}
        <button onClick={this.loginWithGoogle}>
          login with google
        </button>
        <button onClick={this.logoutFromGoogle}>
          logout from google
        </button>
      </div>
    );
  }
}

export default Login;
