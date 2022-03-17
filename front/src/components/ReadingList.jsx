import React, { Component } from "react";
import DataController from "../shared/DataController";
import Paper from "../models/Paper";
import { GetToken, IsAuthenticated } from "../shared/AuthenticationHandler";
import PaperTable from "./PaperTable";
import Login from "./Login";
import LoadingButton from "./LoadingButton";
import ErrorAlert from "./ErrorAlert";
import SuccessAlert from "./SuccessAlert";

/**
 * @returns a User's Reading List page of papers that they read
 * @author Matas Pugzlys w19006600
 */
export default class ReadingList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            unfilteredList: [],
            loading: true,
            isAuthenticated: IsAuthenticated(),
            isErrorAlertHidden: true,
            isSuccessAlertHidden: true,
        };
        this.controller = new DataController("readinglist", "POST");
        this.reloadPaperList = this.reloadPaperList.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.handleErrorAlertClick = this.handleErrorAlertClick.bind(this);
        this.handleSuccessAlertClick = this.handleSuccessAlertClick.bind(this);
    }

    async componentDidMount() {
        await this.fetchData();
    }

    // Keep showing loading if the unfiltered list is empty
    async componentDidUpdate() {
        if (this.state.isAuthenticated && this.state.unfilteredList.length === 0)
            await this.fetchData();
        if (this.state.unfilteredList.length > 0 && this.state.loading)
            this.setState({ loading: false });
    }

    // Get models.Paper items for the user's reading list using the token
    async fetchData() {
        if (!IsAuthenticated()) return;

        const formData = new FormData();
        formData.append("token", GetToken());
        this.controller.data = formData;
        if (!IsAuthenticated()) {
            this.setState({ isErrorAlertHidden: false });
            return;
        }
        const data = await this.controller.fetchData();
        const items = data.map((el) => new Paper(el));
        this.setState({ results: items, unfilteredList: items, loading: false });
    }

    /**
     * This is a function for PaperReadingListBtn,
     * where it is used to let the component know to reload and update the list,
     * as it has changed or the application state has changed.
     */
    async reloadPaperList() {
        // check if the user is not authenticated,
        // this means the operation to add/remove the item to the reading list failed
        if (!IsAuthenticated())
            this.setState({ isErrorAlertHidden: false, isAuthenticated: IsAuthenticated() });
        else this.setState({ isSuccessAlertHidden: false });
        await this.fetchData();
    }

    /**
     * Resets component state, so it reloads and proceeds with loading
     */
    handleAuthentication() {
        this.setState({
            isAuthenticated: IsAuthenticated(),
            loading: true,
            unfilteredList: [],
            results: [],
            isErrorAlertHidden: true,
            isSuccessAlertHidden: true,
        });
    }

    handleErrorAlertClick() {
        this.setState({ isErrorAlertHidden: true });
    }

    handleSuccessAlertClick() {
        this.setState({ isSuccessAlertHidden: true });
    }

    render() {
        if (!this.state.isAuthenticated)
            return (
                <div>
                    <ErrorAlert
                        isAlertHidden={this.state.isErrorAlertHidden}
                        message="You are no longer logged in, please log in again to see your reading list."
                        handleAlertClick={this.handleErrorAlertClick}
                    />
                    <Login handleAuthentication={this.handleAuthentication} />
                </div>
            );
        if (this.state.loading) return <LoadingButton />;
        if (!this.state.loading)
            return (
                <div>
                    <div className="prose mb-3">
                        <h1>Reading List</h1>
                    </div>
                    <SuccessAlert
                        isAlertHidden={this.state.isSuccessAlertHidden}
                        message="Action performed successfully."
                        handleAlertClick={this.handleSuccessAlertClick}
                    />
                    <PaperTable
                        items={this.state.results}
                        pageSize={10}
                        reloadPaperList={this.reloadPaperList}
                    />
                    <Login handleAuthentication={this.handleAuthentication} />
                </div>
            );
    }
}
