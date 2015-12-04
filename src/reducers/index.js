import {combineReducers} from 'redux';
import {UPDATE_TRIGGERS, SCHEDULED_SWITCH_RELAY, MANUAL_SWITCH_RELAY} from '../actions';
import {CronJob} from 'cron';
import firebase from '../firebase';
import store from '../store';
import {switchRelay as relaySwitcher} from '../relays';
import {timesheetEntriesToTriggers} from '../timesheet'

const relaysRef = firebase.child('relays');

const stopTrigger = trigger => trigger.stop();
const startTrigger = trigger => trigger.start();

const updateSingleRelayTriggers = (triggers = [], timesheet, relayId) => {
    triggers.map(stopTrigger);
    const newTriggers = timesheetEntriesToTriggers(timesheet, relayId);
    newTriggers.map(startTrigger);
    return newTriggers;
}

const triggers = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_TRIGGERS:
            const {relayId, timesheet} = action;
            return {...state, [relayId]: updateSingleRelayTriggers(state[relayId], timesheet, relayId)};
        default:
            return state;
    }
}

const relays = (state = {}, {type, relayId, switched}) => {
    switch (type) {
        case SCHEDULED_SWITCH_RELAY:
            var newState = {...state, [relayId]: {switched}};
            relaysRef.set({...state, [relayId]: {switched, manual: false}});
            relaySwitcher(relayId, switched);
            return newState;
        case MANUAL_SWITCH_RELAY:
            var newState = {...state, [relayId]: {switched}};
            relaySwitcher(relayId, switched);
            return newState;
        default:
            return state;
    }
}

export default combineReducers({
    triggers,
    relays
});
