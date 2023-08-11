import { useState } from "react";

// ovo su gluposti. xD vidjeti rješenje predavača.

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const [enteredMailValue, setEnteredMailValue] = useState("");
  const [mailIsTouched, setMailIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const emailValueIsValid = validateValue(enteredMailValue);
  const emailHasError = !emailValueIsValid && mailIsTouched;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };

  const mailValueChangeHandler = (event) => {
    setEnteredMailValue(event.target.value);
  };

  const mailInputBlurHandler = (event) => {
    setMailIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  const resetMail = () => {
    setEnteredMailValue("");
    setMailIsTouched(false);
  };

  return {
    value: enteredValue,
    emailValue: enteredMailValue,
    emailHasError,
    isValid: valueIsValid,
    emailIsValid: emailValueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
    mailValueChangeHandler,
    mailInputBlurHandler,
    resetMail,
  };
};

export default useInput;
