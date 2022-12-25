import { useRef, useState } from "react";
import classes from "./Checkout.module.css";
const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.length === 5;
const Checkout = (props) => {
  const [formIsValid, setFormIsValid] = useState({
    name: true,
    city: true,
    street: true,
    postal: true,
  });
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const cityInputRef = useRef();
  const postalCodeInputRef = useRef();
  const confirmHandler = (event) => {
    event.preventDefault();
    const name = nameInputRef.current.value;
    const street = streetInputRef.current.value;
    const city = cityInputRef.current.value;
    const postal = postalCodeInputRef.current.value;
    const nameIsValid = !isEmpty(name);
    const streetIsValid = !isEmpty(street);
    const cityIsValid = !isEmpty(city);
    const postalIsValid = isFiveChars(postal);
    setFormIsValid({
      name: nameIsValid,
      street: streetIsValid,
      city: cityIsValid,
      postal: postalIsValid,
    });
    const formValidity =
      nameIsValid && streetIsValid && postalIsValid && cityIsValid;

    if (formValidity) {
      props.onSubmit({
        name: name,
        city: city,
        street: street,
        postal: postal,
      });
      //submit the form
    }
  };
  const nameClasses = formIsValid.name ? "control" : "control invalid";
  const streetClasses = formIsValid.street ? "control" : "control invalid";
  const postalClasses = formIsValid.postal ? "control" : "control invalid";
  const cityClasses = formIsValid.city ? "control" : "control invalid";

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formIsValid.name && <p>Enter a valid Name</p>}
      </div>
      <div className={streetClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formIsValid.street && <p>please enter a valid street</p>}
      </div>
      <div className={postalClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formIsValid.postal && <p>Please enter a valid postal</p>}
      </div>
      <div className={cityClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formIsValid.city && <p>Please enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
