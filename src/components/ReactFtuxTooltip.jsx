import React, { Component } from "react";
import ReactDOM from "react-dom";
import { events, eventEmitter, ftuxStore } from "../events";
import styled, { keyframes } from 'styled-components';
import TooltipPointer from './TooltipPointer.jsx';
import TooltipButtons from './TooltipButtons.jsx';

const StyledAnchor = styled.span`
  :hover{
    cursor: pointer;
    color: ${props => props.highlightColor};
  }
`;

const opacityAnimation = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const TooltipBody = styled.div`
  animation: ${opacityAnimation} ${props => props.animationDuration} ease-in;
`;

class ReactFtuxTooltip extends Component {
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
      fontStyle: '14px Lato, Helvetica, Arial, sans-serif',
      style: {
        font: 'initial',
        lineHeight: 'initial',
        padding: 20,
        position: 'fixed',
        borderRadius: 5,
        display: 'block'
      }
    }

    if (ftuxStore.ftuxProps.tooltipSettings) {
      // Override defaults:
      this.tooltipSettings = Object.assign(this.tooltipSettings, ftuxStore.ftuxProps.tooltipSettings);
    }
  }

  setPosition = () => {
    const tooltipRef = ReactDOM.findDOMNode(this.refs.tooltip);

    if (!this.props.pointerDirection || this.props.pointerDirection === 'above') {
      this.tooltipSettings.offsetTop = tooltipRef.nextSibling.offsetHeight + 16 + (this.props.offsetTop || 0);
      if (this.props.offsetLeft) {
        this.tooltipSettings.offsetLeft = this.props.offsetLeft;
      }
    }
    if (this.props.pointerDirection === 'left') {
      this.tooltipSettings.offsetLeft = tooltipRef.nextSibling.offsetWidth + 16 + (this.props.offsetLeft || 0);
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

  updateTooltipState(updatedFtuxStore) {
    if (this.props.step === updatedFtuxStore.currentStep) {
      if (this.props.scrollTo) {
        const tooltipRef = ReactDOM.findDOMNode(this.refs.tooltip);

        window.scrollTo(0, tooltipRef.offsetTop);
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
      <div ref="tooltip" style={{ transform: 'scale(1)', 'zIndex': this.props.zIndex === undefined ? 'auto' : this.props.zIndex }}>
        {this.state.display &&
          <TooltipBody
            animationDuration={this.tooltipSettings.animationDuration + 's'}
            style={Object.assign({}, this.tooltipSettings.style, {
              pointerEvents: this.state.display ? 'auto' : 'none',
              top: this.tooltipSettings.offsetTop,
              left: this.tooltipSettings.offsetLeft,
              bottom: this.tooltipSettings.offsetBottom,
              right: this.tooltipSettings.offsetRight,
              backgroundColor: this.tooltipSettings.backgroundColor,
              color: this.tooltipSettings.foregroundColor,
              font: this.tooltipSettings.fontStyle,
              width: this.tooltipSettings.tooltipWidth,
              minWidth: this.tooltipSettings.tooltipWidth
            })}>
            <TooltipPointer 
              pointerDirection={this.props.pointerDirection}
              backgroundColor={this.tooltipSettings.backgroundColor}
            ></TooltipPointer>
            <div style={{ display: 'block', padding: 10 }}>
              {this.props.children}
            </div>
            <StyledAnchor
              style={{
                position: 'absolute',
                top: 4,
                right: 6,
                fontSize: 24,
                font: 'initial',
                lineHeight: 'initial',
                display: this.tooltipSettings.disableCloseButton ? 'none' : null
              }}
              highlightColor={this.tooltipSettings.highlightColor}
              onClick={this.triggerEndFtux}>
              &#x2715;
            </StyledAnchor>
            <div style={{ float: 'right', 'paddingTop': 10 }}>
              <TooltipButtons
                tooltipSettings={this.tooltipSettings}
                increaseStep={this.triggerIncreaseStep}
                decreaseStep={this.triggerDecreaseStep}
                endFtux={this.triggerEndFtux}
              />
            </div>
          </TooltipBody>
        }
      </div>
    )
  }
}

export default ReactFtuxTooltip;