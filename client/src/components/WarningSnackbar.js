import React from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/alert";

function WarningSnackbar(props) {
  const { openSnack, handleCloseSnack, snackText } = props;
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const vertical = "top";
  const horizontal = "center";

  return (
    <Snackbar
      open={openSnack}
      autoHideDuration={6000}
      onClose={handleCloseSnack}
      anchorOrigin={{ vertical, horizontal }}
    >
      <Alert onClose={handleCloseSnack} severity="error">
        {snackText}
      </Alert>
    </Snackbar>
  );
}

export default WarningSnackbar;
