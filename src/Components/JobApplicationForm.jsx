import React, { useState, useEffect } from 'react';
import Input from './Input';
import useForm from '../Hooks/useForm';
import { validateJobApplicationForm } from '../Utils/Validation';

const initialState = {
  fullName: '',
  email: '',
  phoneNumber: '',
  applyingFor: '',
  relevantExperience: '',
  portfolioUrl: '',
  managementExperience: '',
  additionalSkills: [],
  preferredInterviewTime: '',
};

function JobApplicationForm() {
  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    setErrors,
    validateField,
    setValues
  } = useForm(initialState, validateJobApplicationForm);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const formErrors = validateJobApplicationForm(values);
    setIsFormValid(
      Object.keys(formErrors).length === 0 &&
      values.fullName &&
      values.email &&
      values.phoneNumber &&
      values.applyingFor &&
      values.preferredInterviewTime &&
      (values.applyingFor !== 'Developer' || values.relevantExperience) &&
      (values.applyingFor !== 'Designer' || (values.relevantExperience && values.portfolioUrl)) &&
      (values.applyingFor !== 'Manager' || values.managementExperience)
    );
  }, [values]);

  const handleBlur = (event) => {
    const { name } = event.target;
    validateField(name);
  };

  const handlePositionChange = (event) => {
    const { name, value } = event.target;
    
    // Clear fields and errors that are not relevant to the new position
    const newValues = { ...values, [name]: value };
    const newErrors = { ...errors };
    
    // Remove values and errors for all position-specific fields
    ['relevantExperience', 'portfolioUrl', 'managementExperience'].forEach(field => {
      delete newValues[field];
      delete newErrors[field];
    });

    setValues(newValues);
    setErrors(newErrors);

    // Revalidate the form with the new values
    const updatedErrors = validateJobApplicationForm(newValues);
    setErrors(updatedErrors);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const formErrors = validateJobApplicationForm(values);
    if (Object.keys(formErrors).length === 0) {
      setIsSuccess(true);
    } else {
      setErrors(formErrors);
    }
  };

  if (isSuccess) {
    return (
      <div className="success-message">
        <h2>Application Submitted Successfully!</h2>
        <p>Full Name: {values.fullName}</p>
        <p>Email: {values.email}</p>
        <p>Phone Number: {values.phoneNumber}</p>
        <p>Applying For: {values.applyingFor}</p>
        {values.relevantExperience && (
          <p>Relevant Experience: {values.relevantExperience} years</p>
        )}
        {values.portfolioUrl && <p>Portfolio URL: {values.portfolioUrl}</p>}
        {values.managementExperience && (
          <p>Management Experience: {values.managementExperience}</p>
        )}
        <p>Additional Skills: {values.additionalSkills.join(', ')}</p>
        <p>Preferred Interview Time: {values.preferredInterviewTime}</p>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h1>Job Application Form</h1>
      <form onSubmit={onSubmit}>
        <Input
          label="Full Name:"
          type="text"
          id="fullName"
          name="fullName"
          value={values.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.fullName}
        />
        <Input
          label="Email:"
          type="email"
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
        />
        <Input
          label="Phone Number:"
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={values.phoneNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.phoneNumber}
        />
        <Input
          label="Applying for Position:"
          type="select"
          id="applyingFor"
          name="applyingFor"
          value={values.applyingFor}
          onChange={handlePositionChange}
          onBlur={handleBlur}
          error={errors.applyingFor}
          options={['Developer', 'Designer', 'Manager']}
        />
        {(values.applyingFor === 'Developer' || values.applyingFor === 'Designer') && (
          <Input
            label="Relevant Experience (years):"
            type="number"
            id="relevantExperience"
            name="relevantExperience"
            value={values.relevantExperience || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.relevantExperience}
          />
        )}
        {values.applyingFor === 'Designer' && (
          <Input
            label="Portfolio URL:"
            type="text"
            id="portfolioUrl"
            name="portfolioUrl"
            value={values.portfolioUrl || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.portfolioUrl}
          />
        )}
        {values.applyingFor === 'Manager' && (
          <Input
            label="Management Experience:"
            type="text"
            id="managementExperience"
            name="managementExperience"
            value={values.managementExperience || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.managementExperience}
          />
        )}
        <Input
          label="Additional Skills:"
          type="checkbox"
          id="additionalSkills"
          name="additionalSkills"
          value={values.additionalSkills}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.additionalSkills}
          options={['JavaScript', 'CSS', 'Python', 'React']}
        />
        <Input
          label="Preferred Interview Time:"
          type="datetime-local"
          id="preferredInterviewTime"
          name="preferredInterviewTime"
          value={values.preferredInterviewTime}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.preferredInterviewTime}
        />
        <button type="submit" disabled={!isFormValid || isSubmitting}>Submit</button>
      </form>
    </div>
  );
}

export default JobApplicationForm;