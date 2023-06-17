import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReviewForm } from '../CreateReview'

export const UpdateReviewForm = () => {
    const { reviewId } = useParams()
    const reviews = Object.values(useSelector(state => state.reviews.allReviews))
    const review = reviews.find( rev => rev.id === parseInt(reviewId))

    if (!review) {
        return <h1>Loading...</h1>
    }

    // pass review data to form to populate fields for update
    // pass form type to allow form to dispatch a different thunk for updating

    return (
        Object.keys(review).length > 1 && (
            <>
            <ReviewForm review={review} formType='Update' />
            </>
        )
    )
}
