import React         from 'react';import Component from'./Styled';import Modal         from '../../component/HOC/Modal/Modal';import Logo          from '../../component/Logo';import {withTheme}   from 'styled-components';import './auth.scss'class SignIn extends React.PureComponent{    constructor(props){        super(props);        this.state = {            inputs : [                {id: 1, name: "Адрес почты", type: "mail", atr: "mail"},                {id: 2, name: "Пароль", type: "password", atr: "password"}            ],            focus: null,            dataFrom: {}        };    }    focusInput = (event) => {        event.preventDefault();        event.stopPropagation();        this.setState({focus: event.type === 'blur' ? null : +event.target.id});    };    getDataFrom = (event) => {        if(event.target.name === "personal-check") {            this.setState({dataFrom: { ...this.state.dataFrom,[event.target.name] : event.target.checked}});            return;        }        this.setState({dataFrom: { ...this.state.dataFrom,[event.target.name] : event.target.value}});    };    back = e => {        if(!+e.target.id && e.target.id) {            e.stopPropagation();            this.props.history.goBack();        }        return false;    };    render() {        const {inputs, focus, dataFrom} = this.state;        return (            <Modal>                <div id='0' className="auth-container" onClick={this.back}>                    <Component.Form className="auth-form" autocomplete="off">                        <Component.Logo className="circle">                            <Logo/>                            <Component.Title>SIGN IN</Component.Title>                        </Component.Logo>                        {inputs.map(node =>                            <Component.Wrap key={node.id}>                                <Component.LabelInput                                    focused={node.id === focus || dataFrom[node.atr]}                                >                                    {node.name}                                </Component.LabelInput>                                <Component.Input                                    ref={this.refInput}                                    id={node.id}                                    onFocus={this.focusInput}                                    onBlur={this.focusInput}                                    name={node.atr}                                    type={node.type}                                    onChange={this.getDataFrom}                                    autocomplete="off"                                />                            </Component.Wrap>                        )}                        <Component.Button id='0' onClick={e => e.preventDefault()} >ВОЙТИ</Component.Button>                    </Component.Form>                </div>            </Modal>        )    }}export default withTheme(SignIn)