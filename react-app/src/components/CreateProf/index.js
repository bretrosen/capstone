import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createProfThunk, updateProfThunk } from '../../store/profs'
import './CreateProf.css'

export const ProfForm = ({ prof, formType }) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const [firstName, setFirstName] = useState(prof?.first_name || '')
    const [lastName, setLastName] = useState(prof?.last_name || '')
    const [field, setField] = useState(prof?.field || '')
    const [errors, setErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false)

    // error handling
    useEffect(() => {
        const newErrors = {}

        if (firstName.trim().length === 0 || firstName.length > 20) newErrors['firstName'] = 'First name must be between 1 and 20 characters'
        if (lastName.trim().length === 0 || lastName.length > 20) newErrors['lastName'] = 'Last name must be between 1 and 20 characters'
        if (field.trim().length === 0 || field.length > 20) newErrors['field'] = 'Professor field of study be between 1 and 50 characters'

        setErrors(newErrors)
    }, [firstName, lastName, field])

    const handleSubmit = async (event) => {
        event.preventDefault()

        setHasSubmitted(true)

        // object to match request to backend create prof route
        const formInfo = {
            'first_name': firstName,
            'last_name': lastName,
            'field': field
        }

        // dispatch thunk if form has no errors
        if (!Object.values(errors).length) {
            // dispatch update thunk for update form here
            if (formType === 'Update') {
                // console.log('just before sending update prof thunk!!!!!')
                // console.log('id to update', prof.id)
                const updatedProf = await dispatch(updateProfThunk(prof.id, formInfo))
                //redirect to updated spot
                history.push(`/profs/${updatedProf.id}`)
            }
            else {
            // dispatch create thunk for create form
            const newProf = await dispatch(createProfThunk(formInfo))
            // direct to newly created prof
            history.push(`/profs/${newProf.id}`)
            // history.push(`/profs`)
            }
        }
    }

    return (
        <div className='create-review-wrapper'>
            <div className='create-review-heading'>Create a Professor</div>
            <form className='create-prof-form' onSubmit={handleSubmit}>

                <div className='create-review-errors'>
                    {hasSubmitted && errors.firstName && (
                        <p>{errors.firstName}</p>
                    )}
                </div>
                <div className='create-review-input'>
                    <label>
                    Professor's First Name
                    <input className='create-prof-input-box'
                        type='text'
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)} />
                        </label>
                </div>

                <div className='create-review-errors'>
                    {hasSubmitted && errors.lastName && (
                        <p>{errors.lastName}</p>
                    )}
                </div>
                <div className='create-review-input'>
                    <label>
                    Professor's Last Name
                    <input className='create-prof-input-box'
                        type='text'
                        value={lastName}
                        onChange={e => setLastName(e.target.value)} />
                        </label>
                </div>

                <div className='create-review-errors'>
                    {hasSubmitted && errors.field && (
                        <p>{errors.field}</p>
                    )}
                </div>
                <div className='create-review-input'>
                    <label>
                    Professor's Field of Study
                    <input className='create-prof-input-box'
                        type='text'
                        value={field}
                        onChange={e => setField(e.target.value)} />
                        </label>
                </div>

                <button className='regular-button' id='create-prof-button' type='submit'>
                    {formType && 'Update Professor'}
                    {!formType && 'Create Professor'}
                </button>
            </form>
        </div>
    )
}
