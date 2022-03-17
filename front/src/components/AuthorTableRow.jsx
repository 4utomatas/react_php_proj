import React, { Component } from "react";

/**
 * @returns a table row with details of models.Author object
 * @param item typeof Author
 * @param setSelectedItem
 * @param rowNumber row number in table
 * @author Matas Pugzlys w19006600
 */
export default class AuthorTableRow extends Component {
    render() {
        const item = this.props.item;
        return (
            <tr key={this.props.rowNumber}>
                <td>{this.props.rowNumber}</td>
                <td>{item.getFullName()}</td>
                <td>
                    <button
                        className="btn btn-ghost btn-xs"
                        onClick={() => this.props.setSelectedItem(item)}
                    >
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
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                        </svg>
                    </button>
                </td>
            </tr>
        );
    }
}
