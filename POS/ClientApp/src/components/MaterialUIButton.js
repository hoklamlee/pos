import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faPrint } from '@fortawesome/free-solid-svg-icons'

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
}));

export default function MaterialUIButton(props) {
    const classes = useStyles();

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<FontAwesomeIcon icon={faPrint} />}
            >
                {props.label}
                </Button>
        </div>
    );
}