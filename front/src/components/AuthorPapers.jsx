import React, { Component } from "react";
import DataController from "../shared/DataController";
import Paper from "../models/Paper";
import PaperTable from "./PaperTable";
import LoadingButton from "./LoadingButton";
import { IsAuthenticated, GetToken } from "../shared/AuthenticationHandler";
import ErrorAlert from "./ErrorAlert";

/**
 * Displays a Paper Table with a selected author
 * @param author
 * @author Matas Pugzlys w19006600
 */
export default class AuthorPapers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            unfilteredList: [],
            loading: true,
            isAlertHidden: true,
        };
        this.controller = new DataController("papers");
        this.reloadPaperList = this.reloadPaperList.bind(this);
        this.handleAlertClick = this.handleAlertClick.bind(this);
    }

    async componentDidMount() {
        await this.fetchData();
    }

    async componentDidUpdate(previousProps) {
        if (this.props.author !== previousProps.author) await this.fetchData();
    }
    /**
     * based on user authentication, a different query will be executed
     * @async
     */
    async fetchData() {
        if (this.props.author) {
            let data;
            if (IsAuthenticated()) {
                const formData = new FormData();
                formData.append("token", GetToken());
                formData.append("authorid", this.props.author.id);
                const extendedController = new DataController("papers", "POST", formData);
                data = await extendedController.fetchData();
                // Check if still authenticated as the DataController will removeToken if the server sends 401
                if (!IsAuthenticated()) {
                    this.setState({ isAlertHidden: false });
                    await this.fetchData(); // refetch data if the user is no longer authorised
                } else {
                    const items = data.map((el) => new Paper(el));
                    this.setState({ results: items, unfilteredList: items, loading: false });
                }
            } else {
                this.controller.urlParams = `authorid=${this.props.author.id}`;
                data = await this.controller.fetchData();
                const items = data.map((el) => new Paper(el));
                this.setState({ results: items, unfilteredList: items, loading: false });
            }
        }
    }

    async reloadPaperList() {
        // check if the user is not authenticated, 
        // this means the operation to add/remove the item to the reading list failed
        if(!IsAuthenticated()) 
            this.setState({ isAlertHidden: false });
        await this.fetchData();
    }

    handleAlertClick() {
        this.setState({ isAlertHidden: true });
    }

    render() {
        if (this.state.loading) return <LoadingButton />;
        if (!this.state.loading)
            return (
                <div>
                    <ErrorAlert
                        isAlertHidden={this.state.isAlertHidden}
                        message="You are no longer logged in, please log in again to be able to add papers to your reading list."
                        handleAlertClick={this.handleAlertClick}
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
