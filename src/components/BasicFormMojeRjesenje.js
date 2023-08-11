import React from "react";
import useInputBasicFormMojeRjesenje from "../hooks/use-input-basic-form-moje-rjesenje";

const isEmpty = (value) => value.trim() !== "";
/* const validateEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i; */
const hasSpecialChar = (value) => value.includes("@");
/* validateEmail.test(value); */

// Commented out is a better email validation, but browsers default validation is also very good.

const BasicFormMojeRjesenje = (props) => {
  const {
    value: firstName,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    handleValue: handleFirstNameChange,
    handleInputBlur: handleFirstNameInputBlur,
    reset: resetFirstNameInput,
  } = useInputBasicFormMojeRjesenje(isEmpty, hasSpecialChar);

  const {
    value: lastName,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    handleValue: handleLastNameChange,
    handleInputBlur: handleLastNameInputBlur,
    reset: resetLastNameInput,
  } = useInputBasicFormMojeRjesenje(isEmpty, hasSpecialChar);

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    handleValue: handleEmailChange,
    handleInputBlur: handleEmailInputBlur,
    reset: resetEmailInput,
    hasNoChar: hasNoAtChar,
  } = useInputBasicFormMojeRjesenje(isEmpty, hasSpecialChar);

  let formIsValid = false;
  if (emailIsValid && lastNameIsValid && firstNameIsValid && email.length > 2) {
    formIsValid = true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formIsValid) {
      return;
    }

    /* console.log("Entered first name: " + firstName);
    console.log("Entered last name: " + lastName);
    console.log("Entered email: " + email); */

    resetFirstNameInput();
    resetLastNameInput();
    resetEmailInput();
  };

  const firstNameInputClasses = firstNameHasError
    ? "form-control invalid"
    : "form-control";

  const lastNameInputClasses = lastNameHasError
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses = emailHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={handleSubmit}>
      <div className="control-group">
        <div className={firstNameInputClasses}>
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            onChange={handleFirstNameChange}
            onBlur={handleFirstNameInputBlur}
            value={firstName}
          />
          {firstNameHasError && (
            <p className="error-text">First name must not be empty.</p>
          )}
        </div>
        <div className={lastNameInputClasses}>
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            onChange={handleLastNameChange}
            onBlur={handleLastNameInputBlur}
            value={lastName}
          />
          {lastNameHasError && (
            <p className="error-text">Last name must not be empty.</p>
          )}
        </div>
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          type="email"
          id="email"
          onChange={handleEmailChange}
          onBlur={handleEmailInputBlur}
          value={email}
        />
        {emailHasError && (
          <p className="error-text">Email must not be empty.</p>
        )}
        {hasNoAtChar && (
          <p className="error-text">Email must include "@" sign.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicFormMojeRjesenje;

/* Prije implementacije custom hook-a (before implementing custom hook):

import React, { useState } from "react";

const BasicFormMojeRjesenje = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [firstNameTouched, setFirstNameIsTouched] = useState(false);
  const [lastNameTouched, setLastNameIsTouched] = useState(false);
  const [emailTouched, setEmailIsTouched] = useState(false);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleFirstNameInputBlur = () => {
    setFirstNameIsTouched(true);
  };

  const firstNameIsValid = firstName.trim() !== "";

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleLastNameInputBlur = () => {
    setLastNameIsTouched(true);
  };

  const lastNameIsValid = lastName.trim() !== "";

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEmailInputBlur = () => {
    setEmailIsTouched(true);
  };

  const emailIsNotEmpty = email.trim() !== "";
  const emailIsValid = email.includes("@");

  const formIsValid =
    emailIsValid && lastNameIsValid && firstNameIsValid && emailIsNotEmpty;
  console.log("Is form valid? " + formIsValid);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Entered first name: " + firstName);
    console.log("Entered last name: " + lastName);
    console.log("Entered email: " + email);
    setFirstName("");
    setLastName("");
    setEmail("");
    setFirstNameIsTouched(false);
    setLastNameIsTouched(false);
    setEmailIsTouched(false);
  };

  const firstNameHasError = !firstNameIsValid && firstNameTouched;
  const lastNameHasError = !lastNameIsValid && lastNameTouched;
  const emailHasError = !emailIsValid && emailTouched;

  const firstNameInputClasses = firstNameHasError
    ? "form-control invalid"
    : "form-control";

  const lastNameInputClasses = lastNameHasError
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses = emailHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={handleSubmit}>
      <div className="control-group">
        <div className={firstNameInputClasses}>
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            onChange={handleFirstNameChange}
            onBlur={handleFirstNameInputBlur}
            value={firstName}
          />
          {!firstNameIsValid && firstNameTouched && (
            <p className="error-text">First name must not be empty.</p>
          )}
        </div>
        <div className={lastNameInputClasses}>
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            onChange={handleLastNameChange}
            onBlur={handleLastNameInputBlur}
            value={lastName}
          />
          {!lastNameIsValid && lastNameTouched && (
            <p className="error-text">Last name must not be empty.</p>
          )}
        </div>
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          type="email"
          id="email"
          onChange={handleEmailChange}
          onBlur={handleEmailInputBlur}
          value={email}
        />
        {!emailIsNotEmpty && emailTouched && (
          <p className="error-text">Email must not be empty.</p>
        )}
        {!emailIsValid && emailTouched && (
          <p className="error-text">Email must include "@" sign.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicFormMojeRjesenje; */
