import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import { getSingleProfThunk, getAllProfsThunk } from '../../store/profs'
import './SingleProf.css'
import advancedFormat from 'dayjs/plugin/advancedFormat'
const dayjs = require('dayjs')
dayjs.extend(advancedFormat)

export const SingleProf = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { profId } = useParams()

    const prof = useSelector(state => state.profs.singleProf)
    console.log("prof from single prof component", prof)
    const profsObj = useSelector(state => state.profs.allProfs)
    const profs = Object.values(profsObj)
    console.log("profs in single prof component", profs)

    const profReviews = useSelector(state => state.profs.singleProf.reviews)

    useEffect(() => {
        dispatch(getSingleProfThunk(profId))
        dispatch(getAllProfsThunk())
    }, [dispatch, profId])

    if (!Object.values(prof).length) {
        return <h1>Loading...</h1>
    }

    return (
        <div className='single-prof-wrapper'>
            <div className='single-prof-top'>
                <div className='single-prof-top-left'>
                    <div className='single-prof-quality'>
                        <div className='single-prof-quality-number'>
                            {profs[profId]?.quality.toFixed(1)}
                        </div>
                        <div className='quality-out-of'>
                            / 20
                        </div>
                        <div className='quality-label'>
                            Overall Quality based on {prof.reviews.length} ratings
                        </div>
                        <div className='single-prof-name'>
                            {prof.first_name} {prof.last_name}
                        </div>
                        <div className='single-prof-department'>
                            Professor in the {prof.field} department
                        </div>
                        <div className='single-prof-aggregates'>
                            <div className='single-prof-recommends'>
                                <div className='recommends-number'>
                                    {profs[profId]?.recommended} %
                                </div>
                                <div className='recommends-text'>
                                    Would take again
                                </div>
                            </div>
                            <div className='single-prof-difficulty'>
                                <div className='difficulty-number'>
                                    {profs[profId]?.difficulty.toFixed(1)}
                                </div>
                                <div className='difficulty-text'>
                                    Level of difficulty
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className='regular-button' onClick={() => history.push(`/reviews/new`)}>Rate Professor {prof.last_name}</button>
                </div>
                <div className='single-prof-top-right'>
                    <div className='distribution-heading'>
                        Rating Distribution
                        <br></br>
                        GRAPH HERE
                    </div>

                </div>
            </div>
            <div className='single-prof-reviews'>
                
            </div>
        </div>
    )
}
