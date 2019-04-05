import React from 'react';
import styled from 'styled-components';

export default class Button extends React.Component {
    render() {
        const {children, disabled, type, onClick, theme} = this.props;
        return (
            <Buttons
                theme={theme}
                type={type}
                className="button"
                disabled={!!disabled}
                onClick={onClick}
            >
                {children}
            </Buttons>
        )
    }
}

const baseVarThemes ={
    baseColorText: '#fff'
};

const Buttons = styled('button')`
    font-size: 0.4em;
    margin: 1em;
    padding: 0.5em 1em;
    border-radius: ${props => props.theme.borderRadius}px;
    line-height: 100%;
    background: rgba(${props => props.theme.backgroundColor},0);
    color: ${props => props.theme.color};
    border: 1px solid ${props => props.theme.borderColor};
    cursor: pointer;
    transition:all .3s cubic-bezier(.645, .045, .355, 1);
    outline: none;
    
    &:hover {
        background: rgba(${props => props.theme.backgroundColor},.15);
    }
`;

Buttons.defaultProps = {
    theme: {
        borderColor: "#45D2A6",
        backgroundColor: "255,255,255",
        borderRadius: 15,
        color: baseVarThemes.baseColorText
    }
};