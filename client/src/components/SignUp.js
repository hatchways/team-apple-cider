import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Button, TextField, Box, Tooltip, Typography } from "@material-ui/core";
import UserContext from "../contexts/UserContext";
import WarningSnackbar from "./WarningSnackbar";

const ErrorTooltip = withStyles((theme) => ({
    arrow: {
        color: "red"
    },
    tooltip: {
        backgroundColor: "red",
        color: "rgba(255, 255, 255, 0.87)",
        boxShadow: theme.shadows[1],
        fontSize: 14
    }
}))(Tooltip);

const useStyles = makeStyles((theme) => ({
    signup: {
        width: "100vw",
        margin: "0 auto",
        minHeight: "100vh",
        padding: "50px",
        backgroundColor: "#44475ab9"
    },
    formContainer: {
        border: " solid rgb(241, 238, 232) 1px",
        borderRadius: "1%",
        width: "50% ",
        maxWidth: "400px",
        minWidth: "250px",
        margin: "0 auto",
        textAlign: "center",
        backgroundColor: "#f7f3f3",
        padding: "30px"
    },
    h2: {
        marginTop: 0
    },
    textField: {
        display: "block",
        width: "80%",
        margin: "5px auto 40px auto",
        textAlign: "center",
        backgroundColor: "white"
    },
    button: {
        marginTop: "25px",
        backgroundColor: "#DF1B1B"
    },
    login: {
        display: "flex",
        padding: "20px",
        borderTop: "1px solid rgba(128, 128, 128, 0.274)",
        justifyContent: "center",
        marginTop: "40px",
        textAlign: "center"
    },
    p: {
        margin: 0,
        marginRight: "10px"
    },
    signupLink: {
        color: "#f50057"
    }
}));
function SignUp(props) {
    const classes = useStyles();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [errors, setErrors] = useState({});
    const [openTooltip, setOpenTooltip] = useState(false);
    const [openSnack, setOpenSnack] = useState(false);
    const [snackText, setSnackText] = useState("");
    const value = useContext(UserContext);

    function sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    const handleOpenTooltip = async () => {
        setOpenTooltip(true);
        await sleep(6000);
        setOpenTooltip(false);
    };

    const handleCloseTooltip = () => {
        setOpenTooltip(false);
    };

    const handleSnack = (message) => {
        setSnackText(message);
        setOpenSnack(true);
    };

    const handleCloseSnack = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSnack(false);
    };

    const validations = () => {
        const errorsCopy = { ...errors };
        errorsCopy.confirm =
            password === confirm ? "" : "Passwords must match.";
        if (errorsCopy.confirm) {
            handleOpenTooltip();
        } else {
            handleCloseTooltip();
        }
        setErrors({ ...errorsCopy });

        return Object.values(errorsCopy).every((field) => field === "");
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        if (validations()) {
            const response = await value.handleSignup(
                name,
                email,
                password,
                confirm
            );
            if (response.status === "success") props.history.push("/");
            else handleSnack(response.message);
        }
    };

    return (
        <section className={classes.signup}>
            <Box className={classes.formContainer}>
                <form onSubmit={handleSignup}>
                    <h2 className={classes.h2}>Sign up</h2>
                    <label>Your Name</label>
                    <TextField
                        className={classes.textField}
                        variant="outlined"
                        label="name"
                        fullWidth
                        required
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label>Your email address:</label>
                    <TextField
                        className={classes.textField}
                        variant="outlined"
                        label="email"
                        fullWidth
                        required
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Password:</label>
                    <TextField
                        className={classes.textField}
                        variant="outlined"
                        label="password"
                        fullWidth
                        required
                        type="password"
                        inputProps={{ minLength: 6 }}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label>Confirm Password:</label>
                    <ErrorTooltip
                        open={openTooltip}
                        title={<Typography>Passwords must match.</Typography>}
                        arrow
                        disableHoverListener
                        disableTouchListener
                        disableFocusListener
                    >
                        <TextField
                            className={classes.textField}
                            variant="outlined"
                            label="confirm password"
                            fullWidth
                            required
                            type="password"
                            error={Boolean(errors.confirm)}
                            onChange={(e) => setConfirm(e.target.value)}
                        />
                    </ErrorTooltip>
                    <Button
                        className={classes.button}
                        type="submit"
                        variant="contained"
                        color="secondary"
                    >
                        Sign up
                    </Button>
                </form>
                <Box className={classes.login}>
                    <p className={classes.p}>Already have an account?</p>
                    <Link className={classes.signupLink} to="/">
                        Login
                    </Link>
                </Box>
                <WarningSnackbar
                    openSnack={openSnack}
                    handleCloseSnack={handleCloseSnack}
                    snackText={snackText}
                />
            </Box>
        </section>
    );
}

export default SignUp;
