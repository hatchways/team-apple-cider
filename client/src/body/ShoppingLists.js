import React, { useState } from "react";
import { Box, Fade } from "@material-ui/core";
import AddItem from "components/AddItem";
import ListsDisplay from "components/ListsDisplay";
import AddList from "components/AddList";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    listsDisplay: {
        margin: theme.spacing(0, 0, 12, 0)
    }
}));

const ShoppingLists = (props) => {
    const [addListOpen, setAddListOpen] = useState(false);
    const changeAddListOpen = () => setAddListOpen((previous) => !previous);
    const classes = useStyles();

    return (
        <Fade in={true} timeout={1000}>
            <Box>
                <AddItem />
                <ListsDisplay
                    className={classes.listsDisplay}
                    {...{ addListOpen, changeAddListOpen }}
                />
                <AddList {...{ addListOpen, changeAddListOpen }} />
            </Box>
        </Fade>
    );
};

export default ShoppingLists;
