"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReactFtuxTooltip = exports.ReactFtux = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _wolfy87Eventemitter = _interopRequireDefault(require("wolfy87-eventemitter"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n  border-top: 8px solid transparent; \n  border-bottom: 8px solid transparent;\n  border-left: 16px solid black;  \n  right: -16px;\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  border-top: 8px solid transparent; \n  border-bottom: 8px solid transparent;\n  border-right: 16px solid black; \n  left: -16px;\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  border-left: 8px solid transparent; \n  border-right: 8px solid transparent; \n  border-top: 16px solid black;\n  top: 100%;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  border-left: 8px solid transparent;\n  border-right: 8px solid transparent;\n  border-bottom: 16px solid black;\n  top: -16px;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  width: 0px;\n  height: 0px;\n  position: absolute;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  margin: 4px;\n  width: 64px;\n  height: 32px;\n  background-color: black;\n  border: solid 1px white;\n  border-radius: 5px;\n  color: white;\n  :hover{\n    cursor: pointer;\n    color: grey;\n    border-color: grey;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  :hover{\n    cursor: pointer;\n    color: grey;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// import '../src/index.css';
//Action events:
var FTUX_ACTION_END = 'ftuxActionEnd';
var FTUX_ACTION_INCREASE = 'ftuxActionIncrease';
var FTUX_ACTION_DECREASE = 'ftuxActionDecrease'; //Updater events:

var FTUX_UPDATER = 'ftuxUpdater';
var eventEmitter = new _wolfy87Eventemitter.default();
var ftuxStore = {};

var ReactFtux =
/*#__PURE__*/
function (_Component) {
  _inherits(ReactFtux, _Component);

  function ReactFtux(props) {
    var _this;

    _classCallCheck(this, ReactFtux);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ReactFtux).call(this, props));
    _this.state = {};

    _this.increaseStep = function () {
      var nextStep = ftuxStore.currentStep + 1;
      ftuxStore = {
        currentStep: nextStep,
        total: _this.props.total,
        config: _this.props.ftuxConfig
      };
      eventEmitter.trigger(FTUX_UPDATER, [ftuxStore]);
    };

    _this.decreaseStep = function () {
      var nextStep = ftuxStore.currentStep - 1 > 0 ? ftuxStore.currentStep - 1 : 0;
      ftuxStore = {
        currentStep: nextStep,
        total: _this.props.total,
        config: _this.props.ftuxConfig
      };
      eventEmitter.trigger(FTUX_UPDATER, [ftuxStore]);
    };

    _this.init = function () {
      ftuxStore = {
        currentStep: 0,
        total: _this.props.total,
        config: _this.props.ftuxConfig
      };
      eventEmitter.trigger(FTUX_UPDATER, [ftuxStore]);
    };

    return _this;
  }

  _createClass(ReactFtux, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      eventEmitter.on(FTUX_ACTION_INCREASE, function () {
        _this2.increaseStep();
      });
      eventEmitter.on(FTUX_ACTION_DECREASE, function () {
        _this2.decreaseStep();
      });
      eventEmitter.on(FTUX_ACTION_END, function () {
        _this2.props.ftuxEnd();
      });
      eventEmitter.on(FTUX_UPDATER, function (stepState) {
        _this2.setState(stepState);
      });

      if (!this.props.disable) {
        this.init();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      eventEmitter.off(FTUX_ACTION_INCREASE);
      eventEmitter.off(FTUX_ACTION_DECREASE);
      eventEmitter.off(FTUX_ACTION_END);
      eventEmitter.off(FTUX_UPDATER);
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement("div", null);
    }
  }]);

  return ReactFtux;
}(_react.Component);

exports.ReactFtux = ReactFtux;

var StyledAnchor = _styledComponents.default.span(_templateObject());

var StyledButton = _styledComponents.default.button(_templateObject2());

var PointerBase = _styledComponents.default.div(_templateObject3());

var PointerAbove = PointerBase.extend(_templateObject4());
var PointerBelow = PointerBase.extend(_templateObject5());
var PointerLeft = PointerBase.extend(_templateObject6());
var PointerRight = PointerBase.extend(_templateObject7());

var ReactFtuxTooltip =
/*#__PURE__*/
function (_Component2) {
  _inherits(ReactFtuxTooltip, _Component2);

  function ReactFtuxTooltip(props) {
    var _this3;

    _classCallCheck(this, ReactFtuxTooltip);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(ReactFtuxTooltip).call(this, props));
    _this3.state = {
      display: false,
      last: false,
      first: false,
      triggerEndFtux: function triggerEndFtux() {
        eventEmitter.trigger(FTUX_ACTION_END);
      },
      triggerIncreaseStep: function triggerIncreaseStep() {
        eventEmitter.trigger(FTUX_ACTION_INCREASE);
      },
      triggerDecreaseStep: function triggerDecreaseStep() {
        eventEmitter.trigger(FTUX_ACTION_DECREASE);
      },
      style: {
        background: "black",
        color: "white",
        padding: 20,
        position: "fixed",
        borderRadius: 5,
        minWidth: 412,
        width: 412,
        display: 'block'
      }
    };
    return _this3;
  }

  _createClass(ReactFtuxTooltip, [{
    key: "updateState",
    value: function updateState(stepState, hide) {
      if (this.props.step === stepState.currentStep) {
        if (hide) {
          this.setState({
            display: false
          });
        }

        if (this.props.step === stepState.total - 1) {
          this.setState({
            last: true
          });
        }

        if (this.props.step === 0) {
          this.setState({
            first: true
          });
        }

        this.setState({
          display: true
        });

        if (this.props.scrollTo) {
          var tooltipRef = _reactDom.default.findDOMNode(this.refs.tooltip);

          window.scrollTo(0, tooltipRef.offsetTop);
        }
      } else {
        this.setState({
          display: false
        });
      }

      if (stepState.config && stepState.config.disableCloseButton) {
        this.setState({
          disableCloseButton: true
        });
      }

      if (this.props.tooltipStyle) {
        this.setState({
          style: Object.assign({}, this.state.style, this.props.tooltipStyle)
        });
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this4 = this;

      eventEmitter.on(FTUX_UPDATER, function (stepState) {
        _this4.updateState(stepState);
      });
      eventEmitter.on(FTUX_ACTION_END, function () {
        _this4.updateState({}, true);
      });
      eventEmitter.trigger(FTUX_UPDATER, [ftuxStore]);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      eventEmitter.off(FTUX_ACTION_END);
      eventEmitter.off(FTUX_UPDATER);
    }
  }, {
    key: "render",
    value: function render() {
      var nav;

      if (this.state.last) {
        nav = _react.default.createElement("div", null, _react.default.createElement(StyledButton, {
          onClick: this.state.triggerDecreaseStep
        }, "Prev"), _react.default.createElement(StyledButton, {
          onClick: this.state.triggerEndFtux
        }, "Done"));
      } else {
        nav = _react.default.createElement("div", null, !this.state.first && _react.default.createElement(StyledButton, {
          onClick: this.state.triggerDecreaseStep
        }, "Prev"), _react.default.createElement(StyledButton, {
          onClick: this.state.triggerIncreaseStep
        }, "Next"));
      }

      var pointer = _react.default.createElement("div", null, this.props.pointerDirection === 'above' ? _react.default.createElement(PointerAbove, null) : null, this.props.pointerDirection === 'below' ? _react.default.createElement(PointerBelow, null) : null, this.props.pointerDirection === 'left' ? _react.default.createElement(PointerLeft, null) : null, this.props.pointerDirection === 'right' ? _react.default.createElement(PointerRight, null) : null, !this.props.pointerDirection ? _react.default.createElement(PointerAbove, null) : null);

      return _react.default.createElement("div", {
        ref: "tooltip",
        style: {
          transform: 'scale(1)',
          'zIndex': 999
        }
      }, _react.default.createElement("div", {
        style: Object.assign(this.state.style, {
          display: this.state.display ? null : 'none'
        })
      }, pointer, _react.default.createElement("div", {
        style: {
          display: "block",
          padding: 10
        }
      }, this.props.children), _react.default.createElement(StyledAnchor, {
        style: {
          position: 'absolute',
          top: 0,
          right: 6,
          fontSize: 24,
          display: this.state.disableCloseButton ? 'none' : null
        },
        onClick: this.state.triggerEndFtux
      }, "\u2715"), _react.default.createElement("div", {
        style: {
          float: "right",
          "paddingTop": 10
        }
      }, nav)));
    }
  }]);

  return ReactFtuxTooltip;
}(_react.Component);

exports.ReactFtuxTooltip = ReactFtuxTooltip;