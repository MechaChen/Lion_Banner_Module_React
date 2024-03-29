import React from "react";

class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.autoToggle = this.autoToggle.bind(this);
    this.bannerAnima = this.bannerAnima.bind(this);
    this.changeImgHeight = this.changeImgHeight.bind(this);
    this.controlClass = this.controlClass.bind(this);
    this.state = {
      btnText: "收合",
      currentClass: "closed",
      isClose: false
    };
  }
  autoToggle() {
    const { autoToggle } = this.props;
    const { bannerAnima } = this;
    if (autoToggle) {
      if (typeof autoToggle == "number") setInterval(bannerAnima, autoToggle);
      else {
        const timer = setInterval(bannerAnima, 3000);
        setTimeout(() => clearInterval(timer), 3000);
      }
    }
  }
  bannerAnima() {
    const {
      button: btnOpts,
      transition: isTransition,
      class: classStates,
      whenTransition
    } = this.props;
    const { currentClass } = this.state;
    let { btnText } = this.state;
    const { controlClass, changeImgHeight } = this;

    // 判斷 class 是否在已完成的狀態，ex : opened、closed
    if (/opened|closed/.test(currentClass)) {
      if (/opened/.test(currentClass)) {
        this.setState({ currentClass: classStates.closed });
      } else {
        this.setState({ currentClass: classStates.opened });
      }
      // 利用按鈕文字決定是否展開或收合
      if (btnText === btnOpts.closeText) {
        this.setState({ btnText: btnOpts.openText });
        // btnText = btnOpts.openText;
        // 檢查是否有 transition
        if (isTransition) {
          // 更改 class 名稱為 closing
          controlClass.call(this, classStates.closing);
          // 設定計時器
          const timer = setInterval(whenTransition, 2000 / 30);
          // 兩秒後，
          // 1. 改圖高度
          // 2.class 名稱改 closed
          // 3.清除計時器
          setTimeout(function() {
            changeImgHeight();
            controlClass(classStates.closed);
            clearInterval(timer);
          }, 2000);
        } else {
          // 立即將
          // 1. class 改為 closed
          // 2. 圖片高度下降
          controlClass(classStates.closed);
          changeImgHeight();
        }
      } else {
        this.setState({ btnText: btnOpts.closeText });
        btnText = btnOpts.closeText;
        changeImgHeight();
        if (isTransition) {
          controlClass(classStates.opening);
          const timer = setInterval(whenTransition, 2000 / 30);
          setTimeout(function() {
            controlClass(classStates.opened);
            clearInterval(timer);
          }, 2000);
        } else {
          controlClass(classStates.opened);
        }
      }
    }
  }

  changeImgHeight() {
    const { isClose } = this.state;
    this.setState({ isClose: !isClose });
  }

  controlClass(className) {
    this.setState({ currentClass: className });
  }

  componentDidMount() {
    const { button: btnOpts, class: classStates, openAtStart } = this.props;
    const { autoToggle, changeImgHeight } = this;

    autoToggle();

    if (openAtStart) {
      this.setState({
        btnText: btnOpts.closeText,
        currentClass: classStates.opened
      });
    } else {
      this.setState({
        btnText: btnOpts.openText,
        currentClass: classStates.closed
      });
      changeImgHeight();
    }
  }

  componentDidUpdate() {
    const { currentClass } = this.state;
    const { bannerAnima } = this;
    window.banner = {
      toggle: this.bannerAnima
    };
    window.banner.open = () => {
      if (currentClass === "closed") {
        bannerAnima();
      }
    };
    window.banner.close = () => {
      if (currentClass === "opened") {
        bannerAnima();
      }
    };
  }

  render() {
    const { isClose, btnText } = this.state;
    const { transition } = this.props;
    const { currentClass } = this.state;
    const { bannerAnima } = this;
    return (
      <div className={`banner ${currentClass} ${transition && "transition"}`}>
        <a className="wrap" href="ignoreit:">
          <img
            className={`img ${isClose && "transform"}`}
            src="./1200x380.png"
            title="輸入廣告促銷說明文字"
            alt="輸入廣告促銷說明文字"
          />
        </a>
        <div onClick={bannerAnima} className={`btn ${this.props.class}`}>
          {btnText}
        </div>
      </div>
    );
  }
}

Banner.defaultProps = {
  openAtStart: true,
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

export default Banner;
