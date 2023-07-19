import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { getSingleReviewThunk } from '../../store/reviews'
import './SingleReview.css'
import advancedFormat from 'dayjs/plugin/advancedFormat'
const dayjs = require('dayjs')
dayjs.extend(advancedFormat)

export const SingleReview = () => {
    const dispatch = useDispatch()
    const { reviewId } = useParams()

    const review = useSelector(state => state.reviews.singleReview)
    console.log("review from single spot component", review)

    useEffect(() => {
        dispatch(getSingleReviewThunk(reviewId))
    }, [dispatch, reviewId])

    if (!Object.values(review).length) {
        return <h1>Loading...</h1>
    }

    return (
        <div className='single-review-wrapper'>
            <h1 className='single-review-h1'>Professor Performance Review</h1>


            <div className='review-top'>
                <h2 className='single-review-h2'>Professor and Course Information</h2>
                <div className='info-box'>


                    <div className='info-left'>
                        <div className='info-row'>
                            <div className='info-heading'>Professor Name</div>
                            <div className='info-value'>{review.prof_first_name} {review.prof_last_name}</div>
                        </div>
                        <div className='info-row'>
                            <div className='info-heading'>Professor ID</div>
                            <div className='info-value'>{review.prof_id} </div>
                        </div>
                        <div className='info-row'>
                            <div className='info-heading'>Course Name</div>
                            <div className='info-value'>{review.course_name} </div>
                        </div>
                        <div className='info-row'>
                            <div className='info-heading'>Course ID</div>
                            <div className='info-value'>{review.course_id} </div>
                        </div>
                    </div>

                    <div className='info-right'>
                        <div className='info-row'>
                            <div className='boolean-heading'>Course Taken For Credit</div>
                            <div className='boolean-value'>
                                {review.for_credit && `Yes`}
                                {!review.for_credit && `No`}
                            </div>
                        </div>
                        <div className='info-row'>
                            <div className='boolean-heading'>Attendance</div>
                            <div className='boolean-value'>
                                {review.attendance && `Mandatory`}
                                {!review.attendance && `Optional`}
                            </div>
                        </div>
                        <div className='info-row'>
                            <div className='boolean-heading'>Would Take Again</div>
                            <div className='boolean-value'>
                                {review.would_recommend && `Yes`}
                                {!review.would_recommend && `No`}
                            </div>
                        </div>
                        <div className='info-row'>
                            <div className='boolean-heading'>Textbook</div>
                            <div className='boolean-value'>
                                {review.textbook && `Yes`}
                                {!review.textbook && `No`}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className='review-bottom'>
                <div className='bottom-left'>
                    <h2 className='single-review-h2'>Professor Attributes</h2>
                    <div className='info-row'>
                        <div className='info-heading'>Intelligence</div>
                        <div className='num-value'>{review.intelligence}</div>
                    </div>
                    <div className='info-row'>
                        <div className='info-heading'>Wisdom</div>
                        <div className='num-value'>{review.wisdom}</div>
                    </div>
                    <div className='info-row'>
                        <div className='info-heading'>Charisma</div>
                        <div className='num-value'>{review.charisma}</div>
                    </div>
                    <div className='info-row'>
                        <div className='info-heading'>Knowledge</div>
                        <div className='num-value'>{review.knowledge}</div>
                    </div>
                    <div className='info-row'>
                        <div className='info-heading'>Preparation</div>
                        <div className='num-value'>{review.preparation}</div>
                    </div>
                    <div className='info-row'>
                        <div className='info-heading'>Respect</div>
                        <div className='num-value'>{review.respect}</div>
                    </div>
                    <div className='info-row'>
                        <div className='info-heading'>Difficulty</div>
                        <div className='num-value'>{review.difficulty}</div>
                    </div>
                    <div className='info-row'>
                        <div className='info-heading'>Overall Quality</div>
                        <div className='num-value'>{review.quality.toFixed(1)}</div>
                    </div>
                </div>

                <div className='bottom-right'>
                    <h2 className='single-review-h2-comments'>Reviewer Comments</h2>
                    <div className='review-text'>{review.review}</div>
                    <div className='review-date'>Review Date: {dayjs(review.time_stamp).format("MMMM Do, YYYY")}</div>
                </div>
            </div>







            {/* <div className='single-review-heading'>Review of {review.course_name} as taught by Professor {review.prof_first_name} {review.prof_last_name}</div>
            <div className='single-review-container'>
                <div className='single-review-summary'>

                    <div>Review date: {dayjs(review.time_stamp).format("MMMM Do, YYYY")}</div>
                    <div className='single-review-text'>{review.review}</div>
                    <div>For Credit:
                        {review.for_credit && `Yes`}
                        {!review.for_credit && `No`}
                    </div>
                    <div>Attendance:
                        {review.attendance && `Mandatory`}
                        {!review.attendance && `Optional`}
                    </div>
                    <div>Would Take Again:
                        {review.would_recommend && `Yes`}
                        {!review.would_recommend && `No`}
                    </div>
                    <div>Textbook:
                        {review.textbook && `Yes`}
                        {!review.textbook && `No`}
                    </div>
                </div>
                <div className='single-review-attributes'>
                    <div>Intelligence: {review.intelligence}</div>
                    <div>Wisdom: {review.wisdom}</div>
                    <div>Charisma: {review.charisma}</div>
                    <div>Knowledge: {review.knowledge}</div>
                    <div>Preparation: {review.preparation}</div>
                    <div>Respect: {review.respect}</div>
                    <div>Difficulty: {review.difficulty}</div>
                </div>
            </div> */}
        </div>
    )
}
