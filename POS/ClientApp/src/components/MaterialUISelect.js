import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function MaterialUISelect(props) {
    const classes = useStyles();
    const [age, setAge] = React.useState(props.defaultValue ? props.defaultValue : '');


    const handleChange = event => {
        setAge(event.target.value);
    };

    return (

            <FormControl className={classes.formControl}>
                <InputLabel shrink id={"label_" + props.id }>
                    {props.label}
                    </InputLabel>
                <Select
                    labelId={"label_" + props.id}
                    id={props.id}
                    value={age}
                    onChange={handleChange}
                    displayEmpty
                    className={classes.selectEmpty}
                >
                    {props.options.map(o =>
                        <MenuItem value={o.value}>
                            <em>{o.name}</em>
                        </MenuItem>
                    )}
                </Select>
                <FormHelperText>{props.placeHolder}</FormHelperText>
            </FormControl>

    );
}
