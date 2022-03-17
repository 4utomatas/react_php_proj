import React from "react";
import DataController from "../shared/DataController";
import Paper from "../models/Paper";
import PaperTable from "./PaperTable";
import PaperSearch from "./PaperSearch";
import { GetToken, IsAuthenticated } from "../shared/AuthenticationHandler";
import LoadingButton from "./LoadingButton";
import ErrorAlert from "./ErrorAlert";
import SuccessAlert from "./SuccessAlert";

/**
 * @returns Papers page: Papers table with filtering and pagination
 * @author Matas Pugzlys w19006600
 */
export default class Papers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            searchTitle: "",
            searchAbstract: "",
            searchAward: -1,
            unfilteredList: [],
            loading: true,
            isErrorAlertHidden: true,
            isSuccessAlertHidden: true,
        };
        this.controller = new DataController("papers");
        this.handleSearchTitleChange = this.handleSearchTitleChange.bind(this);
        this.handleSearchAbstractChange = this.handleSearchAbstractChange.bind(this);
        this.handleSearchAwardChange = this.handleSearchAwardChange.bind(this);
        this.handleSearchBtnClick = this.handleSearchBtnClick.bind(this);
        this.reloadPaperList = this.reloadPaperList.bind(this);
        this.handleErrorAlertClick = this.handleErrorAlertClick.bind(this);
        this.handleSuccessAlertClick = this.handleSuccessAlertClick.bind(this);
        this.applySearchFilters = this.applySearchFilters.bind(this);
    }

    async componentDidMount() {
        await this.fetchData();
    }

    async fetchData() {
        let data;
        if (IsAuthenticated()) {
            const formData = new FormData();
            formData.append("token", GetToken());
            const extendedController = new DataController("papers", "POST", formData);
            data = await extendedController.fetchData();
            // Check if still authenticated as the DataController will removeToken if the server sends 401
            if (!IsAuthenticated()) {
                this.setState({ isErrorAlertHidden: false, isSuccessAlertHidden: true });
                // Refetch data if the user is no longer authorised
                await this.fetchData();
            } else {
                const items = data.map((el) => new Paper(el));
                this.setState({ results: items, unfilteredList: items, loading: false });
                this.applySearchFilters();
            }
        } else {
            data = await this.controller.fetchData();
            const items = data.map((el) => new Paper(el));
            this.setState({ results: items, unfilteredList: items, loading: false });
            this.applySearchFilters();
        }
    }

    applySearchFilters() {
        if (
            this.state.searchTitle.trim() !== "" ||
            this.state.searchAbstract.trim() !== "" ||
            this.state.searchAward !== -1
        ) {
            const items = this.state.unfilteredList.filter(
                (el) =>
                    (this.state.searchTitle.trim() === "" ||
                        el.title.includes(this.state.searchTitle)) &&
                    (this.state.searchAbstract.trim() === "" ||
                        el.abstract.includes(this.state.searchAbstract)) &&
                    (this.state.searchAward === -1 || // All record regardless of the award
                        (this.state.searchAward === 0 && el.awardIds.length !== 0) || // Records with an award
                        (this.state.searchAward !== 0 &&
                            el.awardIds.includes(this.state.searchAward))) // Records with a specific award
            );
            this.setState({
                results: items,
            });
        } else {
            this.setState({ results: this.state.unfilteredList });
        }
    }

    handleSearchTitleChange(e) {
        this.setState({ searchTitle: e.target.value });
    }

    handleSearchAbstractChange(e) {
        this.setState({ searchAbstract: e.target.value });
    }

    handleSearchAwardChange(e) {
        this.setState({ searchAward: +e.target.value });
    }

    // Filter the result list with the specified parameters or their absence
    handleSearchBtnClick() {
        this.applySearchFilters();
    }

    /**
     * This is a function for PaperReadingListBtn,
     * where it is used to let the component know to reload and update the list,
     * as it has changed or the application state has changed.
     */
    async reloadPaperList() {
        // check if the user is not authenticated,
        // this means the operation to add the item to the reading list failed
        if (!IsAuthenticated())
            this.setState({ isErrorAlertHidden: false, isSuccessAlertHidden: true });
        else this.setState({ isSuccessAlertHidden: false });
        await this.fetchData();
    }

    handleErrorAlertClick() {
        this.setState({ isErrorAlertHidden: true });
    }

    handleSuccessAlertClick() {
        this.setState({ isSuccessAlertHidden: true });
    }

    render() {
        if (this.state.loading) return <LoadingButton />;

        if (!this.state.loading)
            return (
                <div>
                    <div className="prose mb-3">
                        <h1>Papers</h1>
                    </div>
                    <ErrorAlert
                        isAlertHidden={this.state.isErrorAlertHidden}
                        message="You are no longer logged in, please log in again to be able to add papers to your reading list."
                        handleAlertClick={this.handleErrorAlertClick}
                    />
                    <SuccessAlert
                        isAlertHidden={this.state.isSuccessAlertHidden}
                        message="Action performed successfully."
                        handleAlertClick={this.handleSuccessAlertClick}
                    />
                    <PaperSearch
                        title={this.state.searchTitle}
                        abstract={this.state.searchAbstract}
                        award={this.state.searchAward}
                        handleTitleChange={this.handleSearchTitleChange}
                        handleAbstractChange={this.handleSearchAbstractChange}
                        handleAwardChange={this.handleSearchAwardChange}
                        handleSearchBtnClick={this.handleSearchBtnClick}
                    />
                    <PaperTable
                        items={this.state.results}
                        pageSize={10}
                        reloadPaperList={this.reloadPaperList}
                    />
                </div>
            );
    }
}
