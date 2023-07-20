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

                    <div className='enter-a-prof'>

                        <p className='small'>They test you. Now test them.</p>
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

                    <button className='search-bar-landing' onClick={() => { return alert('Feature coming soon...') }}>

                        <i className="fas fa-graduation-cap fa-flip-horizontal"></i>&nbsp;&nbsp;
                        <div className='search-placeholder'>Search for a professor</div>
                    </button>

                    <form onSubmit={handleSubmit}>
                    <i className="fas fa-graduation-cap fa-flip-horizontal" />
                    <input
                        type='text'
                        value={search}
                        placeholder='Search for a professor'
                        onChange={e => setSearch(e.target.value)}
                    />
                    <div>
                        <ul>
                            {profs.map((prof) => (
                                <ProfList
                                    prof={prof}
                                    search={search}
                                    setLastName={setLastName}
                                    setSearch={setSearch}
                                    key={prof.id}
                                />
                            ))}
                        </ul>
                    </div>
                    </form>

                    {/* <input className='search-bar-landing' placeholder='Professor Name'></input> */}
                    {/* <img className='man-book' src='/static/man-reading-book.jpeg' alt='man reading book'></img> */}
                    {/* <div className='enter'>
                        <NavLink to='/reviews'>All Reviews</NavLink>
                        <br></br>
                        <NavLink to='/reviews/new'>New Review</NavLink>
                        <br></br>
                        <NavLink to='/profs'>All Professors</NavLink>
                        <br></br>
                        <NavLink to='/profs/new'>New Professor</NavLink>
                    </div> */}


                </div>
            </div>
            <Footer />
        </>
    )
}
