import React from "react";
import Banner from "./components/Banner";
import "./App.css";

class App extends React.Component {
  state = {
    currentClass: "closed"
  };
  open = () => {
    console.log("open");
    this.setState({
      currentClass: "opened"
    });
  };
  close = () => {
    this.setState({
      currentClass: "closed"
    });
  };
  toggle = () => {
    const { currentClass } = this.state;
    if (currentClass === "closed") {
      this.setState({
        currentClass: "opened"
      });
    } else if (currentClass === "opened") {
      this.setState({
        currentClass: "closed"
      });
    }
  };
  render() {
    const reqs = {
      openAtStart: false,
      autoToggle: false,
      button: {
        closeText: "收合",
        openText: "展開",
        class: "btn"
      },
      class: {
        closed: "closed",
        closing: "closing",
        opened: "opened",
        opening: "opening"
      },
      transition: true,
      whenTransition() {
        console.log("whenTransition");
      }
    };
    return (
      <React.Fragment>
        <Banner reqs={reqs} currentClass={this.state.currentClass} />
      </React.Fragment>
    );
  }
}

export default App;
