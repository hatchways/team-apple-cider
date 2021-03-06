import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button } from "@material-ui/core";
import ItemDisplay from "components/ItemDisplay";
import ListContext from "../contexts/ListContext";

const useStyles = makeStyles((theme) => ({
    productCard: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        margin: theme.spacing(0.5, 2, 3),
        boxShadow: " 0 2px 6px rgba(0,0,0,0.04), 0 2px 6px rgba(0,0,0,0.06)"
    },

    removeButtonContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "10rem"
    },
    removeButton: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "10rem",
        height: "2.5rem",
        fontSize: "0.7rem",
        fontWeight: "bold",
        padding: theme.spacing(0, 3)
    }
}));

const ProductCard = ({ item, listId, getProductIds }) => {
    const classes = useStyles();
    const productToggle = useContext(ListContext).productToggle;
    const removeButtonClick = async () => {
        const res = await fetch(`list-to-products/${listId}/${item.id}`, {
            method: "DELETE"
        });
        getProductIds();
        productToggle();
    };

    return (
        <Box className={classes.productCard}>
            <Box>
                <ItemDisplay className={classes.itemDisplay} item={item} />
            </Box>

            <Box className={classes.removeButtonContainer}>
                <Button
                    onClick={removeButtonClick}
                    variant="outlined"
                    className={classes.removeButton}
                >
                    Remove
                </Button>
            </Box>
        </Box>
    );
};
export default ProductCard;
