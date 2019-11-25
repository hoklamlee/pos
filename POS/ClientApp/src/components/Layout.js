import React from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';
import './Layout.css';

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
                    backgroundImage: "url(" + "https://images.unsplash.com/photo-1506357997910-c76d3e4d3ecf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" + ")",                 
                }}
            >
                <NavMenu />
                <Container>
                    {
                        this.props.children
                    }
                </Container>
            </div>
        )
    }
}

