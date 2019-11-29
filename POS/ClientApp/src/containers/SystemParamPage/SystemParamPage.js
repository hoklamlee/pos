import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Router, Route, Link } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators } from '../../store/SystemParam';
import config from 'react-global-configuration';

import MaterialTable from 'material-table';
import { Paper } from '@material-ui/core';
import RightBottomButton from '../../components/RightBottomButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faPlus, faTrash, faPen, faTools } from '@fortawesome/free-solid-svg-icons'
import { history } from '../../helpers/history';

class SystemParamPage extends React.Component {
    constructor(props) {
        super(props);

        this.props.getAllSystemParam();

        //this.submitInfo = this.submitInfo.bind(this);
        this.delete = this.delete.bind(this);
        this.handeCreate = this.handeCreate.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }


    handeCreate() {
        //this.props.history.push("/createsystemParam");
        history.push("/createsystemParam");

    }

    handleUpdate(key) {
        history.push("/editsystemParam/" + key);
    }

    delete(rowData) {
        if (window.confirm(`Are you sure delete ` + rowData.name)) {
            this.props.deleteSystemParam(rowData.systemParamId);
        }        //console.log(key);
    }

    render() {



        const columns = [
            {
                title: 'Name',
                field: 'name'
            },
            {
                title: 'Description',
                field: 'description'
            },
            {
                title: 'Type',
                field: 'type'
            },
            {
                title: 'Value',
                field: 'value'
            }
        ]

        return (
            <div style={{ marginTop: '2vh', width: '100%' }}>
               
                        <MaterialTable
                            title="SystemParam"
                            columns={columns}
                            data={this.props.items}
                            actions={[
                                {
                                    icon: 'edit',
                                    tooltip: 'Edit User',
                                    onClick: (event, rowData) => {
                                        //alert('You are editing ' + rowData.name);
                                        this.handleUpdate(rowData.systemParamId);
                                    }
                                },
                                {
                                    icon: 'delete',
                                    tooltip: 'Delete User',
                                    onClick: (event, rowData) => { this.delete(rowData) }
                                }
                            ]}
                            components={{
                                Container: props => <Paper {...props} elevation={0} />
                            }}
                        /> 

                <RightBottomButton label="Create" handleClick={this.handeCreate}><FontAwesomeIcon icon={faPlus} /></RightBottomButton>

            </div>

        );
    }
}



function mapStateToProps(state) {
    const { loading, error, items } = state.systemParam;
    return {
        loading, error, items
    };
}

const connectedSystemParamPage = connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(SystemParamPage);
export { connectedSystemParamPage as SystemParamPage };









