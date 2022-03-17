import React, { Component } from "react";
import { GetToken, IsAuthenticated } from "../shared/AuthenticationHandler";
import DataController from "../shared/DataController";

/**
 * @returns a button that lets the user add or remove the paper from their reading list
 * @param paperId
 * @param isInReadingList
 * @param reloadPaperList used on button click
 * @author Matas Pugzlys w19006600
 */
export default class PaperReadingListBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isBtnDisabled: false,
        };

        this.handleBtnClick = this.handleBtnClick.bind(this);
    }

    async handleBtnClick() {
        this.setState({ isBtnDisabled: true });
        
        if (IsAuthenticated() && this.props.paperId != null) {
            const formData = new FormData();
            formData.append("token", GetToken());
            if (this.props.isInReadingList) formData.append("remove", this.props.paperId);
            else formData.append("add", this.props.paperId);

            const controller = new DataController("readinglist", "POST", formData);
            await controller.fetchData();
        }
        // Let parent component know the status was updated and it needs to reload to display it
        if (this.props.reloadPaperList) await this.props.reloadPaperList();

        this.setState({ isBtnDisabled: false });
    }

    render() {
        if (this.props.isInReadingList)
            return (
                <button className="btn btn-error btn-xs btn-circle" onClick={this.handleBtnClick} disabled={this.state.isBtnDisabled} >
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
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            );
        return (
            <button className="btn btn-success btn-xs btn-circle" onClick={this.handleBtnClick} disabled={this.state.isBtnDisabled} >
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
                        d="M12 4v16m8-8H4"
                    />
                </svg>
            </button>
        );
    }
}
