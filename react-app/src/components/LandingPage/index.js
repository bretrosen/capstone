import React, { useEffect } from 'react'
import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { getAllReviewsThunk } from '../../store/reviews'
import { getAllProfsThunk } from '../../store/profs'
import { getAllCoursesThunk } from '../../store/courses'
import ProfileButton from '../Navigation/ProfileButton.js';
import Footer from '../Footer'
import "./LandingPage.css"

export const LandingPage = () => {
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()

    // load everything into the store
    useEffect(() => {
        dispatch(getAllReviewsThunk())
        dispatch(getAllProfsThunk())
        dispatch(getAllCoursesThunk())
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
                <div className='get-started'>
                    <div className='enter-a-prof'>Enter a professor to get started</div>
                    <button className='search-bar-landing' onClick={() => { return alert('Feature coming soon...') }}>

                        <i className="fas fa-graduation-cap fa-flip-horizontal"></i>&nbsp;&nbsp;
                        <div className='search-placeholder'>Professor name</div>
                    </button>

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
