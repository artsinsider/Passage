import React  from 'react';
import styled from 'styled-components';
import Button from '../../component/Library/Button/Button';
import './Header.scss'

const Head = styled('header')`
    color: ${props => props.isChange ? 'white' : 'red'} ;
    padding: 12px 22px;
    font-size: 1em;
    border-bottom: 1px solid rgba(255,255,255, .2);
`;

const LogoName = styled('div')`
    color: ${props => props.isChange ? 'white' : 'red'} ;
    opacity: 0.9;
    font-size: 1.2em;
    line-height: 2.3;
`;

const Icon_User = styled('span')`
    color: #fff;
    font-size: 22px;
    cursor: pointer;
    padding: 5px;
    float: right;
    text-align: center;
    line-height: 1.5em;
`;

const Icon_Menu = styled(Icon_User)``;

export default class Header extends React.Component {
    state={
        isChange: false
    };
    render() {
        return (
            <Head className="main-header">
                <LogoName className="logo-name" isChange={this.state.isChange}>
                    Passage
                    <Button onClick={() => this.setState({isChange: !this.state.isChange})} >КНОПКА</Button>
                </LogoName>
                <Icon_User className="icon-user" />
                <Icon_Menu className="icon-menu" />
            </Head>
        )
    }
}