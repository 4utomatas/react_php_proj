import React, { Component } from "react";

/**
 * Displays a Author filtering by Name
 * @param name
 * @param handleNameChange
 * @param handleSearchBtnClick
 * @author Matas Pugzlys w19006600
 */
export default class AuthorSearch extends Component {
    render() {
        return (
            <div className="p-10 card bg-base-200 my-3">
                <div className="prose">
                    <h2>Search</h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="form-control max-w-xs lg:col-span-2">
                        <label className="label">
                            <span className="label-text">Author name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Author's name..."
                            className="input"
                            onChange={this.props.handleNameChange}
                            value={this.props.name}
                        />
                    </div>
                    <div className="form-control max-w-xs flex flex-col justify-end">
                        <button
                            className="btn btn-primary"
                            onClick={this.props.handleSearchBtnClick}
                        >
                            <span className="lg:hidden 2xl:block">Search</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
