import React, { Component } from "react";
import ReactDOM from 'react-dom';
import ee from "wolfy87-eventemitter";
import styled from 'styled-components';

// import '../src/index.css';

//Action events:
const FTUX_ACTION_END = 'ftuxActionEnd';
const FTUX_ACTION_INCREASE = 'ftuxActionIncrease';
const FTUX_ACTION_DECREASE = 'ftuxActionDecrease';
//Updater events:
const FTUX_UPDATER = 'ftuxUpdater';

const eventEmitter = new ee();

let ftuxStore = {};

class ReactFtux extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.increaseStep = () => {
      const nextStep = ftuxStore.currentStep + 1;
      ftuxStore = { currentStep: nextStep, total: this.props.total, config: this.props.ftuxConfig };
      eventEmitter.trigger(FTUX_UPDATER, [ftuxStore]);
    };

    this.decreaseStep = () => {
      const nextStep = ftuxStore.currentStep - 1 > 0 ? ftuxStore.currentStep - 1 : 0;
      ftuxStore = { currentStep: nextStep, total: this.props.total, config: this.props.ftuxConfig };
      eventEmitter.trigger(FTUX_UPDATER, [ftuxStore]);
    }

    this.init = () => {
      ftuxStore = { currentStep: 0, total: this.props.total, config: this.props.ftuxConfig };
      eventEmitter.trigger(FTUX_UPDATER, [ftuxStore]);
    }
  }

  componentDidMount() {
    eventEmitter.on(FTUX_ACTION_INCREASE, () => {
      this.increaseStep();
    });
    eventEmitter.on(FTUX_ACTION_DECREASE, () => {
      this.decreaseStep();
    });
    eventEmitter.on(FTUX_ACTION_END, () => {
      if(this.props.ftuxEnd) {
        this.props.ftuxEnd();
      }
    });
    eventEmitter.on(FTUX_UPDATER, (stepState) => {
      this.setState(stepState);
    });
    if (!this.props.disable) {
      this.init();
    }
  }

  componentWillUnmount() {
    eventEmitter.off(FTUX_ACTION_INCREASE);
    eventEmitter.off(FTUX_ACTION_DECREASE);
    eventEmitter.off(FTUX_ACTION_END);
    eventEmitter.off(FTUX_UPDATER);
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

const StyledAnchor = styled.span`
  :hover{
    cursor: pointer;
    color: grey;
  }
`;

const StyledButton = styled.button`
  margin: 4px;
  width: 64px;
  height: 32px;
  background-color: black;
  border: solid 1px white;
  border-radius: 5px;
  color: white;
  :hover{
    cursor: pointer;
    color: grey;
    border-color: grey;
  }
`;

const PointerBase = styled.div`
  width: 0px;
  height: 0px;
  position: absolute;
`;

const PointerAbove = PointerBase.extend`
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 16px solid black;
  top: -16px;
`;

const PointerBelow = PointerBase.extend`
  border-left: 8px solid transparent; 
  border-right: 8px solid transparent; 
  border-top: 16px solid black;
  top: 100%;
`;

const PointerLeft = PointerBase.extend`
  border-top: 8px solid transparent; 
  border-bottom: 8px solid transparent;
  border-right: 16px solid black; 
  left: -16px;
`;

const PointerRight = PointerBase.extend`
  border-top: 8px solid transparent; 
  border-bottom: 8px solid transparent;
  border-left: 16px solid black;  
  right: -16px;
`;

class ReactFtuxTooltip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false,
      last: false,
      first: false,
      triggerEndFtux: () => {
        eventEmitter.trigger(FTUX_ACTION_END);
      },
      triggerIncreaseStep: () => {
        eventEmitter.trigger(FTUX_ACTION_INCREASE);
      },
      triggerDecreaseStep: () => {
        eventEmitter.trigger(FTUX_ACTION_DECREASE);
      },
      style: {
        background: "black",
        color: "white",
        padding: 20,
        position: "fixed",
        borderRadius: 5,
        minWidth: 412,
        width: 412,
        display: 'block'
      }
    };
  }

  updateState(stepState, hide) {
    if (this.props.step === stepState.currentStep) {
      if (hide) {
        this.setState({
          display: false
        });
      }
      if (this.props.step === stepState.total - 1) {
        this.setState({
          last: true
        });
      }
      if (this.props.step === 0) {
        this.setState({
          first: true
        });
      }
      this.setState({
        display: true
      })
      if(this.props.scrollTo) {
        const tooltipRef = ReactDOM.findDOMNode(this.refs.tooltip);
        window.scrollTo(0, tooltipRef.offsetTop);
      }
    } else {
      this.setState({
        display: false
      });
    }

    if (stepState.config && stepState.config.disableCloseButton) {
      this.setState({
        disableCloseButton: true
      });
    }

    if (this.props.tooltipStyle) {
      this.setState({
        style: Object.assign({}, this.state.style, this.props.tooltipStyle)
      });
    }
  }

  componentDidMount() {
    eventEmitter.on(FTUX_UPDATER, (stepState) => {
      this.updateState(stepState);
    });
    eventEmitter.on(FTUX_ACTION_END, () => {
      this.updateState({}, true);
    });
    eventEmitter.trigger(FTUX_UPDATER, [ftuxStore]);
  }

  componentWillUnmount() {
    eventEmitter.off(FTUX_ACTION_END);
    eventEmitter.off(FTUX_UPDATER);
  }

  render() {
    let nav;
    if (this.state.last) {
      nav = (<div>
        <StyledButton
          onClick={this.state.triggerDecreaseStep}>
          Prev
        </StyledButton>
        <StyledButton
          onClick={this.state.triggerEndFtux}>
          Done
      </StyledButton>
      </div>);
    } else {
      nav = (<div>
        {!this.state.first &&
          <StyledButton
            onClick={this.state.triggerDecreaseStep}>
            Prev
          </StyledButton>
        }
        <StyledButton
          onClick={this.state.triggerIncreaseStep}>
          Next
        </StyledButton>
      </div>);
    }

    let pointer = (<div>
      {this.props.pointerDirection === 'above' ? <PointerAbove></PointerAbove> : null}
      {this.props.pointerDirection === 'below' ? <PointerBelow></PointerBelow> : null}
      {this.props.pointerDirection === 'left' ? <PointerLeft></PointerLeft> : null}
      {this.props.pointerDirection === 'right' ? <PointerRight></PointerRight> : null}
      {!this.props.pointerDirection ? <PointerAbove></PointerAbove> : null}
    </div>);

    return (
      <div ref="tooltip" style={{ transform: 'scale(1)', 'zIndex': 999 }}>
        <div style={Object.assign({}, this.state.style, { display: this.state.display ? null : 'none' })}>
          {pointer}
          <div style={{ display: "block", padding: 10 }}>
            {this.props.children}
          </div>
          <StyledAnchor
            style={{
              position: 'absolute',
              top: 0,
              right: 6,
              fontSize: 24,
              display: this.state.disableCloseButton ? 'none' : null
            }}
            onClick={this.state.triggerEndFtux}>
            &#x2715;
            </StyledAnchor>
          <div style={{ float: "right", "paddingTop": 10 }}>
            {nav}
          </div>
        </div>
      </div>
    )
  }
}

export { ReactFtux, ReactFtuxTooltip };
