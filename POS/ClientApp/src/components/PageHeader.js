import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginBottom: 20,
        marginLeft: '2vh',
        marginRight: '2vh'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function PageHeader(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={8} sm={9} md={10} lg={10}>
                    {props.left}
                </Grid>
                <Grid item xs={4} sm={3} md={2} lg={2}>
                    {props.right}
                </Grid>
            </Grid>
        </div>
    );
}