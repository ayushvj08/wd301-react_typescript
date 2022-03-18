import React from 'react';
import './App.css';
import Header from './Header';
import AppContainer from './AppContainer';

const formFields = [
  { id: 1, label: "First Name", type: "text" },
  { id: 2, label: "Last Name", type: "text" },
  { id: 3, label: "Email", type: "email" },
  { id: 4, label: "Date of Birth", type: "date" },
  { id: 5, label: "Phone Number", type: "number" }
]

function App() {
  return (
    <AppContainer>
      <div className='p-4 mx-auto bg-white shadow-lg rounded-xl'>
        <Header title={"Welcome to $react-typescript with #tailwindcss"} />
        {
          formFields.map(field => (
            <React.Fragment key={field.id}>
              <label>{field.label}</label>
              <input className='border-2 border-gray-200 rounded-lg pd-2 m-2 w-full ' type={field.type} />
            </React.Fragment>
          ))
        }
      </div>

    </AppContainer>
  )
};

export default App;