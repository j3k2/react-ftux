'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var ee = _interopDefault(require('wolfy87-eventemitter'));
var React = require('react');
var React__default = _interopDefault(React);
var ReactDOM = _interopDefault(require('react-dom'));
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

var events = {}; //Action events:

events.FTUX_ACTION_END = 'ftuxActionEnd';
events.FTUX_ACTION_INCREASE = 'ftuxActionIncrease';
events.FTUX_ACTION_DECREASE = 'ftuxActionDecrease'; //Updater events:

events.FTUX_UPDATER = 'ftuxUpdater';
var eventEmitter = new ee();
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
      ftuxStore.currentStep = nextStep;
      eventEmitter.trigger(events.FTUX_UPDATER, [ftuxStore]);
    };

    _this.decreaseStep = function () {
      var nextStep = ftuxStore.currentStep - 1 > 0 ? ftuxStore.currentStep - 1 : 0;
      ftuxStore.currentStep = nextStep;
      eventEmitter.trigger(events.FTUX_UPDATER, [ftuxStore]);
    };

    _this.keydownHandler = function (event) {
      if (event.key === 'ArrowLeft' || event.key === 'Backspace') {
        _this.decreaseStep();
      }

      if (event.key === 'ArrowRight' || event.key === 'Enter') {
        if (ftuxStore.currentStep < _this.props.total - 1) {
          _this.increaseStep();
        } else {
          eventEmitter.trigger(events.FTUX_ACTION_END);
        }
      }

      if (event.key === 'Escape') {
        eventEmitter.trigger(events.FTUX_ACTION_END);
      }
    };

    _this.init = function () {
      ftuxStore.ftuxProps = _this.props;
      ftuxStore.currentStep = 0;
      eventEmitter.trigger(events.FTUX_UPDATER, [ftuxStore]);

      if (!_this.props.tooltipSettings || !_this.props.tooltipSettings.disableKeydownListener) {
        window.addEventListener("keydown", _this.keydownHandler);
      }
    };

    return _this;
  }

  _createClass(ReactFtux, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      eventEmitter.on(events.FTUX_ACTION_INCREASE, function () {
        _this2.increaseStep();
      });
      eventEmitter.on(events.FTUX_ACTION_DECREASE, function () {
        _this2.decreaseStep();
      });
      eventEmitter.on(events.FTUX_ACTION_END, function () {
        if (_this2.props.ftuxEnd) {
          _this2.props.ftuxEnd();
        }

        if (!_this2.props.tooltipSettings || !_this2.props.tooltipSettings.disableKeydownListener) {
          window.removeEventListener("keydown", _this2.keydownHandler);
        }
      });
      eventEmitter.on(events.FTUX_UPDATER, function (ftuxStore$$1) {
        _this2.setState(ftuxStore$$1);
      });

      if (!this.props.disable) {
        this.init();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      eventEmitter.off(events.FTUX_ACTION_INCREASE);
      eventEmitter.off(events.FTUX_ACTION_DECREASE);
      eventEmitter.off(events.FTUX_ACTION_END);
      eventEmitter.off(events.FTUX_UPDATER);
    }
  }, {
    key: "render",
    value: function render() {
      return React__default.createElement("div", null);
    }
  }]);

  return ReactFtux;
}(React.Component);

function _templateObject9() {
  var data = _taggedTemplateLiteral(["\n  animation: ", " ", " ease-in;\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n  from {\n    opacity: 0;\n  }\n\n  to {\n    opacity: 1;\n  }\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n  border-top: 8px solid transparent; \n  border-bottom: 8px solid transparent;\n  border-left: 16px solid ", ";  \n  right: -16px;\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  border-top: 8px solid transparent; \n  border-bottom: 8px solid transparent;\n  border-right: 16px solid ", "; \n  left: -16px;\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  border-left: 8px solid transparent; \n  border-right: 8px solid transparent; \n  border-top: 16px solid ", ";\n  top: 100%;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  border-left: 8px solid transparent;\n  border-right: 8px solid transparent;\n  border-bottom: 16px solid ", ";\n  top: -16px;\n"]);

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
  var data = _taggedTemplateLiteral(["\n  font: initial;\n  line-height: initial;\n  font: ", ";\n  margin: 4px;\n  width: 64px;\n  height: 32px;\n  background-color: ", ";\n  border: solid 1px ", ";\n  border-radius: 5px;\n  color: ", ";\n  :hover{\n    cursor: pointer;\n    color: ", ";\n    border-color: ", ";\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  :hover{\n    cursor: pointer;\n    color: ", ";\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
var StyledAnchor = styled__default.span(_templateObject(), function (props) {
  return props.highlightColor || 'grey';
});
var StyledButton = styled__default.button(_templateObject2(), function (props) {
  return props.buttonFontStyle || '14px Lato, Helvetica, Arial, sans-serif';
}, function (props) {
  return props.backgroundColor || 'black';
}, function (props) {
  return props.foregroundColor || 'white';
}, function (props) {
  return props.foregroundColor || 'white';
}, function (props) {
  return props.highlightColor || 'grey';
}, function (props) {
  return props.highlightColor || 'grey';
});
var PointerBase = styled__default.div(_templateObject3());
var PointerAbove = styled__default(PointerBase)(_templateObject4(), function (props) {
  return props.backgroundColor || 'black';
});
var PointerBelow = styled__default(PointerBase)(_templateObject5(), function (props) {
  return props.backgroundColor || 'black';
});
var PointerLeft = styled__default(PointerBase)(_templateObject6(), function (props) {
  return props.backgroundColor || 'black';
});
var PointerRight = styled__default(PointerBase)(_templateObject7(), function (props) {
  return props.backgroundColor || 'black';
});
var opacityAnimation = styled.keyframes(_templateObject8());
var TooltipBody = styled__default.div(_templateObject9(), opacityAnimation, function (props) {
  return props.animationDuration || '.4s';
});

var ReactFtuxTooltip =
/*#__PURE__*/
function (_Component) {
  _inherits(ReactFtuxTooltip, _Component);

  function ReactFtuxTooltip(props) {
    var _this;

    _classCallCheck(this, ReactFtuxTooltip);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ReactFtuxTooltip).call(this, props));
    _this.state = {
      display: false,
      last: false,
      first: false,
      animationDuration: 0.4,
      triggerEndFtux: function triggerEndFtux() {
        eventEmitter.trigger(events.FTUX_ACTION_END);
      },
      triggerIncreaseStep: function triggerIncreaseStep() {
        eventEmitter.trigger(events.FTUX_ACTION_INCREASE);
      },
      triggerDecreaseStep: function triggerDecreaseStep() {
        eventEmitter.trigger(events.FTUX_ACTION_DECREASE);
      },
      style: {
        font: 'initial',
        lineHeight: 'initial',
        padding: 20,
        position: 'fixed',
        borderRadius: 5,
        display: 'block'
      }
    };
    return _this;
  }

  _createClass(ReactFtuxTooltip, [{
    key: "updateState",
    value: function updateState(ftuxStore$$1) {
      if (this.props.step === ftuxStore$$1.currentStep) {
        var tooltipRef = ReactDOM.findDOMNode(this.refs.tooltip);

        if (this.props.scrollTo) {
          window.scrollTo(0, tooltipRef.offsetTop);
        }

        if (this.props.scrollToTop) {
          window.scrollTo(0, 0);
        }

        if (!this.props.pointerDirection || this.props.pointerDirection === 'above') {
          this.setState({
            offsetTop: tooltipRef.nextSibling.offsetHeight + 16 + (this.props.offsetTop || 0)
          });

          if (this.props.offsetLeft) {
            this.setState({
              offsetLeft: this.props.offsetLeft
            });
          }
        }

        if (this.props.pointerDirection === 'left') {
          this.setState({
            offsetLeft: tooltipRef.nextSibling.offsetWidth + 16 + (this.props.offsetLeft || 0)
          });

          if (this.props.offsetTop) {
            this.setState({
              offsetTop: this.props.offsetTop
            });
          }
        }

        if (this.props.pointerDirection === 'below') {
          this.setState({
            offsetBottom: 16 + (-this.props.offsetTop || 0)
          });

          if (this.props.offsetLeft) {
            this.setState({
              offsetLeft: this.props.offsetLeft
            });
          }
        }

        if (this.props.pointerDirection === 'right') {
          this.setState({
            offsetRight: 16 + (-this.props.offsetLeft || 0)
          });

          if (this.props.offsetTop) {
            this.setState({
              offsetTop: this.props.offsetTop
            });
          }
        }

        if (ftuxStore$$1.ftuxProps && this.props.step === ftuxStore$$1.ftuxProps.total - 1) {
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
      } else {
        this.setState({
          display: false
        });
      }

      if (ftuxStore$$1.ftuxProps && ftuxStore$$1.ftuxProps.tooltipSettings) {
        if (ftuxStore$$1.ftuxProps.tooltipSettings.disableCloseButton) {
          this.setState({
            disableCloseButton: true
          });
        }

        if (ftuxStore$$1.ftuxProps.tooltipSettings.animationDuration) {
          this.setState({
            animationDuration: ftuxStore$$1.ftuxProps.tooltipSettings.animationDuration
          });
        }

        if (ftuxStore$$1.ftuxProps.tooltipSettings.backgroundColor) {
          this.setState({
            backgroundColor: ftuxStore$$1.ftuxProps.tooltipSettings.backgroundColor
          });
        }

        if (ftuxStore$$1.ftuxProps.tooltipSettings.foregroundColor) {
          this.setState({
            foregroundColor: ftuxStore$$1.ftuxProps.tooltipSettings.foregroundColor
          });
        }

        if (ftuxStore$$1.ftuxProps.tooltipSettings.highlightColor) {
          this.setState({
            highlightColor: ftuxStore$$1.ftuxProps.tooltipSettings.highlightColor
          });
        }

        if (ftuxStore$$1.ftuxProps.tooltipSettings.fontStyle) {
          this.setState({
            fontStyle: ftuxStore$$1.ftuxProps.tooltipSettings.fontStyle
          });
        }

        if (ftuxStore$$1.ftuxProps.tooltipSettings.tooltipWidth) {
          this.setState({
            tooltipWidth: ftuxStore$$1.ftuxProps.tooltipSettings.tooltipWidth
          });
        }

        if (ftuxStore$$1.ftuxProps.tooltipSettings.nextLabel) {
          this.setState({
            nextLabel: ftuxStore$$1.ftuxProps.tooltipSettings.nextLabel
          });
        }

        if (ftuxStore$$1.ftuxProps.tooltipSettings.prevLabel) {
          this.setState({
            prevLabel: ftuxStore$$1.ftuxProps.tooltipSettings.prevLabel
          });
        }

        if (ftuxStore$$1.ftuxProps.tooltipSettings.doneLabel) {
          this.setState({
            doneLabel: ftuxStore$$1.ftuxProps.tooltipSettings.doneLabel
          });
        }
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      eventEmitter.on(events.FTUX_UPDATER, function (ftuxStore$$1) {
        _this2.updateState(ftuxStore$$1);
      });
      eventEmitter.on(events.FTUX_ACTION_END, function () {
        _this2.updateState({
          currentStep: null
        });
      });
      eventEmitter.trigger(events.FTUX_UPDATER, [ftuxStore]);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      eventEmitter.off(events.FTUX_ACTION_END);
      eventEmitter.off(events.FTUX_UPDATER);
    }
  }, {
    key: "render",
    value: function render() {
      var nav;

      if (this.state.last) {
        nav = React__default.createElement("div", null, React__default.createElement(StyledButton, {
          buttonFontStyle: this.state.fontStyle,
          backgroundColor: this.state.backgroundColor,
          foregroundColor: this.state.foregroundColor,
          highlightColor: this.state.highlightColor,
          onClick: this.state.triggerDecreaseStep
        }, this.state.prevLabel || 'Prev'), React__default.createElement(StyledButton, {
          buttonFontStyle: this.state.fontStyle,
          backgroundColor: this.state.backgroundColor,
          foregroundColor: this.state.foregroundColor,
          highlightColor: this.state.highlightColor,
          onClick: this.state.triggerEndFtux
        }, this.state.doneLabel || 'Done'));
      } else {
        nav = React__default.createElement("div", null, !this.state.first && React__default.createElement(StyledButton, {
          buttonFontStyle: this.state.fontStyle,
          backgroundColor: this.state.backgroundColor,
          foregroundColor: this.state.foregroundColor,
          highlightColor: this.state.highlightColor,
          onClick: this.state.triggerDecreaseStep
        }, this.state.prevLabel || 'Prev'), React__default.createElement(StyledButton, {
          buttonFontStyle: this.state.fontStyle,
          backgroundColor: this.state.backgroundColor,
          foregroundColor: this.state.foregroundColor,
          highlightColor: this.state.highlightColor,
          onClick: this.state.triggerIncreaseStep
        }, this.state.nextLabel || 'Next'));
      }

      var pointer = React__default.createElement("div", null, this.props.pointerDirection === 'above' ? React__default.createElement(PointerAbove, {
        backgroundColor: this.state.backgroundColor
      }) : null, this.props.pointerDirection === 'below' ? React__default.createElement(PointerBelow, {
        backgroundColor: this.state.backgroundColor
      }) : null, this.props.pointerDirection === 'left' ? React__default.createElement(PointerLeft, {
        backgroundColor: this.state.backgroundColor
      }) : null, this.props.pointerDirection === 'right' ? React__default.createElement(PointerRight, {
        backgroundColor: this.state.backgroundColor
      }) : null, !this.props.pointerDirection ? React__default.createElement(PointerAbove, {
        backgroundColor: this.state.backgroundColor
      }) : null);
      return React__default.createElement("div", {
        ref: "tooltip",
        style: {
          transform: 'scale(1)',
          'zIndex': this.props.zIndex === undefined ? 999 : this.props.zIndex
        }
      }, this.state.display && React__default.createElement(TooltipBody, {
        animationDuration: this.state.animationDuration + 's',
        style: Object.assign({}, this.state.style, {
          pointerEvents: this.state.display ? 'auto' : 'none',
          top: this.state.offsetTop || null,
          left: this.state.offsetLeft || null,
          bottom: this.state.offsetBottom || null,
          right: this.state.offsetRight || null,
          backgroundColor: this.state.backgroundColor || 'black',
          color: this.state.foregroundColor || 'white',
          font: this.state.fontStyle || '14px Lato, Helvetica, Arial, sans-serif',
          width: this.state.tooltipWidth || 400,
          minWidth: this.state.tooltipWidth || 400
        })
      }, pointer, React__default.createElement("div", {
        style: {
          display: 'block',
          padding: 10
        }
      }, this.props.children), React__default.createElement(StyledAnchor, {
        style: {
          position: 'absolute',
          top: 4,
          right: 6,
          fontSize: 24,
          font: 'initial',
          lineHeight: 'initial',
          display: this.state.disableCloseButton ? 'none' : null
        },
        highlightColor: this.state.highlightColor,
        onClick: this.state.triggerEndFtux
      }, "\u2715"), React__default.createElement("div", {
        style: {
          "float": 'right',
          'paddingTop': 10
        }
      }, nav)));
    }
  }]);

  return ReactFtuxTooltip;
}(React.Component);

exports.ReactFtux = ReactFtux;
exports.ReactFtuxTooltip = ReactFtuxTooltip;
