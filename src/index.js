import Firebase from 'firebase';
import config from './config';
import store from './store';
import {logEvent} from './actions';

const firebaseRef = new Firebase(`https://${config.get('APP_NAME')}.firebaseio.com`);

firebaseRef.on('value', snapshot => {
    store.dispatch(logEvent(snapshot.val()));
});

console.log('Server has started :)');
