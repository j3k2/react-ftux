import React, { Component } from "react";
import { events, eventEmitter, ftuxStore } from "../events";

class ReactFtux extends Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.increaseStep = () => {
        const nextStep = ftuxStore.currentStep + 1;
        ftuxStore.currentStep = nextStep;
        eventEmitter.trigger(events.FTUX_UPDATER, [ftuxStore]);
      };
  
      this.decreaseStep = () => {
        const nextStep = ftuxStore.currentStep - 1 > 0 ? ftuxStore.currentStep - 1 : 0;
        ftuxStore.currentStep = nextStep;
        eventEmitter.trigger(events.FTUX_UPDATER, [ftuxStore]);
      }
  
      this.keydownHandler = (event) => {
        if(event.key === 'ArrowLeft') {
          this.decreaseStep();
        }
        if(event.key === 'ArrowRight' || event.key === 'Enter') {
          if(ftuxStore.currentStep < this.props.total - 1) {
            this.increaseStep();
          } else {
            eventEmitter.trigger(events.FTUX_ACTION_END);
          }
        }
        if(event.key === 'Escape') {
          eventEmitter.trigger(events.FTUX_ACTION_END);
        }
      }
  
      this.init = () => {
        ftuxStore.ftuxProps = this.props;
        ftuxStore.currentStep = 0;
        eventEmitter.trigger(events.FTUX_UPDATER, [ftuxStore]);
        if(this.props.tooltipSettings && !this.props.tooltipSettings.disableKeydownListener) {
          window.addEventListener("keydown", this.keydownHandler);
        }
      }
    }
  
    componentDidMount() {
      eventEmitter.on(events.FTUX_ACTION_INCREASE, () => {
        this.increaseStep();
      });
      eventEmitter.on(events.FTUX_ACTION_DECREASE, () => {
        this.decreaseStep();
      });
      eventEmitter.on(events.FTUX_ACTION_END, () => {
        if(this.props.ftuxEnd) {
          this.props.ftuxEnd();
        }
        if(this.props.tooltipSettings && !this.props.tooltipSettings.disableKeydownListener) {
          window.removeEventListener("keydown", this.keydownHandler);
        }
      });
      eventEmitter.on(events.FTUX_UPDATER, (ftuxStore) => {
        this.setState(ftuxStore);
      });
      if (!this.props.disable) {
        this.init();
      }
    }
  
    componentWillUnmount() {
      eventEmitter.off(events.FTUX_ACTION_INCREASE);
      eventEmitter.off(events.FTUX_ACTION_DECREASE);
      eventEmitter.off(events.FTUX_ACTION_END);
      eventEmitter.off(events.FTUX_UPDATER);
    }
  
    render() {
      return (
        <div>
        </div>
      );
    }
  }

export default ReactFtux;