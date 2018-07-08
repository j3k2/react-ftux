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

var FTUX_REDUCER_STEP = 'ftuxReducerStep'; //takes stepState, stepConfig

var events = new _wolfy87Eventemitter.default();
var store = {
  stepState: {
    currentStep: 0,
    total: 1
  },
  stepConfig: {}
};

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
      var nextStep = store.stepState.currentStep + 1;
      store.stepState = {
        currentStep: nextStep,
        total: _this.props.total
      };
      events.trigger(FTUX_REDUCER_STEP, [store.stepState, store.stepConfig]);
    };

    _this.decreaseStep = function () {
      var nextStep = store.stepState.currentStep - 1 > 0 ? store.stepState.currentStep - 1 : 0;
      store.stepState = {
        currentStep: nextStep,
        total: _this.props.total
      };
      events.trigger(FTUX_REDUCER_STEP, [store.stepState, store.stepConfig]);
    };

    _this.init = function () {
      store.stepState = {
        currentStep: 0,
        total: _this.props.total
      };
      store.stepConfig = _this.props.stepConfig;
      events.trigger(FTUX_REDUCER_STEP, [store.stepState, store.stepConfig]);
    };

    return _this;
  }

  _createClass(ReactFtux, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      events.on(FTUX_ACTION_INCREASE, function () {
        _this2.increaseStep();
      });
      events.on(FTUX_ACTION_DECREASE, function () {
        _this2.decreaseStep();
      });
      events.on(FTUX_ACTION_END, function () {
        console.log('ftux end');
      });
      events.on(FTUX_REDUCER_STEP, function (stepState) {
        _this2.setState(stepState);
      });
      this.init();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      events.off(FTUX_ACTION_INCREASE);
      events.off(FTUX_ACTION_END);
      events.off(FTUX_REDUCER_STEP);
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
        events.trigger(FTUX_ACTION_END);
      },
      triggerIncreaseStep: function triggerIncreaseStep() {
        events.trigger(FTUX_ACTION_INCREASE);
      },
      triggerDecreaseStep: function triggerDecreaseStep() {
        events.trigger(FTUX_ACTION_DECREASE);
      },
      style: {
        background: "black",
        color: "white",
        padding: 20,
        position: "absolute",
        "zIndex": 1,
        "borderRadius": 2,
        width: 400
      },
      stepTitle: 'Step title',
      stepContent: 'Step content'
    };
    return _this3;
  }

  _createClass(ReactFtuxTooltip, [{
    key: "updateState",
    value: function updateState(stepState, stepConfig) {
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

      if (stepConfig && stepConfig[this.props.step.toString()]) {
        this.setState(stepConfig[this.props.step.toString()]);
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

      events.on(FTUX_REDUCER_STEP, function (stepState, stepConfig) {
        _this4.updateState(stepState, stepConfig);
      });
      events.on(FTUX_ACTION_END, function () {
        _this4.setState({
          display: false
        });
      });
      events.trigger(FTUX_REDUCER_STEP, [store.stepState, store.stepConfig]);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      events.off(FTUX_ACTION_END);
      events.off(FTUX_REDUCER_STEP);
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

      return _react.default.createElement("div", null, _react.default.createElement("div", {
        style: Object.assign(this.state.style, {
          display: this.state.display ? null : 'none'
        })
      }, _react.default.createElement("div", {
        style: {
          display: "block"
        }
      }, _react.default.createElement("span", null, "[", this.props.step, "]"), _react.default.createElement("br", null), _react.default.createElement("span", null, this.state.stepTitle), _react.default.createElement("p", null, this.state.stepContent)), _react.default.createElement("div", {
        style: {
          float: "right"
        }
      }, buttons)));
    }
  }]);

  return ReactFtuxTooltip;
}(_react.Component);

exports.ReactFtuxTooltip = ReactFtuxTooltip;