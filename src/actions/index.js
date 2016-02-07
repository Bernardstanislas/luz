export const UPDATE_TRIGGERS = 'UPDATE_TRIGGERS';
export const SCHEDULED_SWITCH_RELAY = 'SCHEDULED_SWITCH_RELAY';
export const MANUAL_SWITCH_RELAY = 'MANUAL_SWITCH_RELAY';

export const updateTriggers = (timesheet, relayId) => ({
    type: UPDATE_TRIGGERS,
    timesheet,
    relayId
});

export const scheduledSwitchRelay = (relayId, switched) => ({
    type: SCHEDULED_SWITCH_RELAY,
    relayId,
    switched
});

export const manualSwitchRelay = (relayId, switched) => ({
    type: MANUAL_SWITCH_RELAY,
    relayId,
    switched
});
