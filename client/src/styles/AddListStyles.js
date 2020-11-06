import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0.2rem",
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(10,10,10,0.1)",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(1,1,1)",
      outline: "1px solid slategrey",
    },
  },
  popup: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f8f8",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: "0.3rem",
    overflow: "hidden",
    outline: "none",
    minWidth: "30rem",
  },
  addButton: {
    borderRadius: "10rem",
    padding: theme.spacing(2, 6),
    backgroundColor: "#DF1B1B",
    color: "white",
    margin: theme.spacing(2),
    width: "11rem",
    height: "3.5rem",
    fontSize: "0.8rem",
  },
  titleContainer: {
    display: "flex",
    maxHeight: "2rem",
    margin: theme.spacing(4),
  },
  closeButtonContainer: {
    textAlign: "right",
    width: "100%",
  },
  titleText: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  itemText: {
    fontSize: "0.8rem",
    fontWeight: "400",
    letterSpacing: "0.5px",
  },
  productCard: {
    display: "flex",
    flexDirection: "row",
    maxWidth: "30rem",
  },
  removeButtonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  removeButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10rem",
    height: "3rem",
  },
  addButtonContainer: {
    display: "flex",
    justifyContent: "center",
    margin: theme.spacing(4),
  },
  bodyContainer: {
    minWidth: "30rem",
    maxHeight: "29rem",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    margin: theme.spacing(2),
    flexDirection: "column",
  },
  bodyContent: {
    minWidth: "30rem",
    maxHeight: "30rem",
    overflow: "scroll",
    overflowX: "hidden",
  },
  textFieldContainer: {
    display: "flex",
    justifyContent: "center",
    width: "80%",
    backgroundColor: "white",
    margin: theme.spacing(2),
  },
  centerText: {
    textAlign: "center",
  },
  imageFieldContainer: {
    display: "flex",
    backgroundColor: "white",
    width: "13rem",
    height: "13rem",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    border: "1px dashed grey",
    borderRadius: "2rem",
    margin: theme.spacing(2),
    padding: theme.spacing(1),
    userSelect: "none",
    cursor: "pointer",
  },
  input: {
    opacity: "0",
  },
  imageFieldText: {
    fontWeight: "bold",
    textDecoration: "underline",
    cursor: "pointer",
  },
}));

export default useStyles;
