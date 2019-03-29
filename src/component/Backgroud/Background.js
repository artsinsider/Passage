import React  from 'react';
import styled from 'styled-components';

const WarapImg = styled('div')`
    position: absolute;
    z-index: -1;
`;

const Shadow = styled('div')`
    position: absolute;
    box-shadow: inset 0 0 200px 20px rgb(0, 0, 0);
    min-width: 100vw;
    min-height: 100vh;
`;

const Images = styled('img')`
    position: absolute;
    z-index: -3;
    height: 100vh;
    background-position: top center;
`;

export default class Background extends React.Component {
    state = {
        urls : [
            'https://cs8.pikabu.ru/post_img/big/2016/06/25/7/1466855477118559094.jpg',
            "https://rugeroi.ru/wp-content/uploads/2016/08/123-67102424.jpg"
        ]
    }
    render() {
        return (
            <WarapImg>
                <Shadow className="shadow"/>
                <Images src={this.state.urls[0]}/>
            </WarapImg>
        )
    }
}