import React from "react";
import Banner from "./components/Banner";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openAtStart: false,
      autoToggle: true,
      button: {
        closeText: "OPEN",
        openText: "CLOSE",
        class: "BTN"
      },
      className: {
        closed: "closed",
        closing: "closing",
        opened: "opened",
        opening: "opening"
      },
      transition: true,
      whenTransition() {
        console.log("Don't bother me, I am transitioning.");
      }
    };
  }
  render() {
    const {
      openAtStart,
      autoToggle,
      button,
      className,
      transition,
      whenTransition
    } = this.state;
    return (
      <React.Fragment>
        <Banner
          openAtStart={openAtStart}
          autoToggle={autoToggle}
          button={button}
          className={className}
          transition={transition}
          whenTransition={whenTransition}
        />
      </React.Fragment>
    );
  }
}

export default App;
