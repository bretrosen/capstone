import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
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
      console.log("data???", data)
      setErrors(data);
      console.log("errors??", errors)
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
    <div className='wrapper'>

      <h1>Log In</h1>
      {errors[0] && <p className='login-errors'>{errors[0]}</p>}
      {errors[1] && <p className='login-errors'>{errors[1]}</p>}
      <form onSubmit={handleSubmit}>
        <div className='login-form'>
          <label  >
            <input
              className='login-form-input'
              type='text'
              placeholder='Email'
              value={email}
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
          >Log In
          </button>
          <button
            className='demo-user'
            onClick={demoUserLogin}>
            Demo User
          </button>
        </div>
      </form>

    </div>
  );
}

export default LoginFormModal;
