import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

function Copyright() {
  return (

    <Typography variant="body2" color="textSecondary" style={{ color: "#D4DCE1" }} align="center">
      <b>{"Copyright © "}</b>
      <b> <Link style={{ color: "#D4DCE1" }} color="inherit" href="https://www.edathrv.com/" target="_blank">
        Airmydus Innovations Private Limited
      </Link>{" "}</b>
      <b style={{ color: "#D4DCE1" }}>{new Date().getFullYear()}</b>
      {"."}
    </Typography>

  );
}

export default Copyright;
