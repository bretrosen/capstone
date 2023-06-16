// action type constants

const GET_ALL_COURSES = 'courses/getAllCourses'



// action creators

const getAllCourses = (courses) => {
    return {
        type: GET_ALL_COURSES,
        courses
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
        default:
            return state
    }
}

export default coursesReducer
