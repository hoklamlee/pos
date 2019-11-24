import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function MaterialUIDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [text, setText] = React.useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        props.onSubmit(text);
    }

    const onChange = (e) => {
        setText(e.target.value);
    }

    return (
        <div>
            <div onClick={handleClickOpen}>
                {props.buttonComponent}
            </div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {props.content}
                    </DialogContentText>
                    <TextField
                        onChange={onChange}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Input here"
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleSubmit} color="primary">{props.submitLabel}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
