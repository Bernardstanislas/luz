import store from './store';
import {updateTriggers, scheduledSwitchRelay, manualSwitchRelay} from './actions';
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

relaysRef.child('relay1').on('value', snapshot => {
    const {manual, switched} = snapshot.val();
    if (manual) store.dispatch(manualSwitchRelay('relay1', switched));
});

relaysRef.child('relay2').on('value', snapshot => {
    const {manual, switched} = snapshot.val();
    if (manual) store.dispatch(manualSwitchRelay('relay2', switched));
});

console.log('Server has started :)');
