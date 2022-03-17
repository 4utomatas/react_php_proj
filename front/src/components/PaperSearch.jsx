import React, { Component } from "react";
import DataController from "../shared/DataController";
import Award from "../models/Award";

/**
 * @returns a card with input fields for filtering the Papers table
 * @param title filter input field value
 * @param abstract filter input field value
 * @param award filter input field value
 * @param handleTitleChange 
 * @param handleAbstractChange 
 * @param handleAwardChange 
 * @param handleSearchBtnClick filter the list 
 * @author Matas Pugzlys w19006600
 */
export default class PaperSearch extends Component {
    constructor(props) {
        super(props);
        this.state = { results: [] };
        this.controller = new DataController("awardtype");
    }

    async componentDidMount() {
        const data = await this.controller.fetchData();
        const items = data.map((el) => new Award(el));
        this.setState({ results: items });
    }

    render() {
        if (this.state.results.length > 0)
            return (
                <div className="p-10 card bg-base-200 my-3">
                    <div className="prose">
                        <h2>Search</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-6">
                        <div className="form-control max-w-xs">
                            <label className="label">
                                <span className="label-text">Title</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Type in the title"
                                className="input"
                                onChange={this.props.handleTitleChange}
                                value={this.props.title}
                            />
                        </div>
                        <div className="form-control max-w-xs">
                            <label className="label">
                                <span className="label-text">Abstract</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Type in the abstract"
                                className="input"
                                onChange={this.props.handleAbstractChange}
                                value={this.props.abstract}
                            />
                        </div>
                        <div className="form-control max-w-xs">
                            <label className="label">
                                <span className="label-text">Award</span>
                            </label>
                            <select
                                className="select"
                                onChange={this.props.handleAwardChange}
                                value={this.props.award}
                            >
                                <option value="-1">
                                    All
                                </option>
                                <option value="0">Won any award</option>
                                {this.state.results.map((el) => (
                                    <option value={el.id} key={el.id}>{el.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-control max-w-xs flex flex-col justify-end">
                            <button
                                className="btn btn-primary"
                                onClick={this.props.handleSearchBtnClick}
                            >
                                Search
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
        return null;
    }
}
