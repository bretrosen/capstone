import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllDebatesThunk } from '../../store/debates'
import './Debates.css'


export const DebateList = () => {
    const dispatch = useDispatch()

    const debatesObj = useSelector(state => state.debates.allDebates)
    const debates = Object.values(debatesObj)


    useEffect(() => {
        dispatch(getAllDebatesThunk())
        console.log('useEffect in get all debates ran')
    }, [dispatch])

    if (!debates) {
        return <h1>Loading...</h1>
    }

    return (
        <div className='debate-list-wrapper'>
            <div className='debate-list-heading'>
                {debates.length} First Debates
            </div>
            {debates.map((debate) => (
                <div className='debate-list-item' key={debate.id}>
                    <div className='debate-topic'>
                    Debate Topic: {debate.topic}
                    </div>

                    <div className='debate-professors'>
                    <div className='debate-professor'>
                    Professor 1: {debate.prof1_first_name} {debate.prof1_last_name}
                    </div>
                    <div className='debate-professor'>
                    Professor 2: {debate.prof2_first_name} {debate.prof2_last_name}
                    </div>

                    </div>

                </div>
            ))}
        </div>
    )
}
