import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [first_name, setFirstName] = useState('');
	const [last_name, setLastName] = useState('');
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password, first_name, last_name));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<div className='signup-form-wrapper'>
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<div className='signup-form'>
					<ul className='signup-errors'>
						{errors.map((error, idx) => (
							<li key={idx}>{error}</li>
						))}
					</ul>
						<input
							className='signup-form-input'
							type="text"
							placeholder='First Name'
							value={first_name}
							onChange={(e) => setFirstName(e.target.value)}
							required
						/>
						<input
							className='signup-form-input'
							type="text"
							placeholder='Last Name'
							value={last_name}
							onChange={(e) => setLastName(e.target.value)}
							required
						/>
						<input
							className='signup-form-input'
							type="text"
							placeholder='Email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						<input
							className='signup-form-input'
							type="text"
							placeholder='Username'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
						<input
							className='signup-form-input'
							type="password"
							placeholder='Password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						<input
							className='signup-form-input'
							type="password"
							placeholder='Confirm Password'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>

					<button className='regular-button' type="submit">Sign Up</button>
				</div>
			</form>
		</div>
	);
}

export default SignupFormModal;
