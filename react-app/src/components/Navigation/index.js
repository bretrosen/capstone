import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { ProfList } from '../LandingPage/ProfList.js'
import '../LandingPage/LandingPage.css'
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user)
    const profsObj = useSelector(state => state.profs.allProfs)
    const profs = Object.values(profsObj)
    const [search, setSearch] = useState('')
    const [lastName, setLastName] = useState('')
    const [firstName, setFirstName] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
    }

    // show search results for min 2 character searches
    const showProfClass = 'prof-dropdown-nav' + '-' + (search.length > 1 ? 'show' : 'hidden')

    // show nothing found if first or last name doesn't match search string
    const showNoItems = 'items' + '-' + ((!lastName.toLowerCase().startsWith(search.toLowerCase()) && !firstName.toLowerCase().startsWith(search.toLowerCase())) ? 'show' : 'hidden')


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

                {/* form for search input */}
                <form className='search-form-nav' onSubmit={handleSubmit}>
                    <i className="fas fa-search" id='fas-nav' />
                    <input
                        className='prof-search-nav'
                        type='text'
                        value={search}
                        placeholder='Professor name'
                        onChange={e => setSearch(e.target.value)}
                    />
                    <ul className={showProfClass}>
                        {profs.map((prof) => (
                            <ProfList
                                prof={prof}
                                search={search}
                                setLastName={setLastName}
                                setFirstName={setFirstName}
                                setSearch={setSearch}
                                key={prof.id}
                            />
                        ))}
                        {
                            <div id={showNoItems}>Sorry, no profs by that name...</div>
                        }
                    </ul>
                </form>

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
