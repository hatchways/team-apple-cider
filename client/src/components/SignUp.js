import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link, Redirect, Switch } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles({
    root: {
        height:'100%',
        padding:'50px',
        backgroundColor:'rgba(53, 53, 65, 0.473)',
        '& .container':{
        border:' solid rgb(241, 238, 232) 1px',
        borderRadius:'1%',
        width:'50% ',
        margin: '0 auto',
        textAlign:'center',
        backgroundColor:'rgb(241, 238, 232)',
        padding:'30px',
        '& form':{
            '& h2':{
            },
            '& .textField':{
                display:'block',
                width:'100%',
                margin:'10px auto 15px auto',
                textAlign:'center',
                '& input':{
                    backgroundColor:'white',
                    border:'none',
                    '& label':{
                        
                    }
                }
            },
            '& .button':{
                marginTop:'20px',
                borderRadius:'20%',
            }
        },
        '& .login':{
            display:'flex',
            justifyContent:'center',
            marginTop:'40px',
            textAlign:'center',
            '& p':{
             margin:0,
             marginRight:'10px'
            },
            '& .loginLink':{
                color:'#f50057'
            }
        }
        }
    }
});
function SignUp (){
    const classes = useStyles();
    return(
        <section className={classes.root}>
            <div className='container'>
                <form >
                    <h2>Sign Up</h2>
                    <label>Your name:</label>
                    <TextField className='textField' id="outlined-basic" variant="outlined"label="name" required/>
                    <label>Your email address:</label>
                    <TextField className='textField' id="outlined-basic" variant="outlined" label="email" required type="email"/>
                    <label>Password:</label>
                    <TextField className='textField' id="outlined-basic" variant="outlined" label="password" required type="password"/>
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