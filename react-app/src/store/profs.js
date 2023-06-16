// action type constants

const GET_ALL_PROFS = 'profs/getAllProfs'



// action creators

const getAllProfs = (profs) => {
    return {
        type: GET_ALL_PROFS,
        profs
    }
}



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
        default:
            return state
    }
}

export default profsReducer;
