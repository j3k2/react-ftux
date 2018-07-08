import React from "react";
import { render } from "react-dom";
import { ReactFtux, ReactFtuxTooltip } from "../../lib";
// import "./styles.css";

function Demo() {
    return (
        <div>
            <ReactFtux total={5}></ReactFtux>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
                <a className="navbar-brand" href="index.html">Demo Application</a>
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive"
                aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav navbar-sidenav" id="exampleAccordion">
                    <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Dashboard">
                    <a className="nav-link" href="/">
                        <i className="fa fa-fw fa-dashboard"></i>
                        <span className="nav-link-text">Dashboard</span>
                    </a>
                    </li>
                    <ReactFtuxTooltip step={3} tooltipStyle={{left: 240}}>
                    <span>Title 4</span>
                    <br/>
                    <span>Content 4 lorem ipsum</span>
                    </ReactFtuxTooltip>
                    <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Example Pages">
                    <a className="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapseExamplePages" data-parent="#exampleAccordion">
                        <i className="fa fa-fw fa-file"></i>
                        <span className="nav-link-text">Pages</span>
                    </a>
                    <ul className="sidenav-second-level collapse" id="collapseExamplePages">
                        <li>
                        <a href="/example">Example Page</a>
                        </li>
                    </ul>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    <ReactFtuxTooltip step={0} tooltipStyle={{top:40}}>
                    <span>Title 1</span>
                    <br/>
                    <span>Content 1 lorem ipsum</span>
                    </ReactFtuxTooltip>
                    <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle mr-lg-2" id="messagesDropdown" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
                        <a className="dropdown-item" href="#">
                        <strong>David Miller</strong>
                        <span className="small float-right text-muted">11:21 AM</span>
                        <div className="dropdown-message small">Hey there! This new version of SB Admin is pretty awesome! These messages clip off when they reach the end
                            of the box so they don't overflow over to the sides!</div>
                        </a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#">
                        <strong>Jane Smith</strong>
                        <span className="small float-right text-muted">11:21 AM</span>
                        <div className="dropdown-message small">I was wondering if you could meet for an appointment at 3:00 instead of 4:00. Thanks!</div>
                        </a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#">
                        <strong>John Doe</strong>
                        <span className="small float-right text-muted">11:21 AM</span>
                        <div className="dropdown-message small">I've sent the final files over to you for review. When you're able to sign off of them let me know and we can
                            discuss distribution.</div>
                        </a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item small" href="#">View all messages</a>
                    </div>
                    </li>
                    <ReactFtuxTooltip step={1} tooltipStyle={{top:40}}>
                    <span>Title 2</span>
                    <br/>
                    <span>Content 2 lorem ipsum</span>
                    </ReactFtuxTooltip>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle mr-lg-2" id="alertsDropdown" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
                            <a className="dropdown-item" href="#">
                            <span className="text-success">
                                <strong>
                                <i className="fa fa-long-arrow-up fa-fw"></i>Status Update</strong>
                            </span>
                            <span className="small float-right text-muted">11:21 AM</span>
                            <div className="dropdown-message small">This is an automated server response message. All systems are online.</div>
                            </a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">
                            <span className="text-danger">
                                <strong>
                                <i className="fa fa-long-arrow-down fa-fw"></i>Status Update</strong>
                            </span>
                            <span className="small float-right text-muted">11:21 AM</span>
                            <div className="dropdown-message small">This is an automated server response message. All systems are online.</div>
                            </a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">
                            <span className="text-success">
                                <strong>
                                <i className="fa fa-long-arrow-up fa-fw"></i>Status Update</strong>
                            </span>
                            <span className="small float-right text-muted">11:21 AM</span>
                            <div className="dropdown-message small">This is an automated server response message. All systems are online.</div>
                            </a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item small" href="#">View all alerts</a>
                        </div>
                    </li>
                    <ReactFtuxTooltip step={2} tooltipStyle={{top:40}}>
                    <span>Title 3</span>
                    <br/>
                    <span>Content 3 lorem ipsum</span>
                    </ReactFtuxTooltip>
                    <li className="nav-item">
                    <form className="form-inline my-2 my-lg-0 mr-lg-2">
                        <div className="input-group">
                        <input className="form-control" type="text" placeholder="Search for..."/>>
                        <span className="input-group-append">
                            <button className="btn btn-primary" type="button">
                            <i className="fa fa-search"></i>
                            </button>
                        </span>
                        </div>
                    </form>
                    </li>
                    <ReactFtuxTooltip step={4} tooltipStyle={{top:40, left: -200}}>
                    <span>Title 5</span>
                    <br/>
                    <span>Content 5 lorem ipsum</span>
                    </ReactFtuxTooltip>
                    <li className="nav-item">
                    <a className="nav-link" data-toggle="modal" data-target="#exampleModal">
                        <i className="fa fa-fw fa-sign-out"></i>Logout</a>
                    </li>
                </ul>
                </div>
            </nav>
            <div className="content-wrapper">
            </div>
            <footer className="sticky-footer">
                <div className="container">
                </div>
            </footer>
            <a className="scroll-to-top rounded" href="#page-top">
                <i className="fa fa-angle-up"></i>
            </a>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                    <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                    </div>
                    <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                    <div className="modal-footer">
                    <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    <a className="btn btn-primary" href="login.html">Logout</a>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}
                                                                                                            
render(<Demo />, document.getElementById("app"));
