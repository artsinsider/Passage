import React  from 'react';
import Star   from '../../../img/star'
import {Link} from "react-router-dom";
import {ItemNav,SubMenu,Claims,ListClaims,IconMenu,Restaurants,WrapPictures,Img,RestaurantName,Tags,Raiting,Tag} from './Components'
import requests from '../../../actions/getRecords'

export default class Claim extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            show: false,
            place: [],
            feed: [],
            activeMenuItem: 0
        };
    }
    componentDidMount() {
        requests('restaurant?limit=50', data => this.setState({place: data}));
        requests('feed', data => this.setState({feed: data}));
    }

    toggleMenu = () => this.setState({show: !this.state.show});

    buildNavMunu = () => {
        let menu = [];
        let subMenu = [];
        this.state.feed.forEach((filter, i) => {
            if(i < 7) {
                menu.push(
                    <ItemNav
                        active={this.state.activeMenuItem === filter.id}
                        onClick={this.filterMenu(filter.name, filter.id)}
                        key={filter.id}
                        img={filter.pictureUri}
                        sub={false}
                    >
                        &nbsp;{filter.name}
                    </ItemNav>
                )
            } else {
                subMenu.push(
                    <ItemNav
                        active={this.state.activeMenuItem === filter.id}
                        onClick={this.filterMenu(filter.name, filter.id)}
                        key={filter.id}
                        img={filter.pictureUri}
                        sub={true}
                    >
                        &nbsp;{filter.name}
                    </ItemNav>
                )
            }
        });

        return (
            <>
                {menu}
                <SubMenu show={this.state.show} onClick={this.toggleMenu}>
                    {subMenu}
                </SubMenu>
            </>
        )
    };

    filterMenu = (name, id) => () => {
        if(id) {
            const filterTags = this.props.restaurant.filter(item => item.place.tags.find(tag => tag.name === name));
            this.setState({place: filterTags, activeMenuItem: id});
            return
        }
        this.setState({place: this.props.restaurant})
    };

    render() {
        const {show, place} = this.state;
        console.log(this.state)
        return (
            <Claims>
                <ListClaims>
                    {this.buildNavMunu()}
                    <IconMenu className= {show ? "icon-close":"icon-menu"} onClick={this.toggleMenu}>
                        <span>Ещё</span>
                    </IconMenu>
                </ListClaims>

                <Restaurants>
                    {place.map(rest =>
                        <Link key={rest.place.id} to={`/claim/${rest.place.slug}`} >
                            <WrapPictures>
                                <Img img={rest.place.picture.uri}/>
                            </WrapPictures>
                            <RestaurantName>
                                {rest.place.name}
                                <Raiting><Star/>{rest.place.rating}</Raiting>
                            </RestaurantName>
                            <Tags>
                                {rest.place.tags.map((tag ,i) => i <= 1 ? <Tag key={tag.id}>{tag.name}</Tag> : null)}
                            </Tags>

                        </Link>
                    )}
                </Restaurants>
            </Claims>
        )
    }
}