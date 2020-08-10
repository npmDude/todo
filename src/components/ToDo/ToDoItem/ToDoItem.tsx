import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useState } from 'react';
import { ToDo, useToDoContext } from '../../../context/ToDo';

type Props = ToDo & {
  id: number;
};

const ToDoItem = ({ id, label, isCompleted }: Props) => {
  const { updateToDoLabel, completeToDo, revertToDo, removeToDo } = useToDoContext();
  const [isEditing, setIsEditing] = useState(false);
  const [newLabel, setNewLabel] = useState(label);

  const handleCancelClick = () => {
    setNewLabel(label);
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    updateToDoLabel(id, newLabel);
    setIsEditing(false);
  };

  return (
    <>
      <Grid container alignItems="center">
        <Grid item xs>
          {isEditing ? (
            <TextField
              label="To do"
              value={newLabel}
              onChange={event => setNewLabel(event.currentTarget.value)}
            />
          ) : (
            <Typography variant="button" display="block">
              {label}
            </Typography>
          )}
        </Grid>

        <Grid item xs="auto">
          {!isCompleted ? (
            <>
              {!isEditing ? (
                <>
                  <Tooltip title="Update" aria-label="delete">
                    <IconButton onClick={() => setIsEditing(true)}>
                      <CreateIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete" aria-label="delete">
                    <IconButton onClick={() => removeToDo(id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Complete" aria-label="complete">
                    <IconButton color="primary" onClick={() => completeToDo(id)}>
                      <CheckBoxOutlineBlankIcon />
                    </IconButton>
                  </Tooltip>
                </>
              ) : (
                <>
                  <Tooltip title="Cancel" aria-label="cancel">
                    <IconButton onClick={handleCancelClick}>
                      <CloseIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Save" aria-label="save">
                    <IconButton onClick={handleSaveClick}>
                      <CheckIcon />
                    </IconButton>
                  </Tooltip>
                </>
              )}
            </>
          ) : (
            <Tooltip title="Revert" aria-label="revert">
              <IconButton color="primary" onClick={() => revertToDo(id)}>
                <CheckBoxIcon />
              </IconButton>
            </Tooltip>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default ToDoItem;
