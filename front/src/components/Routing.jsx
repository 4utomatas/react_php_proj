import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Papers from "./Papers";
import Authors from "./Authors";
import NotFound from "./NotFound";
import ReadingList from "./ReadingList";

/**
 * @returns Routes to all components in the system with their paths
 * @author Matas Pugzlys w19006600
 */
export default class Routing extends Component {
    render() {
        return (
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="papers" element={<Papers />}>
                    <Route path=":id" element={<Papers />} />
                </Route>
                <Route path="authors" element={<Authors />} />
                <Route path="readinglist" element={<ReadingList />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        );
    }
}
