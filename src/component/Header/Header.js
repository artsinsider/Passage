import React  from 'react';
import styled from 'styled-components';

const Head = styled.header`
  background: rgba(45,45,45,0.98);
  height: 50px;
  display: grid;
  grid-template-columns: 150px auto 150px ;
  
  .logo {
    grid-column: 1/2;
    text-align: center;
    padding: 7px;
  }
  
`;

export default class Header extends React.PureComponent {

    render() {
        return (
            <Head>{this.props.children}</Head>
        )
    }
}