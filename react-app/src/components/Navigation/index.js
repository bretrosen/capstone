import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user)

	return (
		<>
        <div className='nav-wrapper'>
            <NavLink className='nav-logo' to='/'>
                Home
            </NavLink>
            <div className='nav-menu-center'>
            </div>
            <div className='nav-wrapper-right'>

                    {isLoaded && (
                        
                            <ProfileButton user={sessionUser} />

                    )}

            </div>
        </div>

		</>


	);
}

export default Navigation;
