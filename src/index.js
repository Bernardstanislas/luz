import store from './store';
import {updateTriggers, manualSwitchRelay} from './actions';
import forEach from 'lodash/collection/forEach';
import values from 'lodash/object/values';
import firebase from './firebase';

const timesheetsRef = firebase.child('timesheets');
const relaysRef = firebase.child('relays');

timesheetsRef.on('value', snapshot => {
    const timesheets = snapshot.val();
    forEach(timesheets, (timesheetsObject, relayId) => {
        store.dispatch(updateTriggers(values(timesheetsObject), relayId));
    });
});

relaysRef.on('value', snapshot => {
    const relays = snapshot.val();
    forEach(relays, ({manual, switched}, relayId) => {
        if (manual) store.dispatch(manualSwitchRelay(relayId, switched));
    });
});

console.log('Server has started :)');
