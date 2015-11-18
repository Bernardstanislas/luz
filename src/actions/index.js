export const LOG_EVENT = 'LOG_EVENT';

export const logEvent = (event) => {
    return ({
        type: LOG_EVENT,
        event
    });
}
