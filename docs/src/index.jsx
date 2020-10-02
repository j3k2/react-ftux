import React from "react";
import { render } from "react-dom";
import { FtuxProvider, FtuxTooltip } from "../../lib/bundle";
import {
  Container,
  Dropdown,
  Header,
  Image,
  Menu,
  Icon,
} from "semantic-ui-react";

function Demo() {
  return (
    <div>
      <Menu style={{ height: 61, fontSize: 16 }} fixed="top" inverted>
        <Menu.Item header>
          <a href="https://github.com/j3k2/react-ftux">react-ftux demo</a>
        </Menu.Item>
        <Menu.Item as="a">Home</Menu.Item>
        <Menu.Item as="a">Users</Menu.Item>

        <FtuxTooltip
          step={0}
          // backgroundColor="red"
          content={() => {
            return (
              <div className="tooltip">
                <h3>Step 0 tooltip</h3>
                <br />
                <p>
                  {`
                  Click buttons, press arrow keys, or press
                  Enter/Backspace keys to navigate through the tour. Escape key or clicking the 'x'
                  ends the tour. 
                  Keyboard navigation can be disabled with <FtuxProvider>'s 
                  'disableKeydownListener' prop.
                  `}
                </p>
              </div>
            );
          }}
        >
          <Menu.Item as="a">Pages</Menu.Item>
        </FtuxTooltip>

        <FtuxTooltip
          step={1}
          content={() => {
            return (
              <div className="tooltip">
                <h3>Step 1 tooltip</h3>
                <br />
                <p>
                  {`
                  Note that components that gets passed to the 'content' render prop 
                  will inherit styles from outside of the tooltip. Make sure to style these
                  to prevent inconsistencies caused by CSS inheritance. 
                  The <div> element used for this tooltip's content has the 'tooltip' class, 
                  which changes the inherited font-size property and sets the color property
                  to match the tooltip background.
                  `}
                </p>
              </div>
            );
          }}
        >
          <Menu.Item as="a">Settings</Menu.Item>
        </FtuxTooltip>

        <FtuxTooltip
          step={2}
          // zIndex={9}
          content={() => {
            return (
              <div className="tooltip">
                <h3>Step 2 tooltip</h3>
                <br />
                <p>
                  Default positioning should place the tooltip beside the
                  element it's wrapping, with consideration for the
                  'pointerDirection' prop. For example, this tooltip has no
                  'pointerDirection' value, so it defaults to 'above'.
                  Therefore, the tooltip is placed below the targeted element
                  and aligned with its left side.
                </p>
              </div>
            );
          }}
        >
          <Dropdown item simple text="Dropdown">
            <Dropdown.Menu>
              <Dropdown.Item>List Item</Dropdown.Item>
              <Dropdown.Item>List Item</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Header>Header Item</Dropdown.Header>
              <Dropdown.Item>
                <i className="dropdown icon" />
                <span className="text">Submenu</span>
                <Dropdown.Menu>
                  <Dropdown.Item>List Item</Dropdown.Item>
                  <Dropdown.Item>List Item</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Item>
              <Dropdown.Item>List Item</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </FtuxTooltip>
      </Menu>

      <Menu style={{ top: 61 }} fixed="left" vertical inverted>
        <FtuxTooltip
          pointerDirection="left"
          offsetLeft={-160}
          offsetTop={-6}
          step={3}
          content={() => {
            return (
              <div className="tooltip">
                <h3>Step 3 tooltip</h3>
                <br />
                <p>
                  This tooltip has the 'pointerDirection' prop set to 'left', so
                  its default positioning is to the right of the targeted
                  element, aligned to its top. The 'offsetLeft' prop is set to
                  '-160' and the 'offsetTop' prop is set to '-6', so it's
                  shifted from its default position to point directly to the
                  text in the targeted element.
                </p>
              </div>
            );
          }}
        >
          <Menu.Item name="Link" />
        </FtuxTooltip>
        <Menu.Item name="More" />
        <Menu.Item name="Other " />
      </Menu>
      <Container text style={{ marginTop: "7em", paddingLeft: "15rem" }}>
        <FtuxTooltip
          scrollToTop
          step={5}
          zIndex={1}
          content={() => {
            return (
              <div className="tooltip">
                <h3>Step 5 tooltip</h3>
                <br />
                <p>
                  This tooltip has the 'scrollToTop' prop included, which is
                  preferred over the 'scrollTo' prop for elements at the top of
                  scrollable content. 
                </p>
              </div>
            );
          }}
        >
          <Header as="h1">react-ftux demo</Header>
        </FtuxTooltip>
        <Image src="./assets/paragraph.png" style={{ marginTop: "2em" }} />
        <Image src="./assets/paragraph.png" style={{ marginTop: "2em" }} />
        <Image src="./assets/paragraph.png" style={{ marginTop: "2em" }} />
        <Image src="./assets/paragraph.png" style={{ marginTop: "2em" }} />
        <Image src="./assets/paragraph.png" style={{ marginTop: "2em" }} />
        <Image src="./assets/paragraph.png" style={{ marginTop: "2em" }} />
        <br />
        <br />
        <FtuxTooltip
          scrollTo
          pointerDirection="below"
          step={4}
          content={() => {
            return (
              <div className="tooltip">
                <h3>Step 4 tooltip</h3>
                <br />
                <p>
                  This tooltip has the 'scrollTo' prop included and the
                  'pointerDirection' prop set to 'below'.
                </p>
              </div>
            );
          }}
        >
          <Menu compact>
            <Menu.Item>
              <Icon name="twitter" />
            </Menu.Item>
            <Menu.Item>
              <Icon name="facebook" />
            </Menu.Item>
            <Menu.Item>
              <Icon name="mail" />
            </Menu.Item>
          </Menu>
        </FtuxTooltip>
      </Container>
    </div>
  );
}

render(
  <FtuxProvider
    total={6}
    tooltipProperties={
      {
        // className: "themed-tooltip",
        // backgroundColor: 'pink',
        // foregroundColor: 'red',
        // highlightColor: 'pink'
      }
    }
    onFtuxEnd={() => {
      console.log("ftux end");
    }}
  >
    <Demo />
  </FtuxProvider>,
  document.getElementById("app")
);
