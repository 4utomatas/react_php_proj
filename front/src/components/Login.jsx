import React, { Component } from "react";
import DataController from "../shared/DataController";
import LoginForm from "./LoginForm";
import { IsAuthenticated, SetToken, RemoveToken } from "../shared/AuthenticationHandler";
import ErrorAlert from "./ErrorAlert";
/**
 * Handles user authentication process
 * @returns a Login page
 * @author Matas Pugzlys w19006600
 */
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            email: "",
            password: "",
            isAlertHidden: true,
        };
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleAlertClick = this.handleAlertClick.bind(this);
    }

    componentDidMount() {
        this.setState({ authenticated: IsAuthenticated() });
    }

    handlePassword = (e) => {
        this.setState({ password: e.target.value });
    };

    handleEmail = (e) => {
        this.setState({ email: e.target.value });
    };
    /**
     * Set auth token if email and password stored in state are valid
     * @async
     */
    async handleLoginClick() {
        // dismiss the alert
        this.setState({ isAlertHidden: true });
        // Send the email and password as 'Form Data'.
        let formData = new FormData();
        formData.append("username", this.state.email.trim());
        formData.append("password", this.state.password.trim());

        let controller = new DataController("authenticate", "POST", formData);
        const result = await controller.fetchData();
        if (result && result.token) {
            // Save token in local storage
            SetToken(result.token);
            this.setState({ authenticated: IsAuthenticated() });
        } else {
            this.setState({ isAlertHidden: false });
        }
        // let the parent component know about login status
        if(this.props.handleAuthentication)
            this.props.handleAuthentication();
    }

    handleLogoutClick = () => {
        RemoveToken();
        this.setState({ authenticated: IsAuthenticated() });
        
        // let the parent component know about login status
        if(this.props.handleAuthentication)
        this.props.handleAuthentication();
    };

    handleAlertClick = () => {
        this.setState({ isAlertHidden: true });
    };

    render() {
        let page = (
            <LoginForm
                email={this.state.email}
                password={this.state.password}
                handleEmail={this.handleEmail}
                handlePassword={this.handlePassword}
                handleLoginClick={this.handleLoginClick}
            />
        );
        if (this.state.authenticated) {
            page = (
                <button className="btn btn-outline" onClick={this.handleLogoutClick}>
                    Logout
                </button>
            );
        }
        return (
            <div>
                <ErrorAlert
                    isAlertHidden={this.state.isAlertHidden}
                    handleAlertClick={this.handleAlertClick}
                    message="The email or password you entered are incorrect, please try again."
                />
                {page}
            </div>
        );
    }
}
