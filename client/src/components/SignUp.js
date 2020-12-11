import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Button, TextField, Box, Tooltip, Typography } from "@material-ui/core";
import UserContext from "../contexts/UserContext";
import WarningSnackbar from "./WarningSnackbar";
import backgroundImage from "../img/bcImage6.jpg";
import logo from "../img/logo.png";
import zIndex from "@material-ui/core/styles/zIndex";

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
        backgroundColor: "#d8d8d8",
        width: "100vw",
        margin: "0 auto",
        minHeight: "100vh",
        padding: "50px",
        display: "flex",
        position: "relative",
        justifyContent: "flex-end",
        zIndex: "0"
        // overflow:"hidden"
    },
    backgroundImage: {
        height: "100vh",
        position: "absolute",
        top: "0",
        bottom: "0",
        left: "-150px",
        zIndex: "-1",
        opacity: "0.5",
        overFlow: "hidden"
        // marginTop:"100px"
    },
    dealsMate: {
        width: "45%",
        padding: "20px",
        marginTop: "20px",
        diarginTop: "5vh",
        marginRight: "2vw"
    },
    description: {
        paddingTop: "4rem",
        fontSize: "1.5rem",
        "& h1": {
            fontSize: "2.5rem"
        }
    },
    logo: {
        width: "100%",
        maxWidth: "400px",
        marginBottom: "20px"
    },
    registrationFieldContainer: {
        width: "20vw"
    },
    formContainer: {
        border: " solid rgb(241, 238, 232) 1px",
        textAlign: "center",
        backgroundColor: "#f7f3f3",
        height: "80%",
        marginTop: "5vh",
        padding: "2rem",
        marginRight: "10vw"
    },

    h2: {
        marginTop: 0
    },
    textField: {
        display: "block",
        width: "80%",
        margin: "5px auto 20px auto",
        textAlign: "center",
        backgroundColor: "white"
    },

    button: {
        padding: "0.8rem",
        width: "80%",
        marginTop: "10px",
        backgroundColor: "#DF1B1B"
    },
    login: {
        display: "flex",
        padding: "20px",
        borderTop: "1px solid rgba(128, 128, 128, 0.274)",
        justifyContent: "center",
        marginTop: "30px",
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
            <img
                src={backgroundImage}
                className={classes.backgroundImage}
            ></img>
            <Box className={classes.dealsMate}>
                <img src={logo} className={classes.logo}></img>
                <Typography className={classes.description}>
                    <h1>
                        Welcome to the next generation <br />
                        of online shopping.
                    </h1>
                    Create and follow shopping lists that instantly notifies you
                    on sales!
                </Typography>
            </Box>
            <Box className={classes.formContainer}>
                <form
                    className={classes.registrationFieldContainer}
                    onSubmit={handleSignup}
                >
                    <h2 className={classes.h2}>Sign up today!</h2>
                    <label>Your Name</label>
                    <TextField
                        className={classes.textField}
                        variant="outlined"
                        label="name"
                        fullWidth
                        required
                        type="text"
                        inputProps={{ className: classes.input }}
                        onChange={(e) => setName(e.target.value)}
                        size="medium"
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
                        size="medium"
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
                        size="medium"
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
                            size="medium"
                        />
                    </ErrorTooltip>
                    <Button
                        className={classes.button}
                        type="submit"
                        variant="contained"
                        color="secondary"
                        fullWidth
                    >
                        Sign up
                    </Button>
                </form>
                <Box className={classes.login}>
                    <p className={classes.p}>Already have an account?</p>
                    <Link className={classes.signupLink} to="/login">
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
