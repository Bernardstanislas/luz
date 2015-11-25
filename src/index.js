import Firebase from 'firebase';
import config from './config';
import store from './store';
import {updateTriggers, switchRelay} from './actions';
import forEach from 'lodash/collection/forEach';
import values from 'lodash/object/values';
const firebaseRef = new Firebase(`https://${config.get('APP_NAME')}.firebaseio.com`);

const timesheetsRef = firebaseRef.child('timesheets');
const relaysRef = firebaseRef.child('relays');

timesheetsRef.on('value', snapshot => {
    const timesheets = snapshot.val();
    forEach(timesheets, (timesheetsObject, relayId) => {
        store.dispatch(updateTriggers(values(timesheetsObject), relayId));
    });
});

relaysRef.on('value', snapshot => {
    const relays = snapshot.val();
    forEach(relays, ({manual, switched}, relayId) => {
        if (manual) store.dispatch(switchRelay(relayId, switched, true));
    });
});

console.log('Server has started :)');
