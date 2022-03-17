import React from "react";
/**
 * Footer component, displays author's name and a message about this project
 * @author Matas Pugzlys w19006600
 */
export default class Footer extends React.Component {
    render() {
        return (
            <footer>
                <div>
                    <div className="p-2 footer footer-center text-primary-content">
                        <div className="rounded-box bg-neutral px-20 py-5">
                            <p>
                                This website is part of the Northumbria University coursework for
                                module KF6012.
                            </p>
                            <p>Created by Matas Pugzlys, student Id: 19006600.</p>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}
