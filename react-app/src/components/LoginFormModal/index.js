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

  let canSubmit = false;
  if (email.length > 3 && password.length > 5) canSubmit = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
    }
  };

  const demoUserLogin = async () => {
    await dispatch(login({ email: "john316@hms.gov", password: "password" }))
    closeModal()
  };

  return (
    <div className='wrapper'>
      <h1>Log In</h1>
      {errors.email && <p className='login-errors'>{errors.email}</p>}
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
          <button className=
            {canSubmit ? 'submit-login-button' :
              'submit-login-button-disabled'}
            type='submit'
            disabled={!canSubmit}
          >Log In
          </button>
          <button
            className='demo-user'
            onClick={() => demoUserLogin()}>
            Demo User
          </button>
        </div>
      </form>

    </div>
  );
}

export default LoginFormModal;
