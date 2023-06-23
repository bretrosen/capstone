import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from "../../context/Modal"
import { deleteProfThunk } from '../../store/profs'
import { deleteReviewThunk } from '../../store/reviews'
import './DeleteProf.css'

const DeleteProf = ({ profId }) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const reviewsObj = useSelector(state => state.reviews.allReviews)
    const reviews = Object.values(reviewsObj)


    const handleDelete = () => {
        reviews.forEach(review => {
            if (review.prof_id === profId) {
                dispatch(deleteReviewThunk(review.id))
            }
        })

        dispatch(deleteProfThunk(profId))
            .then(closeModal)
    }

    return (
        <div className='delete-prof-wrapper'>
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this professor?</p>
            <button className='regular-button' onClick={handleDelete}>Yes (Delete Professor)</button>&nbsp;&nbsp;
            <button className='regular-button' onClick={closeModal}>No (Keep Professor)</button>
        </div>
    )
}

export default DeleteProf
