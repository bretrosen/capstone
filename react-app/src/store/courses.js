// action type constants

const GET_ALL_COURSES = 'courses/getAllCourses'
const GET_SINGLE_COURSE = 'courses/getSingleCourse'


// action creators

const getAllCourses = (courses) => {
    return {
        type: GET_ALL_COURSES,
        courses
    }
}

const getSingleCourse = (course) => {
    return {
        type: GET_SINGLE_COURSE,
        course
    }
}



// thunks

export const getAllCoursesThunk = () => async (dispatch) => {
    const response = await fetch('/api/courses')
    console.log('sending all courses thunk', response)

    if (response.ok) {
        const courses = await response.json()
        console.log('returning all courses thunk', courses)
        dispatch(getAllCourses(courses))
        return courses
    }
}

export const getSingleCourseThunk = (courseId) => async (dispatch) => {
    const response = await fetch(`/api/courses/${courseId}`)
    console.log('sending single course thunk', response)

    if (response.ok) {
        const course = await response.json()
        console.log('returning single course thunk', course)
        dispatch(getSingleCourseThunk(course))
        return course
    }
}


const initialState = {allCourses: {}, singleCourse: {}}

// reducer

const coursesReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_COURSES: {
            const newState = {...state, allCourses: {...state.allCourses}, singleCourse: {...state.singleCourse}}

            action.courses.courses.forEach((course) => {
                newState.allCourses[course.id] = course
            })

            return newState
        }
        case GET_SINGLE_COURSE: {
            return {...state, allCourses: {...state.allCourses}, singleCourse: {...action.course}}
        }
        default:
            return state
    }
}

export default coursesReducer
