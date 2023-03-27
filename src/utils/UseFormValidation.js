import { useState } from 'react';

export const useFormWithValidation = () => {

  const [values, setValues] = useState('');
  const [errors, setErrors] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleChange = (evt) => {
    const input = evt.target;
    const value = input.value;
    const name = input.name;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: input.validationMessage });
    setIsValid(input.closest('form').checkValidity());
  };

  return { values, handleChange, errors, isValid, setValues };
};