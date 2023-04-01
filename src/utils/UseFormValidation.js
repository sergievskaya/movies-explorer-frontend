import { useState } from 'react';

export const useFormWithValidation = () => {

  const [values, setValues] = useState('');
  const [errors, setErrors] = useState('');
  const [isValid, setIsValid] = useState(false);

  const checkEmail = (value) => {
    const re = /\S+@\S+\.\S{2,6}/;
    return re.test(value);
  }

  const handleChange = (evt) => {
    const input = evt.target;
    const value = input.value;
    const name = input.name;
    setValues({ ...values, [name]: value });

    if ((input.name === 'email')) {
      if(!checkEmail(value)) {
        setErrors({ ...errors, [name]: 'Некорректный email'});
        setIsValid(false);
        return
      }
    }

    setErrors({ ...errors, [name]: input.validationMessage });
    setIsValid(input.closest('form').checkValidity());
  };

  return { values, handleChange, errors, isValid, setValues, setIsValid };
};