import React, { Component } from "react";
import EventEmitter from "wolfy87-eventemitter"

const ee = new EventEmitter();

class ReactFtux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: this.props.total,
      current: 0,
      increaseStep: () => {
        const currentStep = this.state.current + 1;
        this.setState({ current: currentStep });
        ee.trigger('update', [currentStep, this.props.total]);
      }
    };

  }

  componentDidMount() {
    ee.on('increase', () => {
      this.state.increaseStep();
    });
    ee.on('end', function(){
      console.log('ftux end');
    });
    this.state.current = 0;
    ee.trigger('update', [0, this.props.total]);
  }

  componentWillUnmount() {
    ee.off('increase');
  }

  render() {
    return (
      <div>
        {this.state.current} / {this.state.total} ({JSON.stringify(this.state)})
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
        ee.trigger('end');
        this.setState({display: false});
      },
      increaseStep: () => {
        ee.trigger('increase');
      }
    };
  }

  checkCurrent(current, total) {
    if (this.props.step === current) {
      this.setState({
        display: true
      })
    } else if (this.props.step === total - 1){
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
  }

  componentDidMount() {
    this.checkCurrent(0, 1);
    ee.on('update', (current, total) => {
      this.checkCurrent(current, total);
    });
  }

  render() {
    let buttons;

    if(this.state.last) {
      buttons = (<button onClick={this.state.endFtux}>
        Finish
      </button>)
    } else {
      buttons = (
        <button 
        onClick={this.state.increaseStep}>
        +
      </button>
      )
    }


    return (
      <div>
        {this.props.children}
        {this.state.display ?  (
          <div style={{
            background: "black",
            color: "white",
            width: 80,
            display: "inline",
            position: "relative"
          }}>[{this.props.step}]
          {buttons}
          </div>
        ) : null}
      </div>
    )
  }
}


export { ReactFtux, ReactFtuxTooltip };
