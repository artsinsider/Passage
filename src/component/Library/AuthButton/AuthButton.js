import React from 'react';import styled, {withTheme, ThemeProvider} from 'styled-components';const Button = styled('button')`    min-width: 70%;    margin: 30px 0;    border: none;    padding: 20px;    color: #ffffff;    cursor: pointer;    outline: none;    background: ${props => props.theme.backgroundColorButtonAuth};`;class AuthButton extends React.PureComponent {    render() {        return (            <ThemeProvider theme={this.props.theme}>                <Button>{this.props.children}</Button>            </ThemeProvider>        )    }}export default withTheme(AuthButton)