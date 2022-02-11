import React from "react";
import gif from "../../Icons/Spin-1s-58px.svg"
function Loadingscreenmembers() {
    return (
        <div className="wi-100p txt-align-center" style={{ padding: "20px", marginLeft: "20%" }}>
            <img
                // className="wi-30"
                alt="Loading small amount of data"
                src={gif}
            />
            <p style={{ color: "#D4DCE1", fontSize: 18, width: 300, marginLeft: "-50%" }}>Loading the data please wait...</p>
        </div>
    );
}

export default Loadingscreenmembers;
