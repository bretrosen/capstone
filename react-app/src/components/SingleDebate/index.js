import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { getSingleDebateThunk } from '../../store/debates'
import OpenModalButton from '../OpenModalButton'


export const SingleDebate = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const { debateId } = useParams()
    const user = useSelector(state => state.session.user)
}
