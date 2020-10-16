import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import root from '../style/signupLoginPages'

const useStyles = makeStyles({
    root: root
});
function Login (){
    const classes = useStyles();
    const [userName, setName]=useState('')
    const [userEmail,setEmail]=useState('')
    const [userPass, setPass]=useState('')
    return(
            <section className={classes.root}>
                <div className='container'>
                    <form >
                        <h2>Sign in</h2>
                        <label>Your email address:</label>
                        <TextField className='textField' id="outlined-basic" variant="outlined" label="email"  fullWidth required type="email"  onChange={(e)=>setEmail(e.target.value)}/>
                        <label>Password:</label>
                        <TextField className='textField' id="outlined-basic"  variant="outlined" label="password" fullWidth required type="password" onChange={(e)=>setPass(e.target.value)}/>
                        <Button className="button" variant="contained" color="secondary" >Login</Button>
                    </form>
                    <div className='signUp'>
                        <p>Don't have an account?</p>
                        <Link className='signUpLink' to="/">Create an account</Link>
                    </div>
                </div>
            </section>
    )
}

export default Login