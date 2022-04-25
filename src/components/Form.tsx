import { Link, navigate } from "raviger";
import React, { useState, useEffect, useRef } from "react";
import { LabellebInput } from "../LabelledInput";
import Dropdown from "./Dropdown";

export interface formData {
    id: number,
    title: string,
    formFields: formField[];
}

type textFieldTypes = "text" | "email" | "date" | "number"

type TextField = {
    kind: "text",
    id: number,
    label: string,
    fieldtype: textFieldTypes,
    value: string
}

export type DropdownField = {
    kind: "dropdown",
    id: number,
    label: string,
    options: string[],
    value: string[]
}

type RadioField = {
    kind: "radio",
    id: number,
    label: string,
    options: string[],
    value: string
}

export type formField = TextField | DropdownField | RadioField

const initialFormFields: formField[] = [
    { kind: "text", id: 1, label: "First Name", fieldtype: "text", value: "" },
    { kind: "text", id: 2, label: "Last Name", fieldtype: "text", value: "" },
    { kind: "text", id: 3, label: "Email", fieldtype: "email", value: "" },
    { kind: "text", id: 4, label: "Date of Birth", fieldtype: "date", value: "" },
    { kind: "dropdown", id: 5, label: "Priority", options: ["Low", "High", "Med", "Avg"], value: [] },
    { kind: "radio", id: 6, label: "What's your Fav Frontend?", options: ["React", "Angular", "Vue"], value: "" },
]

const fieldTypes = ["text", "email", "date", "number", "dropdown", "radio"];

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
    }, [state]);

    useEffect(() => {
        state.id !== props.formId && navigate(`/forms/${state.id}`)
    }, [state.id, props.formId])


    const addField = () => {
        const newFormField: () => formField = () => {
            console.log(newField)
            if (newFieldType === "dropdown") {
                return {
                    kind: "dropdown", id: Number(new Date()), label: "Priority", options: ["Low", "High", "Med", "Avg"], value: []

                }
            }
            else if (newFieldType === "radio")
                return {
                    kind: "radio", id: Number(new Date()), label: 'newField', options: ["React", "Angular", "Vue"], value: ""
                }
            else return {
                kind: "text", id: Number(new Date()), label: 'newField', fieldtype: "text", value: ''
            }
        }
        setState({
            ...state,
            formFields: [
                ...state.formFields,
                newFormField()
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
        formFields: state.formFields.map(field => {
            if (field.kind === "text")
                return { ...field, value: "" }
            else if (field.kind === "radio") return { ...field, value: "" }
            else
                // setdropDownvalues([])
                return { ...field, values: [] }
        })
    })

    const setFieldLabel = (label: string, fieldId: number) =>
        setState({
            ...state,
            formFields: state.formFields.map(field => {
                if (field.id === fieldId)
                    return {
                        ...field,
                        label: label
                    }
                return field
            })
        })

    const removeOption = (id: number, index: number) => {
        setState({
            ...state,
            formFields: state.formFields.map(field => {
                if (field.id === id && field.kind === "dropdown") {
                    field.options.splice(index, 1);
                    return field
                }
                return field
            })
        })
    }


    const setStateprop = (state1: formData) => {
        setState(state1)
    }

    const setRadioOptionLabel = (option: string, id: number, index: number) => {
        setState({
            ...state,
            formFields: state.formFields.map(field => {
                if (field.id === id && field.kind === "radio") {
                    field.options[index] = option
                    return field
                }
                return field
            })
        })
    }

    const initialRadioValue = (id: number) => {
        const { value } = state.formFields.filter(field => field.id === id && field.kind === "radio")[0];
        return typeof value === "string" ? value : ''
    }
    const [radioOptionValue, setradioOptionValue] = useState(() => initialRadioValue(6))

    const saveRadioState = (checkedOption: string, id: number, options: string[]) => {
        radioOptionValue === checkedOption ? setradioOptionValue('') : setradioOptionValue(checkedOption)
        setState({
            ...state,
            formFields: state.formFields.map(field => {
                if (field.id === id)
                    return {
                        ...field,
                        kind: "radio",
                        options: options,
                        value: checkedOption
                    }
                return field
            })
        })
    }

    const addNewRadio = () => {
        setState({
            ...state,
            formFields: [...state.formFields,
            { kind: "radio", id: Number(new Date()), label: "New Radio", options: ["React", "Angular", "Vue"], value: '' }
            ]
        })
    }
    const removeRadio = (id: number) => {
        setState({
            ...state,
            formFields: state.formFields.filter(field => field.id !== id)
        })
    }
    return (
        <div className='flex flex-col gap-4 p-4 divide-y '>
            <input type="text" ref={titleRef} value={state.title} className="border-2 border-gray-200 rounded-lg pd-2 m-2 flex-1"
                onChange={e => { setState({ ...state, title: e.target.value }) }} />
            <div className="divide-dotted">

                {state.formFields.map(field => {
                    switch (field.kind) {
                        case "text":
                            return <LabellebInput
                                key={field.id}
                                id={field.id}
                                value={field.value}
                                label={field.label}
                                fieldtype={field.fieldtype}
                                removeFieldCB={removeField}
                                // passValueCB={setValue}
                                setFieldLabelCB={setFieldLabel} />

                        case "dropdown":
                            return <Dropdown
                                key={field.id}
                                field={field}
                                setFieldLabelCB={setFieldLabel}
                                removeOptionCB={removeOption}
                                state={state}
                                setStatepropCB={setStateprop}
                            />

                        case "radio":
                            return (<div className="" key={field.id}>
                                <label>
                                    <input type="text" value={field.label} onChange={e => setFieldLabel(e.target.value, field.id)} className="border-2 border-gray-200 rounded-lg m-2" />
                                </label>
                                {
                                    field.options.map((option) => {
                                        return (<div >
                                            <input type="radio"
                                                onChange={() => saveRadioState(option, field.id, field.options)}
                                                checked={radioOptionValue === option ? true : false} className="m-2" value={option} />
                                            <label >
                                                <input type="text" className="border-2 border-gray-200 rounded-lg m-2"
                                                    value={option}
                                                    onChange={e => setRadioOptionLabel(e.target.value, field.id, field.options.indexOf(option))} />
                                            </label>
                                        </div>
                                        )
                                    })
                                }
                                <button onClick={_ => addNewRadio()} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 mx-2 rounded-lg'>Add</button>
                                <button onClick={_ => removeRadio(field.id)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 mx-2 rounded-lg'>Remove</button>

                            </div>)
                        default:
                            break;
                    }

                })}

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
                <Link href="/" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 mx-2 rounded-lg' >Close Form</Link>
            </div>
        </div>

    )
}
