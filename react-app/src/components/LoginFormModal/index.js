import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  // let canSubmit = false;
  // if (email.length > 3 && password.length > 5) canSubmit = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      // console.log("data???", data)
      setErrors(data);
      // console.log("errors??", errors)
    } else {
      closeModal()
    }
  };

  const demoUserLogin = async (e) => {
    e.preventDefault()
    const email = 'john316@hms.gov'
    const password = 'password'
    const data = await dispatch(login(email, password))
    if (data) {
      setErrors(data)
    } else {
      closeModal()
    }
  };

  return (
    <div className='login-wrapper'>

      <h1>Log In</h1>
      {/* {errors[0] && <p className='login-errors'>{errors[0]}</p>}
      {errors[1] && <p className='login-errors'>{errors[1]}</p>}
      {errors[2] && <p className='login-errors'>{errors[2]}</p>}
      {errors[3] && <p className='login-errors'>{errors[3]}</p>} */}
      <form onSubmit={handleSubmit}>
        <div className='login-form'>
        <ul className='login-errors'>
          {/* {errors[0] && <li>{errors[0]}</li>}
          {errors[1] && <li>{errors[1]}</li>}
          {errors[2] && <li>{errors[2]}</li>} */}
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
          <label>
            <input
              className='login-form-input'
              type='text'
              value={email}
              placeholder='Email'
              onChange={e => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            <input
              className='login-form-input'
              type='password'
              value={password}
              placeholder='Password'
              onChange={e => setPassword(e.target.value)}
              required
            />
          </label>
          <button className='submit-login-button'
            type='submit'
          // disabled={!canSubmit}
          >Login
          </button>
          <button
            className='demo-user'
            onClick={demoUserLogin}>
            Demo User
          </button>
          <p className='login-small'>Debate My Professors is designed for and targeted to audiences in the Galactic Empire and is governed by and operated in accordance with laws of the Empire. We made a deal that'll keep the Empire here forever.</p>
          <p className='bottom-login-modal'>Don't have an account?&nbsp;
        <OpenModalButton
              className='signup-button-login-modal'
              buttonText="Sign Up"
              modalComponent={<SignupFormModal />}/>
              </p>
        </div>
      </form>

    </div>
  );
}

export default LoginFormModal;
