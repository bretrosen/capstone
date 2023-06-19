// action type constants

const GET_ALL_PROFS = 'profs/getAllProfs'
const GET_SINGLE_PROF = 'profs/getSingleProf'
const CREATE_PROF = 'profs/createProf'
const DELETE_PROF = 'profs/deleteProf'


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

const deleteProf = (profId) => ({
    type: DELETE_PROF,
    profId
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

export const updateProfThunk = (profId, prof) => async (dispatch) => {
    const response = await fetch(`/api/profs/${profId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prof)
    })
    console.log('sending update prof thunk', response)

    if (response.ok) {
        const updatedProf = await response.json()
        console.log('returning update prof thunk', updatedProf)
        dispatch(createProf(updatedProf))
        return updatedProf
    }
}

export const deleteProfThunk = (profId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${profId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    console.log("sending delete prof thunk")

    if (response.ok) {
        await response.json()
        console.log("returning delete prof thunk")
        dispatch(deleteProf(profId))
        return
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
        case DELETE_PROF: {
            const profToDelete = action.profId
            const allUserProfs = state.allProfs
            const updatedProfs = {...allUserProfs}
            delete updatedProfs[profToDelete]
            return {...state, allProfs: updatedProfs}
        }
        default:
            return state
    }
}

export default profsReducer;
