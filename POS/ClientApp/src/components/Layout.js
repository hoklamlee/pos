import React from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';

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
            <div>
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

