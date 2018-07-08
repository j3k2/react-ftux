import React, { Component } from "react";
import EventEmitter from "wolfy87-eventemitter"

//Action events:
const FTUX_ACTION_END = 'ftuxActionEnd';
const FTUX_ACTION_INCREASE = 'ftuxActionIncrease';
const FTUX_ACTION_DECREASE = 'ftuxActionDecrease';
//Reducer events:
const FTUX_REDUCER_STEP = 'ftuxReducerStep';

const events = new EventEmitter();

class ReactFtux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0,
      increaseStep: () => {
        const nextStep = this.state.currentStep + 1;
        events.trigger(FTUX_REDUCER_STEP, [{currentStep: nextStep, total: this.props.total}]);
      },
      decreaseStep: () => {
        const nextStep = this.state.currentStep - 1 > 0 ? this.state.currentStep - 1 : 0;
        events.trigger(FTUX_REDUCER_STEP, [{currentStep: nextStep, total: this.props.total}]);
      },
      stepConfig: this.props.stepConfig
    };
  }

  componentDidMount() {
    events.on(FTUX_ACTION_INCREASE, () => {
      this.state.increaseStep();
    });
    events.on(FTUX_ACTION_DECREASE, () => {
      this.state.decreaseStep();
    });
    events.on(FTUX_ACTION_END, function(){
      console.log('ftux end');
    });
    events.on(FTUX_REDUCER_STEP, (stepState) => {
      this.setState(stepState);
    });
    events.trigger(FTUX_REDUCER_STEP, [{currentStep: 0, total: this.props.total}]);
  }

  componentWillUnmount() {
    events.off(FTUX_ACTION_INCREASE);
    events.off(FTUX_ACTION_END);
    events.off(FTUX_REDUCER_STEP);
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
      endFtux: () => {
        events.trigger(FTUX_ACTION_END);
      },
      increaseStep: () => {
        events.trigger(FTUX_ACTION_INCREASE);
      },
      decreaseStep: () => {
        events.trigger(FTUX_ACTION_DECREASE);
      },
      style: {
        background: "black",
        color: "white",
        padding: 20,
        position: "absolute",
        "zIndex": 1
      }
    };
  }

  updateState(stepState) {
    if (this.props.step === stepState.currentStep) {
      this.setState({
        display: true
      })
    } else if (this.props.step === stepState.total - 1){
      this.setState({
        last: true
      });
      this.setState({
        display: false
      })
    } else {
      this.setState({
        display: false
      });
    }
    if (this.props.step === 0) {
      this.setState({
        first: true
      });
    }
    if(this.props.tooltipStyle) {
      this.setState({
        style: Object.assign({}, this.state.style, this.props.tooltipStyle)
      });
    }
  }

  componentDidMount() {
    this.updateState({currentStep: 0, total: 1});
    events.on(FTUX_REDUCER_STEP, (stepState) => {
      this.updateState(stepState);
    });
    events.on(FTUX_ACTION_END, () => {
      this.setState({
        display: false
      });
    });
  }

  componentWillUnmount() {
    events.off(FTUX_ACTION_END);
    events.off(FTUX_REDUCER_STEP);
  }

  render() {
    let buttons;

    if(this.state.last) {
      buttons = (<div>
                <button
        onClick={this.state.decreaseStep}>
          Previous
        </button>
        <button onClick={this.state.endFtux}>
        Done
      </button>
      </div>)
    } else {
      buttons = (
        <div>
        {!this.state.first &&
                <button
                onClick={this.state.decreaseStep}>
                  Previous
                </button>
        }
        <button 
        onClick={this.state.increaseStep}>
        Next
      </button>
        </div>
      )
    }

    return (
      <div>
        {this.state.display ?  (
          <div style={this.state.style}>[{this.props.step}{this.props.padding}]
          {buttons}
          </div>
        ) : null}
      </div>
    )
  }
}


export { ReactFtux, ReactFtuxTooltip };
