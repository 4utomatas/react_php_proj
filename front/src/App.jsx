import React, { Component } from 'react';
import { BrowserRouter } from "react-router-dom";
import Routing from "./components/Routing";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

/**
 * Base component that defines the layout of the page and contains routing
 * @author Matas Pugzlys w19006600
 */
export default class App extends Component {
    render() {
        // An easier way to manage links for the Navigation Bar
        const links = [];
        links.push(
            { title: "Home", url: "/", key: "home" },
            { title: "Papers", url: "papers", key: "papers" },
            { title: "Authors", url: "authors", key: "authors" },
            { title: "Reading List", url: "readinglist", key: "readinglist"},
        );
        return (
            <BrowserRouter>
            <div className="flex flex-col h-screen justify-between">
                <Navigation links={links} />
                <div className="mx-2 md:mx-7 mb-auto">
                    <Routing />
                </div>
                <Footer/>
            </div>
        </BrowserRouter>
        )
    }
}
