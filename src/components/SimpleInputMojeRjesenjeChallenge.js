import { useState, useEffect } from "react";

const SimpleInputMojeRjesenjeChallenge = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredMail, setEnteredMail] = useState("");
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const [enteredMailTouched, setEnteredMailTouched] = useState(false);

  const [mailValidated, setMailValidated] = useState(false);

  const enteredNameIsValid = enteredName.trim() !== "";
  const enteredMailIsValid = enteredMail.trim() !== "" && mailValidated;
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;
  const mailInputIsInvalid =
    !enteredMailIsValid && enteredMailTouched && !mailValidated;
  const enteredMailIsEmpty = enteredMail.trim() === "" && enteredMailTouched;
  const mailSyntaxIsValid =
    !mailValidated && enteredMailTouched && enteredMail.trim() !== "";

  const handleNameChange = (e) => {
    setEnteredName(e.target.value);
  };

  const handleNameInputBlur = (e) => {
    setEnteredNameTouched(true);
  };

  const handleMailChange = (e) => {
    setEnteredMail(e.target.value);
  };

  const handleMailInputBlur = (e) => {
    setEnteredMailTouched(true);
  };

  useEffect(() => {
    const mailCheck = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (enteredMail.trim() !== "") {
      const timer = setTimeout(() => {
        if (!mailCheck.test(enteredMail)) {
          setMailValidated(false);
        } else {
          setMailValidated(true);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [enteredMail]);

  let formIsValid = enteredNameIsValid && enteredMailIsValid;

  const handleFormSubmit = (e) => {
    e.preventDefault();

    setEnteredNameTouched(true);
    setEnteredMailTouched(true);

    if (!enteredNameIsValid || !enteredMailIsValid) {
      return;
    }

    setEnteredName("");
    setEnteredNameTouched(false);
    setEnteredMail("");
    setEnteredMailTouched(false);
    setMailValidated(false);
  };

  const nameInputClasses = nameInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  const mailInputClasses = mailInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={handleFormSubmit}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={handleNameChange}
          onBlur={handleNameInputBlur}
          value={enteredName}
        />
        {nameInputIsInvalid && (
          <p className="error-text">Name must not be empty.</p>
        )}
      </div>
      <div className={mailInputClasses}>
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          onChange={handleMailChange}
          onBlur={handleMailInputBlur}
          value={enteredMail}
        />
        {enteredMailIsEmpty && (
          <p className="error-text">Mail must not be empty.</p>
        )}
        {mailSyntaxIsValid && (
          <p className="error-text">
            Please enter a valid mail. Example: name@mail.com
          </p>
        )}
        {nameInputIsInvalid && mailInputIsInvalid && (
          <p className="error-text">
            Both fields must be filled before submitting.
          </p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInputMojeRjesenjeChallenge;
