import React from 'react';
import styled, { keyframes } from 'styled-components';

const CloseButton = styled.span`
  :hover{
    cursor: pointer;
    color: ${props => props.highlightColor};
  }
`;

const opacityAnimation = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const StyledTooltipBody = styled.div`
  all: initial;
  padding: 20px;
  position: fixed;
  border-radius: 5px;
  display: block;
  animation: ${opacityAnimation} ${props => props.animationDuration} ease-in;
`;

export default function (props) {
  return (
    <StyledTooltipBody
      animationDuration={props.tooltipSettings.animationDuration + 's'}
      style={Object.assign({}, props.tooltipSettings.style, {
        pointerEvents: props.display ? 'auto' : 'none',
        top: props.tooltipSettings.offsetTop,
        left: props.tooltipSettings.offsetLeft,
        bottom: props.tooltipSettings.offsetBottom,
        right: props.tooltipSettings.offsetRight,
        backgroundColor: props.tooltipSettings.backgroundColor,
        color: props.tooltipSettings.foregroundColor,
        font: props.tooltipSettings.fontStyle,
        width: props.tooltipSettings.tooltipWidth,
        minWidth: props.tooltipSettings.tooltipWidth
      })}>
      {props.children}
      <CloseButton
        style={{
          position: 'absolute',
          top: 4,
          right: 6,
          fontSize: 16,
          display: props.tooltipSettings.disableCloseButton ? 'none' : null
        }}
        highlightColor={props.tooltipSettings.highlightColor}
        onClick={props.endFtux}>
        &#x2715;
        </CloseButton>
    </StyledTooltipBody>
  )
}