import React from 'react'
import { useDispatch } from 'react-redux'
import { useModal } from "../../context/Modal"
import { deleteReviewThunk } from '../../store/reviews'
import './DeleteReview.css'

const DeleteReview = ({ reviewId }) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const handleDelete = (event) => {
        return dispatch(deleteReviewThunk(reviewId))
            .then(closeModal)
    }

    return (
        <div className='delete-review-wrapper'>
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this rating?</p>
            <button className='regular-button' onClick={handleDelete}>Yes (Delete Rating)</button>&nbsp;&nbsp;
            <button className='regular-button' onClick={closeModal}>No (Keep Rating)</button>
        </div>
    )
}

export default DeleteReview
