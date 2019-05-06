import React  from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";

const Wrap = styled.div`
    max-width: 80%;
    padding: 20px 0;
    border: 1px solid #000;
    color: #000;
    left: 0;
    right: 0;
    margin: auto;
    top: 0;
    bottom: 0;
    position: absolute;
    max-height: 80%;
    background: #fff;
`;

export default class Restaurant extends React.PureComponent {
    render() {
        console.log()
        const{name,picture} = this.props.data.place;
        return (
            <Wrap>
                <img src={picture.uri} alt=""/>
                {name}
            </Wrap>
        )
    }
}