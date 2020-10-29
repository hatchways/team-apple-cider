import React, { useState, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Box, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/alert";
import UserContext from "../contexts/UserContext";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  login: {
    maxWidth: "1200px",
    margin: "0 auto",
    height: "100vh",
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
    margin: "5px auto 15px auto",
    textAlign: "center",
    backgroundColor: "white",
  },
  input: {
    backgroundColor: "white",
  },
  button: {
    marginTop: "25px",
    backgroundColor: "#DF1B1B",
  },
  signup: {
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
function Login(props) {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [snackText, setSnackText] = useState("");
  const value = useContext(UserContext);
  const vertical = "top";
  const horizontal = "center";

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

  const handleLogin = async (e) => {
    e.preventDefault();
    fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
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
  };

  return (
    <section className={classes.login}>
      <Box className={classes.formContainer}>
        <form onSubmit={handleLogin}>
          <h2 className={classes.h2}>Sign in</h2>
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
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="secondary"
          >
            Login
          </Button>
        </form>
        <Box className={classes.signup}>
          <p className={classes.p}>Don't have an account?</p>
          <Link className={classes.signupLink} to="/signup">
            Create an account
          </Link>
        </Box>
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
      </Box>
    </section>
  );
}

export default withRouter(Login);
