import React, { Component } from "react";
import ReactDOM from "react-dom";
import { events, eventEmitter, ftuxStore } from "../events";
import styled, { keyframes } from 'styled-components';

const StyledAnchor = styled.span`
  :hover{
    cursor: pointer;
    color: ${props => props.highlightColor || 'grey'};
  }
`;

const StyledButton = styled.button`
  margin: 4px;
  width: 64px;
  height: 32px;
  background-color: ${props => props.backgroundColor || 'black'};
  border: solid 1px ${props => props.foregroundColor || 'white'};
  border-radius: 5px;
  color: ${props => props.foregroundColor || 'white'};
  :hover{
    cursor: pointer;
    color: ${props => props.highlightColor || 'grey'};
    border-color: ${props => props.highlightColor || 'grey'};
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
  border-bottom: 16px solid ${props => props.backgroundColor || 'black'};
  top: -16px;
`;

const PointerBelow = PointerBase.extend`
  border-left: 8px solid transparent; 
  border-right: 8px solid transparent; 
  border-top: 16px solid ${props => props.backgroundColor || 'black'};
  top: 100%;
`;

const PointerLeft = PointerBase.extend`
  border-top: 8px solid transparent; 
  border-bottom: 8px solid transparent;
  border-right: 16px solid ${props => props.backgroundColor || 'black'}; 
  left: -16px;
`;

const PointerRight = PointerBase.extend`
  border-top: 8px solid transparent; 
  border-bottom: 8px solid transparent;
  border-left: 16px solid ${props => props.backgroundColor || 'black'};  
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
  animation: ${opacityAnimation} ${props => props.animationDuration || '.4s'} ease-in;
`;

class ReactFtuxTooltip extends Component {
    constructor(props) {
      super(props);
      this.state = {
        display: false,
        last: false,
        first: false,
        triggerEndFtux: () => {
          eventEmitter.trigger(events.FTUX_ACTION_END);
        },
        triggerIncreaseStep: () => {
          eventEmitter.trigger(events.FTUX_ACTION_INCREASE);
        },
        triggerDecreaseStep: () => {
          eventEmitter.trigger(events.FTUX_ACTION_DECREASE);
        },
        style: {
          padding: 20,
          position: "fixed",
          borderRadius: 5,
          display: 'block'
        }
      };
    }
  
    updateState(ftuxStore) {
      if (this.props.step === ftuxStore.currentStep) {
        const tooltipRef = ReactDOM.findDOMNode(this.refs.tooltip);
        if(this.props.scrollTo) {
          window.scrollTo(0, tooltipRef.offsetTop);
        }
        if(this.props.scrollToTop) {
          window.scrollTo(0, 0);
        }
        if(!this.props.pointerDirection || this.props.pointerDirection === 'above') {
          this.setState({
            offsetTop: tooltipRef.nextSibling.offsetHeight + 16 + (this.props.offsetTop || 0)
          });
          if(this.props.offsetLeft) {
            this.setState({
              offsetLeft: this.props.offsetLeft
            });
          }
        } 
        if(this.props.pointerDirection === 'left') {
          this.setState({
            offsetLeft: tooltipRef.nextSibling.offsetWidth + 16 + (this.props.offsetLeft || 0)
          });
          if(this.props.offsetTop) {
            this.setState({
              offsetTop: this.props.offsetTop
            });
          }
        } 
        if(this.props.pointerDirection === 'below') {
          this.setState({
            offsetBottom: 16 + (-this.props.offsetTop || 0)
          });
          if(this.props.offsetLeft) {
            this.setState({
              offsetLeft: this.props.offsetLeft
            });
          }
        } 
        if(this.props.pointerDirection === 'right') {
          this.setState({
            offsetRight: 16 + (-this.props.offsetLeft || 0)
          });
          if(this.props.offsetTop) {
            this.setState({
              offsetTop: this.props.offsetTop
            });
          }
        } 
        if (ftuxStore.ftuxProps && this.props.step === ftuxStore.ftuxProps.total - 1) {
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
        });
      } else {
        this.setState({
          display: false
        });
      }
  
      if (ftuxStore.ftuxProps && ftuxStore.ftuxProps.tooltipSettings) {
        if (ftuxStore.ftuxProps.tooltipSettings.disableCloseButton) {
          this.setState({
            disableCloseButton: true
          });
        }
        if (ftuxStore.ftuxProps.tooltipSettings.animationDuration) {
          this.setState({
            animationDuration: ftuxStore.ftuxProps.tooltipSettings.animationDuration
          });
        }
        if (ftuxStore.ftuxProps.tooltipSettings.backgroundColor) {
          this.setState({
            backgroundColor: ftuxStore.ftuxProps.tooltipSettings.backgroundColor
          });
        }
        if(ftuxStore.ftuxProps.tooltipSettings.foregroundColor) {
          this.setState({
            foregroundColor: ftuxStore.ftuxProps.tooltipSettings.foregroundColor
          })
        }
        if(ftuxStore.ftuxProps.tooltipSettings.highlightColor) {
          this.setState({
            highlightColor: ftuxStore.ftuxProps.tooltipSettings.highlightColor
          })
        }
        if(ftuxStore.ftuxProps.tooltipSettings.tooltipWidth) {
          this.setState({
            tooltipWidth: ftuxStore.ftuxProps.tooltipSettings.tooltipWidth
          })
        }
        if(ftuxStore.ftuxProps.tooltipSettings.nextLabel) {
          this.setState({
            nextLabel: ftuxStore.ftuxProps.tooltipSettings.nextLabel
          });
        }
        if(ftuxStore.ftuxProps.tooltipSettings.prevLabel) {
          this.setState({
            prevLabel: ftuxStore.ftuxProps.tooltipSettings.prevLabel
          });
        }
        if(ftuxStore.ftuxProps.tooltipSettings.doneLabel) {
          this.setState({
            doneLabel: ftuxStore.ftuxProps.tooltipSettings.doneLabel
          });
        }
      } 
    }
    
    componentDidMount() {
      eventEmitter.on(events.FTUX_UPDATER, (ftuxStore) => {
        this.updateState(ftuxStore);
      });
      eventEmitter.on(events.FTUX_ACTION_END, () => {
        this.updateState({currentStep: null});
      });
      eventEmitter.trigger(events.FTUX_UPDATER, [ftuxStore]);
    }
  
    componentWillUnmount() {
      eventEmitter.off(events.FTUX_ACTION_END);
      eventEmitter.off(events.FTUX_UPDATER);
    }
  
    render() {
      let nav;
      if (this.state.last) {
        nav = (<div>
          <StyledButton backgroundColor={this.state.backgroundColor} foregroundColor={this.state.foregroundColor} highlightColor={this.state.highlightColor}
            onClick={this.state.triggerDecreaseStep}>
              {this.state.prevLabel || 'Prev'}
          </StyledButton>
          <StyledButton backgroundColor={this.state.backgroundColor} foregroundColor={this.state.foregroundColor} highlightColor={this.state.highlightColor}
            onClick={this.state.triggerEndFtux}>
              {this.state.doneLabel || 'Done'}
        </StyledButton>
        </div>);
      } else {
        nav = (<div>
          {!this.state.first &&
            <StyledButton backgroundColor={this.state.backgroundColor} foregroundColor={this.state.foregroundColor} highlightColor={this.state.highlightColor}
              onClick={this.state.triggerDecreaseStep}>
              {this.state.prevLabel || 'Prev'}
            </StyledButton>
          }
          <StyledButton backgroundColor={this.state.backgroundColor} foregroundColor={this.state.foregroundColor} highlightColor={this.state.highlightColor}
            onClick={this.state.triggerIncreaseStep}>
            {this.state.nextLabel || 'Next'}
          </StyledButton>
        </div>);
      }
  
      let pointer = (<div>
        {this.props.pointerDirection === 'above' ? <PointerAbove backgroundColor={this.state.backgroundColor}></PointerAbove> : null}
        {this.props.pointerDirection === 'below' ? <PointerBelow backgroundColor={this.state.backgroundColor}></PointerBelow> : null}
        {this.props.pointerDirection === 'left' ? <PointerLeft backgroundColor={this.state.backgroundColor}></PointerLeft> : null}
        {this.props.pointerDirection === 'right' ? <PointerRight backgroundColor={this.state.backgroundColor}></PointerRight> : null}
        {!this.props.pointerDirection ? <PointerAbove backgroundColor={this.state.backgroundColor}></PointerAbove> : null}
      </div>);
  
      return (
        <div ref="tooltip" style={{ transform: 'scale(1)', 'zIndex': this.props.zIndex || 999 }}>
        {this.state.display && 
        <TooltipBody 
          animationDuration={this.state.animationDuration + 's'}
          style={Object.assign({}, this.state.style, { 
          pointerEvents: this.state.display ? 'auto': 'none',
          top: this.state.offsetTop || null,
          left: this.state.offsetLeft || null,
          bottom: this.state.offsetBottom || null,
          right: this.state.offsetRight || null,
          backgroundColor: this.state.backgroundColor || 'black',
          color: this.state.foregroundColor || 'white',
          width: this.state.tooltipWidth || 400,
          minWidth: this.state.tooltipWidth || 400
      })}>
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
            highlightColor={this.state.highlightColor}
            onClick={this.state.triggerEndFtux}>
            &#x2715;
            </StyledAnchor>
          <div style={{ float: "right", "paddingTop": 10 }}>
            {nav}
          </div>
        </TooltipBody>
        }
          
        </div>
      )
    }
  }

export default ReactFtuxTooltip;