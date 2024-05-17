import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import { getSingleCourseThunk, getAllCoursesThunk } from '../../store/courses'
import { getAllReviewsThunk } from '../../store/reviews'
// import OpenModalButton from '../OpenModalButton'
import RatingDistribution from './RatingDistribution'
import '../SingleProf/SingleProf.css'
import './SingleCourse.css'
import advancedFormat from 'dayjs/plugin/advancedFormat'
const dayjs = require('dayjs')
dayjs.extend(advancedFormat)

export const SingleCourse = () => {
    const dispatch = useDispatch()
    // const history = useHistory()

    const { courseId } = useParams()
    // const user = useSelector(state => state.session.user)
    // console.log("course Id param in component ===========>", courseId)

    const course = useSelector(state => state.courses.singleCourse)
    const coursesObj = useSelector(state => state.courses.allCourses)
    const courses = Object.values(coursesObj)

    let courseIdToKeyInto
    // find the right index in the courses array to access
    for (let i = 0; i <= courses.length; i++) {
        if (courses[i]?.id === courseId) {
            courseIdToKeyInto = i
        }
    }

    const courseReviews = Object.values(useSelector(state => state.courses.singleCourse.reviews ?? {})).sort((a, b) => new Date(b.time_stamp) - new Date(a.time_stamp))

    const reviewsObj = useSelector(state => state.reviews.allReviews)
    const reviews = Object.values(reviewsObj).sort((a, b) => new Date(b.time_stamp) - new Date(a.time_stamp))


    // ensure we start at the top of the screen
    window.scrollTo(0, 0)

    useEffect(() => {
        dispatch(getSingleCourseThunk(courseId))
        dispatch(getAllCoursesThunk())
        dispatch(getAllReviewsThunk())
    }, [dispatch, courseId])

    if (!Object.values(course).length) {
        return <h1>Loading...</h1>
    }

    return (
        <div className='single-prof-wrapper'>
            <div className='single-prof-top'>
                <div className='single-course-top-left'>
                    <div className='single-prof-quality'>
                        <div className='single-prof-quality-number'>
                            {courses[courseIdToKeyInto]?.quality?.toFixed(1)}
                        </div>
                        <div className='quality-out-of'>
                            / 20
                        </div>
                    </div>
                    <div className='quality-lower'>
                        <div className='quality-label'>
                            Overall Quality based on {course.reviews.length} ratings
                        </div>
                        <div className='single-prof-name'>
                            {course.name}
                        </div>
                        <div className='single-prof-department'>
                            Course in the {course.department} department
                        </div>
                        <div className='single-prof-aggregates'>
                            <div className='single-prof-recommends'>
                                <div className='recommends-number'>
                                    {courses[courseIdToKeyInto]?.recommended?.toFixed(1)} %
                                </div>
                                <div className='recommends-text'>
                                    Would take again
                                </div>
                            </div>
                            <div className='single-prof-difficulty'>
                                <div className='difficulty-number'>
                                    {courses[courseIdToKeyInto]?.difficulty?.toFixed(1)}
                                </div>
                                <div className='difficulty-text'>
                                    Level of difficulty
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <button className='regular-button' onClick={() => history.push(`/reviews/new`)}>Rate Professor {prof.last_name}</button> */}
                </div>
                <div className='bar-chart'>
                    <div className='chart-heading'>
                        Rating Distribution
                    </div>
                    <RatingDistribution />
                </div>
            </div>
            <div className='single-prof-reviews'>

                {courseReviews.map((review) => (
                    <React.Fragment key={review.id}>
                        <Link to={`/reviews/${review.id}`} >
                            <div className='reviews-list-item' >

                                <div className='reviews-list-ratings'>
                                    <div className='rating-heading'>Quality</div>
                                    {review.quality > 0 && review.quality < 6.7 &&
                                        <div className='rating-number' id='low'>{review.quality.toFixed(1)}</div>}
                                    {review.quality >= 6.7 && review.quality < 13.4 &&
                                        <div className='rating-number' id='medium'>{review.quality.toFixed(1)}</div>}
                                    {review.quality >= 13.4 && review.quality <= 20 &&
                                        <div className='rating-number' id='high'>{review.quality.toFixed(1)}</div>}
                                    <div className='rating-heading'>Difficulty</div>
                                    <div className='rating-number-difficulty'>{review.difficulty.toFixed(1)}</div>
                                </div>
                                <div className='reviews-list-right'>
                                    <div className='reviews-right-top'>
                                        <div className='review-course-name'>Professor {review.prof_name}</div>

                                        <div className='review-time'>{dayjs(review.time_stamp).format("MMMM Do, YYYY")}</div>
                                    </div>
                                    <div className='reviews-right-middle'>
                                        <div className='review-item'>For Credit:&nbsp;
                                            {review.for_credit && <span className='review-boolean'>Yes</span>}
                                            {!review.for_credit && <span className='review-boolean'>No</span>}
                                        </div>
                                        <div className='review-item'>Attendance:&nbsp;
                                            {review.attendance && <span className='review-boolean'>Mandatory</span>}
                                            {!review.attendance && <span className='review-boolean'>Optional</span>}
                                        </div>
                                        <div className='review-item'>Would Take Again:&nbsp;
                                            {review.would_recommend && <span className='review-boolean'>Yes</span>}
                                            {!review.would_recommend && <span className='review-boolean'>No</span>}
                                        </div>
                                        <div className='review-item'>Textbook:&nbsp;
                                            {review.textbook && <span className='review-boolean'>Yes</span>}
                                            {!review.textbook && <span className='review-boolean'>No</span>}
                                        </div>
                                    </div>
                                    <div className='reviews-right-bottom'>{review.review}</div>
                                </div>
                            </div>

                        </Link>

                        {/* {user && review.creator_id === user.id &&
                    <button className='regular-button' onClick={() => history.push(`/reviews/${review.id}/edit`)}>Update Rating</button>}
                &nbsp;&nbsp;
                {user && review.creator_id === user.id &&
                    <OpenModalButton
                        className='regular-button'
                        buttonText='Delete'
                        modalComponent={<DeleteReview reviewId={review.id} />}
                    />
                } */}

                    </React.Fragment>

                ))}



            </div>
        </div>
    )
}
