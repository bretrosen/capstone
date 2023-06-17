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
            <div className='single-review-heading'>Review of {review.course_name} as taught by Professor {review.prof_first_name} {review.prof_last_name}</div>
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
            </div>
        </div>
    )
}
