import { useState, useCallback } from 'react';

const useForm = (initialState, validate) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((event) => {
    const { name, value, type, checked } = event.target;
    setValues(prevValues => ({
      ...prevValues,
      [name]: type === 'checkbox'
        ? (checked
          ? [...prevValues[name], value]
          : prevValues[name].filter(item => item !== value))
        : value
    }));
  }, []);

  const validateField = useCallback((fieldName) => {
    const fieldErrors = validate({
      ...values,
      [fieldName]: values[fieldName]
    });
    setErrors(prevErrors => ({
      ...prevErrors,
      [fieldName]: fieldErrors[fieldName]
    }));
  }, [values, validate]);

  const handleSubmit = useCallback((event) => {
    if (event) event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  }, [values, validate]);

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    setValues,
    setErrors,
    validateField,
  };
};

export default useForm;