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
                    <img className='nav-debate-pic' src="/debate.png" alt='Two people debating'></img>
                </NavLink>
                <div className='nav-menu-center'>
                    <NavLink to='/reviews' className='nav-link'>All Reviews</NavLink>
                    <NavLink to='/profs' className='nav-link'>All Professors</NavLink>
                    <NavLink to='/courses' className='nav-link'>All Courses</NavLink>
                    <NavLink to='/debates' className='nav-link'>All Debates</NavLink>
                    {sessionUser &&
                        <>
                            <NavLink to='/reviews/new' className='nav-link'>New Review</NavLink>
                            <NavLink to='/profs/new' className='nav-link'>New Professor</NavLink>
                            <NavLink to='/courses/new' className='nav-link'>New Course</NavLink>
                            <NavLink to='/debates/new' className='landing-link'>New Debate</NavLink>
                        </>
                    }

                    

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
