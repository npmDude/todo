import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, createStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { ThemeButton } from 'components/ThemeButton';
import { ToDo } from 'components/ToDo';
import { useAppContext } from 'context/App';
import React from 'react';

const useStyles = makeStyles(() => createStyles({
  box: {
    marginTop: `2em`
  },
  todo: {
    margin: `2em auto`,
  }
}));

const App = () => {
  const classes = useStyles();
  const { themeType } = useAppContext();
  const theme = createMuiTheme({
    palette: {
      type: themeType
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box
        display="flex"
        justifyContent="center"
        className={classes.box}
      >
        <ThemeButton />
      </Box>

      <ToDo className={classes.todo} />
    </ThemeProvider>
  );
};

export default App;
