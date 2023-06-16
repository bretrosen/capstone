import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllReviewsThunk } from '../../store/reviews'
import './Reviews.css'

export const ReviewList = () => {
    const dispatch = useDispatch()

    const reviewsObj = useSelector(state => state.reviews.allReviews)
    const reviews = Object.values(reviewsObj)

    useEffect(() => {
        dispatch(getAllReviewsThunk())
        console.log("useEffect in get reviews ran")
    }, [dispatch])

    if (!reviews) {
        return <h1>Loading...</h1>
    }

    return (
        <div className='reviews-list-wrapper'>
            {reviews.map((review) => (
                <Link to={`/reviews/${review.id}`} key={review.id}>
                <div className='reviews-list-item' key={review.id}>

                    <div className='reviews-list-ratings'>
                        <div>Quality: {review.quality}</div>
                        <div>Difficulty: {review.difficulty}</div>
                    </div>
                    <div className='reviews-list-right'>
                        <div className='reviews-right-top'>
                            <div className='review-item'>{review.course_name}</div>
                            <div className='review-item'>Prof: {review.prof_first_name} {review.prof_last_name}</div>
                            <div>{review.time_stamp}</div>
                        </div>
                        <div className='reviews-right-middle'>
                            <div className='review-item'>For Credit:
                                {review.for_credit && `Yes`}
                                {!review.for_credit && `No`}
                            </div>
                            <div className='review-item'>Attendance:
                                {review.attendance && `Mandatory`}
                                {!review.attendance && `Optional`}
                            </div>
                            <div className='review-item'>Would Take Again:
                                {review.would_recommend && `Yes`}
                                {!review.would_recommend && `No`}
                            </div>
                            <div className='review-item'>Textbook:
                                {review.textbook && `Yes`}
                                {!review.textbook && `No`}
                            </div>
                        </div>
                        <div className='reviews-right-bottom'>{review.review}</div>
                    </div>
                </div>
                </Link>
            ))}
        </div>
    )
}
