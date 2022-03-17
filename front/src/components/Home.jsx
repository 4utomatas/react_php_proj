import React, { Component } from 'react';
import CatImage from "../images/cat.jpg";
import RandomPaper from "./RandomPaper";

/**
 * Home Page component, displays an image and one random Paper
 * @author Matas Pugzlys w19006600
 */
export default class Home extends Component {
    render() {
        return (
            <div className="lg:mx-24">
                <div className="prose mb-3 max-w-2xl">
                    <h1>Home Page</h1>
                    <p>
                        This website is part of the Northumbria University
                        coursework for module KF6012.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    <div className="card shadow-lg">
                        <div className="card-body">
                            <h2 className="card-title">My cat</h2>
                            <p>A copyright-free image.</p>
                        </div>
                        <figure className="flex justify-center mb-8">
                            <div className="mx-8 max-w-sm">
                                <img
                                    src={CatImage}
                                    className="rounded-lg"
                                    alt="A Siamese cat with sharp ears and blue eyes looking at the camera."
                                />
                            </div>
                        </figure>
                    </div>
                    <div className="col-span-2">
                        <RandomPaper />
                    </div>
                </div>
            </div>
        );
    }
}
