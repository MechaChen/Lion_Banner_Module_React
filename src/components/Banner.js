import React from "react";

class Banner extends React.Component {
  state = {
    btnText: "收合",
    currentClass: this.props.currentClass,
    isClose: false
  };
  autoToggle = () => {
    const { autoToggle } = this.props.reqs;
    const { bannerAnima } = this;
    if (autoToggle) {
      if (typeof autoToggle == "number") setInterval(bannerAnima, autoToggle);
      else setInterval(bannerAnima, 3000);
    }
  };
  bannerAnima = () => {
    const {
      button: btnOpts,
      transition: isTransition,
      class: classStates,
      whenTransition
    } = this.props.reqs;
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
  };

  changeImgHeight = () => {
    const { isClose } = this.state;
    this.setState({ isClose: !isClose });
  };

  controlClass = className => {
    this.setState({ currentClass: className });
  };

  componentDidMount() {
    const {
      button: btnOpts,
      class: classStates,
      openAtStart
    } = this.props.reqs;
    const { autoToggle, changeImgHeight } = this;

    window.banner = {
      toggle: this.bannerAnima
    };

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
    const { transition } = this.props.reqs;
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
        <div onClick={bannerAnima} className={`btn ${this.props.reqs.class}`}>
          {btnText}
        </div>
      </div>
    );
  }
}

export default Banner;