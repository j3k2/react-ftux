import React from "react";
import { events, eventEmitter, ftuxStore } from "../events";
import {
  TooltipBody,
  TooltipContent,
  TooltipWrapper,
  CloseButton,
  TooltipPointer,
  TooltipButtons,
  TooltipButton,
} from "./TooltipStyles.jsx";

class ReactFtuxTooltip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false,
    };
    this.initializeTooltip();
  }

  triggerEndFtux = () => {
    eventEmitter.trigger(events.END_FTUX);
  };

  triggerIncreaseStep = () => {
    eventEmitter.trigger(events.INCREASE_STEP);
  };

  triggerDecreaseStep = () => {
    eventEmitter.trigger(events.DECREASE_STEP);
  };

  initializeTooltip = () => {
    this.tooltipSettings = {
      first: this.props.step === 0,
      last:
        ftuxStore.ftuxProps &&
        this.props.step === ftuxStore.ftuxProps.total - 1,
      // Default values:
      prevLabel: "Prev",
      doneLabel: "Done",
      nextLabel: "Next",
      backgroundColor: "#000"
    };

    if (ftuxStore.ftuxProps.tooltipSettings) {
      // Override defaults:
      this.tooltipSettings = Object.assign(
        this.tooltipSettings,
        ftuxStore.ftuxProps.tooltipSettings
      );
    }
  };

  setPosition = () => {
    if (
      !this.props.pointerDirection ||
      this.props.pointerDirection === "above"
    ) {
      this.tooltipSettings.offsetTop =
        this.tooltipRef.nextSibling.offsetHeight +
        16 +
        (this.props.offsetTop || 0);
      if (this.props.offsetLeft) {
        this.tooltipSettings.offsetLeft = this.props.offsetLeft;
      }
    }
    if (this.props.pointerDirection === "left") {
      this.tooltipSettings.offsetLeft =
        this.tooltipRef.nextSibling.offsetWidth +
        16 +
        (this.props.offsetLeft || 0);
      if (this.props.offsetTop) {
        this.tooltipSettings.offsetTop = this.props.offsetTop;
      }
    }
    if (this.props.pointerDirection === "below") {
      this.tooltipSettings.offsetBottom = 16 + (-this.props.offsetTop || 0);
      if (this.props.offsetLeft) {
        this.tooltipSettings.offsetLeft = this.props.offsetLeft;
      }
    }
    if (this.props.pointerDirection === "right") {
      this.tooltipSettings.offsetRight = 16 + (-this.props.offsetLeft || 0);
      if (this.props.offsetTop) {
        this.tooltipSettings.offsetTop = this.props.offsetTop;
      }
    }
  };

  updateTooltipState = (updatedFtuxStore) => {
    if (this.props.step === updatedFtuxStore.currentStep) {
      if (this.props.scrollTo) {
        window.scrollTo(0, this.tooltipRef.offsetTop);
      }
      if (this.props.scrollToTop) {
        window.scrollTo(0, 0);
      }

      this.setState({
        display: true,
      });
    } else {
      this.setState({
        display: false,
      });
    }
  };

  setTooltipRef = (element) => {
    this.tooltipRef = element;
  };

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
      <TooltipWrapper
        ref={this.setTooltipRef}
        className={`tooltip-wrapper ${
          this.tooltipSettings.className ? this.tooltipSettings.className : ""
        }`}
        id={`step-${this.props.step}`}
        zIndex={this.props.zIndex}
      >
        <TooltipBody
          className="tooltip-body"
          tooltipSettings={this.tooltipSettings}
          display={this.state.display ? 1 : 0}
        >
          {this.props.pointerDirection ? (
            <TooltipPointer
              className={`tooltip-pointer ${this.props.pointerDirection}`}
              backgroundColor={this.tooltipSettings.backgroundColor}
            ></TooltipPointer>
          ) : (
            <TooltipPointer
              className={`tooltip-pointer above`}
              backgroundColor={this.tooltipSettings.backgroundColor}
            ></TooltipPointer>
          )}
          <TooltipContent className="tooltip-content">
            {this.props.children}
          </TooltipContent>
          <TooltipButtons className="tooltip-buttons">
            {!this.tooltipSettings.first && (
              <TooltipButton
                className="tooltip-button tooltip-button-prev"
                buttonFontStyle={this.tooltipSettings.fontStyle}
                backgroundColor={this.tooltipSettings.backgroundColor}
                foregroundColor={this.tooltipSettings.foregroundColor}
                highlightColor={this.tooltipSettings.highlightColor}
                onClick={this.triggerDecreaseStep}
              >
                {this.tooltipSettings.prevLabel}
              </TooltipButton>
            )}
            {!this.tooltipSettings.last && (
              <TooltipButton
                className="tooltip-button tooltip-button-next"
                buttonFontStyle={this.tooltipSettings.fontStyle}
                backgroundColor={this.tooltipSettings.backgroundColor}
                foregroundColor={this.tooltipSettings.foregroundColor}
                highlightColor={this.tooltipSettings.highlightColor}
                onClick={this.triggerIncreaseStep}
              >
                {this.tooltipSettings.nextLabel}
              </TooltipButton>
            )}
            {this.tooltipSettings.last && (
              <TooltipButton
                className="tooltip-button tooltip-button-end"
                buttonFontStyle={this.tooltipSettings.fontStyle}
                backgroundColor={this.tooltipSettings.backgroundColor}
                foregroundColor={this.tooltipSettings.foregroundColor}
                highlightColor={this.tooltipSettings.highlightColor}
                onClick={this.triggerEndFtux}
              >
                {this.tooltipSettings.doneLabel}
              </TooltipButton>
            )}
          </TooltipButtons>
          <CloseButton
            className="tooltip-close"
            highlightColor={this.tooltipSettings.highlightColor}
            onClick={this.triggerEndFtux}
          >
            &#x2715;
          </CloseButton>
        </TooltipBody>
      </TooltipWrapper>
    );
  }
}

export default ReactFtuxTooltip;
