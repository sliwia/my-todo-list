import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { AddBox, Delete, Edit } from '@material-ui/icons';
import Paper from '@material-ui/core/Paper';

import * as actionTypes from '../../store/actions';

import './MyToDoList.scss';

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const MyToDoList = ({newToDoList, onNewToDo, onEditToDo, onDelToDo}) => {
  const [open, setOpen] = useState(false);
  const [currentNumber, setCurrentNumber] = useState('');
  const [currentTitle, setCurrentTitle] = useState('');
  const [currentEstimation, setCurrentEstimation] = useState(0);
  const [currentStatus, setCurrentStatus] = useState('toDo');
  const [currentDescription, setCurrentDescription] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [editedId, setEditedId] = useState(null);

  const handleClickNewTicket = () => {
    setOpen(true);
    setIsEdit(false);
  };

  const resetFields = () => {
    setIsEdit(false);
    setCurrentNumber('')
    setCurrentTitle('')
    setCurrentEstimation(0);
    setCurrentStatus('toDo');
    setCurrentDescription('');
  }

  const handleClose = () => {
    setOpen(false);
    setIsEdit(false);
    resetFields()
  };

  const getNextId = () => {
    if (newToDoList.length) {
      let newId = 0;
      newToDoList.forEach((element) => {
        if (element.id > newId) {
          newId = element.id
        }

      })
      return newId + 1;
    } else {
      return 1
    }
  };

  const addUpdateTask = () => {
    if (isEdit) {
      onEditToDo(editedId, currentNumber, currentTitle, currentEstimation, currentStatus, currentDescription);
    } else {
      onNewToDo(getNextId(), currentNumber, currentTitle, currentEstimation, currentStatus, currentDescription);
    }
    setIsEdit(false);
    resetFields()
    setOpen(false);
  };

  const handleChangeNumber = (event) => (
    setCurrentNumber(event.target.value)
  );

  const handleChangeTitle = (event) => (
    setCurrentTitle(event.target.value)
  );

  const handleChangeEstimation = (event) => (
    setCurrentEstimation(event.target.value)
  );

  const handleChangeSelect = (event) => (
    setCurrentStatus(event.target.value)
  );

  const handleChangeDescription = (event) => (
    setCurrentDescription(event.target.value)
  );

  const editTicket = (id) => {

    let currentData;
    newToDoList.forEach(element => {
      if (element.id ===id) {
        currentData = element
      }
    });
    setCurrentNumber(currentData.number)
    setCurrentTitle(currentData.title)
    setCurrentEstimation(currentData.estimation);
    setCurrentStatus(currentData.status);
    setCurrentDescription(currentData.description)
    setIsEdit(true);
    setEditedId(id);
    setOpen(true);
  };

  const deleteTicket = (id) => {
    onDelToDo(id)
  };


  return (
    <section className='my-todo-list-content'>

      <Button
        variant="contained"
        color="primary"
        className='btn-add'
        onClick={handleClickNewTicket}
        startIcon={<AddBox />}
      >
        Create ticket
      </Button>
      <>

        <Dialog
          open={open}
          onClose={handleClose}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            Create new ticket
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <form className="form-content">
                <TextField
                  id="input-number"
                  label="Number"
                  onChange={handleChangeNumber}
                  value={currentNumber}
                />
                <br />
                <TextField
                  id="input-title"
                  label="Title"
                  placeholder="Enter title"
                  multiline
                  onChange={handleChangeTitle}
                  value={currentTitle}
                />
                <br />
                <TextField
                  id="input-estimation"
                  label="Estimation"
                  onChange={handleChangeEstimation}
                  type="number"
                  value={currentEstimation}
                  InputLabelProps={{
                    shrink: true,
                  }}

                />
                <br />
                <label>Status</label>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={currentStatus}
                  onChange={handleChangeSelect}
                >
                  <MenuItem value='toDo'>toDo</MenuItem>
                  <MenuItem value='inProgress' >inProgress</MenuItem>
                  <MenuItem value='archive'>archive</MenuItem>
                  <MenuItem value='done'>done</MenuItem>
                </Select>
                <br />
                <TextField
                  id="input-desc"
                  label="Description"
                  placeholder="Enter description"
                  multiline
                  rows={4}
                  onChange={handleChangeDescription}
                  value={currentDescription}
                />
              </form>
            </DialogContentText>

          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={addUpdateTask} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </>

      {
        newToDoList && newToDoList.map( (element, index) => (
          <div key={index} className="single-ticket">
            <h1 className="single-ticket__title">
              <span>{element.number}</span> {element.title}
            </h1>
            <div className="single-ticket__details">
              <span>Status: {element.status}</span>
              <span>Estimation: {element.estimation} SP</span>
            </div>
            <div className="single-ticket__desc">
              <span><i>Description:</i> </span>
              <span>{element.description}</span>
            </div>

            <div className="btns-content">
              <Button
                color="primary"
                className='btn-another'
                startIcon={<Edit />}
                variant="outlined"
                onClick={() => editTicket(element.id)}
              >
                EDIT
              </Button>

              <Button
                color="primary"
                className='btn-another'
                startIcon={<Delete />}
                variant="outlined"
                onClick={() => deleteTicket(element.id)}
              >
                DELETE
              </Button>
            </div>
          </div>

        ))
      }
    </section>
  );
}


const mapStateToProps = state => {
  return {
    newToDoList: state.mainToDoList,
  };
}

const mapDispatchToProps = dispatch =>{
  return {
    onNewToDo: (id, number, title, estimation, status, description) => dispatch({type: actionTypes.ADD_NEW_TICKET,
                                                        newId: id,
                                                        currentNumber: number,
                                                        currentTitle: title,
                                                        currentEstimation: estimation,
                                                        curentStatus: status,
                                                        currentDescription: description}),
    onEditToDo: (id, number, title, estimation, status, description) => dispatch({type: actionTypes.EDIT_TICKET,
                                                        newId: id,
                                                        currentNumber: number,
                                                        currentTitle: title,
                                                        currentEstimation: estimation,
                                                        curentStatus: status,
                                                        currentDescription: description}),
    onDelToDo: (id) => dispatch({
      type: actionTypes.DELETE_TICKET,
      idToDelete: id
    })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyToDoList);
