import React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { actionCreators } from '../store/User';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './NavMenu.css';

class NavMenu extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    test(v) {
        console.log(v)
    }

    render() {
        const { loggedIn } = this.props;


        return (
            loggedIn || localStorage.getItem('user') ?
                <header>
                    <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light >
                        <Container>
                            <NavbarBrand tag={Link} to="/">POS</NavbarBrand>
                            <NavbarToggler onClick={this.toggle} className="mr-2" />
                            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
                                <ul className="navbar-nav flex-grow">
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
                                    </NavItem>

                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/purchaser">Purchaser</NavLink>
                                    </NavItem>

                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/inventory">Inventory</NavLink>
                                    </NavItem>

                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/profile">{this.props.user.username}</NavLink>
                                    </NavItem>

                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/login">Logout</NavLink>
                                    </NavItem>
                                </ul>
                            </Collapse>
                        </Container>
                    </Navbar>
                </header>
                :
                ""

        );
    }
}


function mapStateToProps(state) {
    const { loggedIn, user } = state.authentication;

    return {
        loggedIn, user
    };
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(NavMenu);




