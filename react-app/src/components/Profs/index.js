import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import { getAllProfsThunk } from '../../store/profs'
import './Profs.css'


export const ProfList = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const profsObj = useSelector(state => state.profs.allProfs)
    const profs = Object.values(profsObj)
    console.log("profs in all profs", profs)
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getAllProfsThunk())
        console.log('useEffect in get all profs ran')
    }, [dispatch])

    if (!profs) {
        return <h1>Loading...</h1>
    }

    return (
        <div className='reviews-list-wrapper'>
            List of Professors
            <br></br>
            <br></br>
            {profs.map((prof) => (
                <>
                <div>{prof.first_name} {prof.last_name}</div>
                </>
            ))}
        </div>
    )
}
