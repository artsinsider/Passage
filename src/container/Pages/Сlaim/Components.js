import styled from 'styled-components';

export const Claims = styled.div`
    margin: 20px 50px;
    height: 100vh;
    text-align: center;
`;

export const ListClaims = styled.div`
    display: block;
    padding: 20px 0;
    border: 1px solid #f5f5f5;
`;

export const IconMenu = styled.span`
    color: #565656;
    font-size: 20px;
    padding: 10px;
    margin: 0 5px;
    border-radius: 3px;
    cursor: pointer;
    
    &.icon-close, &.icon-menu {
           ::before {
          position: relative;
          top: 1px;
        }
    }
    
    &:hover {
      background: #f5f5f5;
    }
`;

export const SubMenu = styled.div`
    position: absolute;
    border: 1px solid #b2b2b2;
    border-radius: 3px;
    min-width: 200px;
    display: ${props => props.show ? 'inline' : 'none'};
    background: #fff;
    margin: 25px 40px 25px 0;
    z-index: 100;
    text-align: left;
    bottom: 100px;
    right: 10px;
`;

export const ItemNav = styled.span`
    padding: 10px;
    margin:${props => props.sub ? 0: ' 0 5px'};
    font-size: 20px;
    cursor: pointer;
    border-radius: ${props => props.sub ? 0: '3px'};
    color: #565656;
    display: ${props => props.sub ? 'block': 'inline-block'};
    line-height: 40px;
    white-space: nowrap;
   
    background: ${props => props.active ? '#f5f5f5': 'transparent'};
    
    ::before {
        content: '';
        background-size: 20px;
        background-repeat: no-repeat;
        background-image: url(${props => props.img});
        position: relative;
        width: 22px;
        display: inline-block;
        height: 18px;
        top: 2px;
        opacity: .8;
    }
    
    &:hover {
      background: #f5f5f5;
    }
`;

export const Restaurants = styled.div`
    border-left: 1px solid #f5f5f5;
    border-right: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fit ,minmax(300px,1fr));
    grid-template-rows: repeat(auto-fit ,minmax(300px,1fr));
    grid-gap: 50px;
    
    
    a {
        height: 300px;
        background: #fff;
        display: inline-block;
        cursor: pointer;
        text-align: initial;
        color: #000;
    }
`;

export const WrapPictures = styled.div`
    height: 65%;
    border-radius: 10px;
    overflow: hidden;
`;

export const Img = styled.div`
    background-repeat: no-repeat;
    background-image: url(${props => props.img});
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    transition:transform .3s cubic-bezier(.645, .045, .355, 1);
    background-color: #eee;   
    &:hover {
      transform: scale(1.1, 1.1);
    }
`;
export const RestaurantName = styled.div`
    padding: 10px 70px 0 0;
    position: relative;
    font-size: 25px;
    line-height: 1.2;
    font-weight: bold;
    
    ::after {
      content: '\\A0\\A0\\A0\\A0\\A0\\A0\\A0\\A0\\A0\\A0\\A0\\A0\\A0\\A0\\A0';
    }
`;

export const Raiting = styled.div`
    height: 22px;
    padding: 2px 10px;
    background: rgb(255,224,51);
    margin-left: 10px;
    border-radius: 100px;
    font-size: 15px;
    line-height: 25px;
    display: inline-block;
    position: absolute;
    right: 0;
    top: 15px;
    svg {
      margin-right: 10px;
    }
`;

export const Tags = styled.div`
    color: #b0b0b0;
    font-size: 14px;
    margin:5px 0;
    line-height: 18px;
    overflow: hidden;
`;

export const Tag = styled.span`
    &:first-child {
      ::before {
        content: '';
      }
    }
    
    ::before {
      margin: 0 6px;
      content: '•';
    }
`;