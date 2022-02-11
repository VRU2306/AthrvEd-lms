import React from "react";
import gif from "../../Icons/Spin-1s-58px.svg"
function LoadingScreen() {
  return (
    <section className="pd-16 card bg-light disp-flex fl-dir-col fl-jc-ce report-inner mr-8t">
      <div className=" al-self-c">
        <img
          className="disp-blk txt-align-center"
          src={gif}
          alt=""
          srcSet=""
        />
      </div>
      <p className="mr-16t txt-align-center" style={{ color: "#D4DCE1" }}>Loading...</p>
    </section>
  );
}

export default LoadingScreen;
