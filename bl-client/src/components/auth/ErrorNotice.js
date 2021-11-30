import React from "react";
import Alert from "@mui/material/Alert";

function ErrorNotice(props) {
  return (
    <div className="error-notice">
      <Alert onClose={props.clearError} severity="error">
        {props.message}
      </Alert>
    </div>
  );
}

export default ErrorNotice;
