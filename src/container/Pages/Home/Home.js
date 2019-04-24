import React  from 'react';
import styled from 'styled-components';

const HomePage = styled.div`
  text-align: center;
`;

const Headline = styled.h1`
  padding: 70px 0 20px 0;
`;

const Paragraph = styled.p`
    margin: 0 auto;
    font-size: 24px;
    font-weight: 200;
    padding: 0 25%;
`;

export default class Home extends React.PureComponent {
    render() {
        return (
            <HomePage>
                <Headline>Financial literacy</Headline>
                <Paragraph>Due to ignorance in the economy and money, people are often unable to secure a decent life, even with a good salary.</Paragraph>
            </HomePage>
        )
    }
}
