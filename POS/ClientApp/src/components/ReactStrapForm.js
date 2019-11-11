import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText ,option} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faPlus, faTrash, faPen, faTools, faCheck } from '@fortawesome/free-solid-svg-icons'
import MaterialUIPickers from '../components/MaterialUIPickers';
import ReactStrapSelect from '../components/ReactStrapSelect';

//Sample Code:
const fields = [
    {
        label: "Text",
        type: "text",
        id: "exampleText",
        placeHolder: "with a placeholder"
    }, {
        label: "Email",
        type: "email",
        id: "exampleEmail",
        placeHolder: "with a placeholder"
    }, {
        label: "Password",
        type: "password",
        id: "examplePassword",
        placeHolder: "password placeholder"
    }
    , {
        label: "Select",
        type: "select",
        id: "exampleSelect",
        placeHolder: "password placeholder",
        options: [{ value: "1", name: "One" }, { value: "2", name: "Two" }]
    }, {
        label: "Select Multiple",
        type: "selectmultiple",
        id: "exampleSelectMulti",
        placeHolder: "password placeholder",
        options: [{ value: "1", name: "One" }, { value: "2", name: "Two" }]
    },
    {
        label: "Text Area",
        type: "textarea",
        id: "exampleText",
        placeHolder: "password placeholder"
    },
    {
        label: "File",
        type: "file",
        id: "exampleFile",
        placeHolder: "password placeholder"
    }, {
        label: "Radio Buttons",
        type: "radio",
        id: "radio",
        placeHolder: "password placeholder",
        options: [{ value: "1", name: "One" }, { value: "2", name: "Two" }]
    }, {
        label: "Check me out",
        type: "checkbox",
        id: "checkbox",
        placeHolder: "password placeholder",
    }]
//Sample: <ReactStrapForm fields={fields} />

export default class ReactStrapForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedDate: new Date()
        };


    }

    handleDateChange(e) {

    }


    render() {
        return (
            <Form onSubmit={this.props.onSubmit}>
                {
                    this.props.fields.map(f => {
                        switch (f.type) {
                            case "text":
                                return (
                                    <FormGroup>
                                        <Label for={f.id}>{f.label}</Label>
                                        <Input type="text" name={f.id} id={f.id} placeholder={f.placeHolder} defaultValue={f.defaultValue} />
                                    </FormGroup>
                                )
                            case "datetime":
                                return (
                                    <FormGroup>
                                        <MaterialUIPickers
                                            name={f.id} 
                                            id={f.id}
                                            label={f.label}
                                            defaultValue={f.defaultValue}
                                            />
                                    </FormGroup>
                                )
                            case "number":
                                return (
                                    <FormGroup>
                                        <Label for={f.id}>{f.label}</Label>
                                        <Input type="number" name={f.id} id={f.id} placeholder={f.placeHolder} defaultValue={f.defaultValue} />
                                    </FormGroup>
                                )
                            case "email":
                                return (
                                    <FormGroup>
                                        <Label for={f.id}>{f.label}</Label>
                                        <Input type="email" name={f.id} id={f.id} placeholder={f.placeHolder} defaultValue={f.defaultValue} />
                                    </FormGroup>
                                )
                            case "password":
                                return (
                                    <FormGroup>
                                        <Label for={f.id}>{f.label}</Label>
                                        <Input type="password" name={f.id} id={f.id} placeholder={f.placeHolder} defaultValue={f.defaultValue} />
                                    </FormGroup>
                                )
                            case "select":
                                return (
                                    <FormGroup>
                                        {/* <Label for={f.id}>{f.label}</Label>
                                        <Input type="select" name={f.id} id={f.id} placeholder={f.placeHolder} value="testbyhanson">
                                            {f.options.map(o => 
                                                <option value={o.value}>{o.name}</option>
                                            )} 
                                        </Input>*/}

                                        <ReactStrapSelect
                                            label={f.label}
                                            id={f.id}
                                            placeHolder={f.placeHolder}
                                            defaulValue={f.defaultValue}
                                            options={f.options}
                                            />

                                    </FormGroup>
                                )
                            case "selectmultiple":
                                return (
                                    <FormGroup>
                                        {/* <Label for={f.id}>{f.label}</Label>
                                        <Input type="select" name={f.id} id={f.id} placeholder={f.placeHolder} multiple>
                                            {f.options.map(o => {
                                                <option key={o.value} value={o.value}>{o.name}</option>
                                            })}
                                        </Input> */}
                                        <ReactStrapSelect
                                            multiple={true}
                                            label={f.label}
                                            id={f.id}
                                            placeHolder={f.placeHolder}
                                            defaulValue={f.defaultValue}
                                            options={f.options}
                                        />
                                    </FormGroup>
                                )
                            case "textarea":
                                return (
                                    <FormGroup>
                                        <Label for={f.id}>{f.label}</Label>
                                        <Input type="textarea" name={f.id} id={f.id} placeholder={f.placeHolder} defaultValue={f.defaultValue} />
                                    </FormGroup>
                                )
                            case "file":
                                return (
                                    <FormGroup>
                                        <Label for={f.id}>{f.label}</Label>
                                        <Input type="file" name={f.id} id={f.id} />
                                        <FormText color="muted">
                                            {f.placeHolder}
                                        </FormText>
                                    </FormGroup>
                                )
                            case "radio":
                                return (
                                    <FormGroup tag="fieldset">
                                        <legend>{f.label}</legend>
                                        {f.options.map(o => {
                                            <FormGroup check>
                                                <Label check>
                                                    <Input type="radio" name={o.value} value={o.value} />{' '}
                                                    {o.name}
                                                </Label>
                                            </FormGroup>
                                        })}
                                    </FormGroup>
                                )
                            case "checkbox":
                                return (
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox" name={f.id} id={f.id} />{' '}
                                            {f.label}
                                        </Label>
                                    </FormGroup>
                                )
                            default:
                                break;
                        }
                    })
                }

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button color="success"><FontAwesomeIcon icon={faCheck} /> Submit</Button>
                </div>
            </Form>
        );
    }

}