import React from 'react'
import { useDispatch } from 'react-redux'
import { useModal } from "../../context/Modal"
import { deleteProfThunk } from '../../store/profs'

const DeleteProf = ({ profId }) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const handleDelete = (event) => {
        return dispatch(deleteProfThunk(profId))
            .then(closeModal)
    }

    return (
        <div>
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this professor?</p>
            <button className='regular-button' onClick={handleDelete}>Yes (Delete Professor)</button>
            <button className='regular-button' onClick={closeModal}>No (Keep Professor)</button>
        </div>
    )
}

export default DeleteProf
