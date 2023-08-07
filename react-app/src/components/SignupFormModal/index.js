import React, { useState, useEffect } from "react";
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
	const [confirm_password, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	// frontend error handling
	useEffect(() => {
		const newErrors = []

		if (username.trim().length < 4 || username.length > 40) newErrors['username'] = 'Username must be between 4 and 40 characters'
		if (first_name.length > 20) newErrors['first_name'] = 'First name must be 20 or fewer characters'
		if (last_name.length > 20) newErrors['last_name'] = 'Last name must be 20 or fewer characters'
		if (password.trim().length < 6 || password.length > 40) newErrors['password'] = 'Password must be between 6 and 40 characters'

		setErrors(newErrors)
	}, [username, first_name, last_name, password])

	const handleSubmit = async (e) => {
		e.preventDefault();
		// if (password === confirm_password) {
			const data = await dispatch(signUp(username, email, password, confirm_password, first_name, last_name));
			if (data) {
				// console.log("data???", data)
				setErrors(data);
				// console.log("errors??", errors)
			} else {
				closeModal();
			}
		// } else {
		// 	setErrors([
		// 		"Confirm Password field must be the same as the Password field",
		// 	]);
		// }
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
							value={confirm_password}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>

					<button className='submit-signup-button' type="submit">Sign Up</button>
					<p className='login-small'>Debate My Professors is designed for and targeted to audiences in the Galactic Empire and is governed by and operated in accordance with laws of the Empire. We made a deal that'll keep the Empire here forever.</p>
				</div>
			</form>
		</div>
	);
}

export default SignupFormModal;
