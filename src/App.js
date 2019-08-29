import React from "react";
import Banner from "./components/Banner";
import "./App.css";

class App extends React.Component {
  render() {
    const reqs = {
      openAtStart: false,
      autoToggle: true,
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
        <Banner reqs={reqs} />
      </React.Fragment>
    );
  }
}

export default App;
