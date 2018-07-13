import ee from "wolfy87-eventemitter";

const events = {};

//Action events:
events.FTUX_ACTION_END = 'ftuxActionEnd';
events.FTUX_ACTION_INCREASE = 'ftuxActionIncrease';
events.FTUX_ACTION_DECREASE = 'ftuxActionDecrease';
//Updater events:
events.FTUX_UPDATER = 'ftuxUpdater';

const eventEmitter = new ee();

let ftuxStore = {};

export {
    events,
    eventEmitter,
    ftuxStore
}