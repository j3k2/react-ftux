import React, { Component } from "react";
import ReactDOM from "react-dom";
import { events, eventEmitter, ftuxStore } from "../events";
import styled, { keyframes } from 'styled-components';

const StyledAnchor = styled.span`
  :hover{
    cursor: pointer;
    color: ${props => props.highlightColor};
  }
`;

const StyledButton = styled.button`
  font: initial;
  line-height: initial;
  font: ${props => props.buttonFontStyle};
  margin: 4px;
  width: 64px;
  height: 32px;
  background-color: ${props => props.backgroundColor};
  border: solid 1px ${props => props.foregroundColor};
  border-radius: 5px;
  color: ${props => props.foregroundColor};
  :hover{
    cursor: pointer;
    color: ${props => props.highlightColor};
    border-color: ${props => props.highlightColor};
  }
`;

const PointerBase = styled.div`
  width: 0px;
  height: 0px;
  position: absolute;
`;

const PointerAbove = styled(PointerBase)`
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 16px solid ${props => props.backgroundColor};
  top: -16px;
`;

const PointerBelow = styled(PointerBase)`
  border-left: 8px solid transparent; 
  border-right: 8px solid transparent; 
  border-top: 16px solid ${props => props.backgroundColor};
  top: 100%;
`;

const PointerLeft = styled(PointerBase)`
  border-top: 8px solid transparent; 
  border-bottom: 8px solid transparent;
  border-right: 16px solid ${props => props.backgroundColor}; 
  left: -16px;
`;

const PointerRight = styled(PointerBase)`
  border-top: 8px solid transparent; 
  border-bottom: 8px solid transparent;
  border-left: 16px solid ${props => props.backgroundColor};  
  right: -16px;
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
    this.readTooltipSettings();
  }

  triggerEndFtux = () => {
    eventEmitter.trigger(events.FTUX_ACTION_END);
  }

  triggerIncreaseStep = () => {
    eventEmitter.trigger(events.FTUX_ACTION_INCREASE);
  }

  triggerDecreaseStep = () => {
    eventEmitter.trigger(events.FTUX_ACTION_DECREASE);
  }

  readTooltipSettings = () => {
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

  updateState(updatedFtuxStore) {
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
    eventEmitter.on(events.FTUX_UPDATER, (updatedFtuxStore) => {
      this.updateState(updatedFtuxStore);
    });
    eventEmitter.on(events.FTUX_ACTION_END, () => {
      this.updateState({ currentStep: null });
    });
    eventEmitter.trigger(events.FTUX_UPDATER, [ftuxStore]);
    this.setPosition();
  }

  componentWillUnmount() {
    eventEmitter.off(events.FTUX_ACTION_END);
    eventEmitter.off(events.FTUX_UPDATER);
  }

  render() {
    let nav;
    if (this.tooltipSettings.last) {
      nav = (<div>
        <StyledButton
          buttonFontStyle={this.tooltipSettings.fontStyle}
          backgroundColor={this.tooltipSettings.backgroundColor}
          foregroundColor={this.tooltipSettings.foregroundColor}
          highlightColor={this.tooltipSettings.highlightColor}
          onClick={this.triggerDecreaseStep}>
          {this.tooltipSettings.prevLabel}
        </StyledButton>
        <StyledButton
          buttonFontStyle={this.tooltipSettings.fontStyle}
          backgroundColor={this.tooltipSettings.backgroundColor}
          foregroundColor={this.tooltipSettings.foregroundColor}
          highlightColor={this.tooltipSettings.highlightColor}
          onClick={this.triggerEndFtux}>
          {this.tooltipSettings.doneLabel}
        </StyledButton>
      </div>);
    } else {
      nav = (<div>
        {!this.tooltipSettings.first &&
          <StyledButton
            buttonFontStyle={this.tooltipSettings.fontStyle}
            backgroundColor={this.tooltipSettings.backgroundColor}
            foregroundColor={this.tooltipSettings.foregroundColor}
            highlightColor={this.tooltipSettings.highlightColor}
            onClick={this.triggerDecreaseStep}>
            {this.tooltipSettings.prevLabel}
          </StyledButton>
        }
        <StyledButton
          buttonFontStyle={this.tooltipSettings.fontStyle}
          backgroundColor={this.tooltipSettings.backgroundColor}
          foregroundColor={this.tooltipSettings.foregroundColor}
          highlightColor={this.tooltipSettings.highlightColor}
          onClick={this.triggerIncreaseStep}>
          {this.tooltipSettings.nextLabel}
        </StyledButton>
      </div>);
    }

    let pointer = (<div>
      {this.props.pointerDirection === 'above' ? <PointerAbove backgroundColor={this.tooltipSettings.backgroundColor}></PointerAbove> : null}
      {this.props.pointerDirection === 'below' ? <PointerBelow backgroundColor={this.tooltipSettings.backgroundColor}></PointerBelow> : null}
      {this.props.pointerDirection === 'left' ? <PointerLeft backgroundColor={this.tooltipSettings.backgroundColor}></PointerLeft> : null}
      {this.props.pointerDirection === 'right' ? <PointerRight backgroundColor={this.tooltipSettings.backgroundColor}></PointerRight> : null}
      {!this.props.pointerDirection ? <PointerAbove backgroundColor={this.tooltipSettings.backgroundColor}></PointerAbove> : null}
    </div>);

    return (
      <div ref="tooltip" style={{ transform: 'scale(1)', 'zIndex': this.props.zIndex === undefined ? 999 : this.props.zIndex }}>
        {this.state.display &&
          <TooltipBody
            animationDuration={this.tooltipSettings.animationDuration + 's'}
            style={Object.assign(this.tooltipSettings.style, {
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
            {pointer}
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
              {nav}
            </div>
          </TooltipBody>
        }
      </div>
    )
  }
}

export default ReactFtuxTooltip;