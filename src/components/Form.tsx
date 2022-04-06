import React, { useState, useEffect, useRef } from "react";
import { LabellebInput } from "../LabelledInput";

export interface formData {
    id: number,
    title: string,
    formFields: formField[];
}

interface formField {
    id: number,
    label: string,
    fieldtype: string,
    value: string
}

export const initialFormFields: formField[] = [
    { id: 1, label: "First Name", fieldtype: "text", value: "" },
    { id: 2, label: "Last Name", fieldtype: "text", value: "" },
    { id: 3, label: "Email", fieldtype: "email", value: "" },
    { id: 4, label: "Date of Birth", fieldtype: "date", value: "" },
    { id: 5, label: "Phone Number", fieldtype: "number", value: "" }
]

const fieldTypes = ["text", "email", "date", "number"];

export const getLocalForms: () => formData[] = () => {
    const savedFormsJSON = localStorage.getItem("savedForms");
    return savedFormsJSON ? JSON.parse(savedFormsJSON) : []
}

const initialState: (formId: number) => formData = (formId: number) => {
    const localForms = getLocalForms();
    if (formId === 0) {
        const newForm = {
            id: Number(new Date()),
            title: "Untitled Form",
            formFields: initialFormFields
        };
        localStorage.setItem("savedForms", JSON.stringify([...localForms, newForm]));
        return newForm;
    }
    const currentForm = localForms.filter(form => form.id === formId);
    return currentForm[0];

};

const saveLocalForms = (localForms: formData[]) => {
    localStorage.setItem("savedForms", JSON.stringify(localForms));
}

const saveFormData = (currentState: formData) => {
    const localForms = getLocalForms();
    const updatedLocalForms = localForms.map(form => form.id === currentState.id ? currentState : form);
    saveLocalForms(updatedLocalForms);
};

export function Form(props: { formId: number }) {
    const [state, setState] = useState(() => initialState(props.formId));
    const [newField, setNewField] = useState("");
    const [newFieldType, setNewFieldType] = useState(fieldTypes[0]);
    const titleRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        console.log("Component MOUNTED");
        document.title = "Form Editor";
        titleRef.current?.focus();

        // pass a cleanup function
        return () => {
            console.log("component UNMOUNTED");
            document.title = "React App";
        }
    }, [])


    useEffect(() => {
        let timeout = setTimeout(() => {
            saveFormData(state);
            console.log("saved to local Storage");
        }, 1000);
        return () => {
            clearTimeout(timeout);
        }
    }, [state])

    const addField = () => {
        setState({
            ...state,
            formFields: [
                ...state.formFields,
                {
                    id: Number(new Date()), label: newField, fieldtype: newFieldType, value: newField
                }
            ]
        })
        setNewField("");
    }

    const removeField = (id: number) => setState({
        ...state,
        formFields: state.formFields.filter(field => field.id !== id)
    })

    const clearForm = () => setState({
        ...state,
        formFields: state.formFields.map(field => ({ ...field, value: "" }))
    })

    const setValue = (value: string, id: number) => setState({
        ...state,
        formFields: state.formFields.map(field => {
            if (field.id === id)
                return {
                    ...field,
                    value: value
                }
            return field;
        })
    })

    return (
        <div className='flex flex-col gap-4 p-4 divide-y '>
            <input type="text" ref={titleRef} value={state.title} className="border-2 border-gray-200 rounded-lg pd-2 m-2 flex-1"
                onChange={e => { setState({ ...state, title: e.target.value }) }} />
            <div className="divide-dotted">

                {state.formFields.map(field => (
                    <LabellebInput
                        key={field.id}
                        id={field.id}
                        value={field.value}
                        label={field.label}
                        fieldtype={field.fieldtype}
                        removeFieldCB={removeField}
                        passValueCB={setValue} />
                ))}

            </div>
            <div className="flex gap-2">
                <input type="text" value={newField} className="border-2 border-gray-200 rounded-lg pd-2 m-2 flex-1"
                    onChange={e => setNewField(e.target.value)} />
                <select name='formFieldTypes' onChange={e => setNewFieldType(e.target.value)}>
                    {fieldTypes.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 mx-2 rounded-lg' onClick={addField}
                >Add Field</button>
            </div>
            <div className="flex gap-4">
                <button onClick={(_) => saveFormData(state)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 mx-2 rounded-lg'>Save</button>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 mx-2 rounded-lg' onClick={clearForm} >Clear Form</button>
                <a href="/" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 mx-2 rounded-lg' >Close Form</a>
            </div>
        </div>

    )
}
