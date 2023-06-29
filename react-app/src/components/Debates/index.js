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
                <br></br>
                {debates.length} Debates To Simulate

            </div>
            {debates.map((debate) => (

                <div key={debate.id}>
                    <br></br>
                    Debate Topic: {debate.topic}
                    <br></br>
                    Professor 1: {debate.prof1_first_name} {debate.prof1_last_name}
                    <br></br>
                    Professor 2: {debate.prof2_first_name} {debate.prof2_last_name}
                    <br></br>
                </div>
            ))}
        </div>
    )
}
