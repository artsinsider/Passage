import styled from 'styled-components';

const Publick = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 50px auto ;
    height: 100vh;
    font-size:1em;
    line-height: 1.5em;
    color: #fff;
`;

const LogoName = styled.span`
    position: relative;
    margin: 10px;
    top: -17px;
    letter-spacing: 1px;
    font-size: 20px;
    color: rgba(214, 214, 255, 0.81) ;
    line-height: 36px;
`;

const Label = styled.span`
    svg {
        width: 35px;
        fill: ${props => props.theme.logoColor};
    }
`;

const Header = styled.header`
    grid-column: 1 /5;
    background: ${props => props.theme.background};
    padding: 0 20px;
    border-bottom: 1px solid ${props => props.theme.borderColor};
    box-shadow: 0px 11px 16px #0000001c;
    z-index: 10;
`;

const AuthLinks = styled.div`
     float: right;
     line-height: 2.8em;
     cursor: pointer;
     > * {
        margin: 0 10px;
     }
     
    a {
        //margin: 0 10px;
        text-decoration: none;
        color: ${props => props.theme.fontColor};
        transition: all .3s cubic-bezier(.645, .045, .355, 1);

    &:hover {
            color: #fff;
        }

    &:last-child {
            padding: 4px;
            border-radius: 5px;
            border: 1px solid rgba(255, 255, 255, .5);
        }
    }
    
    svg {
        height: 1.2em;
        width: 1.5em;
        position: relative;
        top: 7px;
        fill: ${props => props.theme.logoColor};
        transition: all .3s cubic-bezier(.645, .045, .355, 1);
        &:hover {
          fill: #fff;
        }
    }
`;

const PublickBody = styled.div`
    grid-column: 1 /5;
    background: ${props => props.theme.background};

    svg {
        width: 50em;
        height: 42em;
        position: absolute;
        left: -410px;
        opacity: .2;
        fill: ${props => props.theme.logoColor};
    }

    .brief-wisdom{
        position: absolute;
        left: 30%;
        top: 30%;
        font-family: 'Oswald', sans-serif;
        color: ${props => props.theme.fontColor}
    }
`;

const PersonName = styled.span`
    font-size: 1.2em;
`;

const Quote = styled.p`
    max-width: 700px;
    min-width: 200px;
    letter-spacing: .5px;
    font-weight: 400;
    font-size: 2em;
    line-height: 1.3em;
`;


export default  {Publick,LogoName,Label,Header,AuthLinks,PublickBody,PersonName,Quote}
