import React from "react";
import logo from "./logo.svg";

export default function Header(props: { title: string }) {
    return (
        <div className="flex items-center gap-2">
            <img
                src={logo}
                className="animate-spin h-12 w-12"
                alt="logo"
                style={{ animation: "spin 2s linear infinite" }}
            />
            <h1 className="text-center text-xl flex-1">{props.title}</h1>

        </div>
    );
}
