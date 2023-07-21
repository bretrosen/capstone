import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import { getSingleProfThunk, getAllProfsThunk } from '../../store/profs'
import { getAllReviewsThunk } from '../../store/reviews'
import OpenModalButton from '../OpenModalButton'
import DeleteReview from '../DeleteReview'
import RatingDistribution from './RatingDistribution'
import './SingleProf.css'
import advancedFormat from 'dayjs/plugin/advancedFormat'
const dayjs = require('dayjs')
dayjs.extend(advancedFormat)

export const SingleProf = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const { profId } = useParams()
    const user = useSelector(state => state.session.user)

    const prof = useSelector(state => state.profs.singleProf)
    console.log("prof from single prof component", prof)
    const profsObj = useSelector(state => state.profs.allProfs)
    const profs = Object.values(profsObj)
    console.log("profs in single prof component", profs)

    let profIdToKeyInto
    // find the right index in the profs array to access
    for (let i = 0; i <= profs.length; i++) {
        if (profs[i]?.id == profId) {
            profIdToKeyInto = i
        }
    }
    // console.log("index of profs array to use ==========>", profIdToKeyInto)

    const profReviews = useSelector(state => state.profs.singleProf.reviews)

    console.log("prof reviews in single prof =========>", profReviews)

    const reviewsObj = useSelector(state => state.reviews.allReviews)
    const reviews = Object.values(reviewsObj)

    // console.log("reviews array in single prof =========>", reviews)

    // ensure we start at the top of the screen
    window.scrollTo(0,0)

    useEffect(() => {
        dispatch(getSingleProfThunk(profId))
        dispatch(getAllProfsThunk())
        dispatch(getAllReviewsThunk())
    }, [dispatch, profId])

    if (!Object.values(prof).length) {
        return <h1>Loading...</h1>
    }

    return (
        <div className='single-prof-wrapper'>
            <div className='single-prof-top'>
                <div className='single-prof-top-left'>
                    <div className='single-prof-quality'>
                        <div className='single-prof-quality-number'>
                            {profs[profIdToKeyInto]?.quality?.toFixed(1)}
                        </div>
                        <div className='quality-out-of'>
                            / 20
                        </div>
                        </div>
                        <div className='quality-lower'>
                        <div className='quality-label'>
                            Overall Quality based on {prof.reviews.length} ratings
                        </div>
                        <div className='single-prof-name'>
                            {prof.first_name} {prof.last_name}
                        </div>
                        <div className='single-prof-department'>
                            Professor in the {prof.field} department
                        </div>
                        <div className='single-prof-aggregates'>
                            <div className='single-prof-recommends'>
                                <div className='recommends-number'>
                                    {profs[profIdToKeyInto]?.recommended?.toFixed(1)} %
                                </div>
                                <div className='recommends-text'>
                                    Would take again
                                </div>
                            </div>
                            <div className='single-prof-difficulty'>
                                <div className='difficulty-number'>
                                    {profs[profIdToKeyInto]?.difficulty?.toFixed(1)}
                                </div>
                                <div className='difficulty-text'>
                                    Level of difficulty
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className='regular-button' id='rate-prof-button' onClick={() => history.push(`/reviews/new`)}>Rate Professor {prof.last_name}</button>
                </div>
                <div className='bar-chart'>
                    <div className='chart-heading'>
                        Rating Distribution
                    </div>
                        <RatingDistribution />
                </div>
            </div>
            <div className='single-prof-reviews'>

            {profReviews.map((review) => (
                <>
                    <Link to={`/reviews/${review.id}`} key={review.id}>
                        <div className='reviews-list-item' >

                            <div className='reviews-list-ratings'>
                                <div className='rating-heading'>Quality</div>
                                {review.quality > 0 && review.quality < 6.7 &&
                                    <div className='rating-number' id='low'>{review.quality.toFixed(1)}</div>}
                                {review.quality >= 6.7 && review.quality < 13.4 &&
                                    <div className='rating-number' id='medium'>{reviews[review.id - 1].quality?.toFixed(1)}</div>}
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
                            buttonText='Delete'
                            modalComponent={<DeleteReview reviewId={review.id} />}
                        />
                    }

                </>

            ))}



            </div>
        </div>
    )
}
