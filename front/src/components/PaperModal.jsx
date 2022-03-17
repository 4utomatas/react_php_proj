import React, { Component } from "react";

/**
 * @returns Modal box, which displays paper details.
 * @param isModalOpen
 * @param paper
 * @param handleModalClose
 * @author Matas Pugzlys w19006600
 */
export default class PaperModal extends Component {
    render() {
        // https://daisyui.com/components/modal Modal is opened/closed by adding/removing the modal-open class
        const modalClassName = this.props.isModalOpen ? "modal modal-open" : "modal";
        return (
            <div className={modalClassName}>
                <div className="modal-box md:max-w-2xl flex justify-center">
                    <div>
                        {this.props.paper != null ? (
                            <div className="prose">
                                <h2>{this.props.paper.title}</h2>
                                <h3>Abstract</h3>
                                <p>{this.props.paper.abstract}</p>
                                <h3>Authors</h3>
                                <p>{this.props.paper.authors}</p>
                            </div>
                        ) : (
                            "Information unavailable"
                        )}
                        <div className="modal-action">
                            <button className="btn" onClick={this.props.handleModalClose}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
