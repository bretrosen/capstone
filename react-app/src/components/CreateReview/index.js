import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createReviewThunk } from '../../store/reviews'

export const ReviewForm = ({ review, formType }) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const COURSES = []
    const coursesObj = useSelector(state => state.courses.allCourses)
    for (let i = 1; i <= Object.values(coursesObj).length; i++) {
        COURSES.push(coursesObj[i].name)
    }
    console.log("courses", COURSES)

    const PROFS = []
    const profsObj = useSelector(state => state.profs.allProfs)
    for (let i = 1; i <= Object.values(profsObj).length; i++) {
        PROFS.push(profsObj[i].first_name + ' ' + profsObj[i].last_name)
    }
    console.log("profs", PROFS)

    // get profs and courses by fetching from db
    // would be the preferable way to do this rather than accessing the store
    // not sure how to handle these aysnc requests properly
    // const getProfs = async () => {
    //     const response = await fetch(`/api/reviews/get_profs`)
    //     const allProfs = await response.json()
    //     setProfs(...allProfs)
    //     return allProfs
    // }

    // const getCourses = async () => {
    //     const response = await fetch(`/api/reviews/get_courses`)
    //     const allCourses = await response.json()
    //     console.log("all courses", allCourses)
    //     setCourses(...allCourses)
    //     return allCourses
    // }

    const [prof, setProf] = useState(review?.prof || '')
    const [course, setCourse] = useState(review?.prof || '')
    const [reviewText, setReviewText] = useState(review?.reviewText || '')
    const [intelligence, setIntelligence] = useState(review?.intelligence || '')
    const [wisdom, setWisdom] = useState(review?.wisdom || '')
    const [charisma, setCharisma] = useState(review?.charisma || '')
    const [knowledge, setKnowledge] = useState(review?.knowledge || '')
    const [preparation, setPreparation] = useState(review?.preparation || '')
    const [respect, setRespect] = useState(review?.respect || '')
    const [difficulty, setDifficulty] = useState(review?.difficulty || '')
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
        // need to send ids for prof and course here
        // need to add all profs and all courses to store
        // via a new route

        const formInfo = {
            // "prof": prof,
            // "course": course,
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

        await dispatch(createReviewThunk(formInfo))
        history.push('/reviews')
        // history.push(`/reviews/${newReview.id}`)
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
        <div className='create-review-wrapper'>
            <div>Rate A Professor</div>
            <form className='create-review-form' onSubmit={handleSubmit}>

                <div className='create-review-input'>
                    <label>
                        Select Professor &nbsp;
                        <select
                            value={prof}
                            onChange={e => setProf(e.target.value)}
                        >
                            {PROFS.map(prof => (
                                <option
                                    key={prof}
                                    value={prof}>{prof}</option>
                            ))}
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
                            {COURSES.map(course => (
                                <option
                                    key={course}
                                    value={course}>{course}</option>
                            ))}
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
