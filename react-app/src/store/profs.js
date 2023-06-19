// action type constants

const GET_ALL_PROFS = 'profs/getAllProfs'
const GET_SINGLE_PROF = 'profs/getSingleProf'
const CREATE_PROF = 'profs/createProf'


// action creators

const getAllProfs = (profs) => {
    return {
        type: GET_ALL_PROFS,
        profs
    }
}

const getSingleProf = (prof) => {
    return {
        type: GET_SINGLE_PROF,
        prof
    }
}

const createProf = (prof) => ({
    type: CREATE_PROF,
    prof
})


// thunks

export const getAllProfsThunk = () => async (dispatch) => {
    const response = await fetch('/api/profs')
    console.log('sending all profs thunk', response)

    if (response.ok) {
        const profs = await response.json()
        console.log('returning all profs thunk', profs)
        dispatch(getAllProfs(profs))
        return profs
    }
}

export const getSingleProfThunk = (profId) => async (dispatch) => {
    const response = await fetch(`/api/profs/${profId}`)
    console.log('sending single prof thunk', response)

    if (response.ok) {
        const prof = await response.json()
        console.log('returning single prof thunk', prof)
        dispatch(getSingleProf(prof))
        return prof
    }
}

export const createProfThunk = (prof) => async (dispatch) => {
    const response = await fetch('/api/profs/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prof)
    })
    console.log('sending create prof thunk', response)

    if (response.ok) {
        const newProf = await response.json()
        console.log('returning create prof thunk', newProf)
        dispatch(createProf(newProf))
        return newProf
    }
}


const initialState = {allProfs: {}, singleProf: {}}

//reducer

const profsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PROFS: {
            const newState = {...state, allProfs: {...state.allProfs}, singleProf: {...state.singleProf}}

            action.profs.profs.forEach((prof) => {
                newState.allProfs[prof.id] = prof
            })

            return newState
        }
        case GET_SINGLE_PROF: {
            return {...state, allProfs: {...state.allProfs}, singleProf: {...action.prof}}
        }
        case CREATE_PROF: {
            const id = action.prof.id
            const newState = {...state.allProfs}
            newState[id] = action.prof
            return {...state, allProfs: newState}
        }
        default:
            return state
    }
}

export default profsReducer;
