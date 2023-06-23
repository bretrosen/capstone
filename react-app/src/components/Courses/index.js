import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import { getAllCoursesThunk } from '../../store/courses'



export const CourseList = () => {
    const dispatch = useDispatch()

    const coursesObj = useSelector(state => state.courses.allCourses)
    const courses = Object.values(coursesObj)

    useEffect(() => {
        dispatch(getAllCoursesThunk())
        console.log('useEffect in get all courses ran')
    }, [dispatch])

    if (!courses) {
        return <h1>Loading...</h1>
    }

    return (
    <div className='course-list-wrapper'>
        <div className='course-list-heading'>
            {courses.length} Courses at The University of Life
        </div>
        {courses.map((course) => (
            <>
            <Link to={`/courses/${course.id}`} key={course.id}>
                <div className='course-list-item'>
                    <p>Course: {course.name}</p>
                    <p>Department: {course.department}</p>
                </div>

            </Link>
            </>
        ))}

    </div>

    )
}
