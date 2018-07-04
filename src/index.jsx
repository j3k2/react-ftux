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
        this.setState({ current: this.state.current + 1 })
      }
    };

  }

  componentDidMount() {
    ee.on('increase', () => {
      this.state.increaseStep();
    });
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

  increaseStep() {
    ee.trigger('increase');
  }

  render() {
    return (
      <div>
        {this.props.children}
        <button onClick={this.increaseStep}>+</button>
      </div>
    )
  }
}


export { ReactFtux, ReactFtuxTooltip };
