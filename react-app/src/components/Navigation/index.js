import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user)

	return (
		<>
			{!sessionUser && <ul className='nav-bar'>
				<li>
					<NavLink exact to="/" id="nav-logo">Home

					</NavLink>
				</li>
				<div className='nav-login-signup'>
					<li className='remove-dot'>
						<NavLink to="/login" className='login-signup' id='nav-login'>Log in</NavLink></li>
					<li className='remove-dot'>
						<NavLink to="signup" className='login-signup' id='sign-up'>Sign up</NavLink></li>
				</div>
			</ul>
			}

			{sessionUser &&
				<div className='nav-bar'>
					<div className='search-home'>
						<NavLink exact to="/" id="nav-logo">Home
						</NavLink>


					</div>
					<ProfileButton user={sessionUser} />
				</div>}



		</>


	);
}

export default Navigation;
