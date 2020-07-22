import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { ToDoProvider } from 'context/ToDo';
import React from 'react';
import { ToDoHeader } from './ToDoHeader';

const useStyles = makeStyles(() => createStyles({
    paper: {
        maxWidth: `500px`,
        padding: `20px 15px`
    }
}));

type ToDoProps = {
    className?: string;
};

const ToDo = ({ className }: ToDoProps) => {
    const classes = useStyles();

    return (
        <Paper
            elevation={8}
            className={classNames(classes.paper, className)}
        >
            <ToDoProvider>
                <ToDoHeader />
            </ToDoProvider>
        </Paper>
    );
};

export default ToDo;
