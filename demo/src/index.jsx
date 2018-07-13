import React from "react";
import { render } from "react-dom";
import { ReactFtux, ReactFtuxTooltip } from "../../lib/bundle";
// import "./styles.css";

function Demo() {
    return (
        <div>
            <ReactFtux total={2}/>
<ReactFtuxTooltip step={0}>
    <span>Step 1</span>
</ReactFtuxTooltip>
<div>Step 1 points here</div>

<ReactFtuxTooltip step={1}>
    <span>Step 2</span>
</ReactFtuxTooltip>
<div>Step 2 points here</div>
        </div>
    );
}

render(<Demo />, document.getElementById("app"));
