const redux = require('redux');

//initialState
const initialState = {
    counter: 0
}

//reducer
const reducer = (state = initialState, action) => {
    if (action.type === 'ADD') {
        return {
            counter: state.counter + 1
        }
    }
    else if (action.type === 'SUB') {
        return {
            counter: state.counter - 1
        }
    }
    else if (action.type === 'ADD_NUMBER') {
        return {
            counter: state.counter + action.value
        }
    }
    return state
}

//store
const store = redux.createStore(reducer)

store.subscribe(() => {
    console.log('subscribe', store.getState())
})

//actions
const addCounter = {
    type: 'ADD'
}

const subCounter = {
    type: 'SUB'
}

store.dispatch(addCounter)
store.dispatch(subCounter)
store.dispatch({type: 'ADD_NUMBER', value: 10})