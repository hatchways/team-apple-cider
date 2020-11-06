import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ListContext from "contexts/ListContext";

export default function ListSettingsPopup({
  listId,
  settingsOpen,
  settingsClose,
}) {
  const listDeleteToggle = useContext(ListContext).listDeleteToggle;

  const handleDeleteList = async () => {
    await fetch(`/lists?list_id=${listId}`, {
      method: "DELETE",
    });
    listDeleteToggle();
    settingsClose();
  };
  return (
    <div>
      <Dialog
        open={settingsOpen}
        onClose={settingsClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"You sure you want delete this list?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            All items in the list will be deleted permanetly.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={settingsClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteList} color="primary" autoFocus>
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
