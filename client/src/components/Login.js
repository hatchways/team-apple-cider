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
function Login (props){
    const classes = useStyles();
    const [userEmail,setEmail]=useState('')
    const [userPass, setPass]=useState('')
    return(
            <section className={classes.login}>
                <Box className={classes.formContainer}>
                    <form onSubmit={props.handleLogin}>
                        <h2 className={classes.h2}>Sign in</h2>
                        <label>Your email address:</label>
                        <TextField className={classes.textField} variant="outlined" label="email"  fullWidth type="email"  onChange={(e)=>setEmail(e.target.value)}/>
                        <label>Password:</label>
                        <TextField className={classes.textField} variant="outlined" label="password" fullWidth type="password" onChange={(e)=>setPass(e.target.value)}/>
                        <Button className={classes.button} type='submit' variant="contained" color="secondary" onClick={props.handleLogin}><Link to="/dashboard">Login</Link></Button>
                    </form>
                    <Box className={classes.signup}>
                        <p className={classes.p}>Don't have an account?</p>
                        <Link className={classes.signupLink} to="/signup">Create an account</Link>
                    </Box>
                </Box>
            </section>
    )
}

export default Login