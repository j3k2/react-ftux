import ee from "wolfy87-eventemitter";

const events = {};

events.END_FTUX = 'END_FTUX';
events.INCREASE_STEP = 'INCREASE_STEP';
events.DECREASE_STEP = 'DECREASE_STEP';
events.UPDATE_FTUX = 'UPDATE_FTUX';

const eventEmitter = new ee();

let ftuxStore = {};

export {
    events,
    eventEmitter,
    ftuxStore
}