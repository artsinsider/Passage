import React  from 'react';
import styled from 'styled-components';
import {Link, NavLink} from "react-router-dom";
import Logo   from '../../component/Logo'

const ListWrap = styled.ul`
  grid-column: 2/3;
  display: inline;
  text-decoration: none;
  list-style-type: none;
  text-align: center;
  padding: 0;
`;

const ListItem = styled.li`
    display: inline;
    margin: 0 10px;
    font-size: 20px;
    font-weight: 600;
    color: #000;
    transition: all .3s cubic-bezier(.645, .045, .355, 1);
    
    &:hover {
     opacity: .65;
    }
  
  a {
    color: #000;
  }
`;

const LoginLinks = styled.div`
     grid-column: 3/4;
     line-height: 5em;
     cursor: pointer;
     > * {
        margin: 0 10px;
     }
     
    a {
        text-decoration: none;
        color: #000;
        transition: all .3s cubic-bezier(.645, .045, .355, 1);

    &:hover {
            opacity: .65;
        }
    }
`;

export default class Navigation extends React.PureComponent {
    render() {
        return (
            <>
                <Logo/>
                <ListWrap>
                    {this.props.items.map((link, i) =>
                        <ListItem key={`${link}_${i}`} >
                            <NavLink exact activeStyle={{color: "#ffe033"}} to={link.path} >
                                {link.linkName}
                            </NavLink>
                        </ListItem>
                    )}
                </ListWrap>
                <LoginLinks>
                    <Link to={{pathname: "/sign-in", state:{modal: true}}} >Sign in</Link>
                    <Link to={{pathname: "/sign-up", state:{modal: true}}} >Sign up</Link>
                </LoginLinks>
            </>
        )
    }
}