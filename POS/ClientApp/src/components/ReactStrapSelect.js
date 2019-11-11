import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';



export default function ReactStrapSelect(props) {
    const [value, setValue] = React.useState(props.defaultValue ? props.defaultValue : '');


    const handleChange = event => {
        setValue(event.target.value);
    };

    return (
        <div>
            <Label for={props.id}>{props.label}</Label>
            {props.multiple ?
                <Input type="select" name={props.id} id={props.id} placeholder={props.placeHolder} onChange={handleChange} value={props.defaultValue} multiple>
                    <option key="" value=""></option>

                    {props.options.map(o =>
                        <option key={o.value} value={o.value}>{o.name}</option>
                    )}
                </Input>
                :
                <Input type="select" name={props.id} id={props.id} placeholder={props.placeHolder} onChange={handleChange} value={props.defaultValue}>
                    <option key="" value=""></option>
                    {props.options.map(o =>
                        <option key={o.value} value={o.value}>{o.name}</option>
                    )}
                </Input>
                }

        </div>

    );
}
