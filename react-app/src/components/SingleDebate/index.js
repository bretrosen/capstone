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
    const debate = useSelector(state => state.debates.singleDebate)

    useEffect(() => {
        dispatch(getSingleDebateThunk(debateId))
    }, [dispatch, debateId])

    if (!Object.values(debate).length) {
        return <h1>Loading...</h1>
    }

    return (
        <div className='debate-card-wrapper'>
            Debate Topic: {debate.topic}
            <div>
                Professor 1: {debate.prof1_first_name} {debate.prof1_last_name}
                Intelligence: {debate.prof1_avg_intelligence.toFixed(0)}
            </div>
            <div>
                Professor 2: {debate.prof2_first_name} {debate.prof2_last_name}
                Intelligence: {debate.prof2_avg_intelligence.toFixed(0)}
            </div>
        </div>
    )
}
