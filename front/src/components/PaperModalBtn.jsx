import React, { Component } from "react";

/**
 * @returns a button with a document icon for opening a modal
 * @param itemId
 * @param setSelectedItem
 * @author Matas Pugzlys w19006600
 */
export default class PaperModalBtn extends Component {
    render() {
        if (this.props.itemId != null)
            return (
                    <button className="btn btn-ghost btn-xs" onClick={() => this.props.setSelectedItem(this.props.itemId)}>
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
            );
        return null;
    }
}
