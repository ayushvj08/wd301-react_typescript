import React from "react";
import { formData } from "./Form";

export function ListForm(props: { form: formData, openFormCB: (form: formData) => void, deleteFormCB: (form: formData) => void }) {

    return (
        <div className="flex justify-around items-center">
            {props.form.title}
            <div className="flex justify-between">
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 mx-2 rounded-lg'
                    onClick={() => props.openFormCB(props.form)}
                >Open Form</button>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 mx-2 rounded-lg'
                    onClick={() => props.deleteFormCB(props.form)}
                >Delete Form</button>
            </div>
        </div>
    )
}