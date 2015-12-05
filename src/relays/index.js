import gpio from 'gpio';
import os from 'os';
import firebase from '../firebase';

const relaysRef = firebase.child('relays');

const hostname = os.hostname();
if (hostname !== 'raspberrypi') console.log(`You are running the application on something else than a raspberry pi (${hostname}). Switches will be faked.`);

const gpio2 = gpio.export(2, {direction: 'out'}, () => {gpio2.set(0)});
const gpio3 = gpio.export(3, {direction: 'out'}, () => {gpio3.set(0)});

gpio2.on('change', val => {
   relaysRef.child('relay1').child('switched').set(val === 1);
   relaysRef.child('relay1').child('manual').set(false);
});
gpio3.on('change', val => {
   relaysRef.child('relay2').child('switched').set(val === 1);
   relaysRef.child('relay2').child('manual').set(false);
});

const switchGpio = (port, switched) => {
    if (hostname === 'raspberrypi') {
        port.set(switched ? 1 : 0);
    }
    console.log(`Port ${port.headerNum} is now switched ${switched ? 'on' : 'off'}.`);
}

export const switchRelay = (relayId, switched) => {
    switch (relayId) {
        case 'relay1':
            switchGpio(gpio2, switched);
            if (hostname !== 'raspberrypi') {
                relaysRef.child('relay1').child('switched').set(switched);
                relaysRef.child('relay1').child('manual').set(false);
            }
            break;
        case 'relay2':
            switchGpio(gpio3, switched);
            if (hostname !== 'raspberrypi') {
                relaysRef.child('relay2').child('switched').set(switched);
                relaysRef.child('relay2').child('manual').set(false);
            }
            break;
    }
}
