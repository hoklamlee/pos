import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import { Router, Route, Link, Redirect } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators } from '../../store/Status';
import config from 'react-global-configuration';

import ReactStrapFrom from '../../components/ReactStrapForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Divider } from '@material-ui/core';
import { faCoffee, faPlus, faTrash, faPen, faTools, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import PageHeader from '../../components/PageHeader';

class AddStatusPage extends React.Component {
    constructor(props) {
        super(props);

        this.submitForm = this.submitForm.bind(this);
        this.goBack = this.goBack.bind(this);
    }


    submitForm(event) {
        event.preventDefault();

        var category = event.target[0].value;
        var code = event.target[1].value;
        var description = event.target[2].value;
        var sequence = event.target[3].value;

        var userId = JSON.parse(localStorage.getItem('user')).userId;

        this.props.addStatus(category, code, description, sequence, userId).then(success => {
            if (success) {
                this.props.history.goBack();
            }
        });
    }

    goBack() {
        this.props.history.goBack();
    }


    render() {

        return (
            <div style={{ marginTop: '2vh' }}>
                <PageHeader
                    left={<div style={{ display: 'inline', float: 'left' }}><a style={{ marginBottom: 10 }} onClick={this.goBack}><FontAwesomeIcon icon={faArrowLeft} /> Back</a></div>}
                    right={<div style={{ display: 'inline', float: 'right' }}>New Status</div>}
                />


                <ReactStrapFrom
                    onSubmit={this.submitForm}
                    fields={
                        [{
                            label: "Category",
                            type: "text",
                            id: "category",
                            placeHolder: ""
                        }, {
                            label: "Code",
                            type: "text",
                            id: "code",
                            placeHolder: ""
                        }
                            , {
                            label: "Description",
                            type: "textarea",
                            id: "description",
                            placeHolder: ""
                            }, {
                                label: "Sequence",
                                type: "number",
                                id: "sequence",
                                placeHolder: ""
                            }
                        ]
                    } />
            </div>

        );
    }
}



function mapStateToProps(state) {
    const { loading, error, items } = state.status;
    return {
        loading, error, items
    };
}

const connectedAddStatusPage = connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(AddStatusPage);
export { connectedAddStatusPage as AddStatusPage };









