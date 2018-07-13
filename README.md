**react-ftux** is a component library that makes it easy to add a First-Time User Experience walkthrough to a React app

A live demo is available at https://jksfo.gitlab.com/react-ftux. See `demo/src/index.jsx` for the demo implementation source.

# Installation:
`npm install react-ftux`

Peer dependencies are `react` and `react-dom`.

# Usage:
1. `import {ReactFtux, ReactFtuxTooltip} from 'react-ftux';`
2. Add `<ReactFtux/>` to your app, with the required prop `total`.
3. Add `<ReactFtuxTooltip></ReactFtuxTooltip>`, with the required prop `step`, as a sibling before every element that should have a tooltip pointed to it.
4. Elements that are children to `ReactFtuxTooltip` will be used as the content for that tooltip

```
<ReactFtux total={2}/>
<ReactFtuxTooltip step={0}>
    <span>Step 1</span>
</ReactFtuxTooltip>
<div>Step 1 points here</div>

<ReactFtuxTooltip step={1}>
    <span>Step 2</span>
</ReactFtuxTooltip>
<div>Step 2 points here</div>
```

# ReactFtux props:
- total (required): [Number] Total number of steps in walkthrough
- disable: [Boolean] Hide all tooltips
- ftuxEnd: [Function] Callback to be called when the walkthrough is complete
- tooltipSettings: [Object] Settings to be applied to all tooltips
    - disableCloseButton: [Boolean] Hide "x" to end walkthrough early
    - disableKeydownListener: [Boolean] Disable arrow keys, Enter key, and Escape key listeners
    - animationDuration: [Number] Seconds for fade-in animation. 0 turns off animation. Default value is 0.4.
    - backgroundColor: [HTML Color] Color for background of tooltips. Default value is "black".
    - foregroundColor: [HTML Color] Color for text, borders, and buttons. Default value is "white".
    - highlightColor: [HTML Color] Hover color for buttons. Default value is "grey".
    - tooltipWidth: [Number] Number of pixels for fixed tooltip width. Default value is 400.
    - nextLabel: [String] Custom text to replace "Next" on button
    - prevLabel: [String] Custom text to replace "Prev" on button
    - doneLabel: [String] Custom text to replace "Done" on button

# ReactFtuxTooltip props:
- step (required): [Number] 0-indexed step number
- offsetTop: [Number] Pixels to move tooltip down from default positioning
- offsetLeft: [Number] Pixels to move tooltip left from default positioning
- pointerDirection: [String:"above"/"below"/"left"/"right"] Orientation of tooltip pointer. Default positioning of the tooltip is also adjusted for each orientation. "Above" is default.
- scrollTo: [Boolean] When this step is displayed, scroll window to tooltip
- scrollToTop: [Boolean] When this step is displayed, scroll window to top
- zIndex: [Number] Default is set to 999.