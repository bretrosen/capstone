import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CourseForm } from '../CreateCourse'

export const UpdateCourseForm = () => {
    const { courseId } = useParams()
    const courses = Object.values(useSelector(state => state.courses.allCourses))
    const course = courses.find(c => c.id === parseInt(courseId))

    if (!course) {
        return <h1>Loading...</h1>
    }

    // pass course data to form to populate fields for update
    // pass form type to allow form to dispatch a different thunk for updating

    return (
        Object.keys(course).length > 1 && (
            <>
                <CourseForm course={course} formType='Update' />
            </>
        )
    )
}
