import Firebase from 'firebase';
import config from '../config';
import secret from '../secret';

const firebaseRef = new Firebase(`https://${config.get('APP_NAME')}.firebaseio.com`);
firebaseRef.authWithPassword({
    email    : secret.get('email'),
    password : secret.get('password')
}, function(error, authData) {
    if (error) {
        console.log('Login Failed!', error);
    }
});
export default firebaseRef;
