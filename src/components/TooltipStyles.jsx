import styled from "styled-components";

const TooltipWrapper = styled.div`
  transform: scale(1);
  position: relative;
  z-index: ${(props) => (props.zIndex === undefined ? "auto" : props.zIndex)};
`;

const TooltipBody = styled.div`
  all: initial;
  padding: 20px;
  position: fixed;
  border-radius: 5px;
  opacity: ${(props) => props.display};
  transition: opacity 0.4s ease-in;
  pointer-events: ${(props) => (props.display ? "auto" : "none")};
  top: ${(props) => props.tooltipSettings.offsetTop}px;
  left: ${(props) => props.tooltipSettings.offsetLeft}px;
  bottom: ${(props) => props.tooltipSettings.offsetBottom}px;
  right: ${(props) => props.tooltipSettings.offsetRight}px;
  background-color: ${(props) => props.tooltipSettings.backgroundColor};
  color: ${(props) => props.tooltipSettings.foregroundColor};
  font: ${(props) => props.tooltipSettings.fontStyle};
  width: ${(props) => props.tooltipSettings.tooltipWidth}px;
  min-width: ${(props) => props.tooltipSettings.tooltipWidth}px;
`;

const TooltipPointer = styled.div`
  width: 0px;
  height: 0px;
  position: absolute;
  &.above {
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 16px solid ${(props) => props.backgroundColor};
    top: -16px;
  }
  &.below {
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 16px solid ${(props) => props.backgroundColor};
    top: 100%;
  }
  &.left {
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-right: 16px solid ${(props) => props.backgroundColor};
    left: -16px;
  }
  &.right {
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-left: 16px solid ${(props) => props.backgroundColor};
    right: -16px;
  }
`;

const TooltipContent = styled.div`
  display: block;
  padding: 10px;
`;

const TooltipButtons = styled.div`
  float: right;
  padding-top: 10px;
`;

const TooltipButton = styled.button`
  font: ${(props) => props.buttonFontStyle};
  margin: 4px;
  width: 64px;
  height: 32px;
  background-color: ${(props) => props.backgroundColor};
  border: solid 1px ${(props) => props.foregroundColor};
  border-radius: 5px;
  color: ${(props) => props.foregroundColor};
  :hover {
    cursor: pointer;
    color: ${(props) => props.highlightColor};
    border-color: ${(props) => props.highlightColor};
  }
`;

const CloseButton = styled.span`
  position: absolute;
  top: 4px;
  right: 6px;
  font-size: 16px;
  cursor: pointer;
  :hover {
    color: ${(props) => props.highlightColor};
  }
`;

export {
  TooltipBody,
  TooltipContent,
  TooltipWrapper,
  CloseButton,
  TooltipPointer,
  TooltipButtons,
  TooltipButton,
};
