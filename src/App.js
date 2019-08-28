import React from "react";
import "./App.css";

class App extends React.Component {
  state = {
    closeHeight: "translateY(-300px)",
    openHeight: "translateY(0px)",
    transSecond: "2s",
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
    whenTransition: function() {
      console.log("whenTransition");
    }
  };

  bannerAnima = function() {
    const {}
    const btnOpts = this.options.button;
    const btn = this.$ele.find(`.${btnOpts.class}`);
    const isTransition = this.options.transition;
    const classStates = this.options.class;
    const whenTransition = this.options.whenTransition;

    if (isTransition) this.$ele.css("transition", transSecond);

    // 判斷 class 是否在已完成的狀態，ex : opened、closed
    if (/opened|closed/.test(this.$ele.attr("class"))) {
      this.$ele.toggleClass(classStates.closed);
      // 利用按鈕文字決定是否展開或收合
      if (btn.text() == btnOpts.closeText) {
        btn.text(btnOpts.openText);
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
          setTimeout(
            function() {
              changeImgHeight.call(this, closeHeight);
              controlClass.call(this, classStates.closed);
              clearInterval(timer);
            }.bind(this),
            2000
          );
        } else {
          // 立即將
          // 1. class 改為 closed
          // 2. 圖片高度下降
          controlClass.call(this, classStates.closed);
          changeImgHeight.call(this, closeHeight);
        }
      } else {
        btn.text(btnOpts.closeText);
        changeImgHeight.call(this, openHeight);
        if (isTransition) {
          controlClass.call(this, classStates.opening);
          const timer = setInterval(whenTransition, 2000 / 30);
          setTimeout(
            function() {
              controlClass.call(this, classStates.opened);
              clearInterval(timer);
            }.bind(this),
            2000
          );
        } else {
          console.log("~OPEN~");
          controlClass.call(this, classStates.opened);
        }
      }
    }
  };

  changeImgHeight = function(height) {
    this.$ele.find(".img").css("transform", height);
  };

  controlClass = function(className) {
    const classStates = this.options.class;
    let allClassesArray = [];
    for (let prop in classStates) allClassesArray.push(prop);
    const allClasses = allClassesArray.join(" ");

    this.$ele.removeClass(allClasses);
    this.$ele.addClass(className);
  };

  render() {
    return (
      <div className="banner">
        <a className="wrap">
          <img
            className="img"
            src="./1200x380.png"
            title="輸入廣告促銷說明文字"
            alt="輸入廣告促銷說明文字"
          />
        </a>
        <div onClick={this.bannerAnima} className="btn">
          收合
        </div>
      </div>
    );
  }
}

export default App;
