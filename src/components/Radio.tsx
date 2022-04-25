import React, { useState } from "react";
import { formData, RadioField } from "./Form";

export default function Radio(props: {
    field: RadioField,
    setStatepropCB: (state1: formData) => void,
    state: formData,
    setFieldLabelCB: (label: string, fieldId: number) => void
}) {

    const initialRadioValue = (id: number) => {
        const { value } = props.state.formFields.filter(field => field.id === id && field.kind === "radio")[0];
        return typeof value === "string" ? value : ''
    }
    const [radioOptionValue, setradioOptionValue] = useState(() => initialRadioValue(props.field.id))

    const saveRadioState = (checkedOption: string, id: number, options: string[]) => {
        radioOptionValue === checkedOption ? setradioOptionValue('') : setradioOptionValue(checkedOption)
        props.setStatepropCB({
            ...props.state,
            formFields: props.state.formFields.map(field => {
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
    const setRadioOptionLabel = (option: string, id: number, index: number) => {
        props.setStatepropCB({
            ...props.state,
            formFields: props.state.formFields.map(field => {
                if (field.id === id && field.kind === "radio") {
                    field.options[index] = option
                    return field
                }
                return field
            })
        })
    }
    const removeRadio = (id: number) => {
        props.setStatepropCB({
            ...props.state,
            formFields: props.state.formFields.filter(field => field.id !== id)
        })
    }

    return (
        <div className="" key={props.field.id}>
            <label>
                <input type="text" value={props.field.label} onChange={e => props.setFieldLabelCB(e.target.value, props.field.id)} className="border-2 border-gray-200 rounded-lg m-2" />
            </label>
            {
                props.field.options.map((option) => {
                    return (<div >
                        <input type="radio"
                            onChange={() => saveRadioState(option, props.field.id, props.field.options)}
                            checked={radioOptionValue === option ? true : false} className="m-2" value={option} />
                        <label >
                            <input type="text" className="border-2 border-gray-200 rounded-lg m-2"
                                value={option}
                                onChange={e => setRadioOptionLabel(e.target.value, props.field.id, props.field.options.indexOf(option))} />
                        </label>
                    </div>
                    )
                })
            }
            {/* <button onClick={_ => addNewRadio()} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 mx-2 rounded-lg'>Add</button> */}
            <button onClick={_ => removeRadio(props.field.id)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 mx-2 rounded-lg'>Remove</button>

        </div>
    )
}