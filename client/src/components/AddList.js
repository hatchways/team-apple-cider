import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Modal, IconButton, Typography,Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.2rem'
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(10,10,10,0.1)'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(1,1,1)',
      outline: '1px solid slategrey'
    }
  },
  popup: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    display: "flex",
    //display:'block',
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.palette.background.paper,
    //backgroundColor: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    //padding: theme.spacing(1, 1, 3),
    borderRadius: "0.3rem",
    overflow: "hidden",
    outline: "none",
    minWidth:"30rem",
    maxHeight: "41rem",
    height:'75%',
  },
  addButton: {
    borderRadius: "10rem",
    padding: theme.spacing(2, 6),
    backgroundColor: "#DF1B1B",
    color: "white",
    margin: theme.spacing(2),
    width: "11rem",
    height: "3.5rem",
    fontSize: "0.8rem"
  },
  titleContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(0, 0, 3),
  },
  closeButtonContainer: {
    textAlign: "right",
  },
  titleText: {
    fontSize: "1.3rem",
    fontWeight: "500",
    letterSpacing:"1px"
  },
  itemText:{
    fontSize: "0.8rem",
    fontWeight: "400",
    color:"gray",
    letterSpacing:"0.5px"
  },
  productCard: {
    display: "flex",
    flexDirection: "row",
    maxWidth: "30rem"
  },
  removeButtonContainer:{
    display: "flex",
    alignItems:"center",
    justifyContent:"center",
  },
  removeButton:{
    display: "flex",
    alignItems:"center",
    justifyContent:"center",
    borderRadius: "10rem",
    height:"3rem",
  },
  addButtonContainer:{
    display: "flex",
    justifyContent:"center",
    margin:theme.spacing(3,0,2)
  },
  bodyContainer:{
    minWidth:"30rem",
    maxHeight: "29rem",
    overflow:"hidden",
    
  },
  bodyContent:{
    minWidth:"30rem",
    maxHeight: "30rem",
    overflow:"scroll",
    overflowX:"hidden",
  }
}));

const AddList = (props) => {
    const {addListOpen, setAddListOpen} = props;
    const classes = useStyles()
    const handleClose = () => {
        setAddListOpen(false);
    }

    return (
        <Modal
        className={classes.popup}
        open={addListOpen}
        onClose={handleClose}
        aria-labelledby="add-list"
        aria-describedby="confirms-adding-item-of-url-to-selected-list"
        >
        <Box className={classes.paper}>
          <Box className={classes.closeButtonContainer}>
            <IconButton
              aria-label="close"
              className={classes.closeButton}
              onClick={handleClose}
              size="small"
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
          <Box className={classes.titleContainer}>
            <Typography className={classes.titleText}>
              Create new list
            </Typography>
            
          </Box>
          <Box className={classes.bodyContainer}>
            <Box className={classes.bodyContent}>
            </Box>
          </Box>
          <Box className={classes.addButtonContainer}>
            <Button className={classes.addButton} variant="contained">
            ADD NEW ITEM
            </Button>
          </Box>
          <h2 className={classes.paperTitle}>Create new list</h2>

          <Button className={classes.addButton}>CREATE LIST</Button>
        </Box>
        </Modal>
    );
};

export default AddList;
