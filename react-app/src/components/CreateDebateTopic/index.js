import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from "../../context/Modal"
import { createDebateTopicThunk } from '../../store/debate_topics'
import './CreateDebateTopic.css'

export const DebateTopicForm = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const [newTopic, setNewTopic] = useState('')
    const [errors, setErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false)

    // error handling
    useEffect(() => {
        const newErrors = {}

        if (newTopic.trim().length < 5 || newTopic.length > 150) newErrors['newTopic'] = 'Debate topic must be between 5 and 150 characters'

        setErrors(newErrors)
    }, [newTopic])

    const handleSubmit = async (event) => {
        event.preventDefault()

        setHasSubmitted(true)

        // object to match request to backend create debate topic route
        const formInfo = {
            "topic": newTopic
        }

        // dispatch thunk if form has no errors
        if (!Object.values(errors).length) {
            const newDebateTopic = await dispatch(createDebateTopicThunk(formInfo))
            .then(closeModal)
        }
    }

    return (
        <div className='delete-prof-wrapper'>
            <h2>New Debate Topic</h2>
            <form className='create-prof-form' onSubmit={handleSubmit}>

                <div className='create-review-errors'>
                    {hasSubmitted && errors.newTopic && (
                        <p>{errors.newTopic}</p>
                    )}
                </div>
                <div className='create-review-input'>
                    <label>Topic&nbsp;
                        <input type='text'
                               className='field-text'
                               value={newTopic}
                               onChange={e => setNewTopic(e.target.value)} />
                    </label>
                </div>

                <button className='regular-button' type='submit'>Create Topic</button>
            </form>
        </div>
    )
}
