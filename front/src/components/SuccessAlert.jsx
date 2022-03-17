import React, { Component } from "react";
/**
 * Displays a Alert with a specified message
 * @param isAlertHidden
 * @param handleAlertClick
 * @param message displayed message
 * @author Matas Pugzlys w19006600
 */
export default class SuccessAlert extends Component {
    render() {
        let alertClassName;
        if (this.props.isAlertHidden) alertClassName = "alert alert-success mb-3 hidden";
        else alertClassName = "alert alert-success mb-3";

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
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                    </svg>
                    <label>{this.props.message}</label>
                </div>
                <div className="flex-none">
                    <button
                        className="btn btn-sm btn-ghost btn-square"
                        onClick={this.props.handleAlertClick}
                    >
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
        );
    }
}
