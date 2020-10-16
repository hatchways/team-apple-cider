import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    root: {
        border:' solid rgb(241, 238, 232) 1px',
        borderRadius:'2%',
        width:'50% ',
        margin: '50px auto',
        textAlign:'center',
        backgroundColor:'rgb(241, 238, 232)',
        padding:'30px',
        '& form':{
            '& h2':{
            },
            '& .textField':{
                display:'block',
                width:'90%',
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
        '& .signUp':{
            display:'flex',
            justifyContent:'center',
            marginTop:'40px',
            textAlign:'center',
            '& p':{
             margin:0,
             marginRight:'10px'
            }
        }
    },
});
function Login (){
    const classes = useStyles();
    const [userName, setName]=useState('')
    const [userEmail,setEmail]=useState('')
    const [userPass, setPass]=useState('')
    return(
        <section className={classes.root}>
            <form >
                <h2>Login</h2>
                <label>Your email address:</label>
                <TextField className='textField' id="outlined-basic" variant="outlined" label="email" placeholder="email" required type="email"  onChange={(e)=>setEmail(e.target.value)}/>
                <label>Password:</label>
                <TextField className='textField' id="outlined-basic"  variant="outlined" label="password" placeholder="password" required type="password" onChange={(e)=>setPass(e.target.value)}/>
                <Button className="button" variant="contained" color="secondary" >Login</Button>
            </form>
            <div className='signUp'>
                <p>Don't have an account?</p>
                <Link to="/">Create an account</Link>
            </div>
        </section>
    )
}

export default Login