const root={
    height:'100%',
    padding:'50px',
    backgroundColor:'#44475ab9',
    '& .container':{
    border:' solid rgb(241, 238, 232) 1px',
    borderRadius:'1%',
    width:'50% ',
    maxWidth:'400px',
    minWidth:'250px',
    margin: '0 auto',
    textAlign:'center',
    backgroundColor:'#f7f3f3',
    padding:'30px',
    '& form':{
        '& h2':{
            marginTop:0,
        },
        '& .textField':{
            display:'block',
            width:'80%',
            margin:'5px auto 15px auto',
            textAlign:'center',
            '& .MuiInputBase-input':{
                height: '.5em'
            },
            '& input':{
                backgroundColor:'white',
               
            }
        },
        '& button':{
            marginTop:'25px',
            backgroundColor:'#DF1B1B'
        },
    },
    '& .login, & .signUp':{
        display:'flex',
        padding:'20px',
        borderTop:'1px solid rgba(128, 128, 128, 0.274)',
        justifyContent:'center',
        marginTop:'40px',
        textAlign:'center',
        '& p':{
         margin:0,
         marginRight:'10px'
        },
        '& .loginLink, & .signUpLink':{
            color:'#f50057'
        }
    }
    }
}

export default root