import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import EventRegistrationForm from './Components/EventRegistrationForm'
import JobApplicationForm from './Components/JobApplicationForm'
import SurveyForm from './Components/SurveyForm'

function App() {

  const [activeForm, setActiveForm] = useState(null);

  const handleFormButtonClick = (formName) => {
    setActiveForm(formName);
  };

  return (
    
<>
      <div className="form-buttons-container">
        <button onClick={() => handleFormButtonClick('event')}>Event Registration Form</button>
        <button onClick={() => handleFormButtonClick('job')}>Job Application Form</button>
        <button onClick={() => handleFormButtonClick('survey')}>Survey Form</button>
      </div>
      {activeForm === 'event' && <EventRegistrationForm />}
      {activeForm === 'job' && <JobApplicationForm />}
      {activeForm === 'survey' && <SurveyForm />}
    </>
    
  )
}

export default App
