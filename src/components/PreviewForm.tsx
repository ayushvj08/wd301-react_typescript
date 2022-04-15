import React, { useState } from 'react';
import { getLocalForms } from "./Form";

export default function PreviewForm(props: { formId: Number }) {
    const [val, setVal] = useState('');
    const initialState: string[] = [];
    const [answer, setAnswer] = useState(initialState);

    const currentForm = () => getLocalForms().filter(form => form.id === props.formId)[0];
    const [state, setState] = useState(currentForm().formFields[0]);

    const currentIndex = () => currentForm().formFields.findIndex(e => e.id === state.id);

    const changeQuestion = () => {
        setAnswer([...answer, val]);
        setVal('');
        setState(currentForm().formFields[currentIndex() + 1]);
    }

    return (
        <div>
            <div className='text-blue-700'>{currentForm().title}</div>

            {
                !state ? (
                    <> <div>Thanks for attempting the Quiz!</div>
                        Your Answers are : <br /> {answer.map(ans => (<div key={1000 * Math.random()}>{answer.indexOf(ans) + 1}. {ans} </div>))}
                    </>
                ) : (
                    state.kind === "text" ? (
                        <div>
                            <label className='w-full block'>{currentIndex() + 1}. {state.label}</label>
                            <input type={state.fieldtype} className='border-2 border-gray-200 rounded-lg m-2' onChange={e => setVal(e.target.value)} value={val} />
                            <button onClick={changeQuestion} className='block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 mx-2 rounded-lg'>Next</button>
                        </div>)
                        : (
                            <div>Dropdown</div>
                        )


                )

            }

        </div>
    )
}