import React from "react";
import { NavLink } from "react-router-dom";

/**
 * Navigation component displays links that are available on the website
 * @property links - an array of objects of structure: title, url, key
 * @author Matas Pugzlys w19006600
 */
export default class Navigation extends React.Component {
    render() {
        return (
            <div className="navbar shadow-lg bg-neutral text-neutral-content rounded-box mx-2 md:mx-4 my-2 ">
                <div className="px-2 mx-2 navbar-start">
                    <span className="text-lg font-bold">Matas Pugzlys</span>
                </div>
                <div className="hidden px-2 mx-2 navbar-center lg:flex">
                    <div className="flex items-stretch">
                        {this.props.links.map((obj) => (
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? "btn btn-ghost btn-sm rounded-btn text-error"
                                        : "btn btn-ghost btn-sm rounded-btn"
                                }
                                key={obj.key}
                                to={obj.url}
                            >
                                {obj.title}
                            </NavLink>
                        ))}
                    </div>
                </div>
                <div className="navbar-end">
                    <div className="dropdown dropdown-end lg:hidden">
                        <div tabIndex="0" className="m-1 btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block w-6 h-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </div>
                        <ul
                            tabIndex="0"
                            className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52 text-base-content"
                        >
                            {this.props.links.map((obj, key) => (
                                <li key={key}>
                                    <NavLink
                                        className={({ isActive }) =>
                                            isActive
                                                ? "btn btn-ghost btn-sm rounded-btn text-error"
                                                : "btn btn-ghost btn-sm rounded-btn"
                                        }
                                        key={obj.key}
                                        to={obj.url}
                                    >
                                        {obj.title}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
