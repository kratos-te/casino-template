import "./App.css";
import React from "react";

function Preloader() {
  return (
    <div className="preloader-game">
      <div className="prel-logo">
        <img
          className="prel-logo-img"
          src="images/frenzy/prel_logo.png"
          alt=""
        />
      </div>
      <div className="prel-bar">
        <div className="prel-bar-line">
          <img
            className="prel-bar-line-img"
            src="images/frenzy/prel_line.png"
            alt=""
          />
        </div>
        <div className="prel-bar-back">
          <img
            className="prel-bar-back-img"
            src="images/frenzy/prel_bar.png"
            alt=""
          />
        </div>
      </div>
      <div className="prel-bar-text">
        <span>
          Loading... <span id="percentage">10%</span>
        </span>
      </div>
    </div>
  );
}

export default Preloader;
