import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useSelector} from "react-redux";

export default function AlertDialog(props) {
  const counter = useSelector(state => state);

  const handleCloseAgree = () => {
    props.socket.emit("openDialog", {openDialog: false, agree: true});
  };
  const handleCloseDisagree = () => {
    props.socket.emit("openDialog", {openDialog: false, agree: false});
  };

  return (
    <div>
      <Dialog
        open={counter.dialog}
        onClose={handleCloseDisagree}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Czy potwierdzasz wyjebanie aplikacji w kosmos?</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDisagree} color="primary">
            Disagree
          </Button>
          <Button onClick={handleCloseAgree} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}