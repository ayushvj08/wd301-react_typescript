import React from "react";
import logo from "../logo.svg";

export function Home() {
    return (
        <div className="flex items-center">

            <img src={logo} className="h-48" />
            <p>Welcome to the Home Page</p>
        </div>

    )
}