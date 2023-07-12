import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createDebateThunk} from '../../store/debates'

export const DebateForm = (debate) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const [topic, setTopic] = useState('')
    const [prof1, setProf1] = useState('')
    const [prof2, setProf2] = useState('')
    const [field, setField] = useState('')
    const [errors, setErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false)
}
