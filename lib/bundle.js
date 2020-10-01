'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var styled = _interopDefault(require('styled-components'));

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

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
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

function _readOnlyError(name) {
  throw new Error("\"" + name + "\" is read-only");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var FtuxContext = React.createContext();

function FtuxProvider(props) {
  var _React$useState = React.useState(),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      tooltipProperties = _React$useState2[0],
      setTooltipProperties = _React$useState2[1];

  var _React$useState3 = React.useState(null),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      ftuxStep = _React$useState4[0],
      setFtuxStep = _React$useState4[1];

  var ftuxTotalSteps = props.total;
  var keydownHandler = React.useCallback(function (event) {
    if (event.key === "ArrowLeft" || event.key === "Backspace") {
      decreaseStep();
    }

    if (event.key === "ArrowRight" || event.key === "Enter") {
      increaseStep();
    }

    if (event.key === "Escape") {
      endFtux();
    }
  }, []);

  var increaseStep = function increaseStep() {
    setFtuxStep(function (ftuxStep) {
      var nextStep = ftuxStep + 1;

      if (nextStep === ftuxTotalSteps) {
        endFtux();
      }

      return nextStep;
    });
  };

  var decreaseStep = function decreaseStep() {
    setFtuxStep(function (ftuxStep) {
      var nextStep = ftuxStep - 1 > 0 ? ftuxStep - 1 : 0;
      return nextStep;
    });
  };

  var init = function init() {
    setFtuxStep(0);
  };

  var endFtux = function endFtux() {
    setFtuxStep(null);

    if (!props.disableKeydownListener) {
      window.removeEventListener("keydown", keydownHandler, true);
    }

    if (props.onFtuxEnd) {
      props.onFtuxEnd();
    }
  };

  React.useEffect(function () {
    setTooltipProperties(props.tooltipProperties);

    if (!props.disableKeydownListener) {
      window.addEventListener("keydown", keydownHandler, true);
    }

    if (!props.disable) {
      init();
    } else {
      endFtux();
    }

    return function () {
      if (!props.disableKeydownListener) {
        window.removeEventListener("keydown", keydownHandler, true);
      }
    };
  }, [props]);
  return /*#__PURE__*/React.createElement(FtuxContext.Provider, {
    value: {
      tooltipProperties: tooltipProperties,
      increaseStep: increaseStep,
      decreaseStep: decreaseStep,
      endFtux: endFtux,
      ftuxStep: ftuxStep,
      ftuxTotalSteps: ftuxTotalSteps
    }
  }, props.children);
}

var useFtuxContext = function useFtuxContext() {
  return React.useContext(FtuxContext);
};

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n  all: unset;\n  position: absolute;\n  top: 4px;\n  right: 6px;\n  font-size: 16px;\n  cursor: pointer;\n  color: #fff;\n  :hover {\n    color: #808080;\n  }\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  all: unset;\n  text-align: center;\n  margin: 4px;\n  width: 64px;\n  height: 32px;\n  font-size: 14px;\n  border: solid 1px #fff;\n  border-radius: 5px;\n  color: #fff;\n  cursor: pointer;\n  :hover {\n    color: #808080;\n    border-color: #808080;\n  }\n"]);

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
  var data = _taggedTemplateLiteral(["\n  padding: 20px;\n  position: absolute;\n  border-radius: 5px;\n  opacity: ", ";\n  transition: opacity 0.4s ease-in;\n  pointer-events: ", ";\n  top: ", "px;\n  left: ", "px;\n  bottom: ", "px;\n  right: ", "px;\n  background-color: ", ";\n  width: 400px;\n"]);

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
  return props.offsets ? props.offsets.offsetTop : "";
}, function (props) {
  return props.offsets ? props.offsets.offsetLeft : "";
}, function (props) {
  return props.offsets ? props.offsets.offsetBottom : "";
}, function (props) {
  return props.offsets ? props.offsets.offsetRight : "";
}, function (props) {
  return props.backgroundColor;
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
var CloseButton = styled.button(_templateObject7());

function FtuxTooltip(props) {
  var _useFtuxContext = useFtuxContext(),
      tooltipProperties = _useFtuxContext.tooltipProperties,
      increaseStep = _useFtuxContext.increaseStep,
      decreaseStep = _useFtuxContext.decreaseStep,
      endFtux = _useFtuxContext.endFtux,
      ftuxStep = _useFtuxContext.ftuxStep,
      ftuxTotalSteps = _useFtuxContext.ftuxTotalSteps;

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      displayTooltip = _React$useState2[0],
      setDisplayTooltip = _React$useState2[1];

  var _React$useState3 = React.useState(),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      offsets = _React$useState4[0],
      setOffsets = _React$useState4[1];

  var ref = React.useRef();

  var setPosition = function setPosition() {
    var temp = {};

    if (!props.pointerDirection || props.pointerDirection === "above") {
      temp.offsetTop = ref.current.nextSibling.offsetHeight + 16 + (props.offsetTop || 0);

      if (props.offsetLeft) {
        temp.offsetLeft = props.offsetLeft;
      }
    }

    if (props.pointerDirection === "left") {
      temp.offsetLeft = ref.current.nextSibling.offsetWidth + 16 + (props.offsetLeft || 0);

      if (props.offsetTop) {
        temp.offsetTop = props.offsetTop;
      }
    }

    if (props.pointerDirection === "below") {
      temp.offsetBottom = 16 + (-props.offsetTop || 0);

      if (props.offsetLeft) {
        temp.offsetLeft = props.offsetLeft;
      }
    }

    if (props.pointerDirection === "right") {
      temp.offsetRight = 16 + (-props.offsetLeft || 0);

      if (props.offsetTop) {
        temp.offsetTop = props.offsetTop;
      }
    }

    setOffsets(temp);
  };

  React.useEffect(function () {
    if (props.step === ftuxStep) {
      if (props.scrollTo) {
        window.scrollTo(0, ref.current.offsetTop);
      }

      if (props.scrollToTop) {
        window.scrollTo(0, 0);
      }

      setDisplayTooltip(true);
    } else {
      setDisplayTooltip(false);
    }
  }, [ftuxStep, props.step, props.scrollTo, props.scrollToTop]);
  var tooltipSettings = {
    first: props.step === 0,
    last: props.step === ftuxTotalSteps - 1,
    // Default values:
    prevLabel: "Prev",
    doneLabel: "Done",
    nextLabel: "Next",
    backgroundColor: "#000"
  };

  var initializeTooltip = function initializeTooltip() {
    if (!props.step && props.step !== 0 || typeof props.step !== "number" || props.step > ftuxTotalSteps - 1 || props.step < 0) {
      console.error("react-ftux error: FtuxTooltip requires a valid value for its 'step' prop.");
    }

    if (tooltipProperties) {
      tooltipSettings = (_readOnlyError("tooltipSettings"), _objectSpread2(_objectSpread2({}, tooltipSettings), tooltipProperties));
    }

    setPosition();
  };

  React.useEffect(initializeTooltip, [props.step]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TooltipWrapper, {
    ref: ref,
    className: "ftux-tooltip ".concat(tooltipSettings.className ? tooltipSettings.className : ""),
    id: "ftux-id-".concat(props.step),
    zIndex: props.zIndex
  }, /*#__PURE__*/React.createElement(TooltipBody, {
    className: "ftux-tooltip-body",
    backgroundColor: tooltipSettings.backgroundColor,
    offsets: offsets,
    display: displayTooltip ? 1 : 0
  }, props.pointerDirection ? /*#__PURE__*/React.createElement(TooltipPointer, {
    className: "ftux-tooltip-pointer ".concat(props.pointerDirection),
    backgroundColor: tooltipSettings.backgroundColor
  }) : /*#__PURE__*/React.createElement(TooltipPointer, {
    className: "ftux-tooltip-pointer above",
    backgroundColor: tooltipSettings.backgroundColor
  }), /*#__PURE__*/React.createElement(TooltipContent, {
    className: "ftux-tooltip-content"
  }, props.content && props.content()), /*#__PURE__*/React.createElement(TooltipButtons, {
    className: "ftux-tooltip-buttons"
  }, !tooltipSettings.first && /*#__PURE__*/React.createElement(TooltipButton, {
    className: "ftux-tooltip-button ftux-tooltip-button-prev",
    onClick: decreaseStep
  }, tooltipSettings.prevLabel), !tooltipSettings.last && /*#__PURE__*/React.createElement(TooltipButton, {
    className: "ftux-tooltip-button ftux-tooltip-button-next",
    onClick: increaseStep
  }, tooltipSettings.nextLabel), tooltipSettings.last && /*#__PURE__*/React.createElement(TooltipButton, {
    className: "ftux-tooltip-button ftux-tooltip-button-end",
    onClick: endFtux
  }, tooltipSettings.doneLabel)), /*#__PURE__*/React.createElement(CloseButton, {
    className: "ftux-tooltip-close",
    highlightColor: tooltipSettings.highlightColor,
    onClick: endFtux
  }, "\u2715"))), props.children);
}

exports.FtuxProvider = FtuxProvider;
exports.FtuxTooltip = FtuxTooltip;
