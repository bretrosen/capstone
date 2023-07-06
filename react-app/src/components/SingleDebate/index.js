import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { getSingleDebateThunk } from '../../store/debates'
import OpenModalButton from '../OpenModalButton'
import './SingleDebate.css'


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
        <>
            <div className='card-topic'>
                {debate.topic}
            </div>
            <div className='debate-card-wrapper'>

                <div className='card-heading'>
                    <div className='prof-name'>
                        {debate.prof1_first_name.toUpperCase()} {debate.prof1_last_name.toUpperCase()}
                    </div>
                    <div className='prof-vs'>
                        VS
                    </div>
                    <div className='prof-name'>
                        {debate.prof2_first_name.toUpperCase()} {debate.prof2_last_name.toUpperCase()}
                    </div>
                </div>

                <div className='card-numbers'>
                    <div className='prof1-stats'>
                        <div className='prof-stat'>
                            {debate.prof1_avg_intelligence.toFixed(0)}
                        </div>
                        <div className='prof-stat'>
                            {debate.prof1_avg_wisdom.toFixed(0)}
                        </div>
                        <div className='prof-stat'>
                            {debate.prof1_avg_knowledge.toFixed(0)}
                        </div>
                        <div className='prof-stat'>
                            {debate.prof1_avg_charisma.toFixed(0)}
                        </div>
                        <div className='prof-stat'>
                            {debate.prof1_avg_preparation.toFixed(0)}
                        </div>
                        <div className='prof-stat'>
                            {debate.prof1_avg_respect.toFixed(0)}
                        </div>
                    </div>
                    <div className='stats-heading'>
                        <div className='stat-heading'>
                            Intelligence
                        </div>
                        <div className='stat-heading'>
                            Wisdom
                        </div>
                        <div className='stat-heading'>
                            Knowledge
                        </div>
                        <div className='stat-heading'>
                            Charisma
                        </div>
                        <div className='stat-heading'>
                            Preparation
                        </div>
                        <div className='stat-heading'>
                            Respect
                        </div>
                    </div>
                    <div className='prof2-stats'>
                        <div className='prof-stat'>
                            {debate.prof2_avg_intelligence.toFixed(0)}
                        </div>
                        <div className='prof-stat'>
                            {debate.prof2_avg_wisdom.toFixed(0)}
                        </div>
                        <div className='prof-stat'>
                            {debate.prof2_avg_knowledge.toFixed(0)}
                        </div>
                        <div className='prof-stat'>
                            {debate.prof2_avg_charisma.toFixed(0)}
                        </div>
                        <div className='prof-stat'>
                            {debate.prof2_avg_preparation.toFixed(0)}
                        </div>
                        <div className='prof-stat'>
                            {debate.prof2_avg_respect.toFixed(0)}
                        </div>
                    </div>
                </div>
                <OpenModalButton
                    className='debate-button'
                    buttonText="DEBATE!"
                    // modalComponent={<ResolveDebate prof1Intelligence={debate.prof1_intelligence} prof1Wisdom={debate.prof1_wisdom} prof1Knowledge={debate.prof1_knowledge} prof1Charisma={debate.prof1_charisma} prof1Preparation={debate.prof1_preparation} prof1Respect={debate.prof1_respect} prof2Intelligence={debate.prof2_intelligence} prof2Wisdom={debate.prof2_wisdom} prof2Knowledge={debate.prof2_knowledge} prof2Charisma={debate.prof2_charisma} prof2Preparation={debate.prof2_preparation} prof2Respect={debate.prof2_respect} />}
                    />
            </div>
        </>
    )
}
