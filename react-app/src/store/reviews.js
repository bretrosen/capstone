// action type constants

const GET_ALL_REVIEWS = 'reviews/getAllReviews'
const GET_SINGLE_REVIEW = 'reviews/getSingleReview'
const CREATE_REVIEW = 'reviews/createReview'
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

const createReview = (review) => ({
        type: CREATE_REVIEW,
        review
})

const deleteReview = (reviewId) => ({
        type: DELETE_REVIEW,
        reviewId
})

// thunks

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

export const getSingleReviewThunk = (reviewId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}`)
    console.log('sending single review thunk', response)

    if (response.ok) {
        const review = await response.json()
        console.log('returning single review thunk', review)
        dispatch(getSingleReview(review))
        return review
    }
}

export const getCurrentUserReviewsThunk = () => async (dispatch) => {
    const response = await fetch('/api/reviews/current')
    console.log('sending current user reviews thunk', response)

    if (response.ok) {
        const reviews = await response.json()
        console.log('returning current user reviews thunk', reviews)
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
        dispatch(createReview(newReview))
        return newReview
    }
}

export const updateReviewThunk = (reviewId, review) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    })
    console.log('sending update review thunk', response)

    if (response.ok) {
        const updatedReview = await response.json()
        console.log('returning update review thunk', updatedReview)
        dispatch(createReview(updatedReview))
        return updatedReview
    }
}

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    console.log("sending delete review thunk")

    if (response.ok) {
        await response.json()
        console.log("returning delete review thunk")
        dispatch(deleteReview(reviewId))
        return
    }
}

const initialState = {allReviews: {}, singleReview: {}}

// reducer
export default function reviewsReducer(state = initialState, action)  {
    switch (action.type) {
        case GET_ALL_REVIEWS: {
            const newState = {...state, allReviews: {...state.allReviews}, singleReview: {...state.singleReview}}

            action.reviews.reviews.forEach((review) => {
                newState.allReviews[review.id] = review
            })

            return newState
        }
        case GET_SINGLE_REVIEW: {
            return {...state, allReviews: {...state.allReviews}, singleReview: {...action.review}}
        }
        case CREATE_REVIEW: {
            const id = action.review.id
            const newState = {...state.allReviews}
            newState[id] = action.review
            return {...state, allReviews: newState}
        }
        case DELETE_REVIEW: {
            const reviewToDelete = action.reviewId
            const allUserReviews = state.allReviews
            const updatedReviews = {...allUserReviews}
            delete updatedReviews[reviewToDelete]
            return {...state, allReviews: updatedReviews}
        }
        default:
            return state
    }
}
