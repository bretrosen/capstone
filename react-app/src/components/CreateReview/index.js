import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createReviewThunk } from '../../store/reviews'

export const ReviewForm = ({ review, formType }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    
    const [review, setReview] = useState(review?.review || '')
    const [intelligence, setIntelligence] = useState(review?.intelligence || 1)
    const [wisdom, setWisdom] = useState(review?.wisdom || 1)
    const [charisma, setCharisma] = useState(review?.charisma || 1)
    const [knowledge, setKnowledge] = useState(review?.knowledge || 1)
    const [preparation, setPreparation] = useState(review?.preparation || 1)
    const [respect, setRespect] = useState(review?.respect || false)
    const [forCredit, setForCredit] = useState(review?.forCredit || false)
    const [attendance, setAttendance] = useState(review?.attendance || false)
    const [wouldRecommend, setWouldRecommend] = useState(review?.wouldRecommend || false)
    const [textbook, setTextbook] = useState(review?.textbook || false)
    const [errors, setErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false)

    // error handling
    useEffect(() => {
        const newErrors = {}


    })
}
