// action type constants

const GET_ALL_DEBATES ='debates/getAllDebates'


// action creators

const getAllDebates = (debates) => {
    return {
        type: GET_ALL_DEBATES,
        debates
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
        default:
            return state
    }
}
