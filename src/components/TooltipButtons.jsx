import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  font: ${props => props.buttonFontStyle};
  margin: 4px;
  width: 64px;
  height: 32px;
  background-color: ${props => props.backgroundColor};
  border: solid 1px ${props => props.foregroundColor};
  border-radius: 5px;
  color: ${props => props.foregroundColor};
  :hover{
    cursor: pointer;
    color: ${props => props.highlightColor};
    border-color: ${props => props.highlightColor};
  }
`;

export default function tooltipButtons(props) {
    if (props.tooltipSettings.last) {
        return (<>
            <StyledButton
                buttonFontStyle={props.tooltipSettings.fontStyle}
                backgroundColor={props.tooltipSettings.backgroundColor}
                foregroundColor={props.tooltipSettings.foregroundColor}
                highlightColor={props.tooltipSettings.highlightColor}
                onClick={props.decreaseStep}>
                {props.tooltipSettings.prevLabel}
            </StyledButton>
            <StyledButton
                buttonFontStyle={props.tooltipSettings.fontStyle}
                backgroundColor={props.tooltipSettings.backgroundColor}
                foregroundColor={props.tooltipSettings.foregroundColor}
                highlightColor={props.tooltipSettings.highlightColor}
                onClick={props.endFtux}>
                {props.tooltipSettings.doneLabel}
            </StyledButton>
        </>);
    } else {
        return (<>
            {!props.tooltipSettings.first &&
                <StyledButton
                    buttonFontStyle={props.tooltipSettings.fontStyle}
                    backgroundColor={props.tooltipSettings.backgroundColor}
                    foregroundColor={props.tooltipSettings.foregroundColor}
                    highlightColor={props.tooltipSettings.highlightColor}
                    onClick={props.decreaseStep}>
                    {props.tooltipSettings.prevLabel}
                </StyledButton>
            }
            <StyledButton
                buttonFontStyle={props.tooltipSettings.fontStyle}
                backgroundColor={props.tooltipSettings.backgroundColor}
                foregroundColor={props.tooltipSettings.foregroundColor}
                highlightColor={props.tooltipSettings.highlightColor}
                onClick={props.increaseStep}>
                {props.tooltipSettings.nextLabel}
            </StyledButton>
        </>);
    }
}