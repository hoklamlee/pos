import React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { actionCreators } from '../store/User';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faPlus, faTrash, faPen, faTools, faInfo, faKey, faSignOutAlt,faCog, faUser, faStore,  faDrumstickBite, faList, faHome} from '@fortawesome/free-solid-svg-icons'
import config from 'react-global-configuration';

import './NavMenu.css';

const navbar_background_color = config.get('navbar_background_color');
const navbar_font_color = config.get('navbar_font_color');

const fontStyle = {
    color: navbar_font_color
}

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
                    {/*<Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light style={{ backgroundColor: navbar_background_color}}>*/}
                        <Navbar className="navbar-expand-sm navbar-toggleable-sm box-shadow mb-3" light style={{ backgroundColor: navbar_background_color }}>

                        <Container>
                            <NavbarBrand style={fontStyle} tag={Link} to="/">POS</NavbarBrand>
                            <NavbarToggler style={fontStyle}  onClick={this.toggle} className="mr-2" />
                            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
                                <ul className="navbar-nav flex-grow">
                                    <NavItem>
                                        <NavLink tag={Link} style={fontStyle} to="/"><FontAwesomeIcon icon={faHome} /> Home</NavLink>
                                    </NavItem>

                                    {/* <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
                                    </NavItem>
                                    */ }


                                    <NavItem>
                                        <NavLink tag={Link} style={fontStyle} to="/order"><FontAwesomeIcon icon={faList} /> Order</NavLink>
                                    </NavItem>

                                    <NavItem>
                                        <NavLink tag={Link} style={fontStyle} to="/purchaser"><FontAwesomeIcon icon={faStore} /> Purchaser</NavLink>
                                    </NavItem>

                                    <NavItem>
                                        <NavLink tag={Link} style={fontStyle} to="/inventory"><FontAwesomeIcon icon={faDrumstickBite} /> Inventory</NavLink>
                                    </NavItem>

                                    <NavItem>
                                        <NavLink tag={Link} style={fontStyle} to="/profile"><FontAwesomeIcon icon={faUser} /> {this.props.user.username}</NavLink>
                                    </NavItem>

                                    <NavItem>
                                        <NavLink tag={Link} style={fontStyle} to="/sitesetting"><FontAwesomeIcon icon={faCog} /> Site Setting</NavLink>
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




