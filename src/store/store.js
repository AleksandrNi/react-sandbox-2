import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import { instrumentsReducer } from 'store/reducers/instruments'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    instrumentsReducer

})

const logger = store => next => action => {
    console.log('[Middleware Dispatching]', action);
    const result = next(action);
    console.log('[Middleware next state]', store.getState());
    return result;
}

const composeEnhancers =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(logger, thunk))
)