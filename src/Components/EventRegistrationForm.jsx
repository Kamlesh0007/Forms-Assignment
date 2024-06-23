import React, { useState, useEffect } from 'react';
import Input from './Input';
import useForm from '../Hooks/useForm';
import { validateEventRegistrationForm } from '../Utils/Validation';

const initialState = {
  name: '',
  email: '',
  age: '',
  hasGuest: false,
  guestName: '',
};

function EventRegistrationForm() {
  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    setErrors,
    validateField,
    setValues
  } = useForm(initialState, validateEventRegistrationForm);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const formErrors = validateEventRegistrationForm(values);
    setIsFormValid(
      Object.keys(formErrors).length === 0 &&
      values.name &&
      values.email &&
      values.age &&
      (!values.hasGuest || (values.hasGuest && values.guestName))
    );
  }, [values]);

  const handleBlur = (event) => {
    const { name } = event.target;
    validateField(name);
  };

  const handleGuestChange = (event) => {
    const { name, checked } = event.target;
    
    const newValues = { ...values, [name]: checked };
    if (!checked) {
      delete newValues.guestName;
    }
    setValues(newValues);

    const newErrors = { ...errors };
    delete newErrors.guestName;
    setErrors(newErrors);

    // Revalidate the form with the new values
    const updatedErrors = validateEventRegistrationForm(newValues);
    setErrors(updatedErrors);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const formErrors = validateEventRegistrationForm(values);
    if (Object.keys(formErrors).length === 0) {
      setIsSuccess(true);
    } else {
      setErrors(formErrors);
    }
  };

  if (isSuccess) {
    return (
      <div className="success-message">
        <h2>Registration Successful!</h2>
        <p>Name: {values.name}</p>
        <p>Email: {values.email}</p>
        <p>Age: {values.age}</p>
        <p>Attending with guest: {values.hasGuest ? 'Yes' : 'No'}</p>
        {values.hasGuest && <p>Guest Name: {values.guestName}</p>}
      </div>
    );
  }

  return (
    <div className="form-container">
      <h1>Event Registration Form</h1>
      <form onSubmit={onSubmit}>
        <Input
          label="Name:"
          type="text"
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.name}
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
          label="Age:"
          type="number"
          id="age"
          name="age"
          value={values.age}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.age}
        />
        <Input
          label="Are you attending with a guest?"
          type="checkbox"
          id="hasGuest"
          name="hasGuest"
          checked={values.hasGuest}
          onChange={handleGuestChange}
          options={["Yes"]}
        />
        {values.hasGuest && (
          <Input
            label="Guest Name:"
            type="text"
            id="guestName"
            name="guestName"
            value={values.guestName || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.guestName}
          />
        )}
        <button type="submit" disabled={!isFormValid || isSubmitting}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default EventRegistrationForm;