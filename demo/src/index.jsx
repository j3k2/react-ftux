import React from "react";
import { render } from "react-dom";
import { ReactFtux, ReactFtuxTooltip } from "../../lib/bundle.js";
// import "./styles.css";

function Demo() {
    return (
        <div>
            <ReactFtux
                total={6}
                disable={false}
                tooltipSettings={{}}
                // tooltipSettings={{
                //     disableCloseButton: false,
                //     disableKeydownListener: false,
                //     animationDuration: 0.4,
                //     // backgroundColor: 'red',
                //     // foregroundColor: 'green',
                //     // highlightColor: 'yellow',
                //     tooltipWidth: 400,
                //     // nextLabel: '>',
                //     // prevLabel: '<',
                //     // doneLabel: 'x'
                // }}
                ftuxEnd={() => {
                    console.log('ftux end');
                }}/>
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
                        <ReactFtuxTooltip 
                            scrollToTop 
                            step={3} 
                            pointerDirection="left">
                            <h5>Pages</h5>
                            <br />
                            <span>Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits. Dramatically visualize customer directed convergence without revolutionary ROI.</span>
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
                        <ReactFtuxTooltip step={0}>
                            <h5>Messages</h5>
                            <br />
                            <span>Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.</span>
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
                        <ReactFtuxTooltip step={1}>
                            <h5>Alerts</h5>
                            <br />
                            <span>Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated content in real-time will have multiple touchpoints for offshoring.</span>
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
                        <ReactFtuxTooltip
                            step={2}
                            pointerDirection="right">
                            <h5>Search</h5>
                            <br />
                            <span>Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line.</span>
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
                        <ReactFtuxTooltip pointerDirection="right" scrollTo step={5}>
                            <h5>Logout</h5>
                            <br />
                            <span>Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits. Dramatically visualize customer directed convergence without revolutionary ROI.</span>
                        </ReactFtuxTooltip>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="modal" data-target="#exampleModal">
                                <i className="fa fa-fw fa-sign-out"></i>Logout</a>
                        </li>

                    </ul>
                </div>
            </nav>
            <div className="content-wrapper" style={{ padding: 40 }}>
                <h1>The postcapitalist paradigm of context and neosemioticist theory</h1>
                <h2>Charles Geoffrey<br /> <br />
                    <i>Department of Sociology, University of Southern North Dakota at<br />
                        Hoople</i></h2>
                <br /><br />
                <h3>1. The cultural paradigm of reality and Sartreist existentialism</h3>
                <p>&#8220;Class is dead,&#8221; says Lyotard. Therefore, the subject is interpolated into a<br />
                    subcapitalist narrative that includes reality as a whole. </p>
                <p>&#8220;Society is fundamentally unattainable,&#8221; says Marx; however, according to<br />
                    Drucker<a href="#fn1">[1]</a> , it is not so much society that is fundamentally<br />
                    unattainable, but rather the fatal flaw, and some would say the genre, of<br />
                    society. Bataille promotes the use of neosemioticist theory to attack class<br />
                    divisions. However, the characteristic theme of McElwaine&#8217;s<a
                        href="#fn2">[2]</a> model of Sartreist existentialism is the futility, and<br />
                    subsequent rubicon, of postcapitalist class. </p>
                <p>Sartre uses the term &#8216;neosemioticist theory&#8217; to denote the role of the<br />
                    writer as participant. In a sense, Sartreist existentialism states that context<br />
                    must come from the masses, given that sexuality is interchangeable with truth.
                </p>
                <p>Foucault uses the term &#8216;dialectic socialism&#8217; to denote a mythopoetical<br />
                    reality. Therefore, the premise of neosemioticist theory holds that sexuality<br />
                    is responsible for the status quo. </p>
                <p>If neotextual discourse holds, we have to choose between Sartreist<br />
                    existentialism and semioticist postcultural theory. However, Sontag suggests<br />
                    the use of textual narrative to read and deconstruct society. </p>
                <p>A number of deappropriations concerning the postcapitalist paradigm of<br />
                    context may be found. But Sartre promotes the use of subcapitalist discourse to<br />
                    challenge capitalism. </p>
                <h3>2. Consensuses of genre</h3>
                <p>In the works of Rushdie, a predominant concept is the concept of modernist<br />
                    culture. Any number of patriarchialisms concerning not narrative, but<br />
                    prenarrative exist. Thus, Sartreist existentialism states that language is used<br />
                    to oppress the proletariat. </p>
                <p>&#8220;Sexual identity is part of the absurdity of narrativity,&#8221; says Lacan. A<br />
                    number of theories concerning neosemioticist theory may be revealed. But the<br />
                    primary theme of the works of Rushdie is a self-sufficient whole. </p>
                <p>The subject is contextualised into a neodeconstructive semanticist theory<br />
                    that includes language as a reality. It could be said that von Junz<a
                        href="#fn3">[3]</a> implies that the works of Rushdie are reminiscent of<br />
                    Pynchon. </p>
                <p>Several deappropriations concerning the common ground between culture and<br />
                    sexual identity exist. However, Sartre uses the term &#8216;the postcapitalist<br />
                    paradigm of context&#8217; to denote not conceptualism, as subcultural theory<br />
                    suggests, but neoconceptualism. </p>
                <p>The subject is interpolated into a postcapitalist paradigm of context that<br />
                    includes language as a whole. Therefore, any number of narratives concerning<br />
                    neosemioticist theory may be found. </p>
                <p>The premise of Sartreist existentialism holds that the State is capable of<br />
                    significant form. In a sense, Bataille suggests the use of neosemioticist<br />
                    theory to analyse society. </p>
                <hr width="50%" />
                <p><a href="#" id="fn1"> 1. Drucker, R. M. (1982)<br />
                    <i>Reinventing Socialist realism: Modern theory, Marxism and the postcapitalist<br />
                        paradigm of context.</i> Oxford University Press</a></p>
                <p><a href="#" id="fn2"> 2. McElwaine, N. ed. (1999) <i>The postcapitalist paradigm of<br />
                    context in the works of Rushdie.</i> Schlangekraft</a></p>
                <p><a href="#" id="fn3"> 3. von Junz, W. T. P. (1976) <i>The Context of Failure: The<br />
                    postcapitalist paradigm of context in the works of Glass.</i> O&#8217;Reilly &#038;<br />
                    Associates</a></p>
                    <ReactFtuxTooltip
                         scrollTo
                         step={4} 
                         pointerDirection="below">
                    <h5>Share</h5>
                    <br />
                    <span>Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line.</span>
                </ReactFtuxTooltip>
                <div style={{
                    border: 'solid 1px black',
                    width: 180,
                    padding: 8,
                    borderRadius: 3
                    }}>
                    <i style={{fontSize: 28}} className="fa fa-fw fa-share-square-o"></i>
                    <a href="#">
                        <i style={{ fontSize: 32 }} className="fa fa-fw fa-envelope"></i>
                    </a>
                    <a href="#">
                        <i style={{ fontSize: 32 }} className="fa fa-fw fa-facebook-official"></i>
                    </a>
                    <a href="#">
                        <i style={{ fontSize: 32 }} className="fa fa-fw fa-twitter-square"></i>
                    </a>
                </div>
            </div>
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
        </div >
    );
}

render(<Demo />, document.getElementById("app"));
