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
        <h1>Single Review Page...</h1>
    )
}
