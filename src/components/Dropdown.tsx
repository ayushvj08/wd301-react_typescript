import React, { useState } from "react";
import { DropdownField, formField, formData } from "./Form";

export default function Dropdown(props: {
    key: number
    field: DropdownField,
    removeOptionCB: (id: number, index: number) => void,
    setFieldLabelCB: (label: string, fieldId: number) => void
    state: formData,
    setStatepropCB: (state1: formData) => void
}) {

    const [focusInput, setInputFocus] = useState(Boolean);

    const initialDropdownState = (id: Number) => {
        const { value } = props.state.formFields.filter(field => field.id === id && field.kind === "dropdown")[0];
        return typeof value !== "string" ? value : []
    }
    const [dropDownvalues, setdropDownvalues] = useState(() => initialDropdownState(props.field.id));

    const saveDropdownValues = (checkedOption: string, id: number, options: string[]) => {
        const filteredDropValues = dropDownvalues.filter(value => value !== checkedOption);
        dropDownvalues.includes(checkedOption) ? setdropDownvalues(filteredDropValues) : setdropDownvalues([...dropDownvalues, checkedOption])
        props.setStatepropCB({
            ...props.state,
            formFields: props.state.formFields.map(field => {
                if (field.id === id)
                    return {
                        ...field,
                        kind: "dropdown",
                        options: options,
                        value: dropDownvalues.includes(checkedOption) ? filteredDropValues : [...dropDownvalues, checkedOption]
                    }
                return field
            })
        })
    }


    const removeDropdown = (id: number) => {
        props.setStatepropCB({
            ...props.state,
            formFields: props.state.formFields.filter(field => field.id !== id)
        })
    }

    const [newOption, setNewOption] = useState('');

    const setNewOptionLabel = (e: string) => setNewOption(e);

    const addNewDropdown = () => {
        props.setStatepropCB({
            ...props.state,
            formFields: [...props.state.formFields,
            { kind: "dropdown", id: Number(new Date()), label: "New Dropdown", options: ["Low", "High", "Med", "Avg"], value: [] }
            ]
        })
    }

    const addNewOption = (id: number) => {
        props.setStatepropCB({
            ...props.state,
            formFields: props.state.formFields.map(field => {
                if (field.id === id && field.kind === "dropdown") {
                    field.options.push(newOption)
                    return field
                }
                return field
            })
        })
        setNewOption('');
    }

    const setDropOptions = (option: string, id: number, index: number) => {
        props.setStatepropCB({
            ...props.state,
            formFields: props.state.formFields.map(field => {
                if (field.id === id && field.kind === "dropdown") {
                    field.options[index] = option
                    return field
                }
                return field
            })
        })
    }

    return (
        <div key={props.field.id} className="m-2">
            <label><input type={"text"} className="border-2 border-gray-200 rounded-lg" onChange={e => props.setFieldLabelCB(e.target.value, props.field.id)} value={props.field.label} /></label>
            <div className="flex flex-col">
                <div className="flex justify-between">
                    <div className="wrap flex">
                        <input placeholder="" onClick={() => setInputFocus(!focusInput)} type="text" role="listbox" readOnly={true} className="my-4 border-2 border-gray-400 rounded p-2" aria-multiselectable="true" />
                        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setInputFocus(!focusInput)} width={15} className="relative right-7" viewBox="0 0 320 512">
                            {
                                focusInput ?
                                    <path d="M9.39 265.4l127.1-128C143.6 131.1 151.8 128 160 128s16.38 3.125 22.63 9.375l127.1 128c9.156 9.156 11.9 22.91 6.943 34.88S300.9 320 287.1 320H32.01c-12.94 0-24.62-7.781-29.58-19.75S.2333 274.5 9.39 265.4z" />
                                    :
                                    <path d="M310.6 246.6l-127.1 128C176.4 380.9 168.2 384 160 384s-16.38-3.125-22.63-9.375l-127.1-128C.2244 237.5-2.516 223.7 2.438 211.8S19.07 192 32 192h255.1c12.94 0 24.62 7.781 29.58 19.75S319.8 237.5 310.6 246.6z" />
                            }
                        </svg>
                    </div>
                    <button onClick={_ => removeDropdown(props.field.id)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 mx-2 rounded-lg'>Remove</button>
                    {/* <button onClick={_ => addNewDropdown()} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 mx-2 rounded-lg'>Add</button> */}
                </div>
                {
                    focusInput ? (
                        <div className="options bg-slate-100 rounded w-48 py-2 px-4 relative bottom-4">
                            {
                                props.field.options.map((option) => {
                                    return (
                                        <div className="flex items-center m-1">
                                            <input type={'checkbox'}
                                                checked={dropDownvalues.includes(option) ? true : false}
                                                onChange={e => saveDropdownValues(option, props.field.id, props.field.options)}
                                            />
                                            <p className="px-2">
                                                <input type={'text'} className="bg-inherit w-20" autoFocus
                                                    onChange={e => setDropOptions(e.target.value, props.field.id, props.field.options.indexOf(option))}
                                                    value={option}
                                                />
                                            </p>
                                            <button onClick={() => props.removeOptionCB(props.field.id, props.field.options.indexOf(option))}>X</button>
                                        </div>

                                    )
                                })
                            }

                            <div className="divide-dotted flex items-center m-1">
                                <input type={'checkbox'} />
                                <p className="px-2">
                                    <input type={'text'} className="bg-inherit w-20" autoFocus
                                        onChange={e => setNewOptionLabel(e.target.value)}
                                        value={newOption}
                                    />
                                </p>
                                <button className="button bg-gray-400 text-white p-1 rounded" onClick={() => addNewOption(props.field.id)}>Add</button>
                            </div>
                        </div>
                    ) : null
                }

            </div>

        </div>
    )
}
