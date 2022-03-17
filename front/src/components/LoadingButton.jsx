import React, { Component } from "react";

/**
 * @returns a DaisyUI standard way of displaying Loading with a spinning wheel
 * @author Matas Pugzlys w19006600
 */
export default class LoadingButton extends Component {
    render() {
        return <button className="btn btn-ghost loading">Loading</button>;
    }
}
