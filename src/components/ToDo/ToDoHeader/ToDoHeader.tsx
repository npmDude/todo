import Badge from '@material-ui/core/Badge';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import { useToDoContext } from 'context/ToDo';
import React, { useMemo } from 'react';

const ToDoHeader = () => {
  const { toDoList, isCompletedVisible, showCompleted } = useToDoContext();

  const incompleteToDoLength = useMemo(
    (): number => toDoList.filter(todo => !todo.isCompleted).length,
    [toDoList]
  );

  return (
    <Grid container>
      <Grid item xs>
        <Badge badgeContent={incompleteToDoLength} color="primary">
          <Typography component="h1" variant="h4" >ToDo</Typography>
        </Badge>
      </Grid>

      <Grid item xs="auto">
        <FormControlLabel
          control={
            <Switch
              checked={isCompletedVisible}
              color="primary"
              onChange={() => showCompleted(!isCompletedVisible)}
            />
          }
          label="Show All"
        />
      </Grid>
    </Grid >
  );
};

export default ToDoHeader;