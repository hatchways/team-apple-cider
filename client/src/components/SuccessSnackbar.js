import React from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

function SuccessSnackbar(props) {
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
            <Alert onClose={handleCloseSnack} severity="success">
                {snackText}
            </Alert>
        </Snackbar>
    );
}

export default SuccessSnackbar;
