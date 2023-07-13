// action type constants

const GET_ALL_DEBATE_TOPICS = 'debate_topics/getAllDebateTopics'
const CREATE_DEBATE_TOPIC = 'debates/createDebateTopic'


// action creators

const getAllDebateTopics = (topics) => {
    return {
        type: GET_ALL_DEBATE_TOPICS,
        topics
    }
}

const createTopic = (topic) => ({
    type: CREATE_DEBATE_TOPIC,
    topic
})


// thunks

export const getAllDebateTopicsThunk = () => async (dispatch) => {
    const response = await fetch('api/debate_topics')
    console.log('sending all debate topics thunk', response)

    if (response.ok) {
        const debateTopics = await response.json()
        console.log('returning all debate topics thunk', debateTopics)
        dispatch(getAllDebateTopics(debateTopics))
        return debateTopics
    }
}

export const createDebateTopicThunk = (topic) => async (dispatch) => {
    const response = await fetch('/api/debate_topics/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(topic)
    })
    console.log('sending create topic thunk', response)

    if (response.ok) {
        const newDebateTopic = await response.json()
        console.log('returning create topic thunk', newDebateTopic)
        dispatch(createTopic(newDebateTopic))
        return newDebateTopic
    }
}


const initialState = {allDebateTopics: {}}

// reducer

export default function debateTopicsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_DEBATE_TOPICS: {
            const newState = {...state, allDebateTopics: {...state.allDebateTopics}}

            action.topics.topics.forEach((topic) => {
                newState.allDebateTopics[topic.id] = topic
            })

            return newState
        }
        case CREATE_DEBATE_TOPIC: {
            const id = action.topic.id
            const newState = {...state.allDebateTopics}
            newState[id] = action.topic
            return {...state, allDebateTopics: newState}
        }
        default:
            return state;
    }
}
