import React from 'react';
/**
 * @returns a login form with email and password fields
 * @param email
 * @param password
 * @param handleEmail
 * @param handlePassword
 * @author Matas Pugzlys w19006600
 */
export default class LoginForm extends React.Component {

    render() {
        return (
            <div>
                <div className="flex justify-center md:mt-10">
                    <div className="card shadow-2xl md:w-96 w-full">
                        <div className="card-body">
                            <h2 className="card-title">Enter your details</h2>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type='email'
                                    placeholder='Email'
                                    value={this.props.email}
                                    onChange={this.props.handleEmail}
                                    className="input input-bordered"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type='password'
                                    placeholder='password'
                                    value={this.props.password}
                                    onChange={this.props.handlePassword}
                                    className="input input-bordered"
                                />
                            </div>
                            <div className="justify-start card-actions">
                                <button className="btn btn-outline" onClick={this.props.handleLoginClick}>Log in</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}