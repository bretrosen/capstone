// action type constants

const GET_ALL_DEBATES ='debates/getAllDebates'
const GET_SINGLE_DEBATE = 'debates/getSingleDebate'


// action creators

const getAllDebates = (debates) => {
    return {
        type: GET_ALL_DEBATES,
        debates
    }
}

const getSingleDebate = (debate) => {
    return {
        type: GET_SINGLE_DEBATE,
        debate
    }
}


// thunks

export const getAllDebatesThunk = () => async (dispatch) => {
    const response = await fetch('/api/debates')
    console.log('sending all debates thunk', response)

    if (response.ok) {
        const debates = await response.json()
        console.log('returning all debates thunk', debates)
        dispatch(getAllDebates(debates))
        return debates
    }
}

export const getSingleDebateThunk = (debateId) => async (dispatch) => {
    const response = await fetch(`/api/debates/${debateId}`)
    console.log('sending single debate thunk', response)

    if (response.ok) {
        const debate = await response.json()
        console.log('returning single debate thunk', debate)
        dispatch(getSingleDebate(debate))
        return debate
    }
}


const initialState = {allDebates: {}, singleDebate: {}, userDebates: {}}

// reducer
export default function debatesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_DEBATES: {
            const newState = {...state, allDebates: {...state.allDebates}, singleDebate: {...state.singleDebate}, userDebates: {...state.userDebates}}

            action.debates.debates.forEach((debate) => {
                newState.allDebates[debate.id] = debate
            })

            return newState
        }
        case GET_SINGLE_DEBATE: {
            return {...state, allDebates: {...state.allDebates}, singleDebate: {...action.debate}, userDebates: {...state.userDebates}}
        }
        default:
            return state
    }
}
