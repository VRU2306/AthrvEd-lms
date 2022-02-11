import React from "react";
import gif from "../../Icons/Spin-1s-58px.svg"
function BottomLoadingScreen({ title }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "300px",
        padding: "16px",
        zIndex: 3,
        fontSize: "14px",
        fontFamily: "'Fira Sans', sans-serif",
        backgroundColor: "#fff",
        textAlign: "center",
        boxShadow: "0 1px 5px .5px rgba(0, 0, 0, 0.2)"
      }}
    >
      {" "}
      <p>
        {title}
        <img
          style={{ marginLeft: "16px" }}
          src={gif}
          width="20px"
          alt=""
        />
      </p>
    </div>
  );
}

export default BottomLoadingScreen;
