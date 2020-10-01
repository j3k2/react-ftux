# react-ftux

**react-ftux** is a React component that makes it easy to add a First-Time User Experience walkthrough to a React app. Intended for use in desktop web applications.

A live demo showcasing key features is available at https://j3k2.github.io/react-ftux/. See `docs/` folder in the repository for demo source.

A simple example is also available at https://stackblitz.com/edit/react-ftux.

# Installation:

`npm install react-ftux` or `yarn add react-ftux`.

Peer dependencies are `react` and `react-dom`.

# Usage:

1. Import components as needed (`import { FtuxProvider, FtuxTooltip } from 'react-ftux';`).
2. Add `<FtuxProvider>` to your app, with the required prop `total`. It must be an ancestor element to all `<FtuxTooltip>` elements.
3. Add `<FtuxTooltip>` as a wrapper/parent to any element that should have a tooltip pointed to it.
4. `<FtuxTooltip>`'s `step` prop is required. Its `content` prop accepts a component to be rendered inside the tooltip.

# Example:

```
<FtuxProvider total={2}>
<FtuxTooltip step={0} content={()=>{
    return <span>Step 1</span>;
}}>
    <div>Step 1 points here</div>
</FtuxTooltip>

<FtuxTooltip step={1} content={()=>{
    return <span>Step 2</span>;
}}>
    <div>Step 2 points here</div>
</FtuxTooltip>
</FtuxProvider>
```

# <FtuxProvider/> props:

- total (required): [Integer] Total number of steps in walkthrough
- disable: [Boolean] Hide/end walkthrough
- onFtuxEnd: [Function] Callback to be called when the walkthrough is complete
- disableKeydownListener: [Boolean] Disable arrow, Enter, Backspace, and Escape key listeners. Default value is `false`.
- tooltipProperties: [Object] Settings to be applied to all tooltips
  - className: [String] className value to be applied to all tooltips' "ftux-tooltip" elements (see FtuxTooltip elements/classes below)
  - backgroundColor: [HTML Color] Color to be used for background of all tooltips. Makes it easier to set border color property for all tooltip pointers, regardless of direction. Default value is `'#000'`.
  - nextLabel: [String] Custom text to replace `'Next'` on button
  - prevLabel: [String] Custom text to replace `'Prev'` on button
  - doneLabel: [String] Custom text to replace `'Done'` on button

# <FtuxTooltip/> props:

- step (required): [Integer] 0-indexed step identifier
- content: [Function] React component to be rendered inside the tooltip
- offsetTop: [Number] Pixels to move tooltip down from default positioning
- offsetLeft: [Number] Pixels to move tooltip left from default positioning
- pointerDirection: [String] Direction of tooltip pointer. Positioning of the tooltip is also adjusted. Valid values are `'above'`/`'below'`/`'left'`/`'right'`. Default value is `'above'`.
- scrollTo: [Boolean] When this step is displayed, scroll window to tooltip
- scrollToTop: [Boolean] When this step is displayed, scroll window to top
- zIndex: [Number] Default value is `'auto'`

# Tooltip styling notes:

Default styles for tooltips can be modified by writing css rules 
for the elements, which are structured like so:

```
<div id="ftux-id-0" className="ftux-tooltip">
    <div className="ftux-tooltip-body">
        <div className="ftux-tooltip-pointer"></div>
        <div className="ftux-tooltip-content"></div>
        <div className="ftux-tooltip-buttons">
            <button className="ftux-tooltip-button ftux-tooltip-button-prev"></button>
            <button className="ftux-tooltip-button ftux-tooltip-button-next"></button>
            <button className="ftux-tooltip-button ftux-tooltip-button-end"></button>
        </div>
        <button className="ftux-tooltip-close"></button>
    </div>
</div>
```

Custom css classes can also be applied to the "ftux-tooltip" element by 
setting the "className" property in the tooltipSettings object.

To prevent unintentional CSS inheritance from outside the 
tooltip component, the button elements have "all: unset" applied (https://developer.mozilla.org/en-US/docs/Web/CSS/unset).

IMPORTANT: because of the way that styled-components styles are injected, 
your custom styles may not override the default styles 
as expected (https://styled-components.com/docs/advanced#issues-with-specificity). 
This can be addressed by either increasing the specificity 
of your rules (`.ftux-tooltip.ftux-tooltip {}` instead of `.ftux-tooltip {}`) 
or using `!important` on each property.