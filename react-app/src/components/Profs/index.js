import { useDispatch, useSelector } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import { getAllProfsThunk } from '../../store/profs'
import OpenModalButton from '../OpenModalButton'
import DeleteProf from '../DeleteProf'
import Pagination from '../Pagination';
import './Profs.css'
import '../Reviews/Reviews.css'


export const ProfList = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [currentPage, setCurrentPage] = useState(1);
    const profsPerPage = 25;

    const profsObj = useSelector(state => state.profs.allProfs);
    const profs = Object.values(profsObj);
    // console.log("profs in all profs", profs)
    const user = useSelector(state => state.session.user);

    const totalPages = Math.ceil(profs.length / profsPerPage);
    // get profs for current page
    const indexOfLastProf = currentPage * profsPerPage;
    const indexOfFirstProf = indexOfLastProf - profsPerPage;
    const currentProfs = profs.slice(indexOfFirstProf, indexOfLastProf);

    // handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

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
            {currentProfs.map((prof) => (
                <React.Fragment key={prof.id}>
                    <Link to={`/profs/${prof.id}`} >
                        <div className='profs-list-item'>

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

                </React.Fragment>
            ))}
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
            />
        </div>
    )
}
