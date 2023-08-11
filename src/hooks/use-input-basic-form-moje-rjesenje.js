import { useState } from "react";

const useInputBasicFormMojeRjesenje = (isEmpty, hasSpecialChar) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = isEmpty(enteredValue);
  const hasError = !valueIsValid && isTouched;
  const hasAtChar = hasSpecialChar(enteredValue);
  const hasAtCharError = !hasAtChar && isTouched;

  const handleValue = (e) => {
    setEnteredValue(e.target.value);
  };

  const handleInputBlur = (e) => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    handleValue,
    handleInputBlur,
    reset,
    hasNoChar: hasAtCharError,
  };
};

export default useInputBasicFormMojeRjesenje;
