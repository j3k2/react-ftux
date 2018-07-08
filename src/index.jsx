import React, { Component } from "react";
import EventEmitter from "wolfy87-eventemitter"
// import '../src/index.css';

//Action events:
const FTUX_ACTION_END = 'ftuxActionEnd';
const FTUX_ACTION_INCREASE = 'ftuxActionIncrease';
const FTUX_ACTION_DECREASE = 'ftuxActionDecrease';
//Reducer events:
const FTUX_REDUCER = 'ftuxReducer';

const events = new EventEmitter();

let ftuxStore = {};

class ReactFtux extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.increaseStep = () => {
      const nextStep = ftuxStore.currentStep + 1;
      ftuxStore = {currentStep: nextStep, total: this.props.total};
      events.trigger(FTUX_REDUCER, [ftuxStore]);
    };

    this.decreaseStep = () => {
      const nextStep = ftuxStore.currentStep - 1 > 0 ? ftuxStore.currentStep - 1 : 0;
      ftuxStore = {currentStep: nextStep, total: this.props.total};
      events.trigger(FTUX_REDUCER, [ftuxStore]);
    }

    this.init = () => {
      ftuxStore = {currentStep: 0, total: this.props.total};
      events.trigger(FTUX_REDUCER, [ftuxStore]);
    }
  }

  componentDidMount() {
    events.on(FTUX_ACTION_INCREASE, () => {
      this.increaseStep();
    });
    events.on(FTUX_ACTION_DECREASE, () => {
      this.decreaseStep();
    });
    events.on(FTUX_ACTION_END, () => {
      this.props.ftuxEnd();
    });
    events.on(FTUX_REDUCER, (stepState) => {
      this.setState(stepState);
    });
    if(!this.props.disable){
      this.init();
    }
  }

  componentWillUnmount() {
    events.off(FTUX_ACTION_INCREASE);
    events.off(FTUX_ACTION_DECREASE);
    events.off(FTUX_ACTION_END);
    events.off(FTUX_REDUCER);
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
        events.trigger(FTUX_ACTION_END);
      },
      triggerIncreaseStep: () => {
        events.trigger(FTUX_ACTION_INCREASE);
      },
      triggerDecreaseStep: () => {
        events.trigger(FTUX_ACTION_DECREASE);
      },
      style: {
        background: "black",
        color: "white",
        padding: 20,
        position: "fixed",
        "borderRadius": 3,
        "boxShadow": "4px 4px 5px 0px grey",
        width: 300
      }
    };
  }

  updateState(stepState, hide) {
    if (this.props.step === stepState.currentStep) {
      this.setState({
        display: true
      })
    } else {
      this.setState({
        display: false
      });
    }
    if (this.props.step === stepState.total - 1){
      this.setState({
        last: true
      });
    }
    if (this.props.step === 0) {
      this.setState({
        first: true
      });
    }
    if (hide) {
      this.setState({
        display: false
      });
    }
    if(this.props.tooltipStyle) {
      this.setState({
        style: Object.assign({}, this.state.style, this.props.tooltipStyle)
      });
    }
  }

  componentDidMount() {
    events.on(FTUX_REDUCER, (stepState) => {
      this.updateState(stepState);
    });
    events.on(FTUX_ACTION_END, () => {
      this.updateState(ftuxStore, true);
    });
    events.trigger(FTUX_REDUCER, [ftuxStore]);
  }

  componentWillUnmount() {
    events.off(FTUX_ACTION_END);
    events.off(FTUX_REDUCER);
  }

  render() {
    let buttons;

    if(this.state.last) {
      buttons = (<div>
                <button
        onClick={this.state.triggerDecreaseStep}>
          Previous
        </button>
        <button onClick={this.state.triggerEndFtux}>
        Done
      </button>
      </div>)
    } else {
      buttons = (
        <div>
        {!this.state.first &&
                <button
                onClick={this.state.triggerDecreaseStep}>
                  Previous
                </button>
        }
        <button 
        onClick={this.state.triggerIncreaseStep}>
        Next
      </button>
        </div>
      )
    }

    return (
      <div style={{transform: 'scale(1)', 'zIndex': 99}}>
          <div style={Object.assign(this.state.style, {display: this.state.display ? null : 'none'})}>
            <div style={{display: "block"}}>
              {this.props.children}
            </div>
            <div style={{float: "right", "paddingTop": 10}}>
              {buttons}
            </div>
          </div>
      </div>
    )
  }
}


export { ReactFtux, ReactFtuxTooltip };
