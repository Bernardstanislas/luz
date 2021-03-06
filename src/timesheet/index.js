import {CronJob} from 'cron';
import store from '../store';
import {scheduledSwitchRelay} from '../actions';

const timeEntryToTrigger = ({h, m, d}, action) => new CronJob(`00 ${m} ${h} * * ${d}`, action, null, false);
const buildSwitchActionDispatch = (relayId, switched) => () => store.dispatch(scheduledSwitchRelay(relayId, switched));

const timesheetEntryToTriggers = ({from, to}, relayId) => [
    timeEntryToTrigger(from, buildSwitchActionDispatch(relayId, true)),
    timeEntryToTrigger(to, buildSwitchActionDispatch(relayId, false)),
];

const filterActiveTimesheetEntries = ({active}) => active;

const flattenArray = (acc, childArray) => [...acc, ...childArray];

export const timesheetEntriesToTriggers = (timesheet, relayId) => timesheet.filter(filterActiveTimesheetEntries).map(entry => timesheetEntryToTriggers(entry, relayId)).reduce(flattenArray, []);
