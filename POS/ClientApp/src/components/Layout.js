import React from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';
import './Layout.css';
import config from 'react-global-configuration';


const isFullWidth = config.get('isFullWidth');

//export default props => (
//    <div>
//        <NavMenu />
//        <Container>
//            {
//                props.children
//            }
//        </Container>
//    </div>
//);

export default class Layout extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div
                className="appContainer"
                style={{
                    //backgroundImage: "url(" + "https://images.unsplash.com/photo-1444459094717-a39f1e3e0903?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80" + ")",
                    //backgroundImage: "url(" + "https://images.pexels.com/photos/3255761/pexels-photo-3255761.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" + ")",                 
                }}
            >
                <NavMenu />
                <div fluid={isFullWidth}>
                    {
                        this.props.children
                    }
                </div>
            </div>
        )
    }
}

