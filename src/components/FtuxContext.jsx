import React from "react";

const FtuxContext = React.createContext();

function FtuxProvider(props) {
  const [tooltipProperties, setTooltipProperties] = React.useState();
  const [ftuxStep, setFtuxStep] = React.useState(null);

  const ftuxTotalSteps = props.total;

  const keydownHandler = React.useCallback((event) => {
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

  const increaseStep = () => {
    setFtuxStep((ftuxStep) => {
      const nextStep = ftuxStep + 1;
      if (nextStep === ftuxTotalSteps) {
        endFtux();
      }
      return nextStep;
    });
  };

  const decreaseStep = () => {
    setFtuxStep((ftuxStep) => {
      const nextStep = ftuxStep - 1 > 0 ? ftuxStep - 1 : 0;
      return nextStep;
    });
  };

  const init = () => {
    setFtuxStep(0);
  };

  const endFtux = () => {
    setFtuxStep(null);
    if (!props.disableKeydownListener) {
      window.removeEventListener("keydown", keydownHandler, true);
    }
    if (props.onFtuxEnd) {
      props.onFtuxEnd();
    }
  };

  React.useEffect(() => {
    setTooltipProperties(props.tooltipProperties);
    if (!props.disableKeydownListener) {
      window.addEventListener("keydown", keydownHandler, true);
    }
    if (!props.disable) {
      init();
    } else {
      endFtux();
    }

    return () => {
      if (!props.disableKeydownListener) {
        window.removeEventListener("keydown", keydownHandler, true);
      }
    };
  }, [props]);

  return (
    <FtuxContext.Provider
      value={{
        tooltipProperties,
        increaseStep,
        decreaseStep,
        endFtux,
        ftuxStep,
        ftuxTotalSteps,
      }}
    >
      {props.children}
    </FtuxContext.Provider>
  );
}

const useFtuxContext = () => React.useContext(FtuxContext);

export default FtuxContext;

export { FtuxProvider, useFtuxContext };
