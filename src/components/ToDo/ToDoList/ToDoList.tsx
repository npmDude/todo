import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import { Theme, useAppContext } from 'context/App';
import React from 'react';

const useStyles = makeStyles(() => createStyles({
  paper: {
    margin: `100px auto`,
    maxWidth: `500px`,
    padding: `20px 15px`
  }
}));

const ToDoList = () => {
  const classes = useStyles();
  const { themeType, setTheme } = useAppContext();


  const handleSwitchChange = (_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (checked) {
      setTheme(Theme.DARK);
    } else {
      setTheme(Theme.LIGHT);
    }
  };

  return (
    <Paper className={classes.paper}>
      <Grid container>
        <Grid item xs>
          <Typography component="h1" variant="h4" >ToDo</Typography>
        </Grid>

        <Grid item xs="auto">
          <Switch
            checked={themeType === Theme.DARK}
            onChange={handleSwitchChange}
            inputProps={{ 'aria-label': 'checkbox' }}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ToDoList;
