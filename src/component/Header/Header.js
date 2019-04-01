import React  from 'react';
import styled from 'styled-components';
import Button from '../../component/Library/Button/Button';

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

export default class Header extends React.Component {
    state={
        isChange: false
    };
    render() {
        return (
            <Head className="main-header">
                <LogoName className="logo-name" onClick={() => this.setState({isChange: !this.state.isChange})} isChange={this.state.isChange}>
                    Passage
                    <Button>КНОПКА</Button>
                </LogoName>

            </Head>
        )
    }
}