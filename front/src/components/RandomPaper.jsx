import React, { Component } from "react";
import DataController from "../shared/DataController";
import Paper from "../models/Paper";
import PaperCard from "./PaperCard";
import LoadingButton from "./LoadingButton";
/**
 * @returns a random paper's information from DB
 * @author Matas Pugzlys w19006600
 */
export default class RandomPaper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
        };
        this.controller = new DataController("papers");
        this.urlParams = "";
    }

    async componentDidMount() {
        await this.fetchData();
    }

    async fetchData() {
        this.controller.urlParams = "id=random";
        const data = await this.controller.fetchData();
        const items = data.map((el) => new Paper(el));
        this.setState({ results: items });
    }

    render() {
        if(this.state.results.length > 0)
            return (
                <PaperCard item={this.state.results[0]}/>
            );
        return (<LoadingButton />);
    }
}
