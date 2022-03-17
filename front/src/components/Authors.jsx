import React, { Component } from "react";
import Author from "../models/Author";
import DataController from "../shared/DataController";
import AuthorPapers from "./AuthorPapers";
import AuthorSearch from "./AuthorSearch";
import AuthorTable from "./AuthorTable";
import LoadingButton from "./LoadingButton";

/**
 * Displays Authors Page with Authors list and Authors' papers
 * @param author
 * @author Matas Pugzlys w19006600
 */
export default class Authors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            unfilteredList: [],
            loading: true,
            selectedAuthor: null,
            searchName: "",
        };
        this.controller = new DataController("authors");
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSearchBtnClick = this.handleSearchBtnClick.bind(this);
    }

    async componentDidMount() {
        await this.fetchData();
    }

    async fetchData() {
        const data = await this.controller.fetchData();
        const items = data.map((el) => new Author(el));
        this.setState({ results: items, unfilteredList: items, loading: false });
    }
    // Set the author whose papers will be displayed
    handleAuthorChange(author) {
        this.setState({ selectedAuthor: author });
    }
    // for the Search Name functionality; standard way of handling a form field
    handleNameChange(e) {
        this.setState({ searchName: e.target.value });
    }
    // Filter authors on button click
    handleSearchBtnClick() {
        if (this.state.searchName.trim() !== "") {
            const items = this.state.unfilteredList.filter((el) =>
                el.getFullName().includes(this.state.searchName)
            );
            this.setState({ results: items });
        } else {
            this.setState({ results: this.state.unfilteredList });
        }
    }

    render() {
        if (this.state.loading) return <LoadingButton />;

        if (!this.state.loading)
            return (
                <div>
                    <div className="prose mb-3">
                        <h1>Authors</h1>
                    </div>
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        <div>
                            <AuthorSearch
                                name={this.state.searchName}
                                handleNameChange={this.handleNameChange}
                                handleSearchBtnClick={this.handleSearchBtnClick}
                            />
                            <AuthorTable
                                items={this.state.results}
                                pageSize={15}
                                handleAuthorChange={this.handleAuthorChange}
                            />
                        </div>
                        {this.state.selectedAuthor != null ? (
                            <div className="md:col-span-2">
                                <div className="prose mb-3">
                                    <h2>Author's papers</h2>
                                </div>
                                <AuthorPapers author={this.state.selectedAuthor} />
                            </div>
                        ) : null}
                    </div>
                </div>
            );
    }
}
