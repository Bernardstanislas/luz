import {combineReducers} from 'redux';
import {LOG_EVENT} from '../actions';

const events = (state = [], action) => {
    switch (action.type) {
        case LOG_EVENT:
            return [
                ...state,
                action.event
            ];
        default:
            return state;
    }
};

export default combineReducers({
    events
});
