import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { getSingleReviewThunk } from '../../store/reviews'

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
        <div className='review-wrapper'>
            <div className='review-attributes'>
                <div>Intelligence: {review.intelligence}</div>
                <div>Wisdom: {review.wisdom}</div>
                <div>Charisma: {review.charisma}</div>
                <div>Knowledge: {review.knowledge}</div>
                <div>Preparation: {review.preparation}</div>
                <div>Respect: {review.respect}</div>
            </div>
            <div className='review-summary'>
                <div>
                    <div>Course: {review.course_id}</div>
                    <div>Prof: {review.prof_id}</div>
                    <div>{review.time_stamp}</div>
                </div>
                <div>
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
            </div>
            <div className='review-text'>{review.review}</div>
        </div>
    )
}
