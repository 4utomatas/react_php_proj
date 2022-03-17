import React, { Component } from "react";
import PaperModalBtn from "./PaperModalBtn";
import PaperReadingListBtn from "./PaperReadingListBtn";
import { IsAuthenticated } from "../shared/AuthenticationHandler";

/**
 * @returns a table row
 * @param item typeof Paper
 * @param rowNumber item's rownumber in the list
 * @param reloadPaperList used on a button click for PaperReadingListBtn
 * @author Matas Pugzlys w19006600
 */
export default class PaperTableRow extends Component {
    render() {
        const item = this.props.item;
        return (
            <tr key={this.props.rowNumber}>
                <td>{this.props.rowNumber}</td>
                {/* There is a dedicated button to open the Modal that provides more information, but this is added to comply with the Assessment Brief */}
                <td>
                    <button
                        className="link"
                        onClick={() => this.props.setSelectedItem(item.id)}
                    >
                        {item.title}
                    </button>
                </td>
                <td>
                    {/* Handle records that do not have a link provided */}
                    {item.doi !== "NONE" && item.doi !== "" ? (
                        <a
                            className="link link-primary"
                            href={item.doi}
                            target="_blank"
                            rel="noreferrer"
                        >
                            DOI
                        </a>
                    ) : null}
                </td>
                <td>
                    {item.preview !== "NONE" && item.preview !== "" ? (
                        <a
                            className="link link-primary"
                            href={item.preview}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Preview
                        </a>
                    ) : null}
                </td>
                <td>
                    {item.video !== "NONE" && item.video !== "" ? (
                        <a
                            className="link link-primary"
                            href={item.video}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Video
                        </a>
                    ) : null}
                </td>
                <td>
                    <PaperModalBtn itemId={item.id} setSelectedItem={this.props.setSelectedItem} />
                </td>
                {/* Only shown to authenticated users */}
                {IsAuthenticated() ? (
                    <td>
                        <PaperReadingListBtn
                            paperId={item.id}
                            isInReadingList={item.isInReadingList}
                            reloadPaperList={this.props.reloadPaperList}
                        />
                    </td>
                ) : null}
            </tr>
        );
    }
}
