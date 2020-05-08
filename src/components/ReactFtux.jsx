import React from "react";
import { events, eventEmitter, ftuxStore } from "../events";

class ReactFtux extends React.Component {
  constructor(props) {
    super(props);

    ftuxStore.ftuxProps = props;

    if (!this.props.tooltipSettings || !this.props.tooltipSettings.disableKeydownListener) {
      window.addEventListener("keydown", this.keydownHandler);
    }
    eventEmitter.on(events.INCREASE_STEP, () => {
      this.increaseStep();
    });
    eventEmitter.on(events.DECREASE_STEP, () => {
      this.decreaseStep();
    });
    eventEmitter.on(events.END_FTUX, () => {
      if (this.props.ftuxEnd) {
        this.props.ftuxEnd();
        window.removeEventListener("keydown", this.keydownHandler);
      }
    });

    if(!this.props.disable) {
      this.init();
    }
  }

  componentDidUpdate() {
      if(!this.props.disable) {
        this.init();
      } else {
        eventEmitter.trigger(events.END_FTUX);
      }
  }

  componentWillUnmount() {
    if (!this.props.tooltipSettings || !this.props.tooltipSettings.disableKeydownListener) {
      window.removeEventListener("keydown", this.keydownHandler);
    }
    eventEmitter.off(events.INCREASE_STEP);
    eventEmitter.off(events.DECREASE_STEP);
    eventEmitter.off(events.END_FTUX);
    eventEmitter.off(events.UPDATE_FTUX);
  }

  increaseStep = () => {
    const nextStep = ftuxStore.currentStep + 1;
    ftuxStore.currentStep = nextStep;
    eventEmitter.trigger(events.UPDATE_FTUX, [ftuxStore]);
  }

  decreaseStep = () => {
    const nextStep = ftuxStore.currentStep - 1 > 0 ? ftuxStore.currentStep - 1 : 0;
    ftuxStore.currentStep = nextStep;
    eventEmitter.trigger(events.UPDATE_FTUX, [ftuxStore]);
  }

  keydownHandler = (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'Backspace') {
      this.decreaseStep();
    }
    if (event.key === 'ArrowRight' || event.key === 'Enter') {
      if (ftuxStore.currentStep < this.props.total - 1) {
        this.increaseStep();
      } else {
        eventEmitter.trigger(events.END_FTUX);
      }
    }
    if (event.key === 'Escape') {
      eventEmitter.trigger(events.END_FTUX);
    }
  }

  init = () => {
    ftuxStore.currentStep = 0;
    eventEmitter.trigger(events.UPDATE_FTUX, [ftuxStore]);
  }

  render(){
    return null;
  }
}

export default ReactFtux;