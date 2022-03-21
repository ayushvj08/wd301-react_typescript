import React, { useState } from "react";

export function LabellebInput(props: { key: Number, id: number, value: any, label: string, fieldtype: string, removeFieldCB: (id: number) => void }) {
    const [value, setInputValue] = useState(props.value);

    return (
        <>
            <label>{props.label}</label>
            <div className="flex gap-2">
                <input className='border-2 border-gray-200 rounded-lg pd-2 m-2 flex-1' onChange={e => setInputValue(e.target.value)} value={value} type={props.fieldtype} />
                <button onClick={_ => props.removeFieldCB(props.id)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 mx-2 rounded-lg'>Remove</button>
            </div>
        </>
    )
}