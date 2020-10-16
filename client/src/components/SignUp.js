import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link, Redirect, Switch } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import root from '../style/signupLoginPages'


const useStyles = makeStyles({
    root: root
});
function SignUp (){
    const classes = useStyles();
    return(
        <section className={classes.root}>
            <div className='container'>
                <form >
                    <h2>Sign Up</h2>
                    <label>Your name:</label>
                    <TextField className='textField' variant="outlined" fullWidth label="name" required/>
                    <label>Your email address:</label>
                    <TextField className='textField' variant="outlined" fullWidth label="email" required type="email"/>
                    <label>Password:</label>
                    <TextField className='textField' variant="outlined" fullWidth label="password" required type="password"/>
                    <Button variant="contained" color="secondary">Create an account</Button>
                </form>
                <div className='login'>
                    <p>Already have an account?</p>
                    <Link  className='loginLink' to="/login">login</Link>
                </div>
            </div>
        </section>
    )
}

export default SignUp