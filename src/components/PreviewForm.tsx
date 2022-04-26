import React, { useReducer, useState } from 'react';
import { formField, getLocalForms } from "./Form";

const currentForm = (formId: Number) => getLocalForms().filter(form => form.id === formId)[0];

type ChangeQuestionAction = {
    type: "change_question",
    index: number,
    formId: Number
}

const reducer = (state: formField, action: ChangeQuestionAction) => {
    switch (action.type) {
        case "change_question":
            return currentForm(action.formId).formFields[action.index]
    }
}

export default function PreviewForm(props: { formId: Number }) {

    const [state, dispatch] = useReducer(reducer, currentForm(props.formId).formFields[0]);
    const [val, setVal] = useState('');

    const currentIndex = () => currentForm(props.formId).formFields.findIndex(e => e.id === state.id);

    type AnswerType = {
        label: string,
        answer: string | string[]
    }
    const inst: AnswerType[] = [{ label: '', answer: '' }]
    const [answer, setAnswer] = useState<AnswerType[]>(inst);


    const changeQuestion = (ans: string | string[]) => {
        setAnswer([...answer, { label: state.label, answer: ans }]);
        setVal('');
        dispatch({ type: "change_question", formId: props.formId, index: currentIndex() + 1 })
        // setState(currentForm(props.formId).formFields[currentIndex() + 1]);
    }

    const [focusInput, setInputFocus] = useState(Boolean);

    const renderField = () => {
        switch (state.kind) {
            case "text": {
                return (<input type={'text'} placeholder="Write Your Answer Here" className='border-2 border-gray-200 rounded-lg m-2'
                    onChange={e => setVal(e.target.value)}
                    value={val} />)
            }
            case "dropdown": {
                return (<div className="" key={state.id}>
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

                    {
                        focusInput ?
                            (<div key={"dropdown" + state.id} className="options bg-slate-100 rounded w-48 py-2 px-4 relative bottom-4">
                                {
                                    state.options.map((option) => {
                                        return (
                                            <div key={option + state.kind} className="flex items-center m-1">
                                                <input type={'checkbox'}
                                                    onChange={e => setVal(e.target.value)}
                                                />
                                                <p className="px-2">
                                                    {option}
                                                </p>
                                            </div>

                                        )
                                    })
                                }
                            </div>
                            ) : null}
                </div>)
            }
            case "radio": {
                return (
                    <div className="" key={state.id}>
                        {
                            state.options.map((option) => {
                                return (<div key={option + state.id}>
                                    <input type="radio"
                                        onChange={e => setVal(e.target.value)}
                                        className="m-2" value={option} />
                                    <label >
                                        {option}
                                    </label>
                                </div>
                                )
                            })
                        }</div>
                )
            }
            default:
                return null
        }
    }
    return (
        <div>
            <div className='text-blue-700'>{currentForm(props.formId).title}</div>

            {
                state ? (<div>
                    <label className='w-full block'>{currentIndex() + 1}. {state.label}</label>
                    {renderField()}
                    <button onClick={() => changeQuestion(val)}
                        className='block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 mx-2 rounded-lg'>
                        Next
                    </button>
                </div>)
                    : (
                        <> <div>Thanks for attempting the Quiz!</div>
                            Your Answers are : <br /> {answer.map(({ label, answer }) => (<div key={10000 * Math.random()}><p>Q. {label}</p>
                                <p>Answer: {answer}</p>
                                <br /> </div>))}
                        </>
                    )


            }

        </div>
    )
}