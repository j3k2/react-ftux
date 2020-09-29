import React from "react";
import styled from "styled-components";

const PointerBase = styled.div`
  width: 0px;
  height: 0px;
  position: absolute;
`;

const PointerAbove = styled(PointerBase)`
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 16px solid ${(props) => props.backgroundColor};
  top: -16px;
`;

const PointerBelow = styled(PointerBase)`
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 16px solid ${(props) => props.backgroundColor};
  top: 100%;
`;

const PointerLeft = styled(PointerBase)`
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-right: 16px solid ${(props) => props.backgroundColor};
  left: -16px;
`;

const PointerRight = styled(PointerBase)`
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-left: 16px solid ${(props) => props.backgroundColor};
  right: -16px;
`;

export default function (props) {
  return (
    <React.Fragment>
      {props.pointerDirection === "above" ? (
        <PointerAbove
          className={props.className}
          backgroundColor={props.backgroundColor}
        ></PointerAbove>
      ) : null}
      {props.pointerDirection === "below" ? (
        <PointerBelow
          className={props.className}
          backgroundColor={props.backgroundColor}
        ></PointerBelow>
      ) : null}
      {props.pointerDirection === "left" ? (
        <PointerLeft
          className={props.className}
          backgroundColor={props.backgroundColor}
        ></PointerLeft>
      ) : null}
      {props.pointerDirection === "right" ? (
        <PointerRight
          className={props.className}
          backgroundColor={props.backgroundColor}
        ></PointerRight>
      ) : null}
      {!props.pointerDirection ? (
        <PointerAbove
          className={props.className}
          backgroundColor={props.backgroundColor}
        ></PointerAbove>
      ) : null}
    </React.Fragment>
  );
}
