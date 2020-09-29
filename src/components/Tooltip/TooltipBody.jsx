import React from "react";
import styled from "styled-components";

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

const StyledTooltipBody = styled.div`
  all: initial;
  padding: 20px;
  position: fixed;
  border-radius: 5px;
  display: block;
  display: ${(props) => (props.display ? "block" : "none")};
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

export default function (props) {
  return (
    <StyledTooltipBody
      className={props.className}
      tooltipSettings={props.tooltipSettings}
      display={props.display ? 1 : 0}
    >
      {props.children}
      <CloseButton
        className="tooltip-close"
        highlightColor={props.tooltipSettings.highlightColor}
        onClick={props.endFtux}
      >
        &#x2715;
      </CloseButton>
    </StyledTooltipBody>
  );
}
