# react-ftux

**react-ftux** is a React component that makes it easy to add a First-Time User Experience walkthrough to a React app. Intended for use in desktop web applications.

A live demo showcasing key features is available at https://j3k2.github.io/react-ftux/. See `docs/` folder in the repository for demo source.

A simple example is also available at https://stackblitz.com/edit/react-ftux.

# Installation:

`npm install react-ftux` or `yarn add react-ftux`.

Peer dependencies are `react` and `react-dom`.

# Usage:

1. Import components as needed (`import {ReactFtux, ReactFtuxTooltip} from 'react-ftux';`).
2. Add `<ReactFtux/>` to your app, with the required prop `total`.
3. Add `<ReactFtuxTooltip/>`, with the required prop `step`, as a sibling before every element that should have a tooltip pointed to it.
4. Elements that are children to `ReactFtuxTooltip` will be used as the content for that tooltip.

# Example:

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

- total (required): [Integer] Total number of steps in walkthrough
- disable: [Boolean] Hide/end walkthrough
- ftuxEnd: [Function] Callback to be called when the walkthrough is complete
- disableKeydownListener: [Boolean] Disable arrow, Enter, Backspace, and Escape key listeners. Default value is `false`.
- tooltipSettings: [Object] Settings to be applied to all tooltips
    - className: [String] className value to be applied to all tooltips' "tooltip-wrapper" elements (see ReactFtuxTooltip elements/classes below)
    - animationDuration: [Number] Seconds for fade-in animation. `0` turns off animation. Default value is `0.4`.
    - backgroundColor: [HTML Color] Color to be used for background of all tooltips. Makes it easier to set border color property for all tooltip pointers, regardless of direction. Default value is `'#000'`.
    - foregroundColor: [HTML Color] Color for text, borders, and buttons. Default value is `'#fff'`.
    - highlightColor: [HTML Color] Hover color for button text and borders. Default value is `'#808080'`.
    - fontStyle: [String] Value for `font` CSS property to be used on buttons and tooltip content. Default value is `'14px Lato, Helvetica, Arial, sans-serif'`
    - tooltipWidth: [Number] Number of pixels for fixed tooltip width. Default value is `400`.
    - nextLabel: [String] Custom text to replace `'Next'` on button
    - prevLabel: [String] Custom text to replace `'Prev'` on button
    - doneLabel: [String] Custom text to replace `'Done'` on button

# ReactFtuxTooltip props:

- step (required): [Integer] 0-indexed step identifier
- offsetTop: [Number] Pixels to move tooltip down from default positioning
- offsetLeft: [Number] Pixels to moSve tooltip left from default positioning
- pointerDirection: [String] Direction of tooltip pointer. Positioning of the tooltip is also adjusted. Valid values are `'above'`/`'below'`/`'left'`/`'right'`. Default value is `'above'`.
- scrollTo: [Boolean] When this step is displayed, scroll window to tooltip
- scrollToTop: [Boolean] When this step is displayed, scroll window to top
- zIndex: [Number] Default value is `'auto'`

# ReactFtuxTooltip elements/classes:

````
<div className="tooltip-wrapper">
    <div className="tooltip-body">
        <div className="tooltip-pointer"></div>
        <div className="tooltip-content"></div>
        <div className="tooltip-buttons">
            <button className="tooltip-button tooltip-button-prev"></button>
            <button className="tooltip-button tooltip-button-next"></button>
            <button className="tooltip-button tooltip-button-end"></button>
        </div>
        <span className="tooltip-close"></span>
    </div>
</div>
```
````
