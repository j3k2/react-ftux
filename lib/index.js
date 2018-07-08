"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReactFtuxTooltip = exports.ReactFtux = void 0;

var _react = _interopRequireWildcard(require("react"));

var _wolfy87Eventemitter = _interopRequireDefault(require("wolfy87-eventemitter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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
var FTUX_ACTION_DECREASE = 'ftuxActionDecrease'; //Reducer events:

var FTUX_REDUCER = 'ftuxReducer';
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
        total: _this.props.total
      };
      eventEmitter.trigger(FTUX_REDUCER, [ftuxStore]);
    };

    _this.decreaseStep = function () {
      var nextStep = ftuxStore.currentStep - 1 > 0 ? ftuxStore.currentStep - 1 : 0;
      ftuxStore = {
        currentStep: nextStep,
        total: _this.props.total
      };
      eventEmitter.trigger(FTUX_REDUCER, [ftuxStore]);
    };

    _this.init = function () {
      ftuxStore = {
        currentStep: 0,
        total: _this.props.total
      };
      eventEmitter.trigger(FTUX_REDUCER, [ftuxStore]);
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
      eventEmitter.on(FTUX_REDUCER, function (stepState) {
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
      eventEmitter.off(FTUX_REDUCER);
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
        "borderRadius": 3,
        "boxShadow": "4px 4px 5px 0px grey",
        width: 300
      }
    };
    return _this3;
  }

  _createClass(ReactFtuxTooltip, [{
    key: "updateState",
    value: function updateState(stepState, hide) {
      if (this.props.step === stepState.currentStep) {
        this.setState({
          display: true
        });
      } else {
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

      if (hide) {
        this.setState({
          display: false
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

      eventEmitter.on(FTUX_REDUCER, function (stepState) {
        _this4.updateState(stepState);
      });
      eventEmitter.on(FTUX_ACTION_END, function () {
        _this4.updateState(ftuxStore, true);
      });
      eventEmitter.trigger(FTUX_REDUCER, [ftuxStore]);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      eventEmitter.off(FTUX_ACTION_END);
      eventEmitter.off(FTUX_REDUCER);
    }
  }, {
    key: "render",
    value: function render() {
      var buttons;

      if (this.state.last) {
        buttons = _react.default.createElement("div", null, _react.default.createElement("button", {
          onClick: this.state.triggerDecreaseStep
        }, "Previous"), _react.default.createElement("button", {
          onClick: this.state.triggerEndFtux
        }, "Done"));
      } else {
        buttons = _react.default.createElement("div", null, !this.state.first && _react.default.createElement("button", {
          onClick: this.state.triggerDecreaseStep
        }, "Previous"), _react.default.createElement("button", {
          onClick: this.state.triggerIncreaseStep
        }, "Next"));
      }

      return _react.default.createElement("div", {
        style: {
          transform: 'scale(1)',
          'zIndex': 99
        }
      }, _react.default.createElement("div", {
        style: Object.assign(this.state.style, {
          display: this.state.display ? null : 'none'
        })
      }, _react.default.createElement("div", {
        style: {
          display: "block"
        }
      }, this.props.children), _react.default.createElement("div", {
        style: {
          float: "right",
          "paddingTop": 10
        }
      }, buttons)));
    }
  }]);

  return ReactFtuxTooltip;
}(_react.Component);

exports.ReactFtuxTooltip = ReactFtuxTooltip;