import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    "@global": {
        "*::-webkit-scrollbar": {
            width: "0.2rem"
        },
        "*::-webkit-scrollbar-track": {
            "-webkit-box-shadow": "inset 0 0 6px rgba(10,10,10,0.1)"
        },
        "*::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(1,1,1)",
            outline: "1px solid slategrey"
        }
    },
    popup: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    paper: {
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#f8f8f8",
        boxShadow: theme.shadows[5],
        borderRadius: "0.3rem",
        overflow: "hidden",
        outline: "none",
        minWidth: "30rem",
        padding: theme.spacing(4)
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
        margin: theme.spacing(8)
    },
    titleContainer: {
        display: "flex",
        padding: theme.spacing(4)
    },
    closeButtonContainer: {
        position: "absolute",
        top: "0",
        right: "0",
        margin: theme.spacing(3)
    },
    titleText: {
        fontSize: "1.5rem",
        fontWeight: "bold",
        margin: theme.spacing(4)
    },
    itemText: {
        fontSize: "0.8rem",
        fontWeight: "400",
        letterSpacing: "0.5px"
    },
    productCard: {
        display: "flex",
        flexDirection: "row",
        maxWidth: "30rem"
    },
    removeButtonContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    removeButton: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "10rem",
        height: "3rem"
    },
    addButtonContainer: {
        display: "flex",
        justifyContent: "center"
    },
    bodyContainer: {
        minWidth: "30rem",
        maxHeight: "29rem",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        padding: theme.spacing(2)
    },
    bodyContent: {
        minWidth: "30rem",
        maxHeight: "30rem",
        overflow: "scroll",
        overflowX: "hidden"
    },
    textFieldContainer: {
        display: "flex",
        justifyContent: "center",
        width: "80%",
        backgroundColor: "white",
        margin: theme.spacing(4)
    },
    centerText: {
        textAlign: "center"
    },
    imageFieldContainer: {
        display: "flex",
        backgroundColor: "white",
        width: "35%",
        height: "0",
        paddingBottom: "35%",
        margin: theme.spacing(4)
    },
    selectListInput: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        overflow: "hidden",
        height: "4rem",
        padding: "0 0.5rem",
        boxShadow: "0 0 0.5rem 1px #eee",
        width: "80%"
    },
    itemContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }
}));

export default useStyles;
