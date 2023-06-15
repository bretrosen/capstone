import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllReviewsThunk } from '../../store/reviews'

export const ReviewList = () => {
    const dispatch = useDispatch()

    const reviewsObj = useSelector(state => state.reviews.allReviews)
    const reviews = Object.values(reviewsObj)

    useEffect(() => {
        dispatch(getAllReviewsThunk())
    }, [dispatch])

    return (
        <div className='reviews-list-wrapper'>
            {reviews.map((review) => (
                <div className='reviews-list-item' key={review.id}>
                    <div className='reviews-list-ratings'>
                        <div>Overall: {review.quality}</div>
                        <div>Difficulty: {review.difficulty}</div>
                    </div>
                    <div className='reviews-list-item-summary'>
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
                    <div className='reviews-list-item-review'>{review.review}</div>
                    <br></br>
                </div>
            ))}
        </div>
    )
}