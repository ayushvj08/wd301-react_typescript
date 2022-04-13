import React, { useState } from "react";
import logo from "../logo.svg";
import { formData, getLocalForms } from "./Form";
import { ListForm } from "./ListForm";
import { Link, useQueryParams } from "raviger";

export function Home() {
    const [form, setFormState] = useState(getLocalForms());

    const [{ search }, setQuery] = useQueryParams();
    const [searchString, setSearchString] = useState("");

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
                <Link href={`/forms/0`} className="font-bold py-2 px-4 my-4 mx-2 rounded-md bg-green-600 text-white">New Form</Link>
            </div>
            <form action="/" method="GET" onSubmit={e => {
                e.preventDefault();
                setQuery({ search: searchString })
            }}>
                <label>Search</label>
                <input type="text" name="search" value={searchString} onChange={e => setSearchString(e.target.value)} className="w-full border-2 border-gray-200 rounded-lg pd-2 m-2 flex-1" />
            </form>

            {
                form.filter((form) => form.title.toLowerCase().includes(search?.toLowerCase() || ""))
                    .map(form => (
                        <ListForm form={form} deleteFormCB={deleteForm} key={form.id} />
                    ))}

        </div>

    )
}