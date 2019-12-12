import React from 'react';
import { events, eventEmitter, ftuxStore } from '../events';
import TooltipPointer from './Tooltip/TooltipPointer.jsx';
import TooltipButtons from './Tooltip/TooltipButtons.jsx';
import TooltipBody from './Tooltip/TooltipBody.jsx';

class ReactFtuxTooltip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false
    }
    this.initializeTooltip();
  }

  triggerEndFtux = () => {
    eventEmitter.trigger(events.END_FTUX);
  }

  triggerIncreaseStep = () => {
    eventEmitter.trigger(events.INCREASE_STEP);
  }

  triggerDecreaseStep = () => {
    eventEmitter.trigger(events.DECREASE_STEP);
  }

  initializeTooltip = () => {
    this.tooltipSettings = {
      first: this.props.step === 0,
      last: ftuxStore.ftuxProps && this.props.step === ftuxStore.ftuxProps.total - 1,
      // Default values:
      prevLabel: 'Prev',
      doneLabel: 'Done',
      nextLabel: 'Next',
      animationDuration: 0.4,
      tooltipWidth: 400,
      backgroundColor: 'black',
      foregroundColor: 'white',
      highlightColor: 'grey',
      fontStyle: '14px Lato, Helvetica, Arial, sans-serif'
    }

    if (ftuxStore.ftuxProps.tooltipSettings) {
      // Override defaults:
      this.tooltipSettings = Object.assign(this.tooltipSettings, ftuxStore.ftuxProps.tooltipSettings);
    }
  }

  setPosition = () => {
    if (!this.props.pointerDirection || this.props.pointerDirection === 'above') {
      this.tooltipSettings.offsetTop = this.tooltipRef.nextSibling.offsetHeight + 16 + (this.props.offsetTop || 0);
      if (this.props.offsetLeft) {
        this.tooltipSettings.offsetLeft = this.props.offsetLeft;
      }
    }
    if (this.props.pointerDirection === 'left') {
      this.tooltipSettings.offsetLeft = this.tooltipRef.nextSibling.offsetWidth + 16 + (this.props.offsetLeft || 0);
      if (this.props.offsetTop) {
        this.tooltipSettings.offsetTop = this.props.offsetTop;
      }
    }
    if (this.props.pointerDirection === 'below') {
      this.tooltipSettings.offsetBottom = 16 + (-this.props.offsetTop || 0);
      if (this.props.offsetLeft) {
        this.tooltipSettings.offsetLeft = this.props.offsetLeft;
      }
    }
    if (this.props.pointerDirection === 'right') {
      this.tooltipSettings.offsetRight = 16 + (-this.props.offsetLeft || 0);
      if (this.props.offsetTop) {
        this.tooltipSettings.offsetTop = this.props.offsetTop;
      }
    }
  }

  updateTooltipState = (updatedFtuxStore) => {
    if (this.props.step === updatedFtuxStore.currentStep) {
      if (this.props.scrollTo) {
        window.scrollTo(0, this.tooltipRef.offsetTop);
      }
      if (this.props.scrollToTop) {
        window.scrollTo(0, 0);
      }

      this.setState({
        display: true
      });
    } else {
      this.setState({
        display: false
      });
    }
  }

  setTooltipRef = (element) => {
    this.tooltipRef = element;
  }

  componentDidMount() {
    eventEmitter.on(events.UPDATE_FTUX, (updatedFtuxStore) => {
      this.updateTooltipState(updatedFtuxStore);
    });
    eventEmitter.on(events.END_FTUX, () => {
      this.updateTooltipState({ currentStep: null });
    });
    eventEmitter.trigger(events.UPDATE_FTUX, [ftuxStore]);
    this.setPosition();
  }

  componentWillUnmount() {
    eventEmitter.off(events.END_FTUX);
    eventEmitter.off(events.UPDATE_FTUX);
  }

  render() {
    return (
      <div 
        ref={this.setTooltipRef}
        style={{
          transform: 'scale(1)',
          zIndex: this.props.zIndex === undefined ? 'auto' : this.props.zIndex
        }}>
        {this.state.display &&
          <TooltipBody
            tooltipSettings={this.tooltipSettings}
            display={this.state.display}
            endFtux={this.triggerEndFtux}
          >
            <TooltipPointer
              pointerDirection={this.props.pointerDirection}
              backgroundColor={this.tooltipSettings.backgroundColor}
            />
            <div style={{ display: 'block', padding: 10 }}>
              {this.props.children}
            </div>
            <TooltipButtons
              tooltipSettings={this.tooltipSettings}
              increaseStep={this.triggerIncreaseStep}
              decreaseStep={this.triggerDecreaseStep}
              endFtux={this.triggerEndFtux}
            />
          </TooltipBody>
        }
      </div>
    )
  }
}

export default ReactFtuxTooltip;