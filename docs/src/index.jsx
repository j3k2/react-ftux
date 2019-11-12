import React from "react";
import { render } from "react-dom";
import { ReactFtux, ReactFtuxTooltip } from "../../lib/bundle";

function Demo() {
    return (
        <div>
            <ReactFtux
                total={6}
                disable={false}
                tooltipSettings={{
                    disableCloseButton: false,
                    disableKeydownListener: false,
                    animationDuration: 0.4,
                    tooltipWidth: 400
                }}
                ftuxEnd={() => {
                    console.log('ftux end');
                }} />
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
                <span className="navbar-brand">
                    Demo Application for <a href="https://github.com/j3k2/react-ftux">react-ftux</a>
                </span>
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive"
                    aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav navbar-sidenav" id="exampleAccordion">
                        <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Dashboard">
                            <a className="nav-link">
                                <i className="fa fa-fw fa-dashboard"></i>
                                <span className="nav-link-text">Link</span>
                            </a>
                        </li>
                        <ReactFtuxTooltip
                            step={3}
                            pointerDirection="left">
                            <h5>Step 3 tooltip</h5>
                            <br />
                            <span>This tooltip has the pointerDirection prop set to 'left'.</span>
                        </ReactFtuxTooltip>
                        <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Example Pages">
                            <a className="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapseExamplePages" data-parent="#exampleAccordion">
                                <i className="fa fa-fw fa-file"></i>
                                <span className="nav-link-text">Pages</span>
                            </a>
                            <ul className="sidenav-second-level collapse" id="collapseExamplePages">
                                <li>
                                    <a>Example Page</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <ReactFtuxTooltip step={0}>
                            <h5>Step 0 tooltip</h5>
                            <br />
                            <span>'ReactFtuxTooltip' component is included as a sibling to the menu element.</span>
                        </ReactFtuxTooltip>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle mr-lg-2" id="messagesDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fa fa-fw fa-envelope"></i>
                                <span className="d-lg-none">Messages
                        <span className="badge badge-pill badge-primary">12 New</span>
                                </span>
                                <span className="indicator text-primary d-none d-lg-block">
                                    <i className="fa fa-fw fa-circle"></i>
                                </span>
                            </a>
                            <div className="dropdown-menu" aria-labelledby="messagesDropdown">
                                <h6 className="dropdown-header">New Messages:</h6>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item">
                                    <strong>David Miller</strong>
                                    <span className="small float-right text-muted">11:21 AM</span>
                                    <div className="dropdown-message small">Hey there! This new version of SB Admin is pretty awesome! These messages clip off when they reach the end
                            of the box so they don't overflow over to the sides!</div>
                                </a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item">
                                    <strong>Jane Smith</strong>
                                    <span className="small float-right text-muted">11:21 AM</span>
                                    <div className="dropdown-message small">I was wondering if you could meet for an appointment at 3:00 instead of 4:00. Thanks!</div>
                                </a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item">
                                    <strong>John Doe</strong>
                                    <span className="small float-right text-muted">11:21 AM</span>
                                    <div className="dropdown-message small">I've sent the final files over to you for review. When you're able to sign off of them let me know and we can
                            discuss distribution.</div>
                                </a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item small">View all messages</a>
                            </div>
                        </li>
                        <ReactFtuxTooltip step={1}>
                            <h5>Step 1 tooltip</h5>
                            <br />
                            <span>Clicking those menu elements still works as expected.</span>
                        </ReactFtuxTooltip>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle mr-lg-2" id="alertsDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fa fa-fw fa-bell"></i>
                                <span className="d-lg-none">Alerts
                            <span className="badge badge-pill badge-warning">6 New</span>
                                </span>
                                <span className="indicator text-warning d-none d-lg-block">
                                    <i className="fa fa-fw fa-circle"></i>
                                </span>
                            </a>
                            <div className="dropdown-menu" aria-labelledby="alertsDropdown">
                                <h6 className="dropdown-header">New Alerts:</h6>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item">
                                    <span className="text-success">
                                        <strong>
                                            <i className="fa fa-long-arrow-up fa-fw"></i>Status Update</strong>
                                    </span>
                                    <span className="small float-right text-muted">11:21 AM</span>
                                    <div className="dropdown-message small">This is an automated server response message. All systems are online.</div>
                                </a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item">
                                    <span className="text-danger">
                                        <strong>
                                            <i className="fa fa-long-arrow-down fa-fw"></i>Status Update</strong>
                                    </span>
                                    <span className="small float-right text-muted">11:21 AM</span>
                                    <div className="dropdown-message small">This is an automated server response message. All systems are online.</div>
                                </a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item">
                                    <span className="text-success">
                                        <strong>
                                            <i className="fa fa-long-arrow-up fa-fw"></i>Status Update</strong>
                                    </span>
                                    <span className="small float-right text-muted">11:21 AM</span>
                                    <div className="dropdown-message small">This is an automated server response message. All systems are online.</div>
                                </a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item small">View all alerts</a>
                            </div>
                        </li>
                        <ReactFtuxTooltip
                            step={2}
                            pointerDirection="right">
                            <h5>Step 2</h5>
                            <br />
                            <span>This tooltip has the pointerDirection prop set to 'right'.</span>
                        </ReactFtuxTooltip>
                        <li className="nav-item">
                            <form className="form-inline my-2 my-lg-0 mr-lg-2">
                                <div className="input-group">
                                    <input className="form-control" type="text" placeholder="Search for..." />>
                        <span className="input-group-append">
                                        <button className="btn btn-primary" type="button">
                                            <i className="fa fa-search"></i>
                                        </button>
                                    </span>
                                </div>
                            </form>
                        </li>
                        <ReactFtuxTooltip
                            pointerDirection="right"
                            scrollTo
                            step={5}>
                            <h5>Step 5 tooltip</h5>
                            <br />
                            <span>This tooltip has pointerDirection prop set to 'right' and the 'scrollTo' prop included.</span>
                        </ReactFtuxTooltip>
                        <li className="nav-item">
                            <a className="nav-link">
                                <i className="fa fa-fw fa-sign-out"></i>Logout</a>
                        </li>

                    </ul>
                </div>
            </nav>
            <div className="content-wrapper" style={{ padding: 40 }}>
                <p style={{ height: 2000 }}>
                    <h1>Header</h1>
                </p>
                <ReactFtuxTooltip
                    scrollTo
                    step={4}
                    pointerDirection="below">
                    <h5>Share</h5>
                    <br />
                    <span>This tooltip has pointerDirection set to 'below'. Also has the 'scrollTo' prop, which makes the window scroll to the element's position.</span>
                </ReactFtuxTooltip>
                <div style={{
                    border: 'solid 1px black',
                    width: 180,
                    padding: 8,
                    borderRadius: 3
                }}>
                    <i style={{ fontSize: 28 }} className="fa fa-fw fa-share-square-o"></i>
                    <a>
                        <i style={{ fontSize: 32 }} className="fa fa-fw fa-envelope"></i>
                    </a>
                    <a>
                        <i style={{ fontSize: 32 }} className="fa fa-fw fa-facebook-official"></i>
                    </a>
                    <a>
                        <i style={{ fontSize: 32 }} className="fa fa-fw fa-twitter-square"></i>
                    </a>
                </div>
            </div>
        </div >
    );
}

render(<Demo />, document.getElementById("app"));
