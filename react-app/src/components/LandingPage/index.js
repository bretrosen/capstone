import React, { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { getAllReviewsThunk } from '../../store/reviews'
import { getAllProfsThunk } from '../../store/profs'
import { getAllCoursesThunk } from '../../store/courses'
import { getAllDebatesThunk } from '../../store/debates'
import ProfileButton from '../Navigation/ProfileButton.js';
import Footer from '../Footer'
import { ProfList } from './ProfList.js'
import "./LandingPage.css"

export const LandingPage = () => {
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const profsObj = useSelector(state => state.profs.allProfs)
    const profs = Object.values(profsObj)

    console.log("profs array on landing page ==========>", profs)

    const [search, setSearch] = useState('')
    const [lastName, setLastName] = useState('')
    const [firstName, setFirstName] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
    }

    // load everything into the store
    useEffect(() => {
        dispatch(getAllReviewsThunk())
        dispatch(getAllProfsThunk())
        dispatch(getAllCoursesThunk())
        dispatch(getAllDebatesThunk())
        console.log("useEffect on landing page ran")
    }, [sessionUser])

    // show search results for min 2 character searches
    const showProfClass = 'prof-dropdown' + '-' + (search.length > 1 ? 'show' : 'hidden')

    // show nothing found if first or last name doesn't match search string
    const showNoItems = 'items' + '-' + ((!lastName.toLowerCase().startsWith(search.toLowerCase()) && !firstName.toLowerCase().startsWith(search.toLowerCase())) ? 'show' : 'hidden')

    return (
        <>
            <div className='landing-top'>
                <div className='landing-center'>
                    <NavLink to='/reviews' className='landing-link'>All Reviews</NavLink>
                    <NavLink to='/profs' className='landing-link'>All Professors</NavLink>
                    <NavLink to='/courses' className='landing-link'>All Courses</NavLink>
                    {sessionUser &&
                        <>
                            <NavLink to='/reviews/new' className='landing-link'>New Review</NavLink>
                            <NavLink to='/profs/new' className='landing-link'>New Professor</NavLink>
                            <NavLink to='/courses/new' className='landing-link'>New Course</NavLink>

                        </>
                    }

                </div>
                <div className='landing-top-right'>
                    <ProfileButton user={sessionUser} />
                </div>
            </div>

            <div className='landing-page'>
                <div className='landing-title'>Debate My Professors</div>
                <div className='get-started'>

                    <p className='small-landing-header'>They test you. Now test them.</p>

                    <div className='enter-a-prof'>
                        <NavLink to='/debates' className='landing-link'>
                            50 First Debates to Start
                        </NavLink>
                        {sessionUser &&
                            <>
                                <br />
                                <br />
                                <NavLink to='debates/new' className='landing-link'>
                                    Create a New Debate
                                </NavLink>

                            </>
                        }
                    </div>

                    {/* form for search input */}
                    <form className='search-form' onSubmit={handleSubmit}>
                        <i className="fas fa-search" />
                        <input
                            className='prof-search'
                            type='text'
                            value={search}
                            placeholder='Search for a professor'
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

                </div>
            </div>
            <Footer />
        </>
    )
}
