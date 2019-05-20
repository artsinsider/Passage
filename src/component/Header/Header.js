import React  from 'react';
import styled from 'styled-components';

const Head = styled.header`
    background: rgb(255, 255, 255);
    height: 80px;
    display: grid;
    grid-template-columns: 150px auto 150px;
    border-bottom: 1px solid #eee;
    line-height: 3em;
    
  .logo {
    grid-column: 1/2;
    text-align: center;
    padding: 7px;
    line-height: 5.4em;
  }
  
`;

export default class Header extends React.PureComponent {

    render() {
        return (
            <Head>{this.props.children}</Head>
        )
    }
}