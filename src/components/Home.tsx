import React, { useState } from "react";
import logo from "../logo.svg";
import { formData, getLocalForms } from "./Form";
import { ListForm } from "./ListForm";

export function Home() {
    const [form, setFormState] = useState(getLocalForms());

    const deleteForm = (form: formData) => {
        const savedForms = getLocalForms();
        const i = savedForms.indexOf(form);
        savedForms.splice(i);
        localStorage.setItem("savedForms", JSON.stringify(savedForms));
        setFormState(getLocalForms());
    };

    return (
        <div className='flex flex-col justify-center'>
            <div className="flex items-center">
                <img src={logo} alt="logo" className="animate-spin h-24" />
                <p>Welcome to the Home Page</p>
            </div>

            <div className="flex justify-around items-center">
                <p className="font-bold ">Available Forms</p>
                <a href={`/forms/0`} className="font-bold py-2 px-4 my-4 mx-2 rounded-md bg-green-600 text-white">New Form</a>
            </div>
            {
                form.map(form => (
                    <ListForm form={form} deleteFormCB={deleteForm} key={form.id} />
                ))}

        </div>

    )
}