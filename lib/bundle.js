'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var ee = _interopDefault(require('wolfy87-eventemitter'));
var React = _interopDefault(require('react'));
var styled = _interopDefault(require('styled-components'));

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function () {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

var events = {};
events.END_FTUX = 'END_FTUX';
events.INCREASE_STEP = 'INCREASE_STEP';
events.DECREASE_STEP = 'DECREASE_STEP';
events.UPDATE_FTUX = 'UPDATE_FTUX';
var eventEmitter = new ee();
var ftuxStore = {};

var Ftux = /*#__PURE__*/function (_React$Component) {
  _inherits(Ftux, _React$Component);

  var _super = _createSuper(Ftux);

  function Ftux(props) {
    var _this;

    _classCallCheck(this, Ftux);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "increaseStep", function () {
      var nextStep = ftuxStore.currentStep + 1;
      ftuxStore.currentStep = nextStep;
      eventEmitter.trigger(events.UPDATE_FTUX, [ftuxStore]);
    });

    _defineProperty(_assertThisInitialized(_this), "decreaseStep", function () {
      var nextStep = ftuxStore.currentStep - 1 > 0 ? ftuxStore.currentStep - 1 : 0;
      ftuxStore.currentStep = nextStep;
      eventEmitter.trigger(events.UPDATE_FTUX, [ftuxStore]);
    });

    _defineProperty(_assertThisInitialized(_this), "keydownHandler", function (event) {
      if (event.key === "ArrowLeft" || event.key === "Backspace") {
        _this.decreaseStep();
      }

      if (event.key === "ArrowRight" || event.key === "Enter") {
        if (ftuxStore.currentStep < _this.props.total - 1) {
          _this.increaseStep();
        } else {
          eventEmitter.trigger(events.END_FTUX);
        }
      }

      if (event.key === "Escape") {
        eventEmitter.trigger(events.END_FTUX);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "init", function () {
      ftuxStore.currentStep = 0;
      eventEmitter.trigger(events.UPDATE_FTUX, [ftuxStore]);
    });

    ftuxStore.ftuxProps = props;

    if (!_this.props.disableKeydownListener) {
      window.addEventListener("keydown", _this.keydownHandler);
    }

    eventEmitter.on(events.INCREASE_STEP, function () {
      _this.increaseStep();
    });
    eventEmitter.on(events.DECREASE_STEP, function () {
      _this.decreaseStep();
    });
    eventEmitter.on(events.END_FTUX, function () {
      if (_this.props.ftuxEnd) {
        _this.props.ftuxEnd();

        window.removeEventListener("keydown", _this.keydownHandler);
      }
    });

    if (!_this.props.disable) {
      _this.init();
    }

    return _this;
  }

  _createClass(Ftux, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (!this.props.disable) {
        this.init();
      } else {
        eventEmitter.trigger(events.END_FTUX);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (!this.props.disableKeydownListener) {
        window.removeEventListener("keydown", this.keydownHandler);
      }

      eventEmitter.off(events.INCREASE_STEP);
      eventEmitter.off(events.DECREASE_STEP);
      eventEmitter.off(events.END_FTUX);
      eventEmitter.off(events.UPDATE_FTUX);
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);

  return Ftux;
}(React.Component);

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  top: 4px;\n  right: 6px;\n  font-size: 16px;\n  cursor: pointer;\n  :hover {\n    color: #808080;\n  }\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  all: unset;\n  text-align: center;\n  margin: 4px;\n  width: 64px;\n  height: 32px;\n  background-color: #000;\n  border: solid 1px #fff;\n  border-radius: 5px;\n  color: #fff;\n  :hover {\n    cursor: pointer;\n    color: #808080;\n    border-color: #808080;\n  }\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  float: right;\n  padding-top: 10px;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  display: block;\n  padding: 10px;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  width: 0px;\n  height: 0px;\n  position: absolute;\n  &.above {\n    border-left: 8px solid transparent;\n    border-right: 8px solid transparent;\n    border-bottom: 16px solid ", ";\n    top: -16px;\n  }\n  &.below {\n    border-left: 8px solid transparent;\n    border-right: 8px solid transparent;\n    border-top: 16px solid ", ";\n    top: 100%;\n  }\n  &.left {\n    border-top: 8px solid transparent;\n    border-bottom: 8px solid transparent;\n    border-right: 16px solid ", ";\n    left: -16px;\n  }\n  &.right {\n    border-top: 8px solid transparent;\n    border-bottom: 8px solid transparent;\n    border-left: 16px solid ", ";\n    right: -16px;\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  padding: 20px;\n  position: absolute;\n  border-radius: 5px;\n  opacity: ", ";\n  transition: opacity 0.4s ease-in;\n  pointer-events: ", ";\n  top: ", "px;\n  left: ", "px;\n  bottom: ", "px;\n  right: ", "px;\n  background-color: ", ";\n  color: #fff;\n  width: 400px;\n  font-size: 14px;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  transform: scale(1);\n  position: relative;\n  z-index: ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
var TooltipWrapper = styled.div(_templateObject(), function (props) {
  return props.zIndex === undefined ? "auto" : props.zIndex;
});
var TooltipBody = styled.div(_templateObject2(), function (props) {
  return props.display;
}, function (props) {
  return props.display ? "auto" : "none";
}, function (props) {
  return props.tooltipSettings.offsetTop;
}, function (props) {
  return props.tooltipSettings.offsetLeft;
}, function (props) {
  return props.tooltipSettings.offsetBottom;
}, function (props) {
  return props.tooltipSettings.offsetRight;
}, function (props) {
  return props.tooltipSettings.backgroundColor;
});
var TooltipPointer = styled.div(_templateObject3(), function (props) {
  return props.backgroundColor;
}, function (props) {
  return props.backgroundColor;
}, function (props) {
  return props.backgroundColor;
}, function (props) {
  return props.backgroundColor;
});
var TooltipContent = styled.div(_templateObject4());
var TooltipButtons = styled.div(_templateObject5());
var TooltipButton = styled.button(_templateObject6());
var CloseButton = styled.span(_templateObject7());

var FtuxTooltip = /*#__PURE__*/function (_React$Component) {
  _inherits(FtuxTooltip, _React$Component);

  var _super = _createSuper(FtuxTooltip);

  function FtuxTooltip(props) {
    var _this;

    _classCallCheck(this, FtuxTooltip);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "triggerEndFtux", function () {
      eventEmitter.trigger(events.END_FTUX);
    });

    _defineProperty(_assertThisInitialized(_this), "triggerIncreaseStep", function () {
      eventEmitter.trigger(events.INCREASE_STEP);
    });

    _defineProperty(_assertThisInitialized(_this), "triggerDecreaseStep", function () {
      eventEmitter.trigger(events.DECREASE_STEP);
    });

    _defineProperty(_assertThisInitialized(_this), "initializeTooltip", function () {
      _this.tooltipSettings = {
        first: _this.props.step === 0,
        last: ftuxStore.ftuxProps && _this.props.step === ftuxStore.ftuxProps.total - 1,
        // Default values:
        prevLabel: "Prev",
        doneLabel: "Done",
        nextLabel: "Next",
        backgroundColor: "#000"
      };

      if (ftuxStore.ftuxProps.tooltipSettings) {
        // Override defaults:
        _this.tooltipSettings = Object.assign(_this.tooltipSettings, ftuxStore.ftuxProps.tooltipSettings);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "setPosition", function () {
      if (!_this.props.pointerDirection || _this.props.pointerDirection === "above") {
        _this.tooltipSettings.offsetTop = _this.tooltipRef.nextSibling.offsetHeight + 16 + (_this.props.offsetTop || 0);

        if (_this.props.offsetLeft) {
          _this.tooltipSettings.offsetLeft = _this.props.offsetLeft;
        }
      }

      if (_this.props.pointerDirection === "left") {
        _this.tooltipSettings.offsetLeft = _this.tooltipRef.nextSibling.offsetWidth + 16 + (_this.props.offsetLeft || 0);

        if (_this.props.offsetTop) {
          _this.tooltipSettings.offsetTop = _this.props.offsetTop;
        }
      }

      if (_this.props.pointerDirection === "below") {
        _this.tooltipSettings.offsetBottom = 16 + (-_this.props.offsetTop || 0);

        if (_this.props.offsetLeft) {
          _this.tooltipSettings.offsetLeft = _this.props.offsetLeft;
        }
      }

      if (_this.props.pointerDirection === "right") {
        _this.tooltipSettings.offsetRight = 16 + (-_this.props.offsetLeft || 0);

        if (_this.props.offsetTop) {
          _this.tooltipSettings.offsetTop = _this.props.offsetTop;
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "updateTooltipState", function (updatedFtuxStore) {
      if (_this.props.step === updatedFtuxStore.currentStep) {
        if (_this.props.scrollTo) {
          window.scrollTo(0, _this.tooltipRef.offsetTop);
        }

        if (_this.props.scrollToTop) {
          window.scrollTo(0, 0);
        }

        _this.setState({
          display: true
        });
      } else {
        _this.setState({
          display: false
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "setTooltipRef", function (element) {
      _this.tooltipRef = element;
    });

    _this.state = {
      display: false
    };

    _this.initializeTooltip();

    return _this;
  }

  _createClass(FtuxTooltip, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      eventEmitter.on(events.UPDATE_FTUX, function (updatedFtuxStore) {
        _this2.updateTooltipState(updatedFtuxStore);
      });
      eventEmitter.on(events.END_FTUX, function () {
        _this2.updateTooltipState({
          currentStep: null
        });
      });
      eventEmitter.trigger(events.UPDATE_FTUX, [ftuxStore]);
      this.setPosition();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      eventEmitter.off(events.END_FTUX);
      eventEmitter.off(events.UPDATE_FTUX);
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(TooltipWrapper, {
        ref: this.setTooltipRef,
        className: "ftux-tooltip ".concat(this.tooltipSettings.className ? this.tooltipSettings.className : ""),
        id: "ftux-id-".concat(this.props.step),
        zIndex: this.props.zIndex
      }, /*#__PURE__*/React.createElement(TooltipBody, {
        className: "ftux-tooltip-body",
        tooltipSettings: this.tooltipSettings,
        display: this.state.display ? 1 : 0
      }, this.props.pointerDirection ? /*#__PURE__*/React.createElement(TooltipPointer, {
        className: "ftux-tooltip-pointer ".concat(this.props.pointerDirection),
        backgroundColor: this.tooltipSettings.backgroundColor
      }) : /*#__PURE__*/React.createElement(TooltipPointer, {
        className: "ftux-tooltip-pointer above",
        backgroundColor: this.tooltipSettings.backgroundColor
      }), /*#__PURE__*/React.createElement(TooltipContent, {
        className: "ftux-tooltip-content"
      }, this.props.children), /*#__PURE__*/React.createElement(TooltipButtons, {
        className: "ftux-tooltip-buttons"
      }, !this.tooltipSettings.first && /*#__PURE__*/React.createElement(TooltipButton, {
        className: "ftux-tooltip-button ftux-tooltip-button-prev",
        buttonFontStyle: this.tooltipSettings.fontStyle,
        backgroundColor: this.tooltipSettings.backgroundColor,
        foregroundColor: this.tooltipSettings.foregroundColor,
        highlightColor: this.tooltipSettings.highlightColor,
        onClick: this.triggerDecreaseStep
      }, this.tooltipSettings.prevLabel), !this.tooltipSettings.last && /*#__PURE__*/React.createElement(TooltipButton, {
        className: "ftux-tooltip-button ftux-tooltip-button-next",
        buttonFontStyle: this.tooltipSettings.fontStyle,
        backgroundColor: this.tooltipSettings.backgroundColor,
        foregroundColor: this.tooltipSettings.foregroundColor,
        highlightColor: this.tooltipSettings.highlightColor,
        onClick: this.triggerIncreaseStep
      }, this.tooltipSettings.nextLabel), this.tooltipSettings.last && /*#__PURE__*/React.createElement(TooltipButton, {
        className: "ftux-tooltip-button ftux-tooltip-button-end",
        buttonFontStyle: this.tooltipSettings.fontStyle,
        backgroundColor: this.tooltipSettings.backgroundColor,
        foregroundColor: this.tooltipSettings.foregroundColor,
        highlightColor: this.tooltipSettings.highlightColor,
        onClick: this.triggerEndFtux
      }, this.tooltipSettings.doneLabel)), /*#__PURE__*/React.createElement(CloseButton, {
        className: "ftux-tooltip-close",
        highlightColor: this.tooltipSettings.highlightColor,
        onClick: this.triggerEndFtux
      }, "\u2715")));
    }
  }]);

  return FtuxTooltip;
}(React.Component);

exports.Ftux = Ftux;
exports.FtuxTooltip = FtuxTooltip;
