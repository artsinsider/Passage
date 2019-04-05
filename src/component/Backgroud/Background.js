import React  from 'react';
import styled from 'styled-components';
import { Transition , animated} from 'react-spring/renderprops';

export default class Background extends React.Component {
    state = {
        urls : [
            'https://cs8.pikabu.ru/post_img/big/2016/06/25/7/1466855477118559094.jpg',
            "https://rugeroi.ru/wp-content/uploads/2016/08/123-67102424.jpg",
            "https://avatars.mds.yandex.net/get-pdb/70729/5221f310-0ccf-4def-9a74-cad8dbaa9c3e/s1200",
            "http://i.ycrazy.ru/files/i/2010.11.10/1289341194_284_lincoln_continental_mark_ii_1956tau57.jpg",
            "https://cdn.fishki.net/upload/post/2018/07/31/2664634/01.jpg",
            "https://veddro.com/wp-content/uploads/sites/3/2013/12/IMG_0049.jpg",
            "https://classicretrocar.ru/wp-content/uploads/2016/10/chevrolet-impala-1967-mini.jpg",
            "https://brodude.ru/wp-content/uploads/2015/03/brodude.ru_18.03.2015_kuu1YnyXTWZqL.jpg",
            "http://npoctoblog.ru/wp-content/uploads/2014/08/DSC_1985.jpg",
            "https://f.io.ua/img_aa/full/3049/97/30499798_f.jpg",
            "http://carakoom.com/data/blogs/787/29952/image/8909079384.jpg",
            "http://chert-poberi.ru/wp-content/uploads/proga2018/images4/2k9_POQq3ZkXHP_373.jpg"
        ],
        activeImg: 0
    };
    componentDidMount() {
        // window.setInterval(() => this.nextImg() , 5000)
    }

    nextImg = () => {
        if(this.state.activeImg > this.state.urls.length - 1) {
            this.setState({activeImg: 0})
        }
      this.setState({activeImg: this.state.activeImg + 1})
        console.log('next', this.state.activeImg)
    };  // TODO template spring https://codesandbox.io/embed/7mqy09jyq

    render() {
        return (
            <WrapImg>
                <Shadow className="shadow"/>
                <Transition
                    native
                    reset
                    unique
                    items={this.state.urls[this.state.activeImg]}
                    keys={this.state.activeImg}
                    from={{ opacity: 0, transform: 'translate3d(100%,0,0)' , duration: 5000}}
                    enter={{ opacity: 1, transform: 'translate3d(0%,0,0)' , duration: 5000}}
                    leave={{ opacity: 1, transform: 'translate3d(-100%,0,0)' , duration: 5000}}

                >
                    {index=> props => index? <Images style={props} url={index}/> : null}
                </Transition>

            </WrapImg>
        )
    }
}


const WrapImg = styled('div')`
    position: absolute;
    z-index: -1;
`;

const Shadow = styled('div')`
    position: absolute;
    box-shadow: inset 0 0 200px 20px rgb(0, 0, 0);
    min-width: 100vw;
    min-height: 100vh;
    z-index: 1;
`;

const Images = styled(animated.div)`
    background-position: left center;
    max-width: 100%;
    background-image: url(${props => props.url});
    background-size: cover;
    width: 100vw;
    height: 100vh;
    background-repeat: no-repeat;
`;
