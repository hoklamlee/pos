import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Router, Route, Link } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators } from '../../store/Inventory';
import config from 'react-global-configuration';

import MaterialTable from 'material-table';
import { Paper } from '@material-ui/core';
import RightBottomButton from '../../components/RightBottomButton';
import MateiralPaper from '../../components/MaterialPaper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faPlus, faTrash, faPen, faTools } from '@fortawesome/free-solid-svg-icons'
import { history } from '../../helpers/history';

class InventoryPage extends React.Component {
    constructor(props) {
        super(props);

        this.props.getInventoriesByCategory("All");

        //this.submitInfo = this.submitInfo.bind(this);
        this.delete = this.delete.bind(this);
        this.handeCreate = this.handeCreate.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }


    handeCreate() {
        //this.props.history.push("/createinventory");
        history.push("/createinventory");

    }

    handleUpdate(key) {
        history.push("/editinventory/" + key);
    }

    delete(rowData) {
        if (window.confirm(`Are you sure delete ` + rowData.name)) {
            this.props.deleteInventory(rowData.inventoryId);
        }        //console.log(key);
    }

    render() {



        const columns = [
            {
                title: 'name',
                field: 'name'
            },
            {
                title: 'category',
                field: 'category'
            },
            {
                title: 'description',
                field: 'description'

            },
            {
                title: 'price',
                field: 'price'

            },
            {
                title: 'quatity',
                field: 'quatity'


            },
            {
                title: 'unit',
                field: 'unit'

            }
        ]

        return (
            <div style={{ marginTop: '2vh', width: '100%' }}>
                    <MaterialTable
                        title="Inventory"
                        columns={columns}
                    data={this.props.items}
                    options={{
                        exportButton: true
                    }}
                        actions={[
                            {
                                icon: 'edit',
                                tooltip: 'Edit User',
                                onClick: (event, rowData) => {
                                    //alert('You are editing ' + rowData.name);
                                    this.handleUpdate(rowData.inventoryId);
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
    const { loading, error, items } = state.inventory;
    return {
        loading, error, items
    };
}

const connectedInventoryPage = connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(InventoryPage);
export { connectedInventoryPage as InventoryPage };









