import React from "react";
import { events, eventEmitter, ftuxStore } from "../events";

function ReactFtux(props) {
  const increaseStep = () => {
    const nextStep = ftuxStore.currentStep + 1;
    ftuxStore.currentStep = nextStep;
    eventEmitter.trigger(events.FTUX_UPDATER, [ftuxStore]);
  };

  const decreaseStep = () => {
    const nextStep = ftuxStore.currentStep - 1 > 0 ? ftuxStore.currentStep - 1 : 0;
    ftuxStore.currentStep = nextStep;
    eventEmitter.trigger(events.FTUX_UPDATER, [ftuxStore]);
  }

  const keydownHandler = (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'Backspace') {
      decreaseStep();
    }
    if (event.key === 'ArrowRight' || event.key === 'Enter') {
      if (ftuxStore.currentStep < props.total - 1) {
        increaseStep();
      } else {
        eventEmitter.trigger(events.FTUX_ACTION_END);
      }
    }
    if (event.key === 'Escape') {
      eventEmitter.trigger(events.FTUX_ACTION_END);
    }
  }

  const init = () => {
    ftuxStore.ftuxProps = props;
    ftuxStore.currentStep = 0;
    eventEmitter.trigger(events.FTUX_UPDATER, [ftuxStore]);
    if (!props.tooltipSettings || !props.tooltipSettings.disableKeydownListener) {
      window.addEventListener("keydown", keydownHandler);
    }
  }

  eventEmitter.on(events.FTUX_ACTION_INCREASE, () => {
    increaseStep();
  });

  eventEmitter.on(events.FTUX_ACTION_DECREASE, () => {
    decreaseStep();
  });
  
  eventEmitter.on(events.FTUX_ACTION_END, () => {
    if (props.ftuxEnd) {
      props.ftuxEnd();
    }
    if (!props.tooltipSettings || !props.tooltipSettings.disableKeydownListener) {
      window.removeEventListener("keydown", keydownHandler);
    }

    eventEmitter.off(events.FTUX_ACTION_INCREASE);
    eventEmitter.off(events.FTUX_ACTION_DECREASE);
    eventEmitter.off(events.FTUX_ACTION_END);
    eventEmitter.off(events.FTUX_UPDATER);
  });

  if (!props.disable) {
    init();
  }

  return null;
}

export default ReactFtux;