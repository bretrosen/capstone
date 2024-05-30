import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { getCurrentUserReviewsThunk } from '../../store/reviews';
import OpenModalButton from '../OpenModalButton';
import DeleteReview from '../DeleteReview';
import Pagination from '../Pagination';
import './UserReviews.css';
import advancedFormat from 'dayjs/plugin/advancedFormat';
const dayjs = require('dayjs');
dayjs.extend(advancedFormat);


export const CurrentUserReviewList = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 25;

    const reviewsObj = useSelector(state => state.reviews.userReviews)
    const reviews = Object.values(reviewsObj).sort((a, b) => new Date(b.time_stamp) - new Date(a.time_stamp))

    const user = useSelector(state => state.session.user);

    const totalPages = Math.ceil(reviews.length / reviewsPerPage);
    // get reviews for current page
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        dispatch(getCurrentUserReviewsThunk())
        // console.log('useEffect in user reviews ran')
    }, [dispatch])

    if (!reviews) {
        return <h1>Loading...</h1>
    }

    return (
        <div className='reviews-list-wrapper'>
            <div className='profs-list-heading'>
                You have {reviews.length} reviews of The University of Life
            </div>
            {currentReviews.map((review) => (
                <React.Fragment key={review.id}>
                    <Link to={`/reviews/${review.id}`}>
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
                            className='delete-button'
                            buttonText='Delete Rating'
                            modalComponent={<DeleteReview reviewId={review.id} />}
                        />
                    }
                </React.Fragment>
            ))}
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
            />
        </div>
    )
}
