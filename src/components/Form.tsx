import React, { useState } from "react";
import { LabellebInput } from "../LabelledInput";


const formFields = [
    { id: 1, label: "First Name", fieldtype: "text", value: "" },
    { id: 2, label: "Last Name", fieldtype: "text", value: "" },
    { id: 3, label: "Email", fieldtype: "email", value: "" },
    { id: 4, label: "Date of Birth", fieldtype: "date", value: "" },
    { id: 5, label: "Phone Number", fieldtype: "number", value: "" }
]

const fieldTypes = ["text", "email", "date", "number"]

export function Form(props: { closeFormCB: () => void }) {
    const [state, setState] = useState(formFields);
    const [newField, setNewField] = useState("");
    const [newFieldType, setNewFieldType] = useState(fieldTypes[0])

    const addField = () => {
        setState([
            ...state,
            {
                id: Number(new Date()), label: newField, fieldtype: newFieldType, value: newField
            }
        ])
        setNewField("");
    }

    const removeField = (id: number) => (
        setState(state.filter(field => field.id !== id))
    )

    const clearForm = () => {
        let newState = state;
        setState(
            newState.map(e => {
                e.value = "";
                return e;
            })
        )
    }

    const setValue = (value: string, id: number) => {
        let newState = state;
        setState(
            newState.map(e => {
                if (e.id === id)
                    e.value = value;
                return e;
            })
        )
    }
    return (
        <div className='flex flex-col gap-4 p-4 divide-y '>
            <div className="divide-dotted">

                {state.map(field => (
                    <LabellebInput
                        key={field.id}
                        id={field.id}
                        value={field.value}
                        label={field.label}
                        fieldtype={field.fieldtype}
                        removeFieldCB={removeField}
                        passValueCB={setValue} />
                ))
                }
            </div>
            <div className="flex gap-2">
                <input type="text" value={newField} className="border-2 border-gray-200 rounded-lg pd-2 m-2 flex-1" onChange={e => {
                    setNewField(e.target.value)
                }} />
                <select name='formFieldTypes' onChange={e => setNewFieldType(e.target.value)}>
                    {fieldTypes.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 mx-2 rounded-lg' onClick={addField}
                >Add Field</button>
            </div>
            <div className="flex gap-4">
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 mx-2 rounded-lg'>Submit</button>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 mx-2 rounded-lg' onClick={clearForm} >Clear Form</button>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 mx-2 rounded-lg' onClick={props.closeFormCB}>Close Form</button>
            </div>
        </div>

    )
}
