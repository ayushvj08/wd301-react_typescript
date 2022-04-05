import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import AppContainer from './AppContainer';
// import { Home } from './components/Home';
import { Form, formData, initialFormFields } from './components/Form';
import { getLocalForms } from "./components/Form";
import { ListForm } from "./components/ListForm";

function App() {

  const [state, setState] = useState(0);
  const openForm = (form: formData) => setState(form.id);
  const closeForm = () => setState(0);

  const [localFormState, setlocalFormState] = useState(getLocalForms());
  const handleFormChange = () => setlocalFormState(getLocalForms());

  const openNewForm = () => {
    const newForm = {
      id: Number(new Date()),
      title: "Untitled Form",
      formFields: initialFormFields
    };
    const savedForms = getLocalForms();
    localStorage.setItem("savedForms", JSON.stringify([...savedForms, newForm]));
    handleFormChange();
    setState(newForm.id);
  }

  const deleteForm = (form: formData) => {
    const savedForms = getLocalForms();
    const i = savedForms.indexOf(form)
    savedForms.splice(i);
    localStorage.setItem("savedForms", JSON.stringify(savedForms));
    handleFormChange();
  }

  return (
    <AppContainer>
      <div className='p-4 mx-auto bg-white shadow-lg rounded-xl'>
        <Header title={"Welcome to $typeform with #tailwindcss"} />
        <div>

          {
            state === 0 ? (
              <>
                <div className="flex justify-around items-center">
                  <p className="font-bold ">Available Forms</p>
                  <button onClick={openNewForm} className="font-bold py-2 px-4 my-4 mx-2 rounded-md bg-green-600 text-white">New Form</button>
                </div>
                {
                  localFormState.map(form => (
                    <ListForm form={form} openFormCB={openForm} deleteFormCB={deleteForm} key={form.id} />
                  ))}
              </>
            ) : (
              <Form closeFormCB={closeForm} formId={state} handleFormChangeCB={handleFormChange} />
            )
          }

        </div>
      </div>
    </AppContainer>
  )
};

export default App;