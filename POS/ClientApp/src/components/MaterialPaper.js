import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2, 2),
    },
}));

export default function MaterialPaper(props) {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Typography variant="h6" component="h6">
                {props.header}
            </Typography>
            <Typography component="p" style={{marginTop:10}}>
                {props.children}
            </Typography>
        </Paper>
    );
}