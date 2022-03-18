import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import AppContainer from './AppContainer';
import { Home } from './components/Home';
import { LabellebInput } from './LabelledInput';
const formFields = [
  { id: 1, label: "First Name", fieldtype: "text" },
  { id: 2, label: "Last Name", fieldtype: "text" },
  { id: 3, label: "Email", fieldtype: "email" },
  { id: 4, label: "Date of Birth", fieldtype: "date" },
  { id: 5, label: "Phone Number", fieldtype: "number" }
]


function App() {
  const [state, setState] = useState("HOME");

  return (
    <AppContainer>
      <div className='p-4 mx-auto bg-white shadow-lg rounded-xl'>
        <Header title={"Welcome to $react-typescript with #tailwindcss"} />

        {state === "HOME" ? (
          <div className='flex flex-col justify-center'><Home />
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg'
              onClick={() => (setState("FORM"))}
            >Open Form</button>
          </div>
        ) : (
          <div className='gap-4 p-4'>
            {formFields.map(field => (
              // <React.Fragment key={field.id}>
              <LabellebInput key={field.id} label={field.label} fieldtype={field.fieldtype} />

            ))
            }
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-lg'>Submit</button>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 mx-2 rounded-lg' onClick={() => (setState("HOME"))}
            >Close Form</button>
          </div>

        )}

      </div>
    </AppContainer>
  )
};

export default App;