import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Box,
  Snackbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/alert";
import UserContext from "../contexts/UserContext";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ErrorTooltip = withStyles((theme) => ({
  arrow: {
    color: "red",
  },
  tooltip: {
    backgroundColor: "red",
    color: "rgba(255, 255, 255, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 14,
  },
}))(Tooltip);

const useStyles = makeStyles((theme) => ({
  signup: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "50px",
    backgroundColor: "#44475ab9",
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
    padding: "30px",
  },
  h2: {
    marginTop: 0,
  },
  textField: {
    display: "block",
    width: "80%",
    margin: "5px auto 40px auto",
    textAlign: "center",
    backgroundColor: "white",
  },
  button: {
    marginTop: "25px",
    backgroundColor: "#DF1B1B",
  },
  login: {
    display: "flex",
    padding: "20px",
    borderTop: "1px solid rgba(128, 128, 128, 0.274)",
    justifyContent: "center",
    marginTop: "40px",
    textAlign: "center",
  },
  p: {
    margin: 0,
    marginRight: "10px",
  },
  signupLink: {
    color: "#f50057",
  },
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

  const handleSnack = (props) => {
    setSnackText(props);
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
    errorsCopy.name = name ? "" : "This field is required.";
    errorsCopy.email = /.+@.+\..+/.test(email) ? "" : "Email is not valid.";
    errorsCopy.password =
      password.length > 5 ? "" : "Password must be at least six characters.";
    errorsCopy.confirm = password === confirm ? "" : "Passwords must match.";
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
      fetch("/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          confirm: confirm,
        }),
      })
        .then((response) => response.json())
        .then(function (response) {
          if (response.status === "success") {
            console.log("Success:", email);
            const loginSuccess = value.handleLogin(email, password);
            if (loginSuccess) props.history.push("/dashboard");
          } else {
            handleSnack(response.message);
            console.log(response.message);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <section className={classes.signup}>
      <Box className={classes.formContainer}>
        <form form onSubmit={handleSignup}>
          <h2 className={classes.h2}>Sign up</h2>
          <label>Your Name</label>
          <TextField
            className={classes.textField}
            variant="outlined"
            label="name"
            fullWidth
            required
            type="text"
            error={!!errors.name}
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
            // error={!!errors.email}
            // helperText={errors.email}
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
            // error={!!errors.password}
            // helperText={errors.password}
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
              error={!!errors.confirm}
              // helperText={errors.confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </ErrorTooltip>
          <Button
            className={classes.button}
            // onClick={handleClick}
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
        <Snackbar
          open={openSnack}
          autoHideDuration={6000}
          onClose={handleCloseSnack}
        >
          <Alert onClose={handleCloseSnack} severity="error">
            {snackText}
          </Alert>
        </Snackbar>
      </Box>
    </section>
  );
}

export default SignUp;
