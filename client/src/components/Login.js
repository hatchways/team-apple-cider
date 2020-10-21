import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Box,} from '@material-ui/core'

const useStyles = makeStyles((theme)=>({
login:{
    maxWidth:'1200px',
    margin:'0 auto',
    height:'100vh',
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
input:{
    backgroundColor:'white',
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
function Login (){
    const classes = useStyles();
    const [email,setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [errors, setErrors]=useState('');

    const validations = () => {
        let temp = {};
        temp.email = email ? "" : "Please enter an email.";
        temp.password = password ? "" : "Please enter a password.";
        setErrors({ ...temp });

        return Object.values(temp).every(x => x == "");
    }

    const handleClick = (e) => {
        e.preventDefault();
        if (validations()) {
            fetch("/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'email': email,
                    'password': password,
                })})
                .then(response => response.json())
                .then(function(response) {
                    if (response.status === 'success') {
                        console.log('Success:', email);
                    }
                    else {
                        window.alert(response.message);
                        console.log(response.message);
                    }
                })
                .catch((error) => {
                    console.error('Error:', error)
                })
            }
    }
    // The console throws a warning because the 'error' field in each TextField is given a string, not a boolean. However, the code appears to work as intended, and it does not appear to be a problem.
    return(
            <section className={classes.login}>
                <Box className={classes.formContainer}>
                    <form>
                        <h2 className={classes.h2}>Sign in</h2>
                        <label>Your email address:</label>
                        <TextField className={classes.textField} variant="outlined" label="email"  fullWidth required type="email" error={errors.email} helperText={errors.email} onChange={(e)=>setEmail(e.target.value)}/>
                        <label>Password:</label>
                        <TextField className={classes.textField} variant="outlined" label="password" fullWidth required type="password" error={errors.password} helperText={errors.password} onChange={(e)=>setPassword(e.target.value)}/>
                        <Button className={classes.button} variant="contained" color="secondary" onClick={handleClick}>Login</Button>
                    </form>
                    <Box className={classes.signup}>
                        <p className={classes.p}>Don't have an account?</p>
                        <Link className={classes.signupLink} to="/">Create an account</Link>
                    </Box>
                </Box>
            </section>
    )
}

export default Login