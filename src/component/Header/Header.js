import React  from 'react';
import styled from 'styled-components';
import Button from '../../component/Library/Button/Button';
import './Header.scss'

import { Spring } from 'react-spring/renderprops'
import { useSpring, animated , config} from 'react-spring';

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

const HookedComponent = () => {

    const props = useSpring({
        opacity: 1,
        color: 'white',
        from: { opacity: 0 },
        delay: '2000'
    });
    return <animated.span style={props}>This text Faded in Using Hooks</animated.span>
};


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
                <div className="springs">
                    <Spring from={{ opacity: 0, marginTop: -1000 }} to={{ opacity: 1, marginTop: 0 }}>
                        { props => (
                            <div  className="Apps" style={ props }>
                                <div >
                                    <header className="App-headers" >
                                        <span>This Div Slid Down and Faded In On Load</span>
                                        <Spring
                                            from={{ number: 0 }}
                                            to={{ number: 10 }}
                                            delay= '1000'
                                            config = { config.molasses }>
                                            {props => <span>{props.number.toFixed()}</span>}
                                        </Spring>
                                        <HookedComponent />
                                    </header>
                                </div>
                            </div>
                        )
                        }
                    </Spring>
                </div>


                <Icon_User className="icon-user" />
                <Icon_Menu className="icon-menu" />
            </Head>
        )
    }
}

// export default HookedComponent;