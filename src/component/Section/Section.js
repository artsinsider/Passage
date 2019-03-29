import React  from 'react';
import styled from 'styled-components';
import style  from '../../Theme/GlobalVariables'

const LinkSection =styled('div')`
    height: 92.9vh;
`;

const NewsSection =styled('div')`
    border-left: 1px solid ${style.borderColor};
    border-right: 1px solid ${style.borderColor};
`;

const ViewSection =styled('div')``;

const RandomSection =styled('div')`
   border-left: 1px solid ${style.borderColor};
`;


export default class Section extends React.Component {
    render() {
        return (
            <React.Fragment>
                <LinkSection className="links-section">
                    1
                </LinkSection>
                <NewsSection className="news-section">
                  2
                </NewsSection>
                <ViewSection className="view-section">
                  3
                </ViewSection>
                <RandomSection className="random-section">
                   4
                </RandomSection>
            </React.Fragment>
        )
    }
}