import {combineReducers} from 'redux';
import {UPDATE_TRIGGERS, SWITCH_RELAY} from '../actions';
import {switchRelay} from '../actions'
import {CronJob} from 'cron';
import Firebase from 'firebase';
import config from '../config';
import store from '../store';
import {switchRelay as relaySwitcher} from '../relays';

const relaysRef = new Firebase(`https://${config.get('APP_NAME')}.firebaseio.com`).child('relays');

const updateSingleRelayTriggers = (triggers = [], timesheet, relayId) => {
    triggers.map(trigger => trigger.stop());
    const activeItems = timesheet.filter(({active}) => active);
    return activeItems.reduce((triggers, {from, to}) => {
        triggers.push(new CronJob(`00 ${from.m} ${from.h} * * ${from.d}`, () => {
            store.dispatch(switchRelay(relayId, true));
        }, null, true));
        triggers.push(new CronJob(`00 ${to.m} ${to.h} * * ${to.d}`, () => {
            store.dispatch(switchRelay(relayId, false));
        }, null, true));
        return triggers;
    }, []);
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

const relays = (state = {}, action) => {
    switch (action.type) {
        case SWITCH_RELAY:
            const {relayId, switched, manual} = action;
            const newState = {...state, [relayId]: {switched, manual: false}};
            if (!manual) relaysRef.set(newState);
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
