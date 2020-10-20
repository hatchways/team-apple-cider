import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Box, Input } from '@material-ui/core'

const useStyles = makeStyles((theme)=>({
login:{
    maxWidth:'1200px',
    margin:'0 auto',
    height:'123vh', // Eyeballed to make the form centered in the background. May be a better way to do this.
    padding:'50px',
    backgroundColor:'#44475ab9',
},
formContainer:{
    border:' solid rgb(241, 238, 232) 1px',
    borderRadius:'1%',
    width:'50% ',
    maxWidth:'400px',
    minWidth:'250px',
    margin: '0 auto',
    textAlign:'center',
    backgroundColor:'#f7f3f3',
    padding:'30px',
},
h2:{
    marginTop:0,
},
textField:{
    display:'block',
    width:'80%',
    margin:'5px auto 15px auto',
    textAlign:'center',
    backgroundColor:'white'
},
button:{
    marginTop:'25px',
    backgroundColor:'#DF1B1B'
},
signup:{
    display:'flex',
    padding:'20px',
    borderTop:'1px solid rgba(128, 128, 128, 0.274)',
    justifyContent:'center',
    marginTop:'40px',
    textAlign:'center',
},
p:{
    margin:0,
    marginRight:'10px'
},
signupLink:{
    color:'#f50057'
}
}));
function SignUp (){
    const classes = useStyles();
    const [name, setName]=useState('')  // Changed names to correspond with backend.
    const [email,setEmail]=useState('')
    const [password, setPass]=useState('')
    const [confirm, setConfirm]=useState('')
    const handleClick = () => {
        fetch("/auth/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'name': name,
                'email': email,
                'password': password,
                'confirm': confirm
            })})
            .then(response => response.json())
            .then(console.log('Success:', name)) // Logs success even when unsuccessful, not certain how to fix it.
            .catch((error) => {
                console.error('Error:', error)
            })
    }
    // Added confirm password field. Still needs to check for password being at least six characters
    return(
            <section className={classes.login}>
                <Box className={classes.formContainer}>
                    <form>
                        <h2 className={classes.h2}>Sign up</h2>
                        <label>Your Name</label>
                        <TextField className={classes.textField} variant="outlined" label="name"  fullWidth required type="text"  onChange={(e)=>setName(e.target.value)}/>
                        <label>Your email address:</label>
                        <TextField className={classes.textField} variant="outlined" label="email"  fullWidth required type="email"  onChange={(e)=>setEmail(e.target.value)}/>
                        <label>Password:</label>
                        <TextField className={classes.textField} variant="outlined" label="password" fullWidth required type="password" onChange={(e)=>setPass(e.target.value)}/>
                        <label>Confirm Password:</label>
                        <TextField className={classes.textField} variant="outlined" label="confirm password" fullWidth required type="password" onChange={(e)=>setConfirm(e.target.value)}/>
                        <Button className={classes.button} variant="contained" color="secondary" onClick={handleClick}>Register</Button>
                    </form>
                    <Box className={classes.signup}>
                        <p className={classes.p}>Already have an account?</p>
                        <Link className={classes.signupLink} to="/login">Login</Link>
                    </Box>
                </Box>
            </section>
    )
}


export default SignUp