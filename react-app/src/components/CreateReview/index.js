import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createReviewThunk } from '../../store/reviews'

export const ReviewForm = ({ review, formType }) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const [prof, setProf] = useState(review?.prof || '')
    const [course, setCourse] = useState(review?.prof || '')
    const [reviewText, setReviewText] = useState(review?.reviewText || '')
    const [intelligence, setIntelligence] = useState(review?.intelligence || 1)
    const [wisdom, setWisdom] = useState(review?.wisdom || 1)
    const [charisma, setCharisma] = useState(review?.charisma || 1)
    const [knowledge, setKnowledge] = useState(review?.knowledge || 1)
    const [preparation, setPreparation] = useState(review?.preparation || 1)
    const [respect, setRespect] = useState(review?.respect || 1)
    const [difficulty, setDifficulty] = useState(review?.difficulty || 1)
    const [forCredit, setForCredit] = useState(review?.forCredit || false)
    const [attendance, setAttendance] = useState(review?.attendance || false)
    const [wouldRecommend, setWouldRecommend] = useState(review?.wouldRecommend || false)
    const [textbook, setTextbook] = useState(review?.textbook || false)
    const [errors, setErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false)

    // ERROR HANDLING HERE AND WITH wtforms.validators?
    // useEffect(() => {
    //     const newErrors = {}
    // })

    const handleSubmit = async (event) => {
        event.preventDefault()

        setHasSubmitted(true)

        // object to match request to backend create review route
        const formInfo = {
            "review": review,
            "intelligence": intelligence,
            "wisdom": wisdom,
            "charisma": charisma,
            "knowledge": knowledge,
            "preparation": preparation,
            "respect": respect,
            "difficulty": difficulty,
            "for_credit": forCredit,
            "attendance": attendance,
            "would_recommend": wouldRecommend,
            "textbook": textbook,
        }

        const newReview = await dispatch(createReviewThunk(formInfo))
        history.push(`/reviews/${newReview.id}`)
    }

    const checkForCredit = () => {
        setForCredit(!forCredit)
    }

    const checkAttendance = () => {
        setAttendance(!attendance)
    }

    const checkWouldRecommend = () => {
        setWouldRecommend(!wouldRecommend)
    }

    const checkTextbook = () => {
        setTextbook(!textbook)
    }


    // Fix form so it's grabbing profs and courses for select fields
    return (
        <div classname='create-review-wrapper'>
            <div>Rate A Professor</div>
            <form className='create-review-form' onSubmit={handleSubmit}>

                <div className='create-review-input'>
                    <label>
                        Select Professor &nbsp;
                        <select
                            value={prof}
                            onChange={e => setProf(e.target.value)}
                        >
                            <option value='Shakespeare'>Shakespeare</option>
                            <option value='Marx'>Marx</option>
                            <option value='Newton'>Newton</option>
                        </select>
                    </label>
                </div>

                <div className='create-review-input'>
                    <label>
                        Select Course &nbsp;
                        <select
                            value={course}
                            onChange={e => setCourse(e.target.value)}
                        >
                            <option value='Market Economies'>Market Economies</option>
                            <option value='Anthropology of the Unknown'>Anthropology of the Unknown</option>
                            <option value='Postmodern American Literature'>Postmodern American Literature</option>
                        </select>
                    </label>
                </div>

                <input
                    className='create-review-input'
                    type='number'
                    placeholder='Intelligence'
                    value={intelligence}
                    onChange={e => setIntelligence(e.target.value)} />

                <input
                    className='create-review-input'
                    type='number'
                    placeholder='Wisdom'
                    value={wisdom}
                    onChange={e => setWisdom(e.target.value)} />

                <input
                    className='create-review-input'
                    type='number'
                    placeholder='Charisma'
                    value={charisma}
                    onChange={e => setCharisma(e.target.value)} />

                <input
                    className='create-review-input'
                    type='number'
                    placeholder='Knowledge'
                    value={knowledge}
                    onChange={e => setKnowledge(e.target.value)} />

                <input
                    className='create-review-input'
                    type='number'
                    placeholder='Preparation'
                    value={preparation}
                    onChange={e => setPreparation(e.target.value)} />

                <input
                    className='create-review-input'
                    type='number'
                    placeholder='Respect'
                    value={respect}
                    onChange={e => setRespect(e.target.value)} />

                <input
                    className='create-review-input'
                    type='number'
                    placeholder='Difficulty'
                    value={difficulty}
                    onChange={e => setDifficulty(e.target.value)} />

                <div>
                    <label>
                        Would you take this professor again?
                        <input
                            type='checkbox'
                            checked={wouldRecommend}
                            onChange={checkWouldRecommend} />
                    </label>
                </div>

                <div>
                    <label>
                        Was this class taken for credit?
                        <input
                            type='checkbox'
                            checked={forCredit}
                            onChange={checkForCredit} />
                    </label>
                </div>

                <div>
                    <label>
                        Did this professor use textbooks?
                        <input
                            type='checkbox'
                            checked={textbook}
                            onChange={checkTextbook} />
                    </label>
                </div>

                <div>
                    <label>
                        Was attendance mandatory?
                        <input
                            type='checkbox'
                            checked={attendance}
                            onChange={checkAttendance} />
                    </label>
                </div>

                <textarea
                    placeholder='What do you want other students to know about this professor?'
                    value={reviewText}
                    onChange={e => setReviewText(e.target.value)} />

                <button className='submit-review-button' type='submit'>
                    Submit Your Review
                </button>

            </form>
        </div>
    )
}
