import React from "react";
import gif from "../../Icons/Spin-1s-58px.svg"
function EditingLoadingScreen() {
  return (
    <>
      <img
        style={{ marginLeft: "8px", color: "#d4dce1" }}
        width="16px"
        alt="Updating"
        src={gif}
      />
    </>
  );
}

export default EditingLoadingScreen;
