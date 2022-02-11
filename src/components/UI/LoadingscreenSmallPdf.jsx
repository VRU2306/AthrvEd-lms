import React from "react";
import gif from "../../Icons/Spin-1s-58px.svg"
function LoadingScreenSmallPdf() {
    return (
        <div className="wi-100p txt-align-center" style={{ padding: "32px", marginLeft: "50%" }}>
            <img
                // className="wi-30"
                alt="Loading small amount of data"
                src={gif}
            />
            <p style={{ color: "#D4DCE1" }}>Genrating...</p>
        </div>
    );
}

export default LoadingScreenSmallPdf;
