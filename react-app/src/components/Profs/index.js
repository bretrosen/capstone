import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import { getAllProfsThunk } from '../../store/profs'
import OpenModalButton from '../OpenModalButton'
import DeleteProf from '../DeleteProf'
import './Profs.css'
import '../Reviews/Reviews.css'


export const ProfList = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const profsObj = useSelector(state => state.profs.allProfs)
    const profs = Object.values(profsObj)
    // console.log("profs in all profs", profs)
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getAllProfsThunk())
        // console.log('useEffect in get all profs ran')
    }, [dispatch])

    if (!profs) {
        return <h1>Loading...</h1>
    }

    return (
        <div className='profs-list-wrapper'>
            <div className='profs-list-heading'>
            {profs.length} Professors at The University of Life
            </div>
            {profs.map((prof) => (
                <>
                    <Link to={`/profs/${prof.id}`} key={prof.id}>
                        <div className='profs-list-item' >

                            <div className='reviews-list-ratings'>
                                <div className='rating-heading'>Quality</div>
                                {prof.quality > 0 && prof.quality < 6.7 &&
                                    <div className='rating-number' id='low'>{prof.quality.toFixed(1)}</div>}
                                {prof.quality >= 6.7 && prof.quality < 13.4 &&
                                    <div className='rating-number' id='medium'>{prof.quality.toFixed(1)}</div>}
                                {prof.quality >= 13.4 && prof.quality <= 20 &&
                                    <div className='rating-number' id='high'>{prof.quality.toFixed(1)}</div>}
                            </div>

                            <div className='profs-list-right'>
                                <div className='prof-list-name'>{prof.first_name} {prof.last_name}</div>
                                <div className='prof-list-field'>{prof.field}</div>
                                {prof.recommendations.length > 0 &&
                                <div>{prof.recommended.toFixed(0)}% would take again</div>}
                                {prof.difficulties.length > 0 &&
                                <div>{prof.difficulty.toFixed(1)} level of difficulty</div>}
                            </div>

                        </div>
                    </Link>

                    {user && prof.creator_id === user.id &&
                        <button className='regular-button' onClick={() => history.push(`/profs/${prof.id}/edit`)}>Update Professor</button>}
                        &nbsp;&nbsp;
                    {user && prof.creator_id === user.id &&
                    <OpenModalButton
                        className='delete-button'
                        buttonText='Delete Professor'
                        modalComponent={<DeleteProf profId={prof.id} />}
                    />}

                </>
            ))}
        </div>
    )
}
