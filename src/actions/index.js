export const UPDATE_TRIGGERS = 'UPDATE_TRIGGERS';
export const SWITCH_RELAY = 'SWITCH_RELAY';

export const updateTriggers = (timesheet, relayId) => {
    return ({
        type: UPDATE_TRIGGERS,
        timesheet,
        relayId
    });
}

export const switchRelay = (relayId, switched, manual = false) => {
    return ({
        type: SWITCH_RELAY,
        relayId,
        switched,
        manual
    });
}
