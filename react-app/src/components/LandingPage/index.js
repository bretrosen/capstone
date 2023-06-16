import React, { useEffect } from 'react'
import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { getAllReviewsThunk } from '../../store/reviews'
import { getAllProfsThunk } from '../../store/profs'
import { getAllCoursesThunk } from '../../store/courses'
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
        <div className='landing-page'>
            <div className='get-started'>
                {/* <img className='man-book' src='/static/man-reading-book.jpeg' alt='man reading book'></img> */}
                    <div className='enter'>
                        <NavLink to='/reviews'>All Reviews</NavLink>
                        <br></br>
                        <NavLink to='/reviews/new'>New Review</NavLink>
                    </div>


            </div>
        </div>
    )
}
