import React, { Component } from "react";
import { IsAuthenticated } from "../shared/AuthenticationHandler";
import PaperModal from "./PaperModal";
import PaperTableRow from "./PaperTableRow";
import TablePagination from "./TablePagination";

/**
 * @returns a table with with pagination and a modal for additional information about the item.
 * @param items typeof Paper
 * @param pageSize how many items per page
 * @param reloadPaperList used on a button click for PaperReadingListBtn
 * @author Matas Pugzlys w19006600
 */
export default class PaperTable extends Component {
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
        this.setSelectedItem = this.setSelectedItem.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
    }

    componentDidMount() {
        this.setState({ items: this.props.items });
    }

    componentDidUpdate(previousProps) {
        if (this.props.items !== previousProps.items) this.setState({ items: this.props.items });
        // if there are less records than before,
        // the user may be left in a page with no records, so go to page 1
        if (this.props.items.length !== previousProps.items.length) this.setState({ page: 1 });
    }

    // go to the next page of the table
    handleNextClick() {
        this.setState({ page: this.state.page + 1 });
    }

    // go to previous page
    handlePreviousClick() {
        this.setState({ page: this.state.page - 1 });
    }

    // Set the item that is displayed in the modal and open the modal
    setSelectedItem(itemId) {
        const item = this.state.items.find((el) => el.id === itemId);
        if (item != null) {
            this.setState({ selectedItem: item, isModalOpen: true });
        }
    }

    // Check if the current page is the last page
    isCurrentPageLastPage() {
        return this.state.page >= Math.ceil(this.state.items.length / this.props.pageSize);
    }

    // Close the modal
    handleModalClose() {
        this.setState({ isModalOpen: false });
    }

    render() {
        const headings = ["Row", "Title", "DOI", "Preview", "Video", "About"];
        if (IsAuthenticated()) {
            headings.push("Read");
        }
        const tableHeadings = headings.map((el, index) => <td key={index}>{el}</td>);

        let rowNumber = 1 + (this.state.page - 1) * this.props.pageSize;
        const items = this.state.items.slice(
            this.state.page * this.props.pageSize - this.props.pageSize,
            this.state.page * this.props.pageSize
        );

        return (
            <div>
                <div className="overflow-x-auto">
                    <table className="table w-full table-compact">
                        <thead>
                            <tr>{tableHeadings}</tr>
                        </thead>
                        <tbody>
                            {items.map((el) => {
                                return (
                                    <PaperTableRow
                                        item={el}
                                        key={rowNumber}
                                        rowNumber={rowNumber++}
                                        setSelectedItem={this.setSelectedItem}
                                        reloadPaperList={this.props.reloadPaperList}
                                    />
                                );
                            })}
                        </tbody>
                    </table>
                    {items.length === 0 ? <p>No items found</p> : null}
                </div>
                <TablePagination
                    page={this.state.page}
                    handleNextClick={this.handleNextClick}
                    handlePreviousClick={this.handlePreviousClick}
                    isCurrentPageLastPage={this.isCurrentPageLastPage}
                />
                <PaperModal
                    paper={this.state.selectedItem}
                    isModalOpen={this.state.isModalOpen}
                    handleModalClose={this.handleModalClose}
                />
            </div>
        );
    }
}
