import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createCourseThunk, updateCourseThunk } from '../../store/courses'
import '../CreateProf/CreateProf.css'
import './CreateCourse.css'

export const CourseForm = ({ course, formType }) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const DEPARTMENTS = [{ "id": 1, "name": "Art" },
    { "id": 2, "name": "Biology" },
    { "id": 3, "name": "Chemistry" },
    { "id": 4, "name": "Computer Science" },
    { "id": 5, "name": "Economics" },
    { "id": 6, "name": "History" },
    { "id": 7, "name": "Literature" },
    { "id": 8, "name": "Magic" },
    { "id": 9, "name": "Mathematics" },
    { "id": 10, "name": "Philosophy" },
    { "id": 11, "name": "Physical Education" },
    { "id": 12, "name": "Physics" },
    { "id": 13, "name": "Psychology" }
    ]

    const [name, setName] = useState(course?.name || '')
    const [department, setDepartment] = useState(course?.department || '')
    const [errors, setErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false)

    // error handling
    useEffect(() => {
        const newErrors = {}

        if (name.trim().length < 10 || name.length > 100) newErrors['name'] = 'Course name must be between 10 and 100 characters'
        if (!department.length || department[0] === '-') newErrors['department'] = 'Please select a department'

        setErrors(newErrors)
    }, [name, department])

    const handleSubmit = async (event) => {
        event.preventDefault()

        setHasSubmitted(true)

        // object to match request to backend create course route
        const formInfo = {
            'name': name,
            'department': department
        }

        // dispatch thunk if form has no errors
        if (!Object.values(errors).length) {
            // dispatch update thunk for update course here
            if (formType === 'Update') {
                const updatedCourse = await dispatch(updateCourseThunk(course.id, formInfo))
                // redirect to updated course
                history.push(`/courses/${updatedCourse.id}`)
            }
            else {
                // dispatch thunk for create course
                const newCourse = await dispatch(createCourseThunk(formInfo))
                // direct to newly created course
                history.push(`/courses/${newCourse.id}`)
            }
        }
    }

    return (
        <div className='create-review-wrapper'>
            <div className='create-review-heading'>Create a Course</div>
            <form className='create-prof-form' onSubmit={handleSubmit}>

                <div className='create-review-errors'>
                    {hasSubmitted && errors.name && (
                        <p>{errors.name}</p>
                    )}
                </div>
                <div className='create-review-input'>
                    <label>
                        Course Name
                        <input className='create-prof-input-box'
                            type='text'
                            value={name}
                            onChange={e => setName(e.target.value)} />
                    </label>
                </div>

                <div className='create-review-errors'>
                    {hasSubmitted && errors.department && (
                        <p>{errors.department}</p>
                    )}
                </div>
                <div className='create-review-input'>
                    <label>
                        Department &nbsp;
                        <select
                            value={department}
                            onChange={e => setDepartment(e.target.value)} >
                            <option selected='selected'> -- select a department --</option>
                            {DEPARTMENTS.map(department => (
                                <option
                                    key={department.id}
                                    value={department.id}>{department.name}</option>
                            ))}
                        </select>
                    </label>
                </div>

                <button className='regular-button' id='create-course-button' type='submit'>
                    {formType && 'Update Course'}
                    {!formType && 'Create Course'}
                </button>
            </form>
        </div>
    )
}
