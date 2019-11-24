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
                    backgroundImage: "url(" + "https://images.unsplash.com/photo-1444459094717-a39f1e3e0903?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80" + ")",
                    //backgroundPosition: 'center',
                    //backgroundSize: 'cover',
                    //backgroundRepeat: 'no-repeat',
                    //display: 'block',
                    //position: 'absolute',
                    //left: '0',
                    //top: '0',
                    //width: '100%',
                    minHeight: '100%',
                    //zIndex: '-1',
                    //opacity: '0.4'
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

