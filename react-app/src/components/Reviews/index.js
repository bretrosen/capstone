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
                    <p>Review: {review.review}</p>
                    <p>Respect: {review.respect}</p>
                    <p>Would Recommend: {review.would_recommend}</p>
                </div>
            ))}
        </div>
    )
}
