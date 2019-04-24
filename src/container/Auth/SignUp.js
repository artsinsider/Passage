import React  from 'react';import Component from './Styled'import Logo from '../../component/Logo'import Modal     from '../../component/HOC/Modal/Modal';import {signUp}    from '../../records/inputs';import './auth.scss'export default class SignUp extends React.PureComponent{    constructor(props){        super(props);        this.state = {            inputs : signUp,            focus: null,            dataFrom: {}        };        this.InputRef = null;    }    focusInput = (event) => this.setState({focus: event.type === 'blur' ? null : +event.target.id});    getDataFrom = (event) => {        if(event.target.name === "personal-check") {            this.setState({dataFrom: { ...this.state.dataFrom,[event.target.name] : event.target.checked}});            return;        }        this.setState({dataFrom: { ...this.state.dataFrom,[event.target.name] : event.target.value}});    };    focusedInput = (id) => () => {       if(this.InputRef && this.InputRef[id]) this.InputRef[id].focus();    };    setTextInputRef = element => {        if(element) {            this.InputRef = {...this.InputRef, [element.id]:element};        }    };    back = e => {        e.stopPropagation();        this.props.history.goBack();    };    render() {        const {inputs, focus, dataFrom} = this.state;        return (            <Modal>                <div className="auth-container" onClick={this.back}>                    <Component.Form className="auth-form" autocomplete="off">                        <Component.Logo>                            <Logo/>                            <Component.Title>SIGN UP</Component.Title>                        </Component.Logo>                        {inputs.map(node =>                            <Component.Wrap key={node.id}>                                <Component.LabelInput                                    focused={node.id === focus || dataFrom[node.atr]}                                    onClick={this.focusedInput(node.id)}                                >                                    {node.name}                                </Component.LabelInput>                                <Component.Input                                    ref={this.setTextInputRef}                                    id={node.id}                                    onFocus={this.focusInput}                                    onBlur={this.focusInput}                                    name={node.atr}                                    type={node.type}                                    onChange={this.getDataFrom}                                    autocomplete="off"                                />                            </Component.Wrap>                        )}                        <Component.PersonalData>                            <Component.CaheckBox onChange={this.getDataFrom} name="personal-check" type="checkbox"/>                            <Component.Label>вы даете согласие на обработку ваших персональных данных</Component.Label>                        </Component.PersonalData>                        <Component.Button>СОЗДАТЬ АККАНУТ</Component.Button>                    </Component.Form>                </div>            </Modal>        )    }}