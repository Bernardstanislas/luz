import gpio from 'gpio';
import os from 'os';

const hostname = os.hostname();

const gpio2 = gpio.export(2, {direction: 'out'}, () => {gpio2.set(1)});
const gpio3 = gpio.export(3, {direction: 'out'}, () => {gpio3.set(1)});

const switchGpio = (port, switched) => {
    if (hostname === 'raspberrypi') {
        port.set(switched ? 0 : 1);
    } else {
        console.log(`You are running the application on something else than a raspberry pi (${hostname}). Switches will be faked.`)
    }
    console.log(`Port ${port.headerNum} is now switched ${switched ? 'on' : 'off'}.`);
}

export const switchRelay = (relayId, switched) => {
    switch (relayId) {
        case 'relay1':
            switchGpio(gpio2, switched);
            break;
        case 'relay2':
            switchGpio(gpio3, switched);
            break;
    }
}
