import Firebase from 'firebase';
import config from '../config';
import secret from '../secret';

const firebaseRef = new Firebase(`https://${config.get('APP_NAME')}.firebaseio.com`);
firebaseRef.authWithPassword({
    email    : secret.get('EMAIL'),
    password : secret.get('PASSWORD')
}, function(error, authData) {
    if (error) {
        console.log('Login Failed!', error);
    }
});

const amOnline = firebaseRef.child('.info').child('connected');
const userRef = firebaseRef.child('base').child('presence');
amOnline.on('value', snapshot => {
  if (snapshot.val()) {
    userRef.onDisconnect().set(Firebase.ServerValue.TIMESTAMP);
    userRef.set(true);
  }
});

export default firebaseRef;
