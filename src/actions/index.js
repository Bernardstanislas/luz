export const UPDATE_TRIGGERS = 'UPDATE_TRIGGERS';
export const SCHEDULED_SWITCH_RELAY = 'SCHEDULED_SWITCH_RELAY';
export const MANUAL_SWITCH_RELAY = 'MANUAL_SWITCH_RELAY';

export const updateTriggers = (timesheet, relayId) => {
    return ({
        type: UPDATE_TRIGGERS,
        timesheet,
        relayId
    });
}

export const scheduledSwitchRelay = (relayId, switched) => {
    return ({
        type: SCHEDULED_SWITCH_RELAY,
        relayId,
        switched
    });
}

export const manualSwitchRelay = (relayId, switched) => {
    return ({
        type: MANUAL_SWITCH_RELAY,
        relayId,
        switched
    });
}
