import React  from 'react';
import {HomePage, MenuItem,RestaurantPageContent, WrapperCategories, Categories, Category,More, Content, Menu, CategoriItem, Img, WrapPictures,
    Dish, DishName,Weight,Price, DishDescription, Group} from './Component';
import requests from '../../../actions/getRecords'
import constant from '../../../constants/constants';
import Descriptions from '../../../component/Description/Description'

export default class Home extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            description:{},
            restaurantMenu: []
        }
    }

    componentDidMount() {
        requests(`description/${this.props.match.params.restaurant}`,
                data =>this.setState({description: data.place}));

        requests(`restaurantMenu/${this.props.match.params.restaurant}`,
                data =>this.setState({restaurantMenu: data}));
    }

    getUriImageHead = (pictures, size) => {
        if(pictures) {
            const regex = /{w}x{h}/gmi;
            return `${constant.IMG_BASE_URL}${pictures.uri.replace(regex, size || `${window.innerWidth}x${window.innerHeight}`)}`;
        }
       return ''
    };

    render() {
        const {restaurantMenu} = this.state;
        return (
            <HomePage>
                <Descriptions {...this.props}/>
                <RestaurantPageContent>
                    <MenuItem>
                        <WrapperCategories>
                            <Categories>
                                {restaurantMenu.map( item => {
                                    return <Category key={item.id} >{item.name}</Category>
                                })}
                                <More className="icon-arrow_right" >Ещё</More>
                            </Categories>
                        </WrapperCategories>
                        <Content>
                            {restaurantMenu.map(contentItem =>
                            <Menu  key={contentItem.id}>
                                <div>
                                    <div className="group-name">{contentItem.name}</div>
                                    <CategoriItem>
                                        {contentItem.items.map(dish =>
                                            <Dish key={dish.id} >
                                                <Group>
                                                    <DishName>
                                                        {dish.name}
                                                        <Weight> {dish.weight}</Weight>
                                                    </DishName>
                                                    <Price>{dish.price}</Price>
                                                </Group>


                                                <DishDescription>
                                                    {dish.description}
                                                </DishDescription>

                                                <WrapPictures>
                                                    <Img img={this.getUriImageHead(dish.picture,'450x300')} alt=""/>
                                                </WrapPictures>

                                            </Dish>
                                        )}
                                    </CategoriItem>
                                </div>

                            </Menu>
                            )}
                        </Content>
                    </MenuItem>
                </RestaurantPageContent>
            </HomePage>
        )
    }
}