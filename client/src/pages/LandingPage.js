import React, { useState } from "react";
import { Box, Dialog, Button } from "@material-ui/core";
import SignUp from "components/SignUp";
import Login from "components/Login";

const LandingPage = () => {
  const [openSignup, setOpenSignup] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const handleOpenSignup = () => {
    setOpenSignup(true);
  };

  const handleOpenLogin = () => {
    setOpenLogin(true);
  };

  return (
    <Box>
      <Button onClick={handleOpenSignup} variant="contained" color="secondary">
        Sign Up
      </Button>
      <Button onClick={handleOpenLogin} variant="contained" color="secondary">
        Login
      </Button>
      <Dialog open={openSignup}>
        <SignUp />
      </Dialog>
      <Dialog open={openLogin}>
        <Login />
      </Dialog>
    </Box>
  );
};

export default LandingPage;
