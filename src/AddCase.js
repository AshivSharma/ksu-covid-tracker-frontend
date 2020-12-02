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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setType('');
    setGender('');
    setCampus('');
    setID('');
  };

  const [type, setType] = React.useState('');
  const [campus, setCampus] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [id, setID] = React.useState('');



  const changeType = (event) => {
    setType(event.target.value);
  };
  const changeCampus = (event) => {
    setCampus(event.target.value);
  };
  const changeGender = (event) => {
    setGender(event.target.value);
  };
  const changeID = (event) => {
    setID(event.target.value);
  };

  const addCaseToDB = () => {
      axios.post("https://us-central1-ksucovidtracker.cloudfunctions.net/user", {
        type: type,
        gender: gender,
        campus: campus,
        ksuID: id,
        isInfected: true
      }).then(function(res){
        console.log("Created", res);
      });
      console.log("Data: ", type, " ", campus, " ", gender, " ", id);
      handleClose();
  }

  return (
    <div>
      <Button variant="contained" color="default" onClick={handleClickOpen}>
        Add Case
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Submit Case</DialogTitle>
          <DialogContentText>
            Enter Your Information Below
          </DialogContentText>

          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Type</InputLabel>
            <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={type}
            onChange={changeType}
            >
            <MenuItem value={'Student'}>Student</MenuItem>
            <MenuItem value={'Faculty'}>Faculty</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Gender</InputLabel>
            <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={gender}
            onChange={changeGender}
            >
            <MenuItem value={'Male'}>Male</MenuItem>
            <MenuItem value={'Female'}>Female</MenuItem>
            </Select>
          </FormControl>


          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Campus</InputLabel>
            <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={campus}
            onChange={changeCampus}
            >
            <MenuItem value={'Kennesaw'}>Kennesaw</MenuItem>
            <MenuItem value={'Marietta'}>Marietta</MenuItem>
            </Select>
          </FormControl>

          <TextField
            autoFocus
            margin="normal"
            id="name"
            label="Student/Faculty ID"
            type="id"
            value={id}
            onChange={changeID}
          />

        <DialogActions style={{marginTop: "100px"}}>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addCaseToDB} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}