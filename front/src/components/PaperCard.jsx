import React, { Component } from "react";

/**
 * @returns a card with the information of the item
 * @param item typeof Paper
 * @author Matas Pugzlys w19006600
 */
export default class PaperCard extends Component {
    render() {
        return (
            <div className="card shadow-lg">
                <div className="card-body">
                    <h2 className="card-title">{this.props.item.title}</h2>
                    <p>{this.props.item.abstract}</p>
                    <div className="prose"><h3>Authors</h3></div>
                    <p>{this.props.item.authors}</p>
                    <div className="card-actions">
                        {/* Handle records that do not have a link provided */}
                        {this.props.item.doi !== "NONE" && this.props.item.doi !== "" ? (
                            <a
                                className="btn btn-primary"
                                href={this.props.item.doi}
                                target="_blank"
                                rel="noreferrer"
                            >
                                DOI
                            </a>
                        ) : null}
                        {this.props.item.preview !== "NONE" && this.props.item.preview !== "" ? (
                            <a
                                className="btn btn-primary"
                                href={this.props.item.preview}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Preview
                            </a>
                        ) : null}
                        {this.props.item.video !== "NONE" && this.props.item.video !== "" ? (
                            <a
                                className="btn btn-primary"
                                href={this.props.item.video}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Video
                            </a>
                        ) : null}
                    </div>
                </div>
            </div>
        );
    }
}
