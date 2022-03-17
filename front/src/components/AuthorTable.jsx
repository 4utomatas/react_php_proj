import React, { Component } from "react";
import TablePagination from "./TablePagination";
import AuthorTableRow from "./AuthorTableRow";

/**
 * Displays an Author table with pagination
 * @param items
 * @param pageSize
 * @param handleAuthorChange
 * @author Matas Pugzlys w19006600
 */
export default class AuthorTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [], // items for table rows
            page: 1, // current page
            selectedItem: null, // item displayed in the modal
            isModalOpen: false,
        };
        this.handleNextClick = this.handleNextClick.bind(this);
        this.handlePreviousClick = this.handlePreviousClick.bind(this);
        this.isCurrentPageLastPage = this.isCurrentPageLastPage.bind(this);
    }

    componentDidMount() {
        this.setState({ items: this.props.items });
    }
    // Check if the list of authors changed from filtering/loading
    componentDidUpdate(previousProps) {
        if (this.props.items !== previousProps.items) this.setState({ items: this.props.items, page: 1 });
    }
    // go to the next page of the table
    handleNextClick() {
        this.setState({ page: this.state.page + 1 });
    }
    // go to previous page
    handlePreviousClick() {
        this.setState({ page: this.state.page - 1 });
    }
    // Check if the current page is the last page
    isCurrentPageLastPage() {
        return this.state.page >= Math.ceil(this.state.items.length / this.props.pageSize);
    }

    render() {
        const headings = ["Row", "Full name", "Papers"];
        const tableHeadings = headings.map((el, index) => <th key={index}>{el}</th>);

        let rowNumber = 1 + (this.state.page - 1) * this.props.pageSize;
        const items = this.state.items.slice(
            this.state.page * this.props.pageSize - this.props.pageSize,
            this.state.page * this.props.pageSize
        );

        return (
            <div>
                <div>
                    <table className="table table-compact w-full">
                        <thead>
                            <tr>{tableHeadings}</tr>
                        </thead>
                        <tbody>
                            {items.map((el) => {
                                return (
                                    <AuthorTableRow
                                        item={el}
                                        key={rowNumber}
                                        rowNumber={rowNumber++}
                                        setSelectedItem={this.props.handleAuthorChange}
                                    />
                                );
                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colSpan={headings.length}>
                                    Total records: {this.state.items.length}
                                </th>
                            </tr>
                        </tfoot>
                    </table>
                    {items.length === 0 ? <p>No items found</p> : null}
                </div>
                <TablePagination
                    page={this.state.page}
                    handleNextClick={this.handleNextClick}
                    handlePreviousClick={this.handlePreviousClick}
                    isCurrentPageLastPage={this.isCurrentPageLastPage}
                />
            </div>
        );
    }
}
