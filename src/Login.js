import React, { Component } from 'react';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };
    }

    componentDidMount() {}

    handleLogin = (e) => {
        var data = {
            username: this.state.username,
            password: this.state.password
        };

        this.props.handleLogin(data);
    }

    render () {
        var { isLoggingIn, loginError } = this.props;

        return (
            <div className="page-wrapper">
                <div className="login-wrapper">
                    <div className="login-header">
                        <span>Welcome</span>
                    </div>
                    <div className="login-form">
                        <div className={`username`}>
                            <input
                                type="text"
                                value={this.props.username}
                                name="username"
                                onChange={this.props.handleUsernameChange}
                                disabled={isLoggingIn ? 'disabled' : '' }
                            />
                        </div>
                        <div className={`password`}>
                            <input
                                type="password"
                                value={this.props.password}
                                name="password"
                                onChange={this.props.handlePasswordChange}
                                disabled={isLoggingIn ? 'disabled' : '' }
                            />
                        </div>
                        <div className={`submit-btn ${isLoggingIn ? 'disabled' : '' }`} onClick={this.handleLogin}>
                            <span>Log In</span>
                        </div>
                    </div>
                    {
                        loginError && <div className={`login-error`}>
                            <span>There was an error logging you in.</span>
                        </div>
                    }
                </div>
            </div>
        )
    }
}