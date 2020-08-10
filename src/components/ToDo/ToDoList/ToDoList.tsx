import React, { useState } from 'react';
import { useToDoContext } from '../../../context/ToDo';
import { ToDoItem } from '../ToDoItem';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton'; import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';

const ToDoList = () => {
  const { toDoList, isCompletedVisible, addToDo } = useToDoContext();
  const [label, setLabel] = useState('');

  const renderListItems = toDoList.map((todo, index) => ({ ...todo, id: index }))
    .filter(todo => isCompletedVisible ? true : !todo.isCompleted)
    .sort((a, b) => {
      if (a.isCompleted === b.isCompleted) {
        return 0;
      } else if (a.isCompleted) {
        return 1;
      } else {
        return -1;
      }
    }).map(todo => {
      return (
        <ToDoItem key={todo.id} {...todo} />
      );
    });

  const handleAddClick = () => {
    addToDo(label);
    setLabel('');
  };

  return (
    <>
      {renderListItems}


      <Grid container alignItems="center">
        <Grid item xs>
          <TextField
            label="Add To Do"
            value={label}
            onChange={event => setLabel(event.currentTarget.value)}
          />
        </Grid>

        <Grid item xs="auto">
          <Tooltip title="Add" aria-label="add">
            <IconButton color="primary" onClick={handleAddClick}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </>
  );
};

export default ToDoList;
