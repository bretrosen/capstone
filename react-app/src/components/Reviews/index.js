import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import { getAllReviewsThunk } from '../../store/reviews'
import OpenModalButton from '../OpenModalButton'
import DeleteReview from '../DeleteReview'
import './Reviews.css'
import advancedFormat from 'dayjs/plugin/advancedFormat'
const dayjs = require('dayjs')
dayjs.extend(advancedFormat)


export const ReviewList = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const reviewsObj = useSelector(state => state.reviews.allReviews)
    const reviews = Object.values(reviewsObj)
    const user = useSelector(state => state.session.user)
    console.log("reviews array in get all reviews page ==========>", reviews)
    console.log("review length in get all reviews page ==========>", reviews.length)


    useEffect(() => {
        dispatch(getAllReviewsThunk())
        console.log("useEffect in get all reviews ran")
    }, [dispatch])


    if (!reviews) {
        return <h1>Loading...</h1>
    }

    return (
        <div className='reviews-list-wrapper'>
            <div className='profs-list-heading'>
                {reviews.length} Reviews of The University of Life
            </div>
            {reviews.map((review) => (
                <>
                    <Link to={`/reviews/${review.id}`} key={review.id}>
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
                                    <div className='review-course-name'>{review.course_name}</div>

                                    <div className='review-time'>{dayjs(review.time_stamp).format("MMMM Do, YYYY")}</div>
                                </div>
                                <div className='review-prof-name'>Professor: {review.prof_first_name} {review.prof_last_name}</div>
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

                    {user && review.creator_id === user.id &&
                        <button className='regular-button' onClick={() => history.push(`/reviews/${review.id}/edit`)}>Update Rating</button>}
                    &nbsp;&nbsp;
                    {user && review.creator_id === user.id &&
                        <OpenModalButton
                            className='regular-button'
                            buttonText='Delete Rating'
                            modalComponent={<DeleteReview reviewId={review.id} />}
                        />
                    }

                </>

            ))}
        </div>
    )
}
