import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";

function Registerbtn() {
  const [value, setValue] = useState("Register");
  let success = value;
  let SuccessfullSubmit = useStoreState((state) => state.authMod.SuccessfullSubmit);
  return (
    <div>
      <input
        className="restbtna  resbtn-info"
        type="submit"
        style={{ fontSize: 20, cursor: "pointer" }}
        value="Register"
      />

    </div>

  );
}
export default Registerbtn;