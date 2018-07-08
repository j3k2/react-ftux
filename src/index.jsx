import React, { Component } from "react";
import ee from "wolfy87-eventemitter";
import styled from 'styled-components';

// import '../src/index.css';

//Action events:
const FTUX_ACTION_END = 'ftuxActionEnd';
const FTUX_ACTION_INCREASE = 'ftuxActionIncrease';
const FTUX_ACTION_DECREASE = 'ftuxActionDecrease';
//Reducer events:
const FTUX_REDUCER = 'ftuxReducer';

const eventEmitter = new ee();

let ftuxStore = {};

const StyledButton = styled.button`
  margin: 4px;
  width: 128px;
  height: 32px;
  background-color: black;
  border: solid 1px white;
  border-radius: 2px;
  color: white;
  :hover{
    cursor: pointer;
  }
`;

const StyledAnchor = styled.span`
  :hover{
    cursor: pointer;
  }
`;

class ReactFtux extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.increaseStep = () => {
      const nextStep = ftuxStore.currentStep + 1;
      ftuxStore = { currentStep: nextStep, total: this.props.total, config: this.props.ftuxConfig};
      eventEmitter.trigger(FTUX_REDUCER, [ftuxStore]);
    };

    this.decreaseStep = () => {
      const nextStep = ftuxStore.currentStep - 1 > 0 ? ftuxStore.currentStep - 1 : 0;
      ftuxStore = { currentStep: nextStep, total: this.props.total, config: this.props.ftuxConfig};
      eventEmitter.trigger(FTUX_REDUCER, [ftuxStore]);
    }

    this.init = () => {
      ftuxStore = { currentStep: 0, total: this.props.total, config: this.props.ftuxConfig};
      eventEmitter.trigger(FTUX_REDUCER, [ftuxStore]);
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
      this.props.ftuxEnd();
    });
    eventEmitter.on(FTUX_REDUCER, (stepState) => {
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
    eventEmitter.off(FTUX_REDUCER);
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

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
        borderRadius: 2,
        // boxShadow: "4px 4px 5px 0px grey",
        width: 360,
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
    } else {
      this.setState({
        display: false
      });
    }

    if(stepState.config && stepState.config.disableCloseButton){
      this.setState({
        disableCloseButton: true
      });
    }

    //tooltip props -> setState -> state.arrowPosition, state.arrowDirection, etc. -> render

    if (this.props.tooltipStyle) {
      this.setState({
        style: Object.assign({}, this.state.style, this.props.tooltipStyle)
      });
    }
  }

  componentDidMount() {
    eventEmitter.on(FTUX_REDUCER, (stepState) => {
      this.updateState(stepState);
    });
    eventEmitter.on(FTUX_ACTION_END, () => {
      this.updateState({}, true);
    });
    eventEmitter.trigger(FTUX_REDUCER, [ftuxStore]);
  }

  componentWillUnmount() {
    eventEmitter.off(FTUX_ACTION_END);
    eventEmitter.off(FTUX_REDUCER);
  }

  render() {
    let buttons;

    if (this.state.last) {
      buttons = (<div>
        <StyledButton
          onClick={this.state.triggerDecreaseStep}>
          Previous
        </StyledButton>
        <StyledButton
          onClick={this.state.triggerEndFtux}>
          Done
      </StyledButton>
      </div>);
    } else {
      buttons = (<div>
        {!this.state.first &&
          <StyledButton
            onClick={this.state.triggerDecreaseStep}>
            Previous
          </StyledButton>
        }
        <StyledButton
          onClick={this.state.triggerIncreaseStep}>
          Next
        </StyledButton>
      </div>);
    }

    return (
      <div style={{ transform: 'scale(1)', 'zIndex': 99 }}>
        <div style={Object.assign(this.state.style, { display: this.state.display ? null : 'none' })}>
          <div
            className='arrow'
            style={{
              position: 'absolute',
              top: -16,
              width: 0,
              height: 0,
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderBottom: '16px solid black'
            }}>
          </div>
          <div style={{ display: "block" }}>
            {this.props.children}
          </div>
          {this.state.disableCloseButton ? null : (
          <StyledAnchor
            style={{
              position: 'absolute',
              top: 0,
              right: 6
            }}
            onClick={this.state.triggerEndFtux}>
            &#x2715;
            </StyledAnchor>
          )}

          <div style={{ float: "right", "paddingTop": 10 }}>
            {buttons}
          </div>
        </div>
      </div>
    )
  }
}

export { ReactFtux, ReactFtuxTooltip };
