import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Router, Route, Link } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators } from '../../store/Status';
import config from 'react-global-configuration';

import MaterialTable from 'material-table';
import { Paper } from '@material-ui/core';
import RightBottomButton from '../../components/RightBottomButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faPlus, faTrash, faPen, faTools } from '@fortawesome/free-solid-svg-icons'

class StatusPage extends React.Component {
    constructor(props) {
        super(props);

        this.props.getAllStatus();

        //this.submitInfo = this.submitInfo.bind(this);
        this.delete = this.delete.bind(this);
        this.handeCreate = this.handeCreate.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }


    handeCreate() {
        //this.props.history.push("/createstatus");
        this.props.history.push("/createstatus");

    }

    handleUpdate(key) {
        this.props.history.push("/editstatus/" + key);
    }

    delete(rowData) {
        if (window.confirm(`Are you sure delete ` + rowData.name)) {
            this.props.deleteStatus(rowData.statusId);
        }        //console.log(key);
    }

    render() {



        const columns = [
            {
                title: 'category',
                field: 'category'
            },
            {
                title: 'code',
                field: 'code'
            },
            {
                title: 'description',
                field: 'description'

            }
        ]

        return (
            <div style={{ marginTop: '2vh', width: '100%' }}>
                <MaterialTable
                    title="Status"
                    columns={columns}
                    data={this.props.items}
                    actions={[
                        {
                            icon: 'edit',
                            tooltip: 'Edit User',
                            onClick: (event, rowData) => {
                                //alert('You are editing ' + rowData.name);
                                this.handleUpdate(rowData.statusId);
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
    const { loading, error, items } = state.status;
    return {
        loading, error, items
    };
}

const connectedStatusPage = connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(StatusPage);
export { connectedStatusPage as StatusPage };









