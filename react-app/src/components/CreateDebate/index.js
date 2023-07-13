import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createDebateThunk } from '../../store/debates'
import { getAllProfsThunk } from '../../store/profs'
import { getAllDebateTopicsThunk } from '../../store/debate_topics'
import '../CreateProf/CreateProf.css'


export const DebateForm = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    // load topics and profs into the store to populate select fields
    useEffect(() => {
        dispatch(getAllDebateTopicsThunk())
        dispatch(getAllProfsThunk())
        console.log('useEffect in create debate ran')
    }, [dispatch])

    // get all topics from the store for form select field
    const topicsObj = useSelector(state => state.topics.allDebateTopics)
    const TOPICS = Object.values(topicsObj)
    console.log("debate topics =====>", TOPICS)

    // get all profs from the sotre for form select field
    const profsObj = useSelector(state => state.profs.allProfs)
    const PROFS = Object.values(profsObj)
    console.log("profs ====>", PROFS)

    const [topic, setTopic] = useState('')
    const [prof1, setProf1] = useState('')
    const [prof2, setProf2] = useState('')
    const [field, setField] = useState('')
    const [errors, setErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false)

    // error handling
    useEffect(() => {
        const newErrors = {}

        if (!topic.length) newErrors['topic'] = "Please select a topic"
        if (!prof1.length) newErrors['prof1'] = "Please select the first professor"
        if (!prof2.length) newErrors['prof2'] = "Please select the second professor"
        if (field.trim().length < 5 || field.length > 50) newErrors['field'] = "Field must be between 5 and 50 characters"

        setErrors(newErrors)
    }, [topic, prof1, prof2, field])

    const handleSubmit = async (event) => {
        event.preventDefault()

        setHasSubmitted(true)

        // object to match requrest to backend create debate route
        const formInfo = {
            "topic": topic,
            "prof1": prof1,
            "prof2": prof2,
            "field": field
        }

        // dispatch thunk if form has no errors
        if (!Object.values(errors).length) {
            const newDebate = await dispatch(createDebateThunk(formInfo))
            // redirect to newly created debate
            history.push(`/debates/${newDebate.id}`)
        }
    }

    return (
        <div className='create-review-wrapper'>
            <div className='create-review-heading'>Create a Debate</div>
            <form className='create-prof-form' onSubmit={handleSubmit}>

                <div className='create-review-errors'>
                    {hasSubmitted && errors.topic &&(
                        <p>{errors.topic}</p>
                    )}
                </div>
                <div className='create-review-input'>
                    <label>
                        Select Debate Topic &nbsp;
                        <select
                            value={topic}
                            onChange={e => setTopic(e.target.value)}>
                            <option selected='selected'> -- select a topic --</option>
                            {TOPICS.map(topic => (
                                <option
                                    key={topic.id}
                                    value={topic.id}>{topic.topic}</option>
                            ))}
                        </select>
                    </label>
                </div>


                <div className='create-review-errors'>
                    {hasSubmitted && errors.prof1 && (
                        <p>{errors.prof1}</p>
                    )}</div>
                <div className='create-review-input'>
                    <label>
                        Select Professor 1&nbsp;
                        <select
                            value={prof1}
                            onChange={e => setProf1(e.target.value)}
                        >
                            <option selected='selected'> -- select a professor -- </option>
                            {PROFS.map(prof => (
                                <option
                                    key={prof.id}
                                    value={prof.id}>{prof.first_name} {prof.last_name}</option>
                            ))}
                        </select>
                    </label>
                </div>


                <div className='create-review-errors'>
                    {hasSubmitted && errors.prof2 && (
                        <p>{errors.prof2}</p>
                    )}</div>
                <div className='create-review-input'>
                    <label>
                        Select Professor 2&nbsp;
                        <select
                            value={prof2}
                            onChange={e => setProf2(e.target.value)}
                        >
                            <option selected='selected'> -- select a professor -- </option>
                            {PROFS.map(prof => (
                                <option
                                    key={prof.id}
                                    value={prof.id}>{prof.first_name} {prof.last_name}</option>
                            ))}
                        </select>
                    </label>
                </div>

                <div className='create-review-errors'>
                    {hasSubmitted && errors.field && (
                        <p>{errors.field}</p>
                    )}
                </div>
                <div className='create-review-input'>
                    <textarea 
                        placeholder='Field'
                        value={field}
                        onChange={e => setField(e.target.value)} />
                </div>

                <button className='regular-button' type='submit'>
                    Create Debate
                </button>

            </form>
        </div>
    )

}
