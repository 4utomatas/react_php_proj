import React, { Component } from "react";

/**
 * Displays the buttons that are used to change the table's page
 * @returns pagination component
 * @param handlePreviousClick go to previous page
 * @param handleNextClick go to next page
 * @param page current page number
 * @param isCurrentPageLastPage check if current page is last
 * @author Matas Pugzlys w19006600
 */
export default class TablePagination extends Component {
    render() {
        return (
            <div className="btn-group mt-4 justify-center">
                <button
                    className="btn"
                    onClick={this.props.handlePreviousClick}
                    disabled={this.props.page <= 1}
                >
                    Previous
                </button>
                <button className="btn btn-disabled">{this.props.page}</button>
                <button
                    className="btn"
                    onClick={this.props.handleNextClick}
                    disabled={this.props.isCurrentPageLastPage()}
                >
                    Next
                </button>
            </div>
        );
    }
}
