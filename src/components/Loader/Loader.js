import React from "react";
import "./Loader.css";

const Loader = (props) => {
    return (
        <div className="loader">
            <div className="loader__wrapper">
                <h1 className="loader__message">
                    {props.message.toUpperCase()}
                </h1>
                <div className="loader-container">
                    <div className="spinner"></div>
                </div>
            </div>
        </div>
    );
};

export default Loader;
