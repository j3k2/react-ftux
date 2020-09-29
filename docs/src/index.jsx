import React from "react";
import { render } from "react-dom";
import { Ftux, FtuxTooltip } from "../../lib/bundle";
import {
    Container,
    Dropdown,
    Header,
    Image,
    Menu,
    Icon
} from 'semantic-ui-react'

function Demo() {
    return (
        <div>
            <Ftux
                total={6}
                tooltipSettings={{
                    className: 'themed-tooltip',
                    // backgroundColor: '#333',
                    // foregroundColor: 'red',
                    // highlightColor: 'pink'
                }}
                ftuxEnd={() => {
                    console.log('ftux end');
                }} />
            <Menu style={{ height: 61}} fixed='top' inverted>
                <Menu.Item header>
                    <a href="https://github.com/j3k2/react-ftux">react-ftux demo</a>
                </Menu.Item>
                <Menu.Item as='a'>Home</Menu.Item>
                <Menu.Item as='a'>Users</Menu.Item>

                
                  <FtuxTooltip step={0}>
                    <h5>Step 0 tooltip</h5>
                    <br />
                    <p>The 'FtuxTooltip' component is included as a sibling to the menu element. Click buttons, press arrow keys, or press Enter/Backspace keys to navigate through the tour. Esc key ends the tour.</p>
                </FtuxTooltip>
                <Menu.Item as='a'>Pages</Menu.Item>

                <FtuxTooltip step={1}>
                    <h5>Step 1 tooltip</h5>
                    <br />
                    <p className='tooltip-text'>
                        Font styles for the buttons and tooltip content are not 
                        inherited from their parent elements, and can be controlled 
                        by the 'fontStyle' prop on the 'Ftux' component. 

                        App style rules can still override these defaults for any
                        child elements of 'FtuxTooltip'.
                        
                        Note class 'tooltip-text' applied to this {'<p>'} element.</p>
                </FtuxTooltip>
                <Menu.Item as='a'>Settings</Menu.Item>

                <FtuxTooltip zIndex={1} step={2} >
                    <h5>Step 2 tooltip</h5>
                    <br />
                    <p>The 'zIndex' prop is set to {1} for this tooltip to preserve dropdown interaction.</p>
                </FtuxTooltip>
                <Dropdown item simple text='Dropdown'>
                    <Dropdown.Menu>
                        <Dropdown.Item>List Item</Dropdown.Item>
                        <Dropdown.Item>List Item</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Header>Header Item</Dropdown.Header>
                        <Dropdown.Item>
                            <i className='dropdown icon' />
                            <span className='text'>Submenu</span>
                            <Dropdown.Menu>
                                <Dropdown.Item>List Item</Dropdown.Item>
                                <Dropdown.Item>List Item</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown.Item>
                        <Dropdown.Item>List Item</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu>

            <Menu style={{ top: 61 }} fixed="left" vertical inverted>
                    <FtuxTooltip
                        pointerDirection='left'
                        offsetLeft={-160}
                        offsetTop={-10}
                        zIndex={1}
                        step={3}>
                            <h5>Step 3 tooltip</h5>
                            <br/>
                            <p>
                            This tooltip has the 'pointerDirection' prop set to 'left', 'offsetLeft' prop set to '-160', and 'offsetTop' prop set to '-10' to adjust tooltip position.
                            </p>
                        </FtuxTooltip>
                    <Menu.Item
                        name='Link'
                    />
                    <Menu.Item
                        name='More'
                    />
                    <Menu.Item
                        name='Other '
                    />
                </Menu>
            <Container text style={{ marginTop: '7em', paddingLeft: '15rem' }}>

            <FtuxTooltip scrollToTop zIndex={1} step={5}>
                    <h5>Step 5 tooltip</h5>
                    <br />
                    <p>This tooltip has the 'scrollToTop' prop included, which is preferred over the 'scrollTo' prop for elements at the top of scrollable content.</p>
                </FtuxTooltip>
                <Header as='h1'>react-ftux demo</Header>
                <Image src="./assets/paragraph.png" style={{ marginTop: '2em' }} />
                <Image src="./assets/paragraph.png" style={{ marginTop: '2em' }} />
                <Image src="./assets/paragraph.png" style={{ marginTop: '2em' }} />
                <Image src="./assets/paragraph.png" style={{ marginTop: '2em' }} />
                <Image src="./assets/paragraph.png" style={{ marginTop: '2em' }} />
                <Image src="./assets/paragraph.png" style={{ marginTop: '2em' }} />
                <br/>
                <br/>
                <FtuxTooltip
                    scrollTo
                    pointerDirection='below'
                    step={4}>
                        <h5>Step 4 tooltip</h5>
                        <br/>
                        <p>
                        This tooltip has the 'scrollTo' prop included and the 'pointerDirection' prop set to 'below'.
                        </p>
                        </FtuxTooltip>
                <Menu compact>
                    <Menu.Item>
                        <Icon name='twitter' />
                    </Menu.Item>
                    <Menu.Item>
                        <Icon name='facebook' />
                    </Menu.Item>
                    <Menu.Item>
                        <Icon name='mail' />
                    </Menu.Item>
                </Menu>
            </Container>
        </div>

    );
}

render(<Demo />, document.getElementById("app"));

