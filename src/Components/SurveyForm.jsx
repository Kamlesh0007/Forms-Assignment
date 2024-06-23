import React, { useState, useEffect } from 'react';
import Input from './Input';
import useForm from '../Hooks/useForm';
import axios from 'axios';
import { validateSurveyForm } from '../Utils/Validation';

const initialState = {
  fullName: '',
  email: '',
  surveyTopic: '',
  favoriteProgrammingLanguage: '',
  yearsOfExperience: '',
  exerciseFrequency: '',
  dietPreference: '',
  highestQualification: '',
  fieldOfStudy: '',
  feedback: '',
  additionalQuestions: [], // Added additionalQuestions in initial state
};

function SurveyForm() {
  const { values, errors, isSubmitting, handleChange, handleSubmit, validateField, setValues, setErrors } = useForm(initialState, validateSurveyForm);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [additionalQuestions, setAdditionalQuestions] = useState([]);

  useEffect(() => {
    // Fetch additional questions based on the survey topic
    if (values.surveyTopic) {
      let category;
      switch (values.surveyTopic) {
        case 'Technology':
          category = 18; // Science: Computers
          break;
        case 'Health':
          category = 17; // Science: Nature
          break;
        case 'Education':
          category = 19; // Science: Mathematics
          break;
        default:
          category = null;
      }

      if (category) {
        axios.get(`https://opentdb.com/api.php?amount=5&category=${category}`)
          .then((response) => {
            const filteredQuestions = response.data.results.map((item, index) => ({
              question: `Question ${index + 1}: ${item.question}`,
              answer: '', // Add an answer property for each question
            }));
            setAdditionalQuestions(filteredQuestions);
          })
          .catch((error) => console.error('Error fetching additional questions:', error));
      }
    }
  }, [values.surveyTopic]);

  useEffect(() => {
    const formErrors = validateSurveyForm(values);
    setIsFormValid(
      Object.keys(formErrors).length === 0 &&
      values.fullName &&
      values.email &&
      values.surveyTopic &&
      values.feedback
    );
  }, [values]);

  const handleBlur = (event) => {
    const { name } = event.target;
    validateField(name);
  };

  const handleSurveyTopicChange = (event) => {
    const { name, value } = event.target;

    // Clear fields and errors that are not relevant to the new survey topic
    const newValues = { ...values, [name]: value, additionalQuestions: [] };
    const newErrors = { ...errors };

    // Remove values and errors for all topic-specific fields
    ['favoriteProgrammingLanguage', 'yearsOfExperience', 'exerciseFrequency', 'dietPreference', 'highestQualification', 'fieldOfStudy'].forEach(field => {
      delete newValues[field];
      delete newErrors[field];
    });

    setValues(newValues);
    setErrors(newErrors);

    // Revalidate the form with the new values
    const updatedErrors = validateSurveyForm(newValues);
    setErrors(updatedErrors);
  };

  const handleAdditionalQuestionChange = (index, event) => {
    const { value } = event.target;
    const updatedQuestions = [...additionalQuestions];
    updatedQuestions[index].answer = value;
    setAdditionalQuestions(updatedQuestions);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const formErrors = validateSurveyForm(values);
    if (Object.keys(formErrors).length === 0) {
      setIsSuccess(true);
    } else {
      setErrors(formErrors);
    }
  };

  if (isSuccess) {
    return (
      <div className="success-message">
        <h2>Survey Submitted Successfully!</h2>
        <p>Full Name: {values.fullName}</p>
        <p>Email: {values.email}</p>
        <p>Survey Topic: {values.surveyTopic}</p>
        {values.surveyTopic === 'Technology' && (
          <>
            <p>Favorite Programming Language: {values.favoriteProgrammingLanguage}</p>
            <p>Years of Experience: {values.yearsOfExperience}</p>
          </>
        )}
        {values.surveyTopic === 'Health' && (
          <>
            <p>Exercise Frequency: {values.exerciseFrequency}</p>
            <p>Diet Preference: {values.dietPreference}</p>
          </>
        )}
        {values.surveyTopic === 'Education' && (
          <>
            <p>Highest Qualification: {values.highestQualification}</p>
            <p>Field of Study: {values.fieldOfStudy}</p>
          </>
        )}
        <p>Feedback: {values.feedback}</p>
        {additionalQuestions.length > 0 && (
          <div>
            <h3>Additional Questions [Optional]</h3>
            {additionalQuestions.map((question, index) => (
              <div key={index} className="form-group">
                <label>{question.question}</label>
                <p>Answer:- {question.answer}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
  

  return (
    <div className="form-container">
      <h1>Survey Form</h1>
      <form onSubmit={onSubmit}>
        <Input
          label="Full Name:"
          type="text"
          id="fullName"
          name="fullName"
          value={values.fullName}
          onChange={handleChange}
          onBlur={() => validateField('fullName')}
          error={errors.fullName}
        />
        <Input
          label="Email:"
          type="email"
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={() => validateField('email')}
          error={errors.email}
        />
        <Input
          label="Survey Topic:"
          type="select"
          id="surveyTopic"
          name="surveyTopic"
          value={values.surveyTopic}
          onChange={handleSurveyTopicChange}
          onBlur={() => validateField('surveyTopic')}
          error={errors.surveyTopic}
          options={['Technology', 'Health', 'Education']}
        />
        {values.surveyTopic === 'Technology' && (
          <>
            <Input
              label="Favorite Programming Language:"
              type="select"
              id="favoriteProgrammingLanguage"
              name="favoriteProgrammingLanguage"
              value={values.favoriteProgrammingLanguage}
              onChange={handleChange}
              onBlur={() => validateField('favoriteProgrammingLanguage')}
              error={errors.favoriteProgrammingLanguage}
              options={['JavaScript', 'Python', 'Java', 'C#']}
            />
            <Input
              label="Years of Experience:"
              type="number"
              id="yearsOfExperience"
              name="yearsOfExperience"
              value={values.yearsOfExperience}
              onChange={handleChange}
              onBlur={() => validateField('yearsOfExperience')}
              error={errors.yearsOfExperience}
            />
          </>
        )}
        {values.surveyTopic === 'Health' && (
          <>
            <Input
              label="Exercise Frequency:"
              type="select"
              id="exerciseFrequency"
              name="exerciseFrequency"
              value={values.exerciseFrequency}
              onChange={handleChange}
              onBlur={() => validateField('exerciseFrequency')}
              error={errors.exerciseFrequency}
              options={['Daily', 'Weekly', 'Monthly', 'Rarely']}
            />
            <Input
              label="Diet Preference:"
              type="select"
              id="dietPreference"
              name="dietPreference"
              value={values.dietPreference}
              onChange={handleChange}
              onBlur={() => validateField('dietPreference')}
              error={errors.dietPreference}
              options={['Vegetarian', 'Vegan', 'Non-Vegetarian']}
            />
          </>
        )}
        {values.surveyTopic === 'Education' && (
          <>
            <Input
              label="Highest Qualification:"
              type="select"
              id="highestQualification"
              name="highestQualification"
              value={values.highestQualification}
              onChange={handleChange}
              onBlur={() => validateField('highestQualification')}
              error={errors.highestQualification}
              options={['High School', "Bachelor's", "Master's", 'PhD']}
            />
            <Input
              label="Field of Study:"
              type="text"
              id="fieldOfStudy"
              name="fieldOfStudy"
              value={values.fieldOfStudy}
              onChange={handleChange}
              onBlur={() => validateField('fieldOfStudy')}
              error={errors.fieldOfStudy}
            />
          </>
        )}
        <Input
          label="Feedback:"
          type="textarea"
          id="feedback"
          name="feedback"
          value={values.feedback}
          onChange={handleChange}
          onBlur={() => validateField('feedback')}
          error={errors.feedback}
        />
   {additionalQuestions.length > 0 && (
  <div>
    <h3>Additional Questions [Optional]</h3>
    {additionalQuestions.map((question, index) => (
      <div key={index} className="form-group">
        <Input
          label={question.question}
          type="textarea"
          id={`additionalQuestion${index}`}
          name={`additionalQuestion${index}`}
          value={question.answer}
          onChange={(event) => handleAdditionalQuestionChange(index, event)}
          className="form-control"
        />
      </div>
    ))}
  </div>
)}

        <button type="submit" disabled={!isFormValid || isSubmitting}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default SurveyForm;
