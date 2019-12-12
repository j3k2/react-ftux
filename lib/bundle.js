'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var ee = _interopDefault(require('wolfy87-eventemitter'));
var React = _interopDefault(require('react'));
var styled = require('styled-components');
var styled__default = _interopDefault(styled);

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

var ReactFtux =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ReactFtux, _React$Component);

  function ReactFtux(props) {
    var _this;

    _classCallCheck(this, ReactFtux);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ReactFtux).call(this, props));

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
      if (event.key === 'ArrowLeft' || event.key === 'Backspace') {
        _this.decreaseStep();
      }

      if (event.key === 'ArrowRight' || event.key === 'Enter') {
        if (ftuxStore.currentStep < _this.props.total - 1) {
          _this.increaseStep();
        } else {
          eventEmitter.trigger(events.END_FTUX);
        }
      }

      if (event.key === 'Escape') {
        eventEmitter.trigger(events.END_FTUX);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "init", function () {
      ftuxStore.currentStep = 0;
      eventEmitter.trigger(events.UPDATE_FTUX, [ftuxStore]);
    });

    ftuxStore.ftuxProps = props;

    if (!_this.props.tooltipSettings || !_this.props.tooltipSettings.disableKeydownListener) {
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
      }
    });

    if (!_this.props.disable) {
      _this.init();
    }

    return _this;
  }

  _createClass(ReactFtux, [{
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
      if (!this.props.tooltipSettings || !this.props.tooltipSettings.disableKeydownListener) {
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

  return ReactFtux;
}(React.Component);

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  border-top: 8px solid transparent; \n  border-bottom: 8px solid transparent;\n  border-left: 16px solid ", ";  \n  right: -16px;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  border-top: 8px solid transparent; \n  border-bottom: 8px solid transparent;\n  border-right: 16px solid ", "; \n  left: -16px;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  border-left: 8px solid transparent; \n  border-right: 8px solid transparent; \n  border-top: 16px solid ", ";\n  top: 100%;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  border-left: 8px solid transparent;\n  border-right: 8px solid transparent;\n  border-bottom: 16px solid ", ";\n  top: -16px;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  width: 0px;\n  height: 0px;\n  position: absolute;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
var PointerBase = styled__default.div(_templateObject());
var PointerAbove = styled__default(PointerBase)(_templateObject2(), function (props) {
  return props.backgroundColor;
});
var PointerBelow = styled__default(PointerBase)(_templateObject3(), function (props) {
  return props.backgroundColor;
});
var PointerLeft = styled__default(PointerBase)(_templateObject4(), function (props) {
  return props.backgroundColor;
});
var PointerRight = styled__default(PointerBase)(_templateObject5(), function (props) {
  return props.backgroundColor;
});
function TooltipPointer (props) {
  return React.createElement(React.Fragment, null, props.pointerDirection === 'above' ? React.createElement(PointerAbove, {
    backgroundColor: props.backgroundColor
  }) : null, props.pointerDirection === 'below' ? React.createElement(PointerBelow, {
    backgroundColor: props.backgroundColor
  }) : null, props.pointerDirection === 'left' ? React.createElement(PointerLeft, {
    backgroundColor: props.backgroundColor
  }) : null, props.pointerDirection === 'right' ? React.createElement(PointerRight, {
    backgroundColor: props.backgroundColor
  }) : null, !props.pointerDirection ? React.createElement(PointerAbove, {
    backgroundColor: props.backgroundColor
  }) : null);
}

function _templateObject$1() {
  var data = _taggedTemplateLiteral(["\n  font: ", ";\n  margin: 4px;\n  width: 64px;\n  height: 32px;\n  background-color: ", ";\n  border: solid 1px ", ";\n  border-radius: 5px;\n  color: ", ";\n  :hover{\n    cursor: pointer;\n    color: ", ";\n    border-color: ", ";\n  }\n"]);

  _templateObject$1 = function _templateObject() {
    return data;
  };

  return data;
}
var StyledButton = styled__default.button(_templateObject$1(), function (props) {
  return props.buttonFontStyle;
}, function (props) {
  return props.backgroundColor;
}, function (props) {
  return props.foregroundColor;
}, function (props) {
  return props.foregroundColor;
}, function (props) {
  return props.highlightColor;
}, function (props) {
  return props.highlightColor;
});
function TooltipButtons (props) {
  return React.createElement("div", {
    style: {
      "float": 'right',
      'paddingTop': 10
    }
  }, !props.tooltipSettings.first && React.createElement(StyledButton, {
    buttonFontStyle: props.tooltipSettings.fontStyle,
    backgroundColor: props.tooltipSettings.backgroundColor,
    foregroundColor: props.tooltipSettings.foregroundColor,
    highlightColor: props.tooltipSettings.highlightColor,
    onClick: props.decreaseStep
  }, props.tooltipSettings.prevLabel), !props.tooltipSettings.last && React.createElement(StyledButton, {
    buttonFontStyle: props.tooltipSettings.fontStyle,
    backgroundColor: props.tooltipSettings.backgroundColor,
    foregroundColor: props.tooltipSettings.foregroundColor,
    highlightColor: props.tooltipSettings.highlightColor,
    onClick: props.increaseStep
  }, props.tooltipSettings.nextLabel), props.tooltipSettings.last && React.createElement(StyledButton, {
    buttonFontStyle: props.tooltipSettings.fontStyle,
    backgroundColor: props.tooltipSettings.backgroundColor,
    foregroundColor: props.tooltipSettings.foregroundColor,
    highlightColor: props.tooltipSettings.highlightColor,
    onClick: props.endFtux
  }, props.tooltipSettings.doneLabel));
}

function _templateObject3$1() {
  var data = _taggedTemplateLiteral(["\n  all: initial;\n  padding: 20px;\n  position: fixed;\n  border-radius: 5px;\n  display: block;\n  animation: ", " ", " ease-in;\n"]);

  _templateObject3$1 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$1() {
  var data = _taggedTemplateLiteral(["\n  from {\n    opacity: 0;\n  }\n\n  to {\n    opacity: 1;\n  }\n"]);

  _templateObject2$1 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$2() {
  var data = _taggedTemplateLiteral(["\n  :hover{\n    cursor: pointer;\n    color: ", ";\n  }\n"]);

  _templateObject$2 = function _templateObject() {
    return data;
  };

  return data;
}
var CloseButton = styled__default.span(_templateObject$2(), function (props) {
  return props.highlightColor;
});
var opacityAnimation = styled.keyframes(_templateObject2$1());
var StyledTooltipBody = styled__default.div(_templateObject3$1(), opacityAnimation, function (props) {
  return props.animationDuration;
});
function TooltipBody (props) {
  return React.createElement(StyledTooltipBody, {
    animationDuration: props.tooltipSettings.animationDuration + 's',
    style: Object.assign({}, props.tooltipSettings.style, {
      pointerEvents: props.display ? 'auto' : 'none',
      top: props.tooltipSettings.offsetTop,
      left: props.tooltipSettings.offsetLeft,
      bottom: props.tooltipSettings.offsetBottom,
      right: props.tooltipSettings.offsetRight,
      backgroundColor: props.tooltipSettings.backgroundColor,
      color: props.tooltipSettings.foregroundColor,
      font: props.tooltipSettings.fontStyle,
      width: props.tooltipSettings.tooltipWidth,
      minWidth: props.tooltipSettings.tooltipWidth
    })
  }, props.children, React.createElement(CloseButton, {
    style: {
      position: 'absolute',
      top: 4,
      right: 6,
      fontSize: 16,
      display: props.tooltipSettings.disableCloseButton ? 'none' : null
    },
    highlightColor: props.tooltipSettings.highlightColor,
    onClick: props.endFtux
  }, "\u2715"));
}

var ReactFtuxTooltip =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ReactFtuxTooltip, _React$Component);

  function ReactFtuxTooltip(props) {
    var _this;

    _classCallCheck(this, ReactFtuxTooltip);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ReactFtuxTooltip).call(this, props));

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
        prevLabel: 'Prev',
        doneLabel: 'Done',
        nextLabel: 'Next',
        animationDuration: 0.4,
        tooltipWidth: 400,
        backgroundColor: 'black',
        foregroundColor: 'white',
        highlightColor: 'grey',
        fontStyle: '14px Lato, Helvetica, Arial, sans-serif'
      };

      if (ftuxStore.ftuxProps.tooltipSettings) {
        // Override defaults:
        _this.tooltipSettings = Object.assign(_this.tooltipSettings, ftuxStore.ftuxProps.tooltipSettings);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "setPosition", function () {
      if (!_this.props.pointerDirection || _this.props.pointerDirection === 'above') {
        _this.tooltipSettings.offsetTop = _this.tooltipRef.nextSibling.offsetHeight + 16 + (_this.props.offsetTop || 0);

        if (_this.props.offsetLeft) {
          _this.tooltipSettings.offsetLeft = _this.props.offsetLeft;
        }
      }

      if (_this.props.pointerDirection === 'left') {
        _this.tooltipSettings.offsetLeft = _this.tooltipRef.nextSibling.offsetWidth + 16 + (_this.props.offsetLeft || 0);

        if (_this.props.offsetTop) {
          _this.tooltipSettings.offsetTop = _this.props.offsetTop;
        }
      }

      if (_this.props.pointerDirection === 'below') {
        _this.tooltipSettings.offsetBottom = 16 + (-_this.props.offsetTop || 0);

        if (_this.props.offsetLeft) {
          _this.tooltipSettings.offsetLeft = _this.props.offsetLeft;
        }
      }

      if (_this.props.pointerDirection === 'right') {
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

  _createClass(ReactFtuxTooltip, [{
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
      return React.createElement("div", {
        ref: this.setTooltipRef,
        style: {
          transform: 'scale(1)',
          zIndex: this.props.zIndex === undefined ? 'auto' : this.props.zIndex
        }
      }, this.state.display && React.createElement(TooltipBody, {
        tooltipSettings: this.tooltipSettings,
        display: this.state.display,
        endFtux: this.triggerEndFtux
      }, React.createElement(TooltipPointer, {
        pointerDirection: this.props.pointerDirection,
        backgroundColor: this.tooltipSettings.backgroundColor
      }), React.createElement("div", {
        style: {
          display: 'block',
          padding: 10
        }
      }, this.props.children), React.createElement(TooltipButtons, {
        tooltipSettings: this.tooltipSettings,
        increaseStep: this.triggerIncreaseStep,
        decreaseStep: this.triggerDecreaseStep,
        endFtux: this.triggerEndFtux
      })));
    }
  }]);

  return ReactFtuxTooltip;
}(React.Component);

exports.ReactFtux = ReactFtux;
exports.ReactFtuxTooltip = ReactFtuxTooltip;
