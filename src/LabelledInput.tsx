import React from "react";

export function LabellebInput(props: { key: Number, label: string, fieldtype: string }) {
    return (<React.Fragment >

        <label>{props.label}</label>
        <input className='border-2 border-gray-200 rounded-lg pd-2 m-2 w-full ' type={props.fieldtype} />
    </React.Fragment>
    )
}