// action type constants

const GET_ALL_COURSES = 'courses/getAllCourses'
const GET_SINGLE_COURSE = 'courses/getSingleCourse'
const CREATE_COURSE = 'courses/createCourse'

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

const createCourse = (course) => ({
    type: CREATE_COURSE,
    course
})


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
        dispatch(getSingleCourse(course))
        return course
    }
}

export const createCourseThunk = (course) => async (dispatch) => {
    const response = await fetch('/api/courses/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(course)
    })
    console.log('sending create course thunk', response)

    if (response.ok) {
        const newCourse = await response.json()
        console.log('returning create course thunk', newCourse)
        dispatch(createCourse(newCourse))
        return newCourse
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
        case CREATE_COURSE: {
            const id = action.course.id
            const newState = {...state.allCourses}
            newState[id] = action.course
            return {...state, allCourses: newState}
        }
        default:
            return state
    }
}

export default coursesReducer
