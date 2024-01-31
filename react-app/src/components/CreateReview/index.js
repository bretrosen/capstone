import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllReviewsThunk } from '../../store/reviews'
import { getAllProfsThunk } from '../../store/profs'
import { getAllCoursesThunk } from '../../store/courses'
import { createReviewThunk, updateReviewThunk } from '../../store/reviews'
import './CreateReview.css'

export const ReviewForm = ({ review, formType }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)

    // load everything into the store so select fields can be populated
    useEffect(() => {
        dispatch(getAllReviewsThunk())
        dispatch(getAllProfsThunk())
        dispatch(getAllCoursesThunk())
        // console.log("useEffect in create review form ran")
    }, [dispatch, sessionUser])

    // get all courses from store to use as select field for form
    const coursesObj = useSelector(state => state.courses.allCourses)
    const COURSES = Object.values(coursesObj)
    // console.log("courses", COURSES)

    // get all profs from store to use as select field for form
    const profsObj = useSelector(state => state.profs.allProfs)
    const PROFS = Object.values(profsObj)
    // console.log("profs", PROFS)

    const [prof, setProf] = useState(review?.prof || '')
    const [course, setCourse] = useState(review?.course || '')
    const [intelligence, setIntelligence] = useState(review?.intelligence || '')
    const [wisdom, setWisdom] = useState(review?.wisdom || '')
    const [charisma, setCharisma] = useState(review?.charisma || '')
    const [knowledge, setKnowledge] = useState(review?.knowledge || '')
    const [preparation, setPreparation] = useState(review?.preparation || '')
    const [respect, setRespect] = useState(review?.respect || '')
    const [difficulty, setDifficulty] = useState(review?.difficulty || '')
    const [forCredit, setForCredit] = useState(false)
    const [attendance, setAttendance] = useState(false)
    const [wouldRecommend, setWouldRecommend] = useState(false)
    const [textbook, setTextbook] = useState(false)
    const [reviewText, setReviewText] = useState(review?.review || '')
    const [errors, setErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false)

    // error handling
    useEffect(() => {
        const newErrors = {}

        if (!prof.length || prof[0] === '-') newErrors['prof'] = "Please select a professor"
        if (!course.length || course[0] === '-') newErrors['course'] = "Please select a course"
        if (intelligence < 1 || intelligence > 20) newErrors['intelligence'] = "Intelligence must be an integer between 1 and 20"
        if (wisdom < 1 || wisdom > 20) newErrors['wisdom'] = "Wisdom must be an integer between 1 and 20"
        if (charisma < 1 || charisma > 20) newErrors['charisma'] = "Charisma must be an integer between 1 and 20"
        if (knowledge < 1 || knowledge > 20) newErrors['knowledge'] = "Knowledge must be an integer between 1 and 20"
        if (preparation < 1 || preparation > 20) newErrors['preparation'] = "Preparation must be an integer between 1 and 20"
        if (respect < 1 || respect > 20) newErrors['respect'] = "Respect must be an integer between 1 and 20"
        if (difficulty < 1 || difficulty > 20) newErrors['difficulty'] = "Difficulty must be an integer between 1 and 20"
        if (reviewText.trim().length < 10 || reviewText.length > 350) newErrors['text'] = "Reviews must be between 10 and 350 characters"

        setErrors(newErrors)
    }, [prof, course, intelligence, wisdom, charisma, knowledge, preparation, respect, difficulty, reviewText])

    const handleSubmit = async (event) => {
        event.preventDefault()

        setHasSubmitted(true)

        // object to match request to backend create review route
        const formInfo = {
            "prof": prof,
            "course": course,
            "review": reviewText,
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

        // dispatch thunk if form has no errors
        if (!Object.values(errors).length) {
            // dispatch update thunk for update form
            if (formType === 'Update') {
                const updatedReview = await dispatch(updateReviewThunk(review.id, formInfo))
                // redirect to updated spot
                history.push(`/reviews/${updatedReview.id}`)
                // dispatch create thunk for create form
            } else {
                const newReview = await dispatch(createReviewThunk(formInfo))
                // redirect to newly created review
                history.push(`/reviews/${newReview.id}`)
            }
        }
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

    return (
            <div className='create-review-wrapper'>
                <div className='create-review-heading'>Rate A Professor</div>
                <form className='create-review-form' onSubmit={handleSubmit}>

                    <div className='create-review-errors'>
                        {hasSubmitted && errors.prof && (
                            <p>{errors.prof}</p>
                        )}</div>
                    <div className='create-review-input'>
                        <label>
                            Select Professor &nbsp;
                            <select
                                value={prof}
                                onChange={e => setProf(e.target.value)}
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
                        {hasSubmitted && errors.course && (
                            <p>{errors.course}</p>
                        )}</div>
                    <div className='create-review-input'>
                        <label>
                            Select Course &nbsp;
                            <select
                                value={course}
                                onChange={e => setCourse(e.target.value)}
                            >
                                <option selected='selected'> -- select a course -- </option>
                                {COURSES.map(course => (
                                    <option
                                        key={course.id}
                                        value={course.id}>{course.name}</option>
                                ))}
                            </select>
                        </label>
                    </div>

                    <div className='create-review-input'>
                        <div className='create-review-errors'>
                            {hasSubmitted && errors.intelligence && (
                                <p>{errors.intelligence}</p>
                            )}</div>
                        How intelligent was this professor (on a scale of 1 to 20, with 20 being the best)? &nbsp;
                        <input
                            className='create-review-number'
                            type='number'
                            value={intelligence}
                            onChange={e => setIntelligence(e.target.value)} />
                    </div>

                    <div className='create-review-input'>
                        <div className='create-review-errors'>
                            {hasSubmitted && errors.wisdom && (
                                <p>{errors.wisdom}</p>
                            )}</div>
                        How wise was this professor (on a scale of 1 to 20, with 20 being the best)? &nbsp;
                        <input
                            className='create-review-number'
                            type='number'
                            value={wisdom}
                            onChange={e => setWisdom(e.target.value)} />
                    </div>

                    <div className='create-review-input'>
                        <div className='create-review-errors'>
                            {hasSubmitted && errors.charisma && (
                                <p>{errors.charisma}</p>
                            )}</div>
                        How charismatic was this professor (on a scale of 1 to 20, with 20 being the best)? &nbsp;
                        <input
                            className='create-review-number'
                            type='number'
                            value={charisma}
                            onChange={e => setCharisma(e.target.value)} />
                    </div>

                    <div className='create-review-input'>
                        <div className='create-review-errors'>
                            {hasSubmitted && errors.knowledge && (
                                <p>{errors.knowledge}</p>
                            )}</div>
                        How knowledgeable was this professor about the subject (on a scale of 1 to 20, with 20 being the best)? &nbsp;
                        <input
                            className='create-review-number'
                            type='number'
                            value={knowledge}
                            onChange={e => setKnowledge(e.target.value)} />
                    </div>

                    <div className='create-review-input'>
                        <div className='create-review-errors'>
                            {hasSubmitted && errors.preparation && (
                                <p>{errors.preparation}</p>
                            )}</div>
                        How well did this professor prepare (on a scale of 1 to 20, with 20 being the best)? &nbsp;
                        <input
                            className='create-review-number'
                            type='number'
                            value={preparation}
                            onChange={e => setPreparation(e.target.value)} />
                    </div>

                    <div className='create-review-input'>
                        <div className='create-review-errors'>
                            {hasSubmitted && errors.respect && (
                                <p>{errors.respect}</p>
                            )}</div>
                        How respectful was this professor (on a scale of 1 to 20, with 20 being the best)? &nbsp;
                        <input
                            className='create-review-number'
                            type='number'
                            value={respect}
                            onChange={e => setRespect(e.target.value)} />
                    </div>

                    <div className='create-review-input'>
                        <div className='create-review-errors'>
                            {hasSubmitted && errors.difficulty && (
                                <p>{errors.difficulty}</p>
                            )}</div>
                        How difficult was this professor (on a scale of 1 to 20, with 20 being the most difficult)? &nbsp;
                        <input
                            className='create-review-number'
                            type='number'
                            value={difficulty}
                            onChange={e => setDifficulty(e.target.value)} />
                    </div>

                    <div className='create-review-input'>
                        <label>
                            Would you take this professor again? &nbsp;
                            <input
                                type='checkbox'
                                checked={wouldRecommend}
                                onChange={checkWouldRecommend} />
                        </label>
                    </div>

                    <div className='create-review-input'>
                        <label>
                            Was this class taken for credit? &nbsp;
                            <input
                                type='checkbox'
                                checked={forCredit}
                                onChange={checkForCredit} />
                        </label>
                    </div>

                    <div className='create-review-input'>
                        <label>
                            Did this professor use textbooks? &nbsp;
                            <input
                                type='checkbox'
                                checked={textbook}
                                onChange={checkTextbook} />
                        </label>
                    </div>

                    <div className='create-review-input'>
                        <label>
                            Was attendance mandatory? &nbsp;
                            <input
                                type='checkbox'
                                checked={attendance}
                                onChange={checkAttendance} />
                        </label>
                    </div>

                <div className='create-review-errors'>
                    {hasSubmitted && errors.text && (
                        <p>{errors.text}</p>
                    )}</div>
                <div className='create-review-text'>
                    <textarea
                        maxLength = '350'
                        className='review-text'
                        placeholder='What do you want other students to know about this professor?'
                        value={reviewText}
                        onChange={e => setReviewText(e.target.value)} />

                    <div className='review-characters-left'>
                        {reviewText.length} / 350
                    </div>
                </div>


                    <div className='create-review-input' id='review-box'>
                        <div className='create-review-errors'>
                            {hasSubmitted && Object.values(errors).length > 0 && (
                                <p>Oops! There were errors in your submission.</p>
                            )}
                        </div>
                        <div className='review-terms'>
                            By clicking the "Submit" button, I acknowledge that I have read and agreed to no Site Guidelines, Terms of Use, or Privacy Policy whatsoever. Submitted data becomes copper through the magic of SQLAlchemy. IP addresses are flogged.
                        </div>
                        <button className='regular-button' type='submit'>
                            {formType && 'Update Rating'}
                            {!formType && 'Submit Rating'}
                        </button>

                    </div>
                </form>

            </div>
    )
}
