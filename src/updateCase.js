import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
    MenuItem,
    FormControl,
    Select,
    InputLabel
  } from  "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 520,
  }
}));
export default function FormDialog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [ids, setIDs] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
    setCurrentID('');
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [currentID, setCurrentID] = React.useState('');
  
  const changeID = (event) => {
    setCurrentID(event.target.value);
  };
  const getID = () => {
    axios.get("https://us-central1-ksucovidtracker.cloudfunctions.net/user")
    .then(res => {
        setIDs(res.data);
    });
    ids.forEach(id => {
        if(id["ksuID"] == currentID){
            var key = id["id"];
            console.log(key);
            updateInfectedStatus(key);
        }
    });
}

  const updateInfectedStatus = (key) => {
      axios.put(`https://us-central1-ksucovidtracker.cloudfunctions.net/user/${key}`, {
        isInfected: false
      }).then(function(res){
        console.log("Updated", res);
      });
      handleClose();
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Update My Status
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Update Covid-19 Status</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your student/faculty ID below to update your Covid-19 status to recovered.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="ID Number"
            type="id"
            value={currentID}
            onChange={changeID}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={getID} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}