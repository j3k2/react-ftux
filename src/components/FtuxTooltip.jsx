import React from "react";
import { useFtuxContext } from "./FtuxContext.jsx";
import {
  TooltipBody,
  TooltipContent,
  TooltipWrapper,
  CloseButton,
  TooltipPointer,
  TooltipButtons,
  TooltipButton,
} from "./TooltipStyles.jsx";

export default function FtuxTooltip(props) {
  const {
    tooltipProperties,
    increaseStep,
    decreaseStep,
    endFtux,
    ftuxStep,
    ftuxTotalSteps,
  } = useFtuxContext();

  const [displayTooltip, setDisplayTooltip] = React.useState(false);

  const [tooltipSettings, setTooltipSettings] = React.useState({
    first: props.step === 0,
    last: props.step === ftuxTotalSteps - 1,
    // Default values:
    prevLabel: "Prev",
    doneLabel: "Done",
    nextLabel: "Next",
    backgroundColor: "#000",
  });

  const [offsets, setOffsets] = React.useState();

  const ref = React.useRef();

  const setPosition = () => {
    const temp = {};

    if (!props.pointerDirection || props.pointerDirection === "above") {
      temp.offsetTop =
        ref.current.nextSibling.offsetHeight + 16 + (props.offsetTop || 0);
      if (props.offsetLeft) {
        temp.offsetLeft = props.offsetLeft;
      }
    }
    if (props.pointerDirection === "left") {
      temp.offsetLeft =
        ref.current.nextSibling.offsetWidth + 16 + (props.offsetLeft || 0);
      if (props.offsetTop) {
        temp.offsetTop = props.offsetTop;
      }
    }
    if (props.pointerDirection === "below") {
      temp.offsetBottom = 16 + (-props.offsetTop || 0);
      if (props.offsetLeft) {
        temp.offsetLeft = props.offsetLeft;
      }
    }
    if (props.pointerDirection === "right") {
      temp.offsetRight = 16 + (-props.offsetLeft || 0);
      if (props.offsetTop) {
        temp.offsetTop = props.offsetTop;
      }
    }
    setOffsets(temp);
  };

  React.useEffect(() => {
    if (props.step === ftuxStep) {
      if (props.scrollTo) {
        window.scrollTo(0, ref.current.offsetTop);
      }
      if (props.scrollToTop) {
        window.scrollTo(0, 0);
      }

      setDisplayTooltip(true);
    } else {
      setDisplayTooltip(false);
    }
  }, [ftuxStep, props.step, props.scrollTo, props.scrollToTop]);

  const initializeTooltip = () => {
    if (
      (!props.step && props.step !== 0) ||
      typeof props.step !== "number" ||
      props.step > ftuxTotalSteps - 1 ||
      props.step < 0
    ) {
      console.error(
        `react-ftux error: FtuxTooltip requires a valid value for its 'step' prop.`
      );
    }
    setPosition();
  };

  React.useEffect(() => {
    if(tooltipProperties) {
      setTooltipSettings({...tooltipSettings, ...tooltipProperties, ...props})
    }
  }, [tooltipProperties]);

  React.useEffect(initializeTooltip, [props.step]);

  return (
    <React.Fragment>
      <TooltipWrapper
        ref={ref}
        className={`ftux-tooltip ${
          tooltipSettings.className ? tooltipSettings.className : ""
        }`}
        id={`ftux-id-${props.step}`}
        zIndex={props.zIndex}
      >
        <TooltipBody
          className="ftux-tooltip-body"
          backgroundColor={tooltipSettings.backgroundColor}
          offsets={offsets}
          display={displayTooltip ? 1 : 0}
        >
          {props.pointerDirection ? (
            <TooltipPointer
              className={`ftux-tooltip-pointer ${props.pointerDirection}`}
              backgroundColor={tooltipSettings.backgroundColor}
            ></TooltipPointer>
          ) : (
            <TooltipPointer
              className={`ftux-tooltip-pointer above`}
              backgroundColor={tooltipSettings.backgroundColor}
            ></TooltipPointer>
          )}
          <TooltipContent className="ftux-tooltip-content">
            {props.content && props.content()}
          </TooltipContent>
          <TooltipButtons className="ftux-tooltip-buttons">
            {!tooltipSettings.first && (
              <TooltipButton
                className="ftux-tooltip-button ftux-tooltip-button-prev"
                onClick={decreaseStep}
              >
                {tooltipSettings.prevLabel}
              </TooltipButton>
            )}
            {!tooltipSettings.last && (
              <TooltipButton
                className="ftux-tooltip-button ftux-tooltip-button-next"
                onClick={increaseStep}
              >
                {tooltipSettings.nextLabel}
              </TooltipButton>
            )}
            {tooltipSettings.last && (
              <TooltipButton
                className="ftux-tooltip-button ftux-tooltip-button-end"
                onClick={endFtux}
              >
                {tooltipSettings.doneLabel}
              </TooltipButton>
            )}
          </TooltipButtons>
          <CloseButton
            className="ftux-tooltip-close"
            highlightColor={tooltipSettings.highlightColor}
            onClick={endFtux}
          >
            &#x2715;
          </CloseButton>
        </TooltipBody>
      </TooltipWrapper>
      {props.children}
    </React.Fragment>
  );
}
