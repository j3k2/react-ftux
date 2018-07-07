import React from "react";
import { render } from "react-dom";
import { ReactFtux, ReactFtuxTooltip } from "../../lib";
// import "./styles.css";

function Demo() {
    return (
        <div>
            <h1>Demo with examples of the component</h1>
            <ReactFtux total={3}></ReactFtux>
            <ReactFtuxTooltip step={0}><button>asdf</button></ReactFtuxTooltip>
            <ReactFtuxTooltip step={1}><button style={{
                background: "red",
                // position: "fixed",
                right: 0
            }}>asdf</button></ReactFtuxTooltip>
            <ReactFtuxTooltip step={2}><button style={{
                background: "blue",
                left: 20
            }}>asdf</button></ReactFtuxTooltip>
        </div>
    );
}

render(<Demo />, document.getElementById("app"));
