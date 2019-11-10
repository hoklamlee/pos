import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


export default function MenuButton(props) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button color="info" style={{ width: '150px', height: '100px' }} onClick={props.handleClick}>
                <div>{props.icon}</div>
                <div>{props.name}</div>
            </Button>
        </div>
    );
}