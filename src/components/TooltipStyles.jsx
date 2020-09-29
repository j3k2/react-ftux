import styled from "styled-components";

const TooltipWrapper = styled.div`
  transform: scale(1);
  position: relative;
  z-index: ${(props) => (props.zIndex === undefined ? "auto" : props.zIndex)};
`;

const TooltipBody = styled.div`
  padding: 20px;
  position: absolute;
  border-radius: 5px;
  opacity: ${(props) => props.display};
  transition: opacity 0.4s ease-in;
  pointer-events: ${(props) => (props.display ? "auto" : "none")};
  top: ${(props) => props.tooltipSettings.offsetTop}px;
  left: ${(props) => props.tooltipSettings.offsetLeft}px;
  bottom: ${(props) => props.tooltipSettings.offsetBottom}px;
  right: ${(props) => props.tooltipSettings.offsetRight}px;
  background-color: ${(props) => props.tooltipSettings.backgroundColor};
  color: #fff;
  width: 400px;
  font-size: 14px;
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
  all: unset;
  text-align: center;
  margin: 4px;
  width: 64px;
  height: 32px;
  background-color: #000;
  border: solid 1px #fff;
  border-radius: 5px;
  color: #fff;
  :hover {
    cursor: pointer;
    color: #808080;
    border-color: #808080;
  }
`;

const CloseButton = styled.span`
  position: absolute;
  top: 4px;
  right: 6px;
  font-size: 16px;
  cursor: pointer;
  :hover {
    color: #808080;
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
