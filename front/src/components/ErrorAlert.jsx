import React, { Component } from 'react'
/**
 * Displays a Alert with a specified message
 * @param isAlertHidden
 * @param handleAlertClick
 * @param message displayed message
 * @author Matas Pugzlys w19006600
 */
export default class ErrorAlert extends Component {
    render() {
        let alertClassName;
        if (this.props.isAlertHidden) 
            alertClassName = "alert alert-error mb-3 hidden";
        else alertClassName = "alert alert-error mb-3";
        
        return (
            <div className={alertClassName}>
                <div className="flex-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="w-6 h-6 mx-2 stroke-current"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                        ></path>
                    </svg>
                    <label>{this.props.message}</label>
                </div>
                <div className="flex-none">
                    <button className="btn btn-sm btn-ghost btn-square" onClick={this.props.handleAlertClick}>
                        <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        )
    }
}
