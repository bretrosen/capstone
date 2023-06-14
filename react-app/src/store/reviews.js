// action type constants

const GET_ALL_REVIEWS = 'reviews/getAllReviews'
const GET_SINGLE_REVIEW = 'reviews/getSingleReview'
const CREATE_REVIEW = 'reviews/createReview'
const UPDATE_REVIEW = 'reviews/updateReview'
const DELETE_REVIEW = 'reviews/deleteReview'

// action creators

const getAllReviews = (reviews) => {
    return {
        type: GET_ALL_REVIEWS,
        reviews
    }
}

const getSingleReview = (review) => {
    return {
        type: GET_SINGLE_REVIEW,
        review
    }
}

const createReview = (review) => {
    return {
        type: CREATE_REVIEW,
        review
    }
}

const updateReview = (review, id) => {
    return {
        type: UPDATE_REVIEW,
        review,
        id
    }
}

const deleteReview = (review, id) => {
    return {
        type: DELETE_REVIEW,
        review,
        id
    }
}

// Thunks

export const getAllReviewsThunk = () => async (dispatch) => {
    const response = await fetch('/api/reviews')
    console.log('sending all reviews thunk', response)

    if (response.ok) {
        const reviews = await response.json()
        console.log('returning all reviews thunk', reviews)
        dispatch(getAllReviews(reviews))
        return reviews
    }
}

export const createReviewThunk = (review) => async (dispatch) => {
    const response = await fetch('/api/reviews/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    })
    console.log('sending create review thunk', response)

    if (response.ok) {
        const newReview = await response.json()
        console.log('returning create review thunk', newReview)
        dispatch(createReview(review))
        return newReview
    }
}


const initialState = {allReviews: {}, singleReview: {}}

// reducer
const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_REVIEWS: {
            const newState = {...state, allReviews: {}, singleReview: {}}
            action.reviews.reviews.forEach((review) => {
                newState.allReviews[review.id] = review
            })
            return newState
        }
        case CREATE_REVIEW: {
            const newState = {...state, allReviews: {...action.review}, singleReview: {}}
            return newState
        }
        default:
            return state
    }
}

export default reviewsReducer;
