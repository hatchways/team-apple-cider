import React, {Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, ListItemText, Divider, ListItemAvatar, Avatar, Button} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    list:{
        padding:'0'
    },
    listItem:{
        padding: '20px 25px'
    },
    unFollowButton:{
        borderRadius: "10rem",
        backgroundColor: "#DF1B1B",
        color: "white",
        width: "6rem",
        height: "2rem",
        fontSize:'0.6rem'
        
    }
    
  }));
const Followers =(props)=>{
    const classes = useStyles();
    return(
        <List aria-label='following list' className={classes.list}>
            {props.followingsList.map((person=>{
              return(
                <Fragment>
                <ListItem className={classes.listItem}>
                    <ListItemAvatar>
                        <Avatar 
                        alt={person.name} 
                        src={person.img}
                        />
                     </ListItemAvatar>
                     <ListItemText>
                         {person.name}
                     </ListItemText>
                     <Button
                        className={classes.unFollowButton}
                        variant="contained"
                        onClick={()=>props.handleUnfollow(person)}
                        >
                        Unfollow
                    </Button>
                </ListItem>
                <Divider />
              </Fragment>
            )}))}
        </List>
    )
}

export default Followers