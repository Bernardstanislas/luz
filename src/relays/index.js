import gpio from 'gpio';
import os from 'os';
import firebase from '../firebase';

const relaysRef = firebase.child('relays');

const hostname = os.hostname();
if (hostname !== 'raspberrypi') console.log(`You are running the application on something else than a raspberry pi (${hostname}). Switches will be faked.`);

const gpio2 = gpio.export(2, {direction: 'out', ready() {
    relaysRef.child('relay1').child('switched').once('value', snapshot => gpio2.set(snapshot.val() ? 0 : 1));
}});
const gpio3 = gpio.export(3, {direction: 'out', ready() {
    relaysRef.child('relay2').child('switched').once('value', snapshot => gpio3.set(snapshot.val() ? 0 : 1));
}});

const switchGpio = (port, switched, relay) => {
    if (hostname === 'raspberrypi') {
        port.set(switched ? 0 : 1);
    } else {
        console.log(`Port ${port.headerNum} is now switched ${switched ? 'on' : 'off'}.`);
    }
    relaysRef.child(relay).child('switched').set(switched);
    relaysRef.child(relay).child('manual').set(false);
}

export const switchRelay = (relayId, switched) => {
    switch (relayId) {
        case 'relay1':
            switchGpio(gpio2, switched, 'relay1');
            break;
        case 'relay2':
            switchGpio(gpio3, switched, 'relay2');
            break;
    }
}
