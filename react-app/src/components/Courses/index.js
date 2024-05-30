import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { getAllCoursesThunk } from '../../store/courses';
import Pagination from '../Pagination';
import '../Profs/Profs.css';
import '../Reviews/Reviews.css';
import './Courses.css';


export const CourseList = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 25;

    const coursesObj = useSelector(state => state.courses.allCourses)
    const courses = Object.values(coursesObj)
    // console.log('courses in all courses ======>', courses)
    const user = useSelector(state => state.session.user)

    const totalPages = Math.ceil(courses.length / coursesPerPage);
    // get courses for current page
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        dispatch(getAllCoursesThunk())
        // console.log('useEffect in get all courses ran')
    }, [dispatch])

    if (!courses) {
        return <h1>Loading...</h1>
    }

    return (

        <div className='profs-list-wrapper'>
            <div className='profs-list-heading'>
                {courses.length} Courses at The University of Life
            </div>
            {currentCourses.map((course) => (
                <React.Fragment key={course.id}>
                    <Link to={`/courses/${course.id}`}>
                        <div className='profs-list-item'>

                            <div className='reviews-list-ratings'>
                                <div className='rating-heading'>Quality</div>
                                {course.quality > 0 && course.quality < 6.7 &&
                                    <div className='rating-number' id='low'>{course.quality.toFixed(1)}</div>}
                                {course.quality >= 6.7 && course.quality < 13.4 &&
                                    <div className='rating-number' id='medium'>{course.quality.toFixed(1)}</div>}
                                {course.quality >= 13.4 && course.quality <= 20 &&
                                    <div className='rating-number' id='high'>{course.quality.toFixed(1)}</div>}
                            </div>

                            <div className='profs-list-right'>
                                <div className='course-list-name'>{course.name}</div>
                                <div className='course-list-department'> {course.department}</div>
                                {course.recommendations.length > 0 &&
                                    <div>{course.recommended.toFixed(0)}% would take again</div>}
                                {course.difficulties.length > 0 &&
                                    <div>{course.difficulty.toFixed(1)} level of difficulty</div>}
                            </div>
                        </div>

                    </Link>

                    {user && course.creator_id === user.id &&
                        <button className='regular-button' onClick={() => history.push(`/courses/${course.id}/edit`)}>Update Course</button>}

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
