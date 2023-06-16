import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user)

	return (
		<div className='nav-wrapper'>
			<NavLink className='nav-logo' to='/'>
				<i className="fa-solid fa-book-atlas" />
				&nbsp; bookfairBnb
			</NavLink>
			<div>
				{isLoaded && (
					<li>
						<ProfileButton user={sessionUser} />
					</li>
				)}
			</div>
		</div>

	);
}

export default Navigation;
