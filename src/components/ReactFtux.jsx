import React from "react";
import { events, eventEmitter, ftuxStore } from "../events";

function ReactFtux(props) {
  const increaseStep = () => {
    const nextStep = ftuxStore.currentStep + 1;
    ftuxStore.currentStep = nextStep;
    eventEmitter.trigger(events.UPDATE_FTUX, [ftuxStore]);
  };

  const decreaseStep = () => {
    const nextStep = ftuxStore.currentStep - 1 > 0 ? ftuxStore.currentStep - 1 : 0;
    ftuxStore.currentStep = nextStep;
    eventEmitter.trigger(events.UPDATE_FTUX, [ftuxStore]);
  }

  const keydownHandler = (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'Backspace') {
      decreaseStep();
    }
    if (event.key === 'ArrowRight' || event.key === 'Enter') {
      if (ftuxStore.currentStep < props.total - 1) {
        increaseStep();
      } else {
        eventEmitter.trigger(events.END_FTUX);
      }
    }
    if (event.key === 'Escape') {
      eventEmitter.trigger(events.END_FTUX);
    }
  }

  const init = () => {
    ftuxStore.ftuxProps = props;
    ftuxStore.currentStep = 0;
    eventEmitter.trigger(events.UPDATE_FTUX, [ftuxStore]);
    if (!props.tooltipSettings || !props.tooltipSettings.disableKeydownListener) {
      window.addEventListener("keydown", keydownHandler);
    }
  }

  eventEmitter.on(events.INCREASE_STEP, () => {
    increaseStep();
  });

  eventEmitter.on(events.DECREASE_STEP, () => {
    decreaseStep();
  });

  eventEmitter.on(events.END_FTUX, () => {
    if (props.ftuxEnd) {
      props.ftuxEnd();
    }
    if (!props.tooltipSettings || !props.tooltipSettings.disableKeydownListener) {
      window.removeEventListener("keydown", keydownHandler);
    }

    eventEmitter.off(events.INCREASE_STEP);
    eventEmitter.off(events.DECREASE_STEP);
    eventEmitter.off(events.END_FTUX);
    eventEmitter.off(events.UPDATE_FTUX);
  });

  if (!props.disable) {
    init();
  }

  return null;
}

export default ReactFtux;