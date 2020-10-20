import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Box, Input } from '@material-ui/core'

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
    const [userName, setName]=useState('')
    const [userEmail,setEmail]=useState('')
    const [userPass, setPass]=useState('')
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
                        <Button className={classes.button} variant="contained" color="secondary" >Login</Button>
                    </form>
                    <Box className={classes.signup}>
                        <p className={classes.p}>Don't have an account?</p>
                        <Link className={classes.signupLink} to="/login">Create an account</Link>
                    </Box>
                </Box>
            </section>
    )
}


export default SignUp