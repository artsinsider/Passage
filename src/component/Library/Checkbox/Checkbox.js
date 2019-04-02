import React  from 'react';import styled from 'styled-components';const Input_Checkbox = styled("input")`    position: absolute;    left: -10000px;    top: auto;    width: 1px;    height: 1px;    overflow: hidden;`;const Checkbox_Label = styled("label")``;const Toggle = styled("span")`    width: 1rem;  height: 1rem;  position: relative;  display: inline-block;  vertical-align: middle;  border: 2px solid #969696;  border-radius: 50%;  cursor: pointer;    &:hover {    border-color: #4a4a4a;  }      &:focus {    border-color: #b0d5ff;    box-shadow: 0 0 0 2px rgba(23, 133, 255, 0.25);  }      &: checked {    border-color: #1785ff;    background: #1785ff url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSIyMCA2IDkgMTcgNCAxMiI+PC9wb2x5bGluZT48L3N2Zz4=) center no-repeat;    background-size: 75%;  }`;export default class Checkbox extends React.Component  {    render() {        return (            <Checkbox_Label htmlFor="input">                {this.props.name}                <Input_Checkbox type="checkbox" className="check-custom" hidden/>                <Toggle className="check-toggle"/>            </Checkbox_Label>        )    }    }