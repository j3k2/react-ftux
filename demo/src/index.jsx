import React from "react";
import { render } from "react-dom";
import { ReactFtux, ReactFtuxTooltip } from "../../lib";
// import "./styles.css";

function Demo() {
    return (
        <div>
            <h1>Demo with examples of the component</h1>
            <ReactFtux total={4}></ReactFtux>
            <ReactFtuxTooltip><button>asdf</button></ReactFtuxTooltip>

        </div>
    );
}

render(<Demo />, document.getElementById("app"));
