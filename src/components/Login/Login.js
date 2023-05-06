import React, { useEffect, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [enterCName, setEnteredCName] = useState("");
  const [enterCNameIsValid, setCNameIsValid] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);

  //Debouncing :we check for single key stroke we are not checking the validation of form , we wait for some time , when user take a pause or , something then we check form validation, this happens caz of Settimeout()
  // and also a CLEANUP FUNC : it basically return anonymous func : we use a cleanup function to cancel the timer when it is no longer needed. in that we use clearTimeout()  built in by Browser .
  useEffect(() => {
    const identifier = setTimeout(() => {
      {
        console.log("checking validity of form");
        setFormIsValid(
          enteredEmail.includes("@") &&
            enteredPassword.trim().length > 6 &&
            enterCName.trim().length > 0
        );
      }
    }, 1000);

    return () => {
      console.log("CLEANUP FUNCTION ");
      //clearTime is built into Browser.
      clearTimeout(identifier);
    };
  }, [enteredEmail, enteredPassword, enterCName]);

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const CNameHandler = (event) => {
    setEnteredCName(event.target.value);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes("@"));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const validateCNamedHandler = () => {
    setCNameIsValid(enterCName.trim().length > 0);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            enterCNameIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="cName">College Name</label>
          <input
            type="text"
            id="cName"
            value={enterCName}
            onChange={CNameHandler}
            onBlur={validateCNamedHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
