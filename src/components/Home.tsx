import React from "react";
import logo from "../logo.svg";

export function Home(props: { openFormCB: () => void }) {
    return (
        <div className='flex flex-col justify-center'>
            <div className="flex items-center">
                <img src={logo} className="h-48" />
                <p>Welcome to the Home Page</p>
            </div>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg'
                onClick={props.openFormCB}
            >Open Form</button>
        </div>

    )
}