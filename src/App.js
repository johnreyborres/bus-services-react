import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import AddBus from './AddBus';
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginError: false,
      isLoggingIn: false,
      isLoading: false,
      username: '',
      password: '',
    };
  }

  handleGetRequestParams = () => {
    return this.props.location.search;
  }

  handleRedirect = (url) => {
    this.props.history.push(url);
  }

  handleLoginError = () => {
    this.setState({ loginError: true, isLoggingIn: false });
  }

  handleUsernameChange = (e) => {
    this.setState({username: e.target.value});
  }

  handlePasswordChange = (e) => {
    this.setState({password: e.target.value});
  }

  handleLogin = (e) => {
    this.setState({isLoggingIn: true, loginError: false});
    var url = 'http://localhost/oauth/token';
    var data = {
      grant_type: 'password',
      client_id: '2',
      client_secret: 'QTNG08Qmy3X205VoBy1vVgLJrjWyNw5B97pUfI9C',
      username: this.state.username,
      password: this.state.password,
      scope: ''
    };

    axios.post(url, data).then(res => {
      localStorage.setItem('auth', res.data.access_token);
      this.setState({isLoggingIn: false});
      this.handleRedirect('/home');
    }).catch(err => {
      this.handleLoginError(err);
    });
  }

  handleLogout = () => {
    localStorage.removeItem('auth');
    this.handleRedirect('/login');
  }

  render() {
    return (
        <div className="App">
          <Switch>
            <Route exact path="/login">
              <Login handleUsernameChange={this.handleUsernameChange} handlePasswordChange={this.handlePasswordChange} handleLogin={this.handleLogin} {...this.state} />
            </Route>
            <Route exact path="/home">
              <Home
                  handleRedirect={this.handleRedirect}
                  handleLogout={this.handleLogout}
                  {...this.state}
              />
            </Route>
            <Route exact path="/add-bus">
              <AddBus
                  handleRedirect={this.handleRedirect}
                  handleGetRequestParams={this.handleGetRequestParams}
                  {...this.state}
              />
            </Route>
            <Redirect from="/" to="/login" />
          </Switch>
        </div>
    );
  }
}

export default withRouter(App);
