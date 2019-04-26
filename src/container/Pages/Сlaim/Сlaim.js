import React  from 'react';
import styled from 'styled-components';
import Star   from '../../../img/star'
import {Link} from "react-router-dom";
const Claims = styled.div`
    margin: 20px 50px;
    height: 100vh;
    text-align: center;
`;

const ListClaims = styled.div`
    display: block;
    padding: 20px 0;
    border: 1px solid #f5f5f5;
`;

const IconMenu = styled.span`
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

const SubMenu = styled.div`
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

const ItemNav = styled.span`
    padding: 10px;
    margin:${props => props.sub ? 0: ' 0 5px'};
    font-size: 20px;
    cursor: pointer;
    border-radius: ${props => props.sub ? 0: '3px'};
    color: #565656;
    display: ${props => props.sub ? 'block': 'inline-block'};
    line-height: 40px;
    white-space: nowrap;
    
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

const Restaurants = styled.div`
    border-left: 1px solid #f5f5f5;
    border-right: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fit ,minmax(300px,1fr));
    grid-template-rows: repeat(auto-fit ,minmax(300px,1fr));
    grid-column-gap: 10px;
    
    
    a {
        width: 300px;
        height: 300px;
        background: #fff;
        padding: 10px;
        display: inline-block;
        cursor: pointer;
        text-align: initial;
    }
`;

// const Restaurant = styled.a`
//
// `;

const WrapPictures = styled.div`
    height: 65%;
    border-radius: 10px;
    overflow: hidden;
`;

const Img = styled.div`
    background-repeat: no-repeat;
    background-image: url(${props => props.img});
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    transition:transform .3s cubic-bezier(.645, .045, .355, 1);
    
    &:hover {
      transform: scale(1.1, 1.1);
    }
`;
const RestaurantName = styled.div`
    padding: 10px 70px 0 0;
    position: relative;
    font-size: 25px;
    line-height: 1.2;
    font-weight: bold;
    
    ::after {
      content: '\\A0\\A0\\A0\\A0\\A0\\A0\\A0\\A0\\A0\\A0\\A0\\A0\\A0\\A0\\A0';
    }
`;

const Raiting = styled.div`
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

const Tags = styled.div`
    color: #b0b0b0;
    font-size: 14px;
    margin:5px 0;
    line-height: 18px;
    overflow: hidden;
`;

const Tag = styled.span`
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


export default class Claim extends React.PureComponent {
    state = {
        show: false
    };

    toggleMenu = () => this.setState({show: !this.state.show});

    buildNavMunu = () => {
        let menu = [];
        let subMenu = [];
        quickFilter.forEach((filter, i) => {
            if(i < 7) {
                menu.push( <ItemNav key={filter.id} img={filter.pictureUri} sub={false} >&nbsp;{filter.name}</ItemNav>)
            } else {
                subMenu.push(<ItemNav key={filter.id} img={filter.pictureUri} sub={true} >&nbsp;{filter.name}</ItemNav>)
            }
        });

        return <>
                    {menu}
                    <SubMenu show={this.state.show} onClick={this.toggleMenu} >
                        {subMenu}
                    </SubMenu>
               </>
    };

    render() {
        const {show} = this.state;
        return (
            <Claims>

                <ListClaims>
                    {this.buildNavMunu()}
                    <IconMenu className= {show ? "icon-close":"icon-menu"} onClick={this.toggleMenu}>
                        <span>
                            Ещё
                        </span>
                    </IconMenu>
                </ListClaims>

                <Restaurants>
                    {foundPlaces.map(rest =>
                        <Link key={rest.place.id} to={{pathname: `/claim/${rest.place.slug}` , state:{modal: true}}} >
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

const quickFilter = [
    {
        "id":0,
        "name":"Все",
        "slug":"all",
        "genitive":"все",
        "pictureUri":""
    },
    {
        "id":27,
        "name":"Постное",
        "slug":"postnoe",
        "genitive":"постного меню",
        "pictureUri":"https://eda.yandex/images/quick_filters/11d0/1387779-11d0301606d99d93bcba8afbc7ab6417.png"
    },
    {
        "id":3,
        "name":"Бургеры",
        "slug":"burger",
        "genitive":"бургеров",
        "pictureUri":"https://eda.yandex/images/quick_filters/3c05/1370147-3c05d89f3fa0d94395f3c9e1f66c5295.png"
    },
    {
        "id":5,
        "name":"Суши",
        "slug":"sushi",
        "genitive":"суши и роллов",
        "pictureUri":"https://eda.yandex/images/quick_filters/22b1/1368744-22b13338eb57ea4cc1bb73c8e117ca21.png"
    },
    {
        "id":7,
        "name":"Пицца",
        "slug":"pizza",
        "genitive":"пиццы",
        "pictureUri":"https://eda.yandex/images/quick_filters/41d3/1370147-41d38ec3605ce8392adf409e9b37765b.png"
    },
    {
        "id":54,
        "name":"Фудмолл",
        "slug":"depo",
        "genitive":"из фудмолла «Депо»",
        "pictureUri":"https://eda.yandex/images/quick_filters/5f9f/1368744-5f9f2938c3e398f223a7b14540c6aeb0.png"
    },
    {
        "id":9,
        "name":"Здоровая еда",
        "slug":"zdorovaya-eda",
        "genitive":"здоровой еды",
        "pictureUri":"https://eda.yandex/images/quick_filters/d73a/1387779-d73a70edfbf3ca3d9c157959025e4a70.png"
    },
    {
        "id":11,
        "name":"Итальянская",
        "slug":"italyanskaya",
        "genitive":"блюд итальянской кухни",
        "pictureUri":"https://eda.yandex/images/quick_filters/bb59/1380298-bb59164421feb26ad9b3ffbd96c7f55d.png"
    },
    {
        "id":13,
        "name":"Вегги",
        "slug":"vegetarian",
        "genitive":"вегетарианских блюд",
        "pictureUri":"https://eda.yandex/images/quick_filters/be1f/1387779-be1f24480579a03eb60c6528a81eb482.png"
    },
    {
        "id":51,
        "name":"Шаверма",
        "slug":"shaverma",
        "genitive":"шавермы",
        "pictureUri":"https://eda.yandex/images/quick_filters/7eb7/1368744-7eb79169054839e801225ebcdcc22c13.png"
    },
    {
        "id":15,
        "name":"Стейки",
        "slug":"stejki",
        "genitive":"стейков",
        "pictureUri":"https://eda.yandex/images/quick_filters/3f28/1387779-3f287a9487e13a31e40038e6a6b9d4d8.png"
    },
    {
        "id":17,
        "name":"Десерты",
        "slug":"deserti",
        "genitive":"десертов",
        "pictureUri":"https://eda.yandex/images/quick_filters/b2c6/1387779-b2c604e2e483f055bb3ea643fce5ee97.png"
    },
    {
        "id":19,
        "name":"Грузинская",
        "slug":"gruzinskaya",
        "genitive":"блюд грузинской кухни",
        "pictureUri":"https://eda.yandex/images/quick_filters/d592/1387779-d592dc20250aa916ce89d1162941d2c3.png"
    },
    {
        "id":21,
        "name":"Завтраки",
        "slug":"zavtraki",
        "genitive":"завтраков",
        "pictureUri":"https://eda.yandex/images/quick_filters/2a8c/1370147-2a8c3810ebb67a1af85ef0116150f6e9.png"
    },
    {
        "id":23,
        "name":"Русская",
        "slug":"russkaya",
        "genitive":"блюд русской кухни",
        "pictureUri":"https://eda.yandex/images/quick_filters/fa38/1370147-fa3844d67df326d95faea4362ba65bd8.png"
    },
    {
        "id":25,
        "name":"Для детей",
        "slug":"detskoe",
        "genitive":"блюд для детей",
        "pictureUri":"https://eda.yandex/images/quick_filters/cf3f/1370147-cf3fcc2627190b6fa3dbea7b0f55ecc7.png"
    },
    {
        "id":47,
        "name":"Лапша Вок",
        "slug":"wok",
        "genitive":"лапши вок",
        "pictureUri":"https://eda.yandex/images/quick_filters/621b/1380157-621b55bb4bce986465ed1dae24334f38.png"
    },
    {
        "id":33,
        "name":"Пироги",
        "slug":"pirogi",
        "genitive":"пирогов",
        "pictureUri":"https://eda.yandex/images/quick_filters/0915/1380298-0915afd3af90f48856a75663f12f2047.png"
    },
    {
        "id":49,
        "name":"Шашлык",
        "slug":"shashlyk",
        "genitive":"шашлыка",
        "pictureUri":"https://eda.yandex/images/quick_filters/3189/1368744-318909aa345cabca778fded1d309c8de.png"
    }
];

const foundPlaces =[
        {
            "place":{
                "id":48032,
                "name":"Тануки",
                "description":null,
                "slug":"tanuki_borprud",
                "market":false,
                "tags":[
                    {
                        "id":33,
                        "name":"Суши"
                    },
                    {
                        "id":52,
                        "name":"Японская"
                    },
                    {
                        "id":599,
                        "name":"Детское меню"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":5,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/cbe9/1368744-cbe98a25e7f538ffedc785627726ede3-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"НИКА\", 115211, Москва г, Борисовские Пруды ул, дом № 10, этаж 2, помещение 1, ИНН 7707800413, рег.номер 1137746265766.<br/>Режим работы ресторана: с 10:00 до 23:30",
                "deliveryConditions":"Доставка 99 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"улица Борисовские пруды, 10",
                    "location":{
                        "latitude":55.635869,
                        "longitude":37.740974
                    }
                }
            }
        },
        {
            "place":{
                "id":408,
                "name":"Кофемания",
                "description":null,
                "slug":"Coffeemania_Kudrinskaya",
                "market":false,
                "tags":[
                    {
                        "id":170,
                        "name":"Здоровая еда"
                    },
                    {
                        "id":192,
                        "name":"Десерты"
                    },
                    {
                        "id":235,
                        "name":"Завтраки"
                    },
                    {
                        "id":591,
                        "name":"Салаты"
                    },
                    {
                        "id":599,
                        "name":"Детское меню"
                    },
                    {
                        "id":595,
                        "name":"Постное меню"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":5,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/f545/1368744-f54506df6cdcfc195e51d666650cee9b-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ФИЛИАС\", 117415, Москва г, Удальцова ул, дом № 1, ИНН 7729399636, рег.номер 1027739493594.<br/>Режим работы ресторана: с 00:00 до 24:00",
                "deliveryConditions":"Доставка 99 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Кудринская площадь, 46/54",
                    "location":{
                        "latitude":55.75826,
                        "longitude":37.585467
                    }
                }
            }
        },
        {
            "place":{
                "id":59091,
                "name":"Макдоналдс",
                "description":null,
                "slug":"mcd_micr1",
                "market":false,
                "tags":[
                    {
                        "id":569,
                        "name":"Бургеры"
                    },
                    {
                        "id":593,
                        "name":"Выпечка"
                    }
                ],
                "priceCategory":{
                    "id":1,
                    "name":"₽",
                    "value":0
                },
                "rating":4.9,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":true,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/c741/1387779-c741a77ebc1a29c504fb950692c6345c-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"МАКДОНАЛДС\", 115054, Москва г, Валовая ул, дом № 26, ИНН 7710044140, рег.номер 1027700251754.<br/>Информация о потребительских свойствах продукции доступна в ресторане и на <a href=\"https://mcdonalds.ru/materials/consumer-properties.pdf\">сайте</a>.<br/>Режим работы ресторана: с 11:00 до 23:30",
                "deliveryConditions":"Доставка 99 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Химки",
                    "short":"8-й микрорайон, 1",
                    "location":{
                        "latitude":55.910871,
                        "longitude":37.396093
                    }
                }
            }
        },
        {
            "place":{
                "id":54374,
                "name":"Теремок",
                "description":null,
                "slug":"teremok-nar",
                "market":false,
                "tags":[
                    {
                        "id":8,
                        "name":"Русская"
                    },
                    {
                        "id":595,
                        "name":"Постное меню"
                    }
                ],
                "priceCategory":{
                    "id":1,
                    "name":"₽",
                    "value":0
                },
                "rating":4.9,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/62dc/1387779-62dcf4c034cb5f623a22c56324b0e0de-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): АО \"ТЕРЕМОК-ИНВЕСТ\", 129281, Москва г, Менжинского ул, дом № 38, корпус 2, строение 2, этаж 1, помещение III, комната 16, ИНН 7734506918, рег.номер 1037789074080.<br/>Режим работы ресторана: с 09:00 до 21:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"улица Народного Ополчения, 46к1",
                    "location":{
                        "latitude":55.792989,
                        "longitude":37.49365
                    }
                }
            }
        },
        {
            "place":{
                "id":51885,
                "name":"Pizza Hut",
                "description":null,
                "slug":"pizza_hut_gol",
                "market":false,
                "tags":[
                    {
                        "id":59,
                        "name":"Американская"
                    },
                    {
                        "id":192,
                        "name":"Десерты"
                    },
                    {
                        "id":34,
                        "name":"Пицца"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.9,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/92b1/1380157-92b1197b15c9a1217a342a73d61be65c-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО «ПИЦЦА РУС», 119002, г. Москва, ул. Арбат, д. 44, стр. 1, подвал I, часть ком. 16, ИНН 7719752362, рег.номер 1107746466410.<br/>Режим работы ресторана: с 10:00 до 22:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Головинское шоссе, 5, подъезд 1",
                    "location":{
                        "latitude":55.839542,
                        "longitude":37.490739
                    }
                }
            }
        },
        {
            "place":{
                "id":50211,
                "name":"Хачапури",
                "description":null,
                "slug":"Hachapuri_gnezdikovskiy1",
                "market":false,
                "tags":[
                    {
                        "id":631,
                        "name":"Шашлык"
                    },
                    {
                        "id":326,
                        "name":"Грузинская"
                    },
                    {
                        "id":599,
                        "name":"Детское меню"
                    },
                    {
                        "id":235,
                        "name":"Завтраки"
                    },
                    {
                        "id":27,
                        "name":"Пироги"
                    },
                    {
                        "id":8,
                        "name":"Русская"
                    },
                    {
                        "id":595,
                        "name":"Постное меню"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.9,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/374b/1370147-374b26fabb39608abd9462393bcbe562-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ГНЕЗДО\", 127055, Москва г, Палиха ул, дом № 7-9, корпус 4, помещение 1, комната 1, офис 47, ИНН 7707419529, рег.номер 1187746797787.<br/>Режим работы ресторана: с 10:00 до 22:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Большой Гнездниковский переулок, 10",
                    "location":{
                        "latitude":55.763067,
                        "longitude":37.605831
                    }
                }
            }
        },
        {
            "place":{
                "id":47594,
                "name":"Christian",
                "description":null,
                "slug":"christian_msk",
                "market":false,
                "tags":[
                    {
                        "id":9,
                        "name":"Итальянская"
                    },
                    {
                        "id":591,
                        "name":"Салаты"
                    },
                    {
                        "id":595,
                        "name":"Постное меню"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.9,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/05d3/1380298-05d3d3f75ff0f424f9b44e9900356426-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"КРИСТИАН\", 121248, Москва г, Кутузовский пр-кт, дом № 2/1, корпус 1А, ИНН 7730234558, рег.номер 1177746415659.<br/>Режим работы ресторана: с 12:00 до 23:15",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Кутузовский проспект, 2/1к1А",
                    "location":{
                        "latitude":55.750712,
                        "longitude":37.564904
                    }
                }
            }
        },
        {
            "place":{
                "id":42205,
                "name":"Воккер",
                "description":null,
                "slug":"vokker_pro",
                "market":false,
                "tags":[
                    {
                        "id":7,
                        "name":"Китайская"
                    },
                    {
                        "id":58,
                        "name":"Паназиатская"
                    },
                    {
                        "id":626,
                        "name":"Вок"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.9,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/2dbe/1387779-2dbe375d98d0667989a873165fe4fef2-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ИП Аверкиев Антон Евгеньевич, я, ИНН 772774697068, рег.номер 315774600343391.<br/>Режим работы ресторана: с 10:00 до 21:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"проспект Мира, 211к2",
                    "location":{
                        "latitude":55.845855,
                        "longitude":37.662093
                    }
                }
            }
        },
        {
            "place":{
                "id":39382,
                "name":"Ketch Up",
                "description":null,
                "slug":"KetchUp_kuznetsky",
                "market":false,
                "tags":[
                    {
                        "id":59,
                        "name":"Американская"
                    },
                    {
                        "id":115,
                        "name":"Европейская"
                    },
                    {
                        "id":569,
                        "name":"Бургеры"
                    },
                    {
                        "id":1,
                        "name":"Стейки"
                    },
                    {
                        "id":192,
                        "name":"Десерты"
                    },
                    {
                        "id":235,
                        "name":"Завтраки"
                    },
                    {
                        "id":170,
                        "name":"Здоровая еда"
                    },
                    {
                        "id":595,
                        "name":"Постное меню"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.9,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/daba/1370147-daba5812193c06e73899b35d664228aa-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"СТУДИЯ 77\", 198206, Санкт-Петербург г, Петергофское ш, дом № 73, корпус 13, помещение 3/1/2, ИНН 7813256403, рег.номер 1167847290775.<br/>Режим работы ресторана: с 00:00 до 24:00",
                "deliveryConditions":"Доставка 39-99 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"улица Кузнецкий Мост, 6/3",
                    "location":{
                        "latitude":55.761224,
                        "longitude":37.617572
                    }
                }
            }
        },
        {
            "place":{
                "id":30670,
                "name":"Steak It Easy",
                "description":null,
                "slug":"steak_it_easy_arbat",
                "market":false,
                "tags":[
                    {
                        "id":1,
                        "name":"Стейки"
                    },
                    {
                        "id":9,
                        "name":"Итальянская"
                    },
                    {
                        "id":59,
                        "name":"Американская"
                    },
                    {
                        "id":569,
                        "name":"Бургеры"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.9,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/9f4a/1387779-9f4a0752993b1d4c6496f5420cad31d1-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"МОНТОНИКО\", 125167, Москва г, Ленинградский пр-кт, дом № 50, комната 6, ИНН 7714396255, рег.номер 1167746644504.<br/>Режим работы ресторана: с 00:00 до 05:30; с 11:00 до 24:00",
                "deliveryConditions":"Доставка 39-99 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"улица Новый Арбат, 21",
                    "location":{
                        "latitude":55.75204,
                        "longitude":37.586158
                    }
                }
            }
        },
        {
            "place":{
                "id":27664,
                "name":"Prime",
                "description":null,
                "slug":"Prime_Pokryshkina4",
                "market":false,
                "tags":[
                    {
                        "id":39,
                        "name":"Вегетарианская"
                    },
                    {
                        "id":115,
                        "name":"Европейская"
                    },
                    {
                        "id":170,
                        "name":"Здоровая еда"
                    },
                    {
                        "id":593,
                        "name":"Выпечка"
                    },
                    {
                        "id":235,
                        "name":"Завтраки"
                    }
                ],
                "priceCategory":{
                    "id":1,
                    "name":"₽",
                    "value":0
                },
                "rating":4.9,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/151f/1387779-151f50038f42a53fda48bbb896b07252-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ПРАЙМСТАР РЕСТОРАНТС ГРУПП\", 121471, Москва г, Рябиновая ул, дом № 55, строение 29, ИНН 7729669890, рег.номер 1107746986720.<br/>Режим работы ресторана: с 10:00 до 15:00",
                "deliveryConditions":"Доставка 99 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"улица Покрышкина, 4",
                    "location":{
                        "latitude":55.665061,
                        "longitude":37.481487
                    }
                }
            }
        },
        {
            "place":{
                "id":27355,
                "name":"АндерСон",
                "description":null,
                "slug":"anderson_bratisl",
                "market":false,
                "tags":[
                    {
                        "id":40,
                        "name":"Домашняя"
                    },
                    {
                        "id":115,
                        "name":"Европейская"
                    },
                    {
                        "id":599,
                        "name":"Детское меню"
                    },
                    {
                        "id":593,
                        "name":"Выпечка"
                    },
                    {
                        "id":235,
                        "name":"Завтраки"
                    },
                    {
                        "id":595,
                        "name":"Постное меню"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.9,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/a320/1380298-a32063f8d7763642bcab62d2557e264d-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ТИРОЛЕРХОФ\", 129110, Москва г, Гиляровского ул, дом № 39, строение 3, ИНН 7734351485, рег.номер 1157746319719.<br/>Режим работы ресторана: с 10:00 до 21:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Братиславская улица, 6",
                    "location":{
                        "latitude":55.664055,
                        "longitude":37.753245
                    }
                }
            }
        },
        {
            "place":{
                "id":24890,
                "name":"IL Патио",
                "description":null,
                "slug":"il_patio_prospektmira",
                "market":false,
                "tags":[
                    {
                        "id":9,
                        "name":"Итальянская"
                    },
                    {
                        "id":34,
                        "name":"Пицца"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.9,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/ef99/1370147-ef997af5fa52118e8c85fde1201dafa6-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"РОСИНТЕР РЕСТОРАНТС\", 111024, Москва г, Душинская ул, дом № 7, корпус 1, ИНН 7737115648, рег.номер 1027739718280.<br/>Режим работы ресторана: с 10:30 до 23:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"проспект Мира, 33к1",
                    "location":{
                        "latitude":55.780319,
                        "longitude":37.632098
                    }
                }
            }
        },
        {
            "place":{
                "id":18059,
                "name":"Папа Джонс",
                "description":null,
                "slug":"PapaJohns_11",
                "market":false,
                "tags":[
                    {
                        "id":34,
                        "name":"Пицца"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.9,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/a01e/1380157-a01ec0ce522c4d5e2f691bb5741750d3-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ТЭЙК ЭВЕЙ\", 129366, г. Москва, ул. Ярославская, д. 17, комн. 3, ИНН 7733263540, рег.номер 5157746182260.<br/>Режим работы ресторана: с 11:00 до 22:45",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Мичуринский проспект, 7к1",
                    "location":{
                        "latitude":55.701719,
                        "longitude":37.512236
                    }
                }
            }
        },
        {
            "place":{
                "id":11607,
                "name":"Бургер & Фрайс от Мираторг",
                "description":null,
                "slug":"BurgerFries_Mir",
                "market":false,
                "tags":[
                    {
                        "id":569,
                        "name":"Бургеры"
                    },
                    {
                        "id":235,
                        "name":"Завтраки"
                    },
                    {
                        "id":59,
                        "name":"Американская"
                    },
                    {
                        "id":115,
                        "name":"Европейская"
                    },
                    {
                        "id":1,
                        "name":"Стейки"
                    }
                ],
                "priceCategory":{
                    "id":1,
                    "name":"₽",
                    "value":0
                },
                "rating":4.9,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[
                    {
                        "id":2115,
                        "type":{
                            "id":2,
                            "name":"05. 1+1: Второе блюдо в подарок",
                            "pictureUri":"/images/promos/5b73/1370147-5b73e9d999e2a.png",
                            "detailedPictureUrl":null
                        },
                        "name":"Два по цене одного",
                        "description":"При заказе блюда по акции второе такое же бесплатно"
                    }
                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/f7da/1370147-f7daa2bfbfc1b3f5f5329b33d4f8f2f3-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Полные правила проведения рекламной акции &laquo;Два по цене одного&raquo; доступны по <a target=\"_blank\" rel=\"noopener\" href=\"https://eda.yandex/p/legal-promo1plus1\">ссылке</a>.<br/>Исполнитель (продавец): ООО \"ПРОДМИР\", 115516, Москва г, Кавказский б-р, дом № 57, ИНН 5009074197, рег.номер 1105009001932.<br/>Режим работы ресторана: с 11:30 до 21:30",
                "deliveryConditions":"Доставка 99 ₽",
                "promoTypes":[
                    {
                        "id":2,
                        "name":"05. 1+1: Второе блюдо в подарок",
                        "pictureUri":"/images/promos/5b73/1370147-5b73e9d999e2a.png",
                        "detailedPictureUrl":null
                    }
                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Мытищи",
                    "short":"улица Мира, с32/2",
                    "location":{
                        "latitude":55.921148,
                        "longitude":37.71936
                    }
                }
            }
        },
        {
            "place":{
                "id":7231,
                "name":"Subway",
                "description":null,
                "slug":"subway_suchevskaya",
                "market":false,
                "tags":[
                    {
                        "id":59,
                        "name":"Американская"
                    },
                    {
                        "id":587,
                        "name":"Сэндвичи"
                    },
                    {
                        "id":170,
                        "name":"Здоровая еда"
                    },
                    {
                        "id":235,
                        "name":"Завтраки"
                    }
                ],
                "priceCategory":{
                    "id":1,
                    "name":"₽",
                    "value":0
                },
                "rating":4.9,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/415a/1380298-415a1549b4d31e399d44d14e644fc792-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ВЕРТИКАЛЬ-ВКС\", 125635, Москва г, Ангарская ул, дом № 6, этаж 1, помещение III, комната 3, офис 24, ИНН 7743836366, рег.номер 1117746943588.<br/>Режим работы ресторана: с 08:00 до 21:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"Сущёвская улица, 19с5",
                    "location":{
                        "latitude":55.781843,
                        "longitude":37.601457
                    }
                }
            }
        },
        {
            "place":{
                "id":6555,
                "name":"Три правила",
                "description":null,
                "slug":"tripravila_michurinski",
                "market":false,
                "tags":[
                    {
                        "id":9,
                        "name":"Итальянская"
                    },
                    {
                        "id":59,
                        "name":"Американская"
                    },
                    {
                        "id":115,
                        "name":"Европейская"
                    },
                    {
                        "id":393,
                        "name":"Мексиканская"
                    },
                    {
                        "id":593,
                        "name":"Выпечка"
                    },
                    {
                        "id":235,
                        "name":"Завтраки"
                    }
                ],
                "priceCategory":{
                    "id":1,
                    "name":"₽",
                    "value":0
                },
                "rating":4.9,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/f47d/1380298-f47d3f8fabad936adf035313a82c416b-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"СПТ\", 105523, Москва г, Щёлковское ш, дом № 100, корпус 1А, этаж 1, помещение 12, ИНН 7719892786, рег.номер 5147746233432.<br/>Режим работы ресторана: с 10:00 до 21:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"улица Мичуринский Проспект, Олимпийская Деревня, 3к1",
                    "location":{
                        "latitude":55.677951,
                        "longitude":37.466637
                    }
                }
            }
        },
        {
            "place":{
                "id":2657,
                "name":"Якитория",
                "description":null,
                "slug":"Yakitoriya",
                "market":false,
                "tags":[
                    {
                        "id":33,
                        "name":"Суши"
                    },
                    {
                        "id":34,
                        "name":"Пицца"
                    },
                    {
                        "id":52,
                        "name":"Японская"
                    },
                    {
                        "id":569,
                        "name":"Бургеры"
                    },
                    {
                        "id":611,
                        "name":"Морепродукты"
                    },
                    {
                        "id":613,
                        "name":"Лапша"
                    },
                    {
                        "id":599,
                        "name":"Детское меню"
                    },
                    {
                        "id":595,
                        "name":"Постное меню"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.9,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/d4f1/1368744-d4f1ed5f64f6cc6b4275001e77d47193-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ЭТЕЛЬ ЛЮКС \", 121614, Москва г, Осенний б-р, дом № 18, корпус 1, этаж 1, помещение I, комната 18, ИНН 7714262251, рег.номер 1027700025451.<br/>Режим работы ресторана: с 10:00 до 23:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"Осенний бульвар, 18к1",
                    "location":{
                        "latitude":55.761766,
                        "longitude":37.40866
                    }
                }
            }
        },
        {
            "place":{
                "id":1060,
                "name":"Хлеб Насущный",
                "description":null,
                "slug":"HlebNasushchnyj_Smolenskiy",
                "market":false,
                "tags":[
                    {
                        "id":39,
                        "name":"Вегетарианская"
                    },
                    {
                        "id":170,
                        "name":"Здоровая еда"
                    },
                    {
                        "id":192,
                        "name":"Десерты"
                    },
                    {
                        "id":235,
                        "name":"Завтраки"
                    },
                    {
                        "id":587,
                        "name":"Сэндвичи"
                    },
                    {
                        "id":599,
                        "name":"Детское меню"
                    },
                    {
                        "id":595,
                        "name":"Постное меню"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.9,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/8911/1380298-89118bf875a30fbce4dae6dc4f4e2170-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ВЕРМОНТ\", 109240, Москва г, Радищевская Ниж ул, дом № 5, строение 3, помещение V, этаж 1, комната 1, ИНН 9705083820, рег.номер 5167746445125.<br/>Режим работы ресторана: с 08:00 до 22:00",
                "deliveryConditions":"Доставка 99 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"2-й Смоленский переулок, 1/4",
                    "location":{
                        "latitude":55.747024,
                        "longitude":37.581523
                    }
                }
            }
        },
        {
            "place":{
                "id":986,
                "name":"Академия",
                "description":null,
                "slug":"Akademia_Novinskiy",
                "market":false,
                "tags":[
                    {
                        "id":9,
                        "name":"Итальянская"
                    },
                    {
                        "id":34,
                        "name":"Пицца"
                    },
                    {
                        "id":52,
                        "name":"Японская"
                    },
                    {
                        "id":115,
                        "name":"Европейская"
                    },
                    {
                        "id":8,
                        "name":"Русская"
                    },
                    {
                        "id":593,
                        "name":"Выпечка"
                    },
                    {
                        "id":599,
                        "name":"Детское меню"
                    },
                    {
                        "id":595,
                        "name":"Постное меню"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.9,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/9d45/1387779-9d45c30a0d02bbaebd5c6c68da1facb1-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"АКАДЕМИЯ-НОВИНСКИЙ\", 123242, Москва г, Новинский б-р, дом № 31, этаж 1, помещение I, комната 20, ИНН 7730201714, рег.номер 1167746394232.<br/>Режим работы ресторана: с 08:00 до 22:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"Новинский бульвар, 31",
                    "location":{
                        "latitude":55.757779,
                        "longitude":37.582619
                    }
                }
            }
        },
        {
            "place":{
                "id":201,
                "name":"UDCкафе Upside Down Cake",
                "description":null,
                "slug":"UpsideDownCake-Metropolis",
                "market":false,
                "tags":[
                    {
                        "id":59,
                        "name":"Американская"
                    },
                    {
                        "id":192,
                        "name":"Десерты"
                    },
                    {
                        "id":235,
                        "name":"Завтраки"
                    },
                    {
                        "id":599,
                        "name":"Детское меню"
                    },
                    {
                        "id":569,
                        "name":"Бургеры"
                    },
                    {
                        "id":115,
                        "name":"Европейская"
                    },
                    {
                        "id":595,
                        "name":"Постное меню"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.9,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/9f09/1370147-9f096a457ee548cf9d086cb7e60d53b1-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"КОРНЕР-ГРИЛЬ\", 119121, Москва г, Смоленский б-р, дом № 13, строение 6, комната 12, ИНН 7704870356, рег.номер 1147746868774.<br/>Режим работы ресторана: с 09:00 до 22:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Ленинградское шоссе, 16Ас4",
                    "location":{
                        "latitude":55.823292,
                        "longitude":37.4978
                    }
                }
            }
        },
        {
            "place":{
                "id":11,
                "name":"Torro Grill",
                "description":null,
                "slug":"Torro-grill-belorusskaya",
                "market":false,
                "tags":[
                    {
                        "id":59,
                        "name":"Американская"
                    },
                    {
                        "id":569,
                        "name":"Бургеры"
                    },
                    {
                        "id":1,
                        "name":"Стейки"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.9,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/8ff5/1380298-8ff5003246750c64c22201af7822facc-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"СЕРЫЙ БЫК\", 140006, Московская обл, Люберцы г, Южная ул, дом № 32А, литера Б, офис 5, ИНН 7709750359, рег.номер 1077758299728.<br/>Режим работы ресторана: с 00:00 до 24:00",
                "deliveryConditions":"Доставка 99 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Лесная улица, 5сБ",
                    "location":{
                        "latitude":55.778274,
                        "longitude":37.586859
                    }
                }
            }
        },
        {
            "place":{
                "id":55337,
                "name":"Корчма Тарас Бульба",
                "description":null,
                "slug":"TarasBulbaKorchmaa",
                "market":false,
                "tags":[
                    {
                        "id":589,
                        "name":"Украинская"
                    },
                    {
                        "id":599,
                        "name":"Детское меню"
                    },
                    {
                        "id":235,
                        "name":"Завтраки"
                    },
                    {
                        "id":593,
                        "name":"Выпечка"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/475a/1370147-475a5d2b223ab8c250de8c2a70f2a913-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"Гуд Драйв\", 143432, МО, Красногорский р-н, рп Нахабино, ул. Чкалова, дом 7, этаж подвальный, помещение XCVII, ИНН 5024187364, рег.номер 1185053019997.<br/>Режим работы ресторана: с 10:00 до 21:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"Пятницкая улица, 14с1",
                    "location":{
                        "latitude":55.743081,
                        "longitude":37.627921
                    }
                }
            }
        },
        {
            "place":{
                "id":52245,
                "name":"Припек",
                "description":null,
                "slug":"pripek-depo",
                "market":false,
                "tags":[
                    {
                        "id":645,
                        "name":"Фудмолл «Депо»"
                    },
                    {
                        "id":8,
                        "name":"Русская"
                    },
                    {
                        "id":30,
                        "name":"Авторская"
                    }
                ],
                "priceCategory":{
                    "id":1,
                    "name":"₽",
                    "value":0
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/02c9/1387779-02c94c36dd288910ae323da653a990ed-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): АО \"ТЕРЕМОК-ИНВЕСТ\", 129281, Москва г, Менжинского ул, дом № 38, корпус 2, строение 2, этаж 1, помещение III, комната 16, ИНН 7734506918, рег.номер 1037789074080.<br/>Режим работы ресторана: с 10:00 до 22:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Лесная улица, 20с3",
                    "location":{
                        "latitude":55.780213,
                        "longitude":37.593075
                    }
                }
            }
        },
        {
            "place":{
                "id":51837,
                "name":"Алмаз Шашлычная",
                "description":null,
                "slug":"almaz_shashlichnaya",
                "market":false,
                "tags":[
                    {
                        "id":593,
                        "name":"Выпечка"
                    },
                    {
                        "id":235,
                        "name":"Завтраки"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/2d67/1368744-2d67bbb3fdacb72fde4e462dccac3d16-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО «Кофелайф», 119048, Москва, улица Усачёва, д. 26, ИНН 7713786830, рег.номер 1147746391803.<br/>Режим работы ресторана: с 12:00 до 22:45",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Усачёва улица, 26",
                    "location":{
                        "latitude":55.727374,
                        "longitude":37.567698
                    }
                }
            }
        },
        {
            "place":{
                "id":47795,
                "name":"Fresh",
                "description":null,
                "slug":"fresh_mitnaya",
                "market":false,
                "tags":[
                    {
                        "id":39,
                        "name":"Вегетарианская"
                    },
                    {
                        "id":170,
                        "name":"Здоровая еда"
                    },
                    {
                        "id":569,
                        "name":"Бургеры"
                    },
                    {
                        "id":235,
                        "name":"Завтраки"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/d81b/1380298-d81b5077630b17202bc76ef1ce046075-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ФРЕШ\", 121248, Москва г, Кутузовский пр-кт, дом № 12, строение 2, ИНН 7730661736, рег.номер 1127746183058.<br/>Режим работы ресторана: с 11:00 до 20:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Мытная улица, 74",
                    "location":{
                        "latitude":55.712112,
                        "longitude":37.620555
                    }
                }
            }
        },
        {
            "place":{
                "id":43564,
                "name":"Bocconcino",
                "description":null,
                "slug":"bocconcino-patriarshiy",
                "market":false,
                "tags":[
                    {
                        "id":9,
                        "name":"Итальянская"
                    },
                    {
                        "id":115,
                        "name":"Европейская"
                    },
                    {
                        "id":34,
                        "name":"Пицца"
                    },
                    {
                        "id":52,
                        "name":"Японская"
                    },
                    {
                        "id":33,
                        "name":"Суши"
                    },
                    {
                        "id":593,
                        "name":"Выпечка"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/7f09/1368744-7f09c98da19bf9a520c56ffa4f103d54-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ИП Гохнер Михаил Семенович, 119002, Москва г, Арбат ул, дом № 17, корпус 1, квартира 19, ИНН 772104325191, рег.номер 317774600169738.<br/>Режим работы ресторана: с 11:00 до 22:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Большой Патриарший переулок, 4",
                    "location":{
                        "latitude":55.762449,
                        "longitude":37.591916
                    }
                }
            }
        },
        {
            "place":{
                "id":42844,
                "name":"Мари Vanna",
                "description":null,
                "slug":"marivanna_msc",
                "market":false,
                "tags":[
                    {
                        "id":8,
                        "name":"Русская"
                    },
                    {
                        "id":40,
                        "name":"Домашняя"
                    },
                    {
                        "id":595,
                        "name":"Постное меню"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/3805/1368744-3805c8cb1685783cb61a37b4e3f481ba-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ОЛИВЬЕ\", 123104, Москва г, Спиридоньевский пер, дом № 10А, ИНН 7703784697, рег.номер 1137746144381.<br/>Режим работы ресторана: с 10:00 до 23:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Спиридоньевский переулок, 10А",
                    "location":{
                        "latitude":55.762617,
                        "longitude":37.595833
                    }
                }
            }
        },
        {
            "place":{
                "id":42670,
                "name":"Paul",
                "description":null,
                "slug":"paul-arbata",
                "market":false,
                "tags":[
                    {
                        "id":115,
                        "name":"Европейская"
                    },
                    {
                        "id":423,
                        "name":"Французская"
                    },
                    {
                        "id":192,
                        "name":"Десерты"
                    },
                    {
                        "id":593,
                        "name":"Выпечка"
                    },
                    {
                        "id":587,
                        "name":"Сэндвичи"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/9134/1368744-9134c1f13737e2d5c96f6c9e0572af62-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ТТ СМОЛЕНКА\", 119002, Москва г, Арбат ул, дом № 54/2, строение 1, ИНН 7704303357, рег.номер 1157746059855.<br/>Режим работы ресторана: с 10:00 до 21:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"улица Арбат, 54/2с1",
                    "location":{
                        "latitude":55.747231,
                        "longitude":37.583463
                    }
                }
            }
        },
        {
            "place":{
                "id":42310,
                "name":"Burger Heroes",
                "description":null,
                "slug":"Burger_Heroes_arbat",
                "market":false,
                "tags":[
                    {
                        "id":59,
                        "name":"Американская"
                    },
                    {
                        "id":569,
                        "name":"Бургеры"
                    },
                    {
                        "id":235,
                        "name":"Завтраки"
                    },
                    {
                        "id":1,
                        "name":"Стейки"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/80db/1387779-80db81ca747a244ebf08429df57a1f7f-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"БУРГЕР ХИРОУС\", 119019, Москва г, Новый Арбат ул, дом № 17, этаж 1, помещение I, комната 46, ИНН 9710015664, рег.номер 1167746754889.<br/>Режим работы ресторана: с 11:00 до 23:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"улица Новый Арбат, 17",
                    "location":{
                        "latitude":55.752141,
                        "longitude":37.590713
                    }
                }
            }
        },
        {
            "place":{
                "id":41413,
                "name":"Эларджи",
                "description":null,
                "slug":"elardji",
                "market":false,
                "tags":[
                    {
                        "id":326,
                        "name":"Грузинская"
                    },
                    {
                        "id":352,
                        "name":"Кавказская"
                    },
                    {
                        "id":631,
                        "name":"Шашлык"
                    },
                    {
                        "id":599,
                        "name":"Детское меню"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/d8ee/1368744-d8eeb0a1cca27e459742fb4c19888790-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"РЕБЕРЕС\", 127422, Москва г, Костякова ул, дом № 6/5, ИНН 7713229205, рег.номер 1027700180089.<br/>Режим работы ресторана: с 12:00 до 23:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Гагаринский переулок, 15А",
                    "location":{
                        "latitude":55.744323,
                        "longitude":37.595689
                    }
                }
            }
        },
        {
            "place":{
                "id":39713,
                "name":"Menza",
                "description":null,
                "slug":"menza9",
                "market":false,
                "tags":[
                    {
                        "id":52,
                        "name":"Японская"
                    },
                    {
                        "id":58,
                        "name":"Паназиатская"
                    },
                    {
                        "id":7,
                        "name":"Китайская"
                    },
                    {
                        "id":197,
                        "name":"Тайская"
                    },
                    {
                        "id":599,
                        "name":"Детское меню"
                    },
                    {
                        "id":39,
                        "name":"Вегетарианская"
                    },
                    {
                        "id":595,
                        "name":"Постное меню"
                    },
                    {
                        "id":170,
                        "name":"Здоровая еда"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/4730/1368744-47300e892eff4f9a4e5cdbd8c5e019dc-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"МЕНЕДЖМЕНТГРУПП\", 109439, Москва г, Юных Ленинцев ул, дом № 125, корпус 1, квартира 93, ИНН 7721333947, рег.номер 1157746680410.<br/>Режим работы ресторана: с 11:00 до 21:40",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"Щукинская улица, 42",
                    "location":{
                        "latitude":55.809469,
                        "longitude":37.464571
                    }
                }
            }
        },
        {
            "place":{
                "id":36632,
                "name":"Pomodoro Royal",
                "description":null,
                "slug":"pomodoro_royal_paveleckaya1",
                "market":false,
                "tags":[
                    {
                        "id":9,
                        "name":"Итальянская"
                    },
                    {
                        "id":34,
                        "name":"Пицца"
                    }
                ],
                "priceCategory":{
                    "id":1,
                    "name":"₽",
                    "value":0
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/c7a7/1380298-c7a75a619ea210d48093035b12dde1c3-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ИП Мангушев Надир Хайдарович, ИНН 771207299632, рег.номер 315774600288085.<br/>Режим работы ресторана: с 10:00 до 22:50",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"3-й Павелецкий проезд, 4",
                    "location":{
                        "latitude":55.712548,
                        "longitude":37.645779
                    }
                }
            }
        },
        {
            "place":{
                "id":34021,
                "name":"Дагестанская Лавка",
                "description":null,
                "slug":"dag_Bratislavskaya",
                "market":false,
                "tags":[
                    {
                        "id":27,
                        "name":"Пироги"
                    },
                    {
                        "id":352,
                        "name":"Кавказская"
                    },
                    {
                        "id":563,
                        "name":"Ланчи"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/8f59/1387779-8f59f5e45cdaae6b14fb448fc57fc89b-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ЛАКИ-КИТЧЕН\", 115419, Москва г, Орджоникидзе ул, дом № 11, строение 8, помещение I, ИНН 7725340737, рег.номер 5167746342055.<br/>Режим работы ресторана: с 10:00 до 20:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Мячковский бульвар, 3А",
                    "location":{
                        "latitude":55.657956,
                        "longitude":37.751574
                    }
                }
            }
        },
        {
            "place":{
                "id":31417,
                "name":"ДжонДжоли",
                "description":null,
                "slug":"john_dzholi_nd_nikoloyamskaya",
                "market":false,
                "tags":[
                    {
                        "id":352,
                        "name":"Кавказская"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/1504/1368744-1504df8690fdafb21fb600496510d7ba-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ПЛАНЕТА\", 109004, Москва г, Николоямская ул, дом № 28/60, строение 1, ИНН 7709550529, рег.номер 1047796428437.<br/>Режим работы ресторана: с 11:00 до 22:45",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Николоямская улица, 28/60",
                    "location":{
                        "latitude":55.746927,
                        "longitude":37.654727
                    }
                }
            }
        },
        {
            "place":{
                "id":11073,
                "name":"Burger & Pizzetta",
                "description":null,
                "slug":"burgerpizzetta_vegas",
                "market":false,
                "tags":[
                    {
                        "id":9,
                        "name":"Итальянская"
                    },
                    {
                        "id":34,
                        "name":"Пицца"
                    },
                    {
                        "id":59,
                        "name":"Американская"
                    },
                    {
                        "id":569,
                        "name":"Бургеры"
                    },
                    {
                        "id":595,
                        "name":"Постное меню"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/ed11/1370147-ed11bc899db5f3f35e57aa3ab0a336bc-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"КРАСНОГОРСК ВР\", 127055, Москва г, Сущёвская ул, дом № 12, строение 1, этаж 5, комната 11, ИНН 7707404586, рег.номер 1187746054627.<br/>Режим работы ресторана: с 11:00 до 21:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Красногорск",
                    "short":"Международная улица, 12",
                    "location":{
                        "latitude":55.821012,
                        "longitude":37.386184
                    }
                }
            }
        },
        {
            "place":{
                "id":9255,
                "name":"Город-Сад",
                "description":null,
                "slug":"GorodSad_Ostozh",
                "market":false,
                "tags":[
                    {
                        "id":39,
                        "name":"Вегетарианская"
                    },
                    {
                        "id":170,
                        "name":"Здоровая еда"
                    },
                    {
                        "id":595,
                        "name":"Постное меню"
                    },
                    {
                        "id":235,
                        "name":"Завтраки"
                    },
                    {
                        "id":287,
                        "name":"Веганская"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/3346/1368744-3346437dd70739976c9cccfc21969a7c-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ЗДОРОВЫЙ РАЦИОН\", 117321, Москва г, Профсоюзная ул, дом № 126, корпус 1, помещение VII, офис 17, ИНН 7728349216, рег.номер 1167746892884.<br/>Режим работы ресторана: с 08:30 до 22:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"улица Остоженка, 27к1",
                    "location":{
                        "latitude":55.739047,
                        "longitude":37.59648
                    }
                }
            }
        },
        {
            "place":{
                "id":7323,
                "name":"Black Star Burger",
                "description":null,
                "slug":"Black_Star_Burger",
                "market":false,
                "tags":[
                    {
                        "id":59,
                        "name":"Американская"
                    },
                    {
                        "id":569,
                        "name":"Бургеры"
                    },
                    {
                        "id":39,
                        "name":"Вегетарианская"
                    },
                    {
                        "id":170,
                        "name":"Здоровая еда"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/e8c4/1387779-e8c473c9c2b7a3ab3fac5ebda3140245-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ИП Перепелкина Татьяна Михайловна, 111531, Москва г, Энтузиастов ш, дом № 100, корпус 6, квартира 212, ИНН 772014386270, рег.номер 317774600594612.<br/>Режим работы ресторана: с 11:00 до 22:30",
                "deliveryConditions":"Доставка 99 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"Цветной бульвар, 11с2",
                    "location":{
                        "latitude":55.770071,
                        "longitude":37.620429
                    }
                }
            }
        },
        {
            "place":{
                "id":2987,
                "name":"Нияма",
                "description":null,
                "slug":"Niyama_Vernadskogo",
                "market":false,
                "tags":[
                    {
                        "id":33,
                        "name":"Суши"
                    },
                    {
                        "id":39,
                        "name":"Вегетарианская"
                    },
                    {
                        "id":52,
                        "name":"Японская"
                    },
                    {
                        "id":569,
                        "name":"Бургеры"
                    },
                    {
                        "id":170,
                        "name":"Здоровая еда"
                    },
                    {
                        "id":34,
                        "name":"Пицца"
                    },
                    {
                        "id":595,
                        "name":"Постное меню"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/8254/1387779-825440cae1b6a6aba0be3cf7bacc1a85-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ФЛАЙ ФУД\", 115404, Москва г, Бирюлёвская ул, дом № 24, корпус 1, помещение 3, комната 1, офис 3, ИНН 7724381748, рег.номер 1167746863019.<br/>Режим работы ресторана: с 09:00 до 24:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"проспект Вернадского, 14А",
                    "location":{
                        "latitude":55.677737,
                        "longitude":37.506882
                    }
                }
            }
        },
        {
            "place":{
                "id":2365,
                "name":"Pinsa Maestrello",
                "description":null,
                "slug":"Pinsa_Maestrello",
                "market":false,
                "tags":[
                    {
                        "id":9,
                        "name":"Итальянская"
                    },
                    {
                        "id":34,
                        "name":"Пицца"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/4629/1387779-4629c7848e02ff7d184d8b24312eb579-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ПИНСА БИСТРО\", 109147, Москва г, Марксистская ул, дом № 20, строение 1, помещение 2 Комната 3, ИНН 9709000487, рег.номер 1177746464280.<br/>Режим работы ресторана: с 11:10 до 22:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"улица Покровка, 16",
                    "location":{
                        "latitude":55.759157,
                        "longitude":37.645708
                    }
                }
            }
        },
        {
            "place":{
                "id":1782,
                "name":"Пицца Пи",
                "description":null,
                "slug":"PizzaPi_Vorontsovskaya",
                "market":false,
                "tags":[
                    {
                        "id":9,
                        "name":"Итальянская"
                    },
                    {
                        "id":34,
                        "name":"Пицца"
                    },
                    {
                        "id":569,
                        "name":"Бургеры"
                    },
                    {
                        "id":39,
                        "name":"Вегетарианская"
                    },
                    {
                        "id":170,
                        "name":"Здоровая еда"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/710a/1368744-710af6c291281170be5a1cbd257840cd-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"БИТОК\", 109004, Москва г, Воронцовская ул, дом № 2/10, строение 1, ИНН 9705037944, рег.номер 1157746397951.<br/>Режим работы ресторана: с 00:00 до 05:30; с 09:00 до 24:00",
                "deliveryConditions":"Доставка 39-99 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Воронцовская улица, 2/10с1",
                    "location":{
                        "latitude":55.740522,
                        "longitude":37.654242
                    }
                }
            }
        },
        {
            "place":{
                "id":1706,
                "name":"Марукамэ",
                "description":null,
                "slug":"Marukame_avtozavodskaya",
                "market":false,
                "tags":[
                    {
                        "id":33,
                        "name":"Суши"
                    },
                    {
                        "id":52,
                        "name":"Японская"
                    },
                    {
                        "id":613,
                        "name":"Лапша"
                    }
                ],
                "priceCategory":{
                    "id":1,
                    "name":"₽",
                    "value":0
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/88fd/1387779-88fd7ebe70597ac2f2125fed91b7d125-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"МАРУ А\", 105062, Москва г, Покровка ул, дом № 41, строение 2, Кабинет 2, ИНН 7701349233, рег.номер 1157746454491.<br/>Режим работы ресторана: с 11:00 до 22:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"улица Ленинская Слобода, 17",
                    "location":{
                        "latitude":55.709743,
                        "longitude":37.656389
                    }
                }
            }
        },
        {
            "place":{
                "id":1204,
                "name":"Фо Point",
                "description":null,
                "slug":"PhoPoint",
                "market":false,
                "tags":[
                    {
                        "id":203,
                        "name":"Вьетнамская"
                    }
                ],
                "priceCategory":{
                    "id":1,
                    "name":"₽",
                    "value":0
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/2e24/1380157-2e24d141e599b99e3187da3aff73255e-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ФУД ПОЙНТ\", 101000, г. Москва, переулок Спасоглинищевский Б., дом 9/1, строение 14, этаж 1, пом II, ком 2., ИНН 7707343816, рег.номер 1157746544944.<br/>Режим работы ресторана: с 11:00 до 22:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"улица Сретенка, 1",
                    "location":{
                        "latitude":55.766532,
                        "longitude":37.630544
                    }
                }
            }
        },
        {
            "place":{
                "id":615,
                "name":"Zotman pizza pie",
                "description":null,
                "slug":"Zotman",
                "market":false,
                "tags":[
                    {
                        "id":9,
                        "name":"Итальянская"
                    },
                    {
                        "id":34,
                        "name":"Пицца"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/1131/1387779-1131fb1029e2d9d276f14275cc89c663-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ЗОТМАН\", 121069, Москва г, Никитская Б ул, дом № 23/14/9, ИНН 7708804322, рег.номер 5137746239087.<br/>Режим работы ресторана: с 11:00 до 23:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"Большая Никитская улица, 23/14/9",
                    "location":{
                        "latitude":55.756908,
                        "longitude":37.599399
                    }
                }
            }
        },
        {
            "place":{
                "id":566,
                "name":"True Burgers",
                "description":null,
                "slug":"TrueBurgers_Leninskiy",
                "market":false,
                "tags":[
                    {
                        "id":59,
                        "name":"Американская"
                    },
                    {
                        "id":569,
                        "name":"Бургеры"
                    }
                ],
                "priceCategory":{
                    "id":1,
                    "name":"₽",
                    "value":0
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/555f/1380298-555fde9bb4114e7b7df6d44e4b46dca7-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ИП Куркина Елена Владимировна, 109457, город Москва, улица Окская, дом 42/1 корпус 2, квартира 35, ИНН 772151308644, рег.номер 316774600557914.<br/>Режим работы ресторана: с 10:00 до 22:20",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"Ленинский проспект, 68/10",
                    "location":{
                        "latitude":55.689136,
                        "longitude":37.545833
                    }
                }
            }
        },
        {
            "place":{
                "id":218,
                "name":"Cheapside Josper Bistro",
                "description":null,
                "slug":"CheapsideJosperBistro",
                "market":false,
                "tags":[
                    {
                        "id":59,
                        "name":"Американская"
                    },
                    {
                        "id":569,
                        "name":"Бургеры"
                    },
                    {
                        "id":599,
                        "name":"Детское меню"
                    },
                    {
                        "id":235,
                        "name":"Завтраки"
                    },
                    {
                        "id":595,
                        "name":"Постное меню"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/d2d8/1387779-d2d8f141050192a329ae50e279a61a0f-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"МЕНАРДИ\", 121609, Москва г, Осенняя ул, дом № 11, квартира 5, ИНН 7731414200, рег.номер 1117746785925.<br/>Режим работы ресторана: с 12:00 до 23:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Лесная улица, 9",
                    "location":{
                        "latitude":55.779049,
                        "longitude":37.588602
                    }
                }
            }
        },
        {
            "place":{
                "id":197,
                "name":"Китайские Новости",
                "description":null,
                "slug":"Kitayskienovosti-Spiridon",
                "market":false,
                "tags":[
                    {
                        "id":7,
                        "name":"Китайская"
                    },
                    {
                        "id":599,
                        "name":"Детское меню"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/2ddb/1370147-2ddb3e2ed642a372f1683b3b0c2c26f5-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ЧАЙНА НЬЮС ПАТРИАРШИЕ ПРУДЫ\", 123001, Москва г, Спиридоновка ул, дом № 25/20, строение 1, ИНН 7703407265, рег.номер 1167746251860.<br/>Режим работы ресторана: с 12:00 до 23:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"улица Спиридоновка, 25/20с1",
                    "location":{
                        "latitude":55.762708,
                        "longitude":37.589078
                    }
                }
            }
        },
        {
            "place":{
                "id":176,
                "name":"Black Market",
                "description":null,
                "slug":"BlackMarket",
                "market":false,
                "tags":[
                    {
                        "id":626,
                        "name":"Вок"
                    },
                    {
                        "id":59,
                        "name":"Американская"
                    },
                    {
                        "id":115,
                        "name":"Европейская"
                    },
                    {
                        "id":569,
                        "name":"Бургеры"
                    },
                    {
                        "id":599,
                        "name":"Детское меню"
                    },
                    {
                        "id":235,
                        "name":"Завтраки"
                    },
                    {
                        "id":595,
                        "name":"Постное меню"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/0de0/1387779-0de02ddcc3ef79e533756d0e6fc8fc5d-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"СИМВОЛ\", 119048, Москва г, Усачёва ул, дом № 2, строение 1, помещение IV, комната 1, ИНН 7704747401, рег.номер 1107746125497.<br/>Режим работы ресторана: с 10:00 до 23:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"улица Усачёва, 2с1",
                    "location":{
                        "latitude":55.730892,
                        "longitude":37.576726
                    }
                }
            }
        },
        {
            "place":{
                "id":76,
                "name":"Zodiac",
                "description":null,
                "slug":"Zodiac",
                "market":false,
                "tags":[
                    {
                        "id":626,
                        "name":"Вок"
                    },
                    {
                        "id":58,
                        "name":"Паназиатская"
                    },
                    {
                        "id":569,
                        "name":"Бургеры"
                    },
                    {
                        "id":595,
                        "name":"Постное меню"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/b96d/1370147-b96d4a5abbc924daa8779fcb52e91457-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"СМОЛЕНКА АТРИУМ\", 121099, Москва г, Смоленская пл, дом № 3, ИНН 7704778544, рег.номер 1117746222021.<br/>Режим работы ресторана: с 12:00 до 22:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"Смоленская площадь, 3",
                    "location":{
                        "latitude":55.747485,
                        "longitude":37.581298
                    }
                }
            }
        },
        {
            "place":{
                "id":50160,
                "name":"Вареничная №1",
                "description":null,
                "slug":"varenichnaya1_myasnitskaya",
                "market":false,
                "tags":[
                    {
                        "id":8,
                        "name":"Русская"
                    },
                    {
                        "id":593,
                        "name":"Выпечка"
                    },
                    {
                        "id":589,
                        "name":"Украинская"
                    },
                    {
                        "id":40,
                        "name":"Домашняя"
                    },
                    {
                        "id":599,
                        "name":"Детское меню"
                    },
                    {
                        "id":595,
                        "name":"Постное меню"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.7,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[
                    {
                        "id":2129,
                        "type":{
                            "id":25,
                            "name":"10. Блюдо в подарок: при заказе на сумму",
                            "pictureUri":"/images/promos/5bb1/1387779-5bb13c55ddf94.png",
                            "detailedPictureUrl":null
                        },
                        "name":"Блюдо в подарок",
                        "description":"При заказе от 1100 ₽ вареники с картошкой бесплатно"
                    }
                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/0d09/1370147-0d091eb03f8e34ee3174edb08a04fedc-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Полные правила проведения рекламной акции &laquo;Блюдо в подарок&raquo; доступны по <a target=\"_blank\" rel=\"noopener\" href=\"https://eda.yandex/p/legal-promoPodarok\">ссылке</a>.<br/>Исполнитель (продавец): ООО \"АМАЛЬФИ\", 119146, Москва г, Комсомольский пр-кт, дом № 25, корпус 3, помещение III, комната 3, ИНН 7704382510, рег.номер 5167746403810.<br/>Режим работы ресторана: с 10:00 до 22:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[
                    {
                        "id":25,
                        "name":"10. Блюдо в подарок: при заказе на сумму",
                        "pictureUri":"/images/promos/5bb1/1387779-5bb13c55ddf94.png",
                        "detailedPictureUrl":null
                    }
                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"Мясницкая улица, 24/7с1",
                    "location":{
                        "latitude":55.762444,
                        "longitude":37.635593
                    }
                }
            }
        },
        {
            "place":{
                "id":34258,
                "name":"Мясо & Рыба",
                "description":null,
                "slug":"mjaso_ryba_yarcevskaya",
                "market":false,
                "tags":[
                    {
                        "id":1,
                        "name":"Стейки"
                    },
                    {
                        "id":569,
                        "name":"Бургеры"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.7,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/95b9/1370147-95b9ffff78927cdcd7a120c0081766e9-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"МЯСО И РЫБА РИВЬЕРА\", 115280, Москва г, Ленинская Слобода ул, дом № 19, этаж 6, комната 11, офис 20, ИНН 7725347161, рег.номер 5167746507000.<br/>Режим работы ресторана: с 11:00 до 23:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Ярцевская улица, 19",
                    "location":{
                        "latitude":55.738591,
                        "longitude":37.411005
                    }
                }
            }
        },
        {
            "place":{
                "id":12276,
                "name":"Чайхона №1 Тимура Ланского",
                "description":null,
                "slug":"ChaihonaN1_Novoslobodskaya",
                "market":false,
                "tags":[
                    {
                        "id":631,
                        "name":"Шашлык"
                    },
                    {
                        "id":115,
                        "name":"Европейская"
                    },
                    {
                        "id":555,
                        "name":"Восточная"
                    },
                    {
                        "id":593,
                        "name":"Выпечка"
                    },
                    {
                        "id":599,
                        "name":"Детское меню"
                    },
                    {
                        "id":626,
                        "name":"Вок"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.7,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/51d0/1387779-51d0522ea5c01f02a2f790af062d7526-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"РЕОЛ\", 129085, Москва г, Звёздный б-р, дом № 3А, строение 1, квартира Этаж 1, Помещение 3, К 3, ИНН 7717774650, рег.номер 1147746073507.<br/>Режим работы ресторана: с 01:00 до 06:00; с 10:00 до 24:00",
                "deliveryConditions":"Доставка 39-99 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"Новослободская улица, 16",
                    "location":{
                        "latitude":55.781696,
                        "longitude":37.599364
                    }
                }
            }
        },
        {
            "place":{
                "id":6943,
                "name":"FoodBand",
                "description":null,
                "slug":"Food_Band_Liha4",
                "market":true,
                "tags":[
                    {
                        "id":7,
                        "name":"Китайская"
                    },
                    {
                        "id":9,
                        "name":"Итальянская"
                    },
                    {
                        "id":33,
                        "name":"Суши"
                    },
                    {
                        "id":34,
                        "name":"Пицца"
                    },
                    {
                        "id":52,
                        "name":"Японская"
                    },
                    {
                        "id":626,
                        "name":"Вок"
                    },
                    {
                        "id":595,
                        "name":"Постное меню"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.7,
                "minimalOrderPrice":650,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/3fc8/1380298-3fc8da1fc69f47ad000f5fd759a5c64c-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ФВ СЕВЕР\", 125438, Москва г, Лихачёвский 4-Й пер, дом № 4, ИНН 7743106730, рег.номер 1157746587217.<br/>Режим работы ресторана: с 00:00 до 24:00",
                "deliveryConditions":"Бесплатно",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"4-й Лихачёвский переулок, 4",
                    "location":{
                        "latitude":55.852647,
                        "longitude":37.530588
                    }
                }
            }
        },
        {
            "place":{
                "id":438,
                "name":"Black Thai",
                "description":null,
                "slug":"Black_Thai",
                "market":false,
                "tags":[
                    {
                        "id":6,
                        "name":"Азиатская"
                    },
                    {
                        "id":197,
                        "name":"Тайская"
                    },
                    {
                        "id":617,
                        "name":"Бизнес-ланчи"
                    },
                    {
                        "id":626,
                        "name":"Вок"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.7,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/6e3f/1370147-6e3f715e9afb4cee549c5eb6e1896b25-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"МАРИЯ\", 127006, Москва г, Путинковский Б. пер, дом № 5, ИНН 7707371348, рег.номер 1167746768738.<br/>Режим работы ресторана: с 12:00 до 23:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"Большой Путинковский переулок, 5",
                    "location":{
                        "latitude":55.76719,
                        "longitude":37.607709
                    }
                }
            }
        },
        {
            "place":{
                "id":51396,
                "name":"Чайхона №1 Братьев Васильчуков",
                "description":null,
                "slug":"chaihona7_mp",
                "market":true,
                "tags":[
                    {
                        "id":115,
                        "name":"Европейская"
                    },
                    {
                        "id":52,
                        "name":"Японская"
                    },
                    {
                        "id":37,
                        "name":"Узбекская"
                    },
                    {
                        "id":34,
                        "name":"Пицца"
                    },
                    {
                        "id":599,
                        "name":"Детское меню"
                    },
                    {
                        "id":595,
                        "name":"Постное меню"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.6,
                "minimalOrderPrice":1000,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/4ad4/1380157-4ad41016f9f8717ecc4e8dc94eb41d8b-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО «Камида», 119331, г. Москва, Вернадского проспект, дом 29, пом. I, ком.5., ИНН 7736245764, рег.номер 1157746451147.<br/>Режим работы ресторана: с 00:00 до 05:00; с 10:00 до 23:00",
                "deliveryConditions":"Бесплатно",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"улица Алабяна, 7",
                    "location":{
                        "latitude":55.801835,
                        "longitude":37.508158
                    }
                }
            }
        },
        {
            "place":{
                "id":35462,
                "name":"Andiamo",
                "description":null,
                "slug":"andiamo_vernadskogo",
                "market":false,
                "tags":[
                    {
                        "id":9,
                        "name":"Итальянская"
                    },
                    {
                        "id":34,
                        "name":"Пицца"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.6,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/0108/1368744-01080e4620995879832f67cd0ce3b0d4-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ЦЕНТР-ГРУПП\", 129272, Москва г, Олимпийский пр-кт, дом № 26, строение 1, помещение III, комната 1, ИНН 7702414630, рег.номер 1177746277862.<br/>Режим работы ресторана: с 12:00 до 23:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"проспект Вернадского, 37к1",
                    "location":{
                        "latitude":55.678747,
                        "longitude":37.511131
                    }
                }
            }
        },
        {
            "place":{
                "id":23001,
                "name":"Де Марко",
                "description":null,
                "slug":"demarko_mayakovka",
                "market":false,
                "tags":[
                    {
                        "id":9,
                        "name":"Итальянская"
                    },
                    {
                        "id":33,
                        "name":"Суши"
                    },
                    {
                        "id":52,
                        "name":"Японская"
                    },
                    {
                        "id":115,
                        "name":"Европейская"
                    },
                    {
                        "id":235,
                        "name":"Завтраки"
                    },
                    {
                        "id":595,
                        "name":"Постное меню"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.6,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/e8b6/1380298-e8b6b3594159281635e685d4a98f850b-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"КОНЦЕПТ-СЕРВИС, 129110, Москва г, Мира пр-кт, дом № 48, строение 6, ИНН 7702382850, рег.номер 1157746416926.<br/>Режим работы ресторана: с 08:00 до 24:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"Садовая-Триумфальная улица, 4/10",
                    "location":{
                        "latitude":55.770401,
                        "longitude":37.599175
                    }
                }
            }
        },
        {
            "place":{
                "id":18167,
                "name":"Hite",
                "description":null,
                "slug":"hite",
                "market":true,
                "tags":[
                    {
                        "id":32,
                        "name":"Корейская"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.6,
                "minimalOrderPrice":990,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/621c/1368744-621c552a8a0aaaaf4b87389b51dca5ef-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ХАЙТ СЕРПУХОВСКАЯ\", 115093, Москва г, Серпуховская Б ул, дом № 12/11, строение 2, ИНН 7703410797, рег.номер 1167746062197.<br/>Режим работы ресторана: с 12:00 до 22:00",
                "deliveryConditions":"Бесплатно",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"улица 1905 года, 2с1",
                    "location":{
                        "latitude":55.755353,
                        "longitude":37.560071
                    }
                }
            }
        },
        {
            "place":{
                "id":8225,
                "name":"Му-Му",
                "description":null,
                "slug":"MuMu_Balaklavskii",
                "market":true,
                "tags":[
                    {
                        "id":8,
                        "name":"Русская"
                    },
                    {
                        "id":9,
                        "name":"Итальянская"
                    },
                    {
                        "id":52,
                        "name":"Японская"
                    },
                    {
                        "id":235,
                        "name":"Завтраки"
                    },
                    {
                        "id":595,
                        "name":"Постное меню"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.6,
                "minimalOrderPrice":950,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/6155/1368744-6155f445d454566dedb0637f7b469b66-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ФАСТЛЭНД\", 125009, Москва г, Тверской б-р, дом № 26А, ИНН 7703234453, рег.номер 1027739292448.<br/>Режим работы ресторана: с 10:00 до 21:50",
                "deliveryConditions":"Бесплатно",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"Балаклавский проспект, 7",
                    "location":{
                        "latitude":55.640746,
                        "longitude":37.603271
                    }
                }
            }
        },
        {
            "place":{
                "id":51123,
                "name":"Суши Шоп",
                "description":null,
                "slug":"Sushi_Shop_mayak",
                "market":false,
                "tags":[
                    {
                        "id":52,
                        "name":"Японская"
                    },
                    {
                        "id":626,
                        "name":"Вок"
                    }
                ],
                "priceCategory":{
                    "id":1,
                    "name":"₽",
                    "value":0
                },
                "rating":4.5,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/fcfb/1380157-fcfb3d27f730b808dc562cfd713e215f-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ИП Романовский Андрей Николаевич, 119571, г. Москва, ул. Академика Анохина, д. 13, кв. 287, ИНН 772910498096, рег.номер 317774600103610.<br/>Режим работы ресторана: с 09:00 до 24:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"улица Красного Маяка, 4к1",
                    "location":{
                        "latitude":55.612177,
                        "longitude":37.59922
                    }
                }
            }
        },
        {
            "place":{
                "id":39595,
                "name":"Deda душа Грузии",
                "description":null,
                "slug":"dedgruzii8",
                "market":true,
                "tags":[
                    {
                        "id":326,
                        "name":"Грузинская"
                    },
                    {
                        "id":593,
                        "name":"Выпечка"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.5,
                "minimalOrderPrice":1000,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/3912/1368744-39121c2fe1b3abb251c63e277004023e-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ИП Саакян Эдгар Самвелович, ИНН 713075711605, рег.номер 318673300043064.<br/>Режим работы ресторана: с 11:00 до 22:00",
                "deliveryConditions":"Бесплатно",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"посёлок Коммунарка",
                    "short":"улица Липовый Парк, 8к2",
                    "location":{
                        "latitude":55.569942,
                        "longitude":37.487622
                    }
                }
            }
        },
        {
            "place":{
                "id":33313,
                "name":"Pho Hanoi",
                "description":null,
                "slug":"phohanoi",
                "market":false,
                "tags":[
                    {
                        "id":6,
                        "name":"Азиатская"
                    },
                    {
                        "id":203,
                        "name":"Вьетнамская"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.5,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/fae8/1380157-fae8d883e1e6273e1e463a6c5d7fdef5-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"МИАН-КАФЕ\", 125190, Москва г, Ленинградский пр-кт, дом № 80, корпус 1, квартира 4, ИНН 7743176215, рег.номер 5167746172237.<br/>Режим работы ресторана: с 11:00 до 21:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Головинское шоссе, 5",
                    "location":{
                        "latitude":55.84024,
                        "longitude":37.492024
                    }
                }
            }
        },
        {
            "place":{
                "id":1027,
                "name":"Вай Мэ!",
                "description":null,
                "slug":"VaiMe_Pyatnickay",
                "market":false,
                "tags":[
                    {
                        "id":326,
                        "name":"Грузинская"
                    },
                    {
                        "id":593,
                        "name":"Выпечка"
                    }
                ],
                "priceCategory":{
                    "id":1,
                    "name":"₽",
                    "value":0
                },
                "rating":4.5,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/522b/1368744-522b4eff95b9382ade59484920567106-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"СПИЛО 888\", 123458, Москва г, Маршала Катукова ул, дом № 24, корпус 6, помещение I, комната 101, ИНН 7734721217, рег.номер 1147746321293.<br/>Режим работы ресторана: с 10:00 до 22:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"Пятницкий переулок, 8с1",
                    "location":{
                        "latitude":55.742879,
                        "longitude":37.629745
                    }
                }
            }
        },
        {
            "place":{
                "id":56769,
                "name":"Balifornia",
                "description":null,
                "slug":"Balifornia",
                "market":false,
                "tags":[
                    {
                        "id":170,
                        "name":"Здоровая еда"
                    },
                    {
                        "id":287,
                        "name":"Веганская"
                    },
                    {
                        "id":39,
                        "name":"Вегетарианская"
                    },
                    {
                        "id":192,
                        "name":"Десерты"
                    },
                    {
                        "id":235,
                        "name":"Завтраки"
                    },
                    {
                        "id":645,
                        "name":"Фудмолл «Депо»"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.4,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/b722/1368744-b72254587a8a5241023a460cd0c6bff0-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ИП Пекурин Андрей Иванович, 121500, Москва, Новорублевская ул, д 5, ИНН 773128990777, рег.номер 318774600299557.<br/>Режим работы ресторана: с 10:00 до 23:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Лесная улица, 20с3",
                    "location":{
                        "latitude":55.780213,
                        "longitude":37.593075
                    }
                }
            }
        },
        {
            "place":{
                "id":37988,
                "name":"Surf Coffee",
                "description":null,
                "slug":"surfcoffee_mayak",
                "market":false,
                "tags":[
                    {
                        "id":115,
                        "name":"Европейская"
                    },
                    {
                        "id":192,
                        "name":"Десерты"
                    },
                    {
                        "id":587,
                        "name":"Сэндвичи"
                    },
                    {
                        "id":634,
                        "name":"Кофе"
                    }
                ],
                "priceCategory":{
                    "id":1,
                    "name":"₽",
                    "value":0
                },
                "rating":4.4,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/17b7/1368744-17b77df674de45b30a2c5d5b104a1ec0-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ИП Соколова Людмила Николаевна, ИНН 780528927450, рег.номер 318784700153140.<br/>Режим работы ресторана: с 08:00 до 22:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Тверская улица, 25",
                    "location":{
                        "latitude":55.767737,
                        "longitude":37.599247
                    }
                }
            }
        },
        {
            "place":{
                "id":34702,
                "name":"Планета Суши",
                "description":null,
                "slug":"planeta_sushi_inter",
                "market":false,
                "tags":[
                    {
                        "id":33,
                        "name":"Суши"
                    },
                    {
                        "id":52,
                        "name":"Японская"
                    },
                    {
                        "id":626,
                        "name":"Вок"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.2,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/64b9/1370147-64b92a64d8c0e64f951ac8016bd40cba-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ФИЕСТА\", 123557, Москва г, Тишинский Б пер, дом № 26, корпус 13-14, этаж 1, помещение XII, офис 2А, ИНН 7729756013, рег.номер 5137746036764.<br/>Режим работы ресторана: с 10:00 до 23:20",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Красногорск",
                    "short":"Международная улица, 12",
                    "location":{
                        "latitude":55.821012,
                        "longitude":37.386184
                    }
                }
            }
        },
        {
            "place":{
                "id":60464,
                "name":"Варламов Есть",
                "description":null,
                "slug":"varlamovyest-lenin",
                "market":false,
                "tags":[
                    {
                        "id":6,
                        "name":"Азиатская"
                    },
                    {
                        "id":59,
                        "name":"Американская"
                    },
                    {
                        "id":115,
                        "name":"Европейская"
                    },
                    {
                        "id":170,
                        "name":"Здоровая еда"
                    },
                    {
                        "id":557,
                        "name":"Гавайская"
                    },
                    {
                        "id":39,
                        "name":"Вегетарианская"
                    }
                ],
                "priceCategory":{
                    "id":1,
                    "name":"₽",
                    "value":0
                },
                "rating":null,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":true,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/32f5/1380157-32f59986ddd738a8899ff09212d91037-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"Стар Шеф\", Юр. адрес: 107031, Москва, ул. Рождественка д. 5/7 стр.2 э.3 пом V К4 оф 100, ИНН 7702438951, рег.номер 1187746811735.<br/>Режим работы ресторана: с 12:00 до 21:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Ленинградский проспект, 37к3",
                    "location":{
                        "latitude":55.793627,
                        "longitude":37.545087
                    }
                }
            }
        },
        {
            "place":{
                "id":59673,
                "name":"T.G.I. Friday's",
                "description":null,
                "slug":"tgi_msk_pavel",
                "market":false,
                "tags":[
                    {
                        "id":59,
                        "name":"Американская"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":null,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":true,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/1e23/1370147-1e23411a6dfafc5a20ad8163d3a783b8-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"РОСИНТЕР РЕСТОРАНТС\", 111024, Москва г, Душинская ул, дом № 7, корпус 1, ИНН 7737115648, рег.номер 1027739718280.<br/>Режим работы ресторана: с 11:00 до 22:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Павелецкая площадь, 1А",
                    "location":{
                        "latitude":55.729741,
                        "longitude":37.639455
                    }
                }
            }
        },
        {
            "place":{
                "id":59622,
                "name":"Китайская Забегаловка Депо",
                "description":null,
                "slug":"china_depo",
                "market":false,
                "tags":[
                    {
                        "id":7,
                        "name":"Китайская"
                    },
                    {
                        "id":645,
                        "name":"Фудмолл «Депо»"
                    },
                    {
                        "id":626,
                        "name":"Вок"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":null,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":true,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/c994/1380157-c994e9de4c63b1006dbcfd20fe84d28a-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"Меридиан\", 117624, г. Москва, Бульвар адмирала Ушакова, дом 11, цок.этаж, пом. IX, комн.2, ИНН 7727411542, рег.номер 1197746155001.<br/>Режим работы ресторана: с 12:00 до 23:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Лесная улица, 20с4",
                    "location":{
                        "latitude":55.779474,
                        "longitude":37.59189
                    }
                }
            }
        },
        {
            "place":{
                "id":59283,
                "name":"Greek Street",
                "description":null,
                "slug":"greekstreet_moscow",
                "market":false,
                "tags":[
                    {
                        "id":645,
                        "name":"Фудмолл «Депо»"
                    },
                    {
                        "id":80,
                        "name":"Греческая"
                    },
                    {
                        "id":115,
                        "name":"Европейская"
                    },
                    {
                        "id":235,
                        "name":"Завтраки"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":null,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":true,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/1077/1370147-1077364023825c514333444afc9862dc-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО «ДЕКОМ», 109147, г. Москва, Таганская улица, дом 31/22, ИНН 7725541313, рег.номер 1057747234621.<br/>Режим работы ресторана: с 10:00 до 22:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Лесная улица, 20с3",
                    "location":{
                        "latitude":55.780213,
                        "longitude":37.593075
                    }
                }
            }
        },
        {
            "place":{
                "id":59181,
                "name":"Cheesemania",
                "description":null,
                "slug":"depo_cheesemania",
                "market":false,
                "tags":[
                    {
                        "id":115,
                        "name":"Европейская"
                    },
                    {
                        "id":9,
                        "name":"Итальянская"
                    },
                    {
                        "id":645,
                        "name":"Фудмолл «Депо»"
                    },
                    {
                        "id":235,
                        "name":"Завтраки"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":null,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":true,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/6e39/1387779-6e39b9b4c6750980fed0cc5e20b28971-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО «ДЕКОМ», 109147, г. Москва, Таганская улица, дом 31/22, ИНН 7725541313, рег.номер 1057747234621.<br/>Режим работы ресторана: с 10:00 до 22:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Лесная улица, 20с3",
                    "location":{
                        "latitude":55.780213,
                        "longitude":37.593075
                    }
                }
            }
        },
        {
            "place":{
                "id":57248,
                "name":"Мама будет рада",
                "description":null,
                "slug":"mama_budet_rada",
                "market":false,
                "tags":[
                    {
                        "id":9,
                        "name":"Итальянская"
                    },
                    {
                        "id":34,
                        "name":"Пицца"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":null,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/d7ba/1368744-d7badc6e626be49c65fabaae71175871-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО «Идеал», 119331, г. Москва, проспект Вернадского, дом 29, пом. 1, этаж 19, комн. 30, ИНН 7736680982, рег.номер 5147746077111.<br/>Режим работы ресторана: с 12:00 до 23:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Пушкинская площадь, 2/1",
                    "location":{
                        "latitude":55.766278,
                        "longitude":37.607619
                    }
                }
            }
        },
        {
            "place":{
                "id":57033,
                "name":"Шикари",
                "description":null,
                "slug":"shikari_horoshevskoe27",
                "market":true,
                "tags":[
                    {
                        "id":6,
                        "name":"Азиатская"
                    },
                    {
                        "id":626,
                        "name":"Вок"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":null,
                "minimalOrderPrice":900,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/f747/1380157-f747d5703fb253f7db8f78657fc9b4e9-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО Столичная трапеза, 117105, г. Москва, Варшавское ш., д. 17, пом. I, ком. 51, каб. 208, ИНН 7726383162, рег.номер 1167746714970.<br/>Режим работы ресторана: с 10:00 до 21:30",
                "deliveryConditions":"Бесплатно",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Хорошёвское шоссе, 27",
                    "location":{
                        "latitude":55.777094,
                        "longitude":37.523725
                    }
                }
            }
        },
        {
            "place":{
                "id":56793,
                "name":"Тар Тар",
                "description":null,
                "slug":"tar_tar",
                "market":false,
                "tags":[
                    {
                        "id":645,
                        "name":"Фудмолл «Депо»"
                    },
                    {
                        "id":115,
                        "name":"Европейская"
                    },
                    {
                        "id":587,
                        "name":"Сэндвичи"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":null,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/2d43/1387779-2d43798267cb1e5710800395f0992bd8-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО «САН ХОЛДИНГ», 117628, г. Москва, ул. Старобитцевская, дом 22А, под.эт.1, пом.II, ком.194, оф.1, ИНН 7727406302, рег.номер 1197746051084.<br/>Режим работы ресторана: с 10:15 до 23:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Лесная улица, 20с3",
                    "location":{
                        "latitude":55.780213,
                        "longitude":37.593075
                    }
                }
            }
        },
        {
            "place":{
                "id":53555,
                "name":"Cinnabon",
                "description":null,
                "slug":"cinnabon2",
                "market":false,
                "tags":[
                    {
                        "id":593,
                        "name":"Выпечка"
                    }
                ],
                "priceCategory":{
                    "id":1,
                    "name":"₽",
                    "value":0
                },
                "rating":null,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/a635/1387779-a6357fc50f56b7bb6474d402329716bf-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ЛПР-НВД, 141402, Московская обл, Химки г, Ленинградская ул, дом № 29, оф.710, ИНН 5047161690, рег.номер 1145047012142.<br/>Режим работы ресторана: с 10:00 до 21:45",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"площадь Киевского Вокзала, 2",
                    "location":{
                        "latitude":55.744632,
                        "longitude":37.566072
                    }
                }
            }
        },
        {
            "place":{
                "id":53411,
                "name":"DiDi",
                "description":null,
                "slug":"didi_ginza",
                "market":false,
                "tags":[
                    {
                        "id":326,
                        "name":"Грузинская"
                    },
                    {
                        "id":631,
                        "name":"Шашлык"
                    },
                    {
                        "id":593,
                        "name":"Выпечка"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":null,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/29cd/1387779-29cd39637207ac4b7329b9ed7e2dfe20-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО «Нора», 125009 г.Москва, Тверской бульвар, дом 14,стр.4, ИНН 7714340510, рег.номер 1157746457659.<br/>Режим работы ресторана: с 12:00 до 23:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Тверской бульвар, 14с4",
                    "location":{
                        "latitude":55.759729,
                        "longitude":37.601475
                    }
                }
            }
        },
        {
            "place":{
                "id":53022,
                "name":"Любовь и Сладости",
                "description":null,
                "slug":"Love_and_Sweets",
                "market":false,
                "tags":[
                    {
                        "id":192,
                        "name":"Десерты"
                    },
                    {
                        "id":593,
                        "name":"Выпечка"
                    },
                    {
                        "id":645,
                        "name":"Фудмолл «Депо»"
                    }
                ],
                "priceCategory":{
                    "id":1,
                    "name":"₽",
                    "value":0
                },
                "rating":null,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/5d3b/1387779-5d3b15f7506a0141a013c6fe9be985f6-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): Общество с ограниченной ответственностью «Любовь и Сладости», 111116, г. Москва, ул. Энергетическая, д. 5, эт. 1, пом. 1, ком. 6А-9А, ИНН 7722419386, рег.номер 5177746204345.<br/>Режим работы ресторана: с 10:00 до 22:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Лесная улица, 20с3",
                    "location":{
                        "latitude":55.780213,
                        "longitude":37.593075
                    }
                }
            }
        },
        {
            "place":{
                "id":52371,
                "name":"Ламянь",
                "description":null,
                "slug":"lamyan",
                "market":false,
                "tags":[
                    {
                        "id":7,
                        "name":"Китайская"
                    },
                    {
                        "id":645,
                        "name":"Фудмолл «Депо»"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":null,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/a990/1380298-a9904e41bebd0c47f88fc1d80cf7767e-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО Ламянь, 101000, г. Москва, ул. Мясницкая, д. 41, стр.5, этаж 4, каб. №8, ИНН 7708332951, рег.номер 1187746582385.<br/>Режим работы ресторана: с 10:00 до 22:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Лесная улица, 20с3",
                    "location":{
                        "latitude":55.780213,
                        "longitude":37.593075
                    }
                }
            }
        },
        {
            "place":{
                "id":51492,
                "name":"Patara",
                "description":null,
                "slug":"patara",
                "market":false,
                "tags":[
                    {
                        "id":326,
                        "name":"Грузинская"
                    },
                    {
                        "id":593,
                        "name":"Выпечка"
                    },
                    {
                        "id":235,
                        "name":"Завтраки"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":null,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/43ef/1370147-43efc157c409c6c99ab7afe377ff7ed4-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО «Гитара», 123001, г. Москва, Переулок Ермолаевский, д.7, этаж 1 пом. II, ИНН 7707334307, рег.номер 1157746149142.<br/>Режим работы ресторана: с 11:00 до 22:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Ермолаевский переулок, 7",
                    "location":{
                        "latitude":55.764237,
                        "longitude":37.59047
                    }
                }
            }
        },
        {
            "place":{
                "id":50418,
                "name":"Milanpizza",
                "description":null,
                "slug":"milanpizza",
                "market":false,
                "tags":[
                    {
                        "id":34,
                        "name":"Пицца"
                    },
                    {
                        "id":27,
                        "name":"Пироги"
                    },
                    {
                        "id":591,
                        "name":"Салаты"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":null,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/24b1/1380298-24b159bf1b9acdf4de7e74760b72b2a5-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО «5-Й ЭЛЕМЕНТ», 129347, г. Москва, ул. Проходчиков, д.10, корп. 1, стр. 2, помщ. 3 H, ИНН 7716745977, рег.номер 1137746440512 от 23.05.2013 г..<br/>Режим работы ресторана: с 09:00 до 22:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Шарикоподшипниковская улица, 11с1",
                    "location":{
                        "latitude":55.719561,
                        "longitude":37.678523
                    }
                }
            }
        },
        {
            "place":{
                "id":48134,
                "name":"Camorra Pizza e Birra",
                "description":null,
                "slug":"Camorra_msk",
                "market":false,
                "tags":[
                    {
                        "id":9,
                        "name":"Итальянская"
                    },
                    {
                        "id":34,
                        "name":"Пицца"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":null,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/28eb/1368744-28eb5769fbde3bc13268c8030148f21d-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"КАНИКУЛЫ\", 101000, Москва г, Спасоглинищевский Б. пер, дом № 9/1, строение 10, помещение I, этаж 1, кабинет 3, ИНН 9709000053, рег.номер 1177746449275.<br/>Режим работы ресторана: с 13:30 до 19:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Большой Спасоглинищевский переулок, 9/1с10",
                    "location":{
                        "latitude":55.754978,
                        "longitude":37.637299
                    }
                }
            }
        },
        {
            "place":{
                "id":48119,
                "name":"Butler",
                "description":null,
                "slug":"butler",
                "market":false,
                "tags":[
                    {
                        "id":501,
                        "name":"Средиземноморская"
                    },
                    {
                        "id":9,
                        "name":"Итальянская"
                    },
                    {
                        "id":34,
                        "name":"Пицца"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":null,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/719a/1387779-719a12ad3b504072a92fbf69f0405505-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО Маруся, 107140, г. Москва, Красносельский 1-й пер., д. 3, пом. I, комн. 78, ИНН 7708269058, рег.номер 1157746917899.<br/>Режим работы ресторана: с 12:00 до 23:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Трёхпрудный переулок, 15",
                    "location":{
                        "latitude":55.76604,
                        "longitude":37.595564
                    }
                }
            }
        },
        {
            "place":{
                "id":43273,
                "name":"Буше торты",
                "description":null,
                "slug":"bushe-torti-teatralniy",
                "market":false,
                "tags":[
                    {
                        "id":593,
                        "name":"Выпечка"
                    },
                    {
                        "id":115,
                        "name":"Европейская"
                    },
                    {
                        "id":192,
                        "name":"Десерты"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":null,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/f265/1380298-f265f766a7aedcd585007245fec15f62-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ВЕНЕЦ\", 191119, Санкт-Петербург г, Правды ул, дом № 2/13, литера А, помещение 1Н, офис 6, ИНН 7825491842, рег.номер 1027809214080.<br/>Режим работы ресторана: с 10:00 до 19:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Театральный проезд, 5с1",
                    "location":{
                        "latitude":55.760038,
                        "longitude":37.625846
                    }
                }
            }
        },
        {
            "place":{
                "id":36879,
                "name":"Caprise pizza",
                "description":null,
                "slug":"caprisepizza",
                "market":true,
                "tags":[
                    {
                        "id":115,
                        "name":"Европейская"
                    },
                    {
                        "id":59,
                        "name":"Американская"
                    },
                    {
                        "id":8,
                        "name":"Русская"
                    },
                    {
                        "id":6,
                        "name":"Азиатская"
                    },
                    {
                        "id":626,
                        "name":"Вок"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":null,
                "minimalOrderPrice":500,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/d481/1387779-d4810d8f740f467622eb33b2dc78f8de-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ПАРАДИЗ\", 109439 ,г.Москва,Волгоградский пр-т 152 стр.1, ИНН 7708543399, рег.номер 1047796870032.<br/>Режим работы ресторана: с 11:00 до 22:40",
                "deliveryConditions":"Бесплатно",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Волгоградский проспект, 152с1",
                    "location":{
                        "latitude":55.701399,
                        "longitude":37.791037
                    }
                }
            }
        },
        {
            "place":{
                "id":28648,
                "name":"Бар-буфет Николай",
                "description":null,
                "slug":"barnikolai2",
                "market":true,
                "tags":[
                    {
                        "id":8,
                        "name":"Русская"
                    },
                    {
                        "id":115,
                        "name":"Европейская"
                    },
                    {
                        "id":27,
                        "name":"Пироги"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":null,
                "minimalOrderPrice":960,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/e5ce/1380157-e5ce71a78f150cc5f75007aae7d08ade-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ДАН\", 105064, Москва г, Басманная Стар ул, дом № 5, строение 1, ИНН 7701970722, рег.номер 1127746737975.<br/>Режим работы ресторана: с 09:00 до 20:30",
                "deliveryConditions":"Доставка 100 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Старая Басманная улица, 5с1",
                    "location":{
                        "latitude":55.764511,
                        "longitude":37.656937
                    }
                }
            }
        },
        {
            "place":{
                "id":21093,
                "name":"Суши Wok",
                "description":null,
                "slug":"SushiWok1",
                "market":true,
                "tags":[
                    {
                        "id":33,
                        "name":"Суши"
                    },
                    {
                        "id":52,
                        "name":"Японская"
                    },
                    {
                        "id":626,
                        "name":"Вок"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":null,
                "minimalOrderPrice":500,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/ed7a/1380298-ed7a834486ccc994518122dcdea828a0-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ИП Ткачев Валентин Алексеевич, ИНН 233906743608, рег.номер 317502200003128.<br/>Режим работы ресторана: с 10:00 до 22:00",
                "deliveryConditions":"Доставка 100 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Коломна",
                    "short":"улица Гагарина, 21",
                    "location":{
                        "latitude":55.09169,
                        "longitude":38.768674
                    }
                }
            }
        },
        {
            "place":{
                "id":53159,
                "name":"Продукты",
                "description":null,
                "slug":"produkty",
                "market":false,
                "tags":[
                    {
                        "id":653,
                        "name":"Фрукты"
                    },
                    {
                        "id":656,
                        "name":"Овощи"
                    },
                    {
                        "id":659,
                        "name":"Хлеб"
                    },
                    {
                        "id":662,
                        "name":"Вода"
                    },
                    {
                        "id":665,
                        "name":"Товары для дома"
                    },
                    {
                        "id":593,
                        "name":"Выпечка"
                    },
                    {
                        "id":599,
                        "name":"Детское меню"
                    }
                ],
                "priceCategory":{
                    "id":1,
                    "name":"₽",
                    "value":0
                },
                "rating":4.9,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":true,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/aa53/1380298-aa537d913db8543552ea07673f4279ec-600x345.png",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО «СУБМАРИНЕР», 125315, город Москва, Ленинградский проспект, дом 80 корпус 21, эт технический пом I ком 2, ИНН 7718231590, рег.номер 1157746538641.<br/>Режим работы магазина: с 08:00 до 23:00",
                "deliveryConditions":"Бесплатно",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"улица Лётчика Бабушкина, 33",
                    "location":{
                        "latitude":55.872001,
                        "longitude":37.672208
                    }
                }
            }
        },
        {
            "place":{
                "id":47495,
                "name":"Кухня Кипра",
                "description":null,
                "slug":"kitchen_koupes",
                "market":false,
                "tags":[
                    {
                        "id":80,
                        "name":"Греческая"
                    },
                    {
                        "id":501,
                        "name":"Средиземноморская"
                    },
                    {
                        "id":593,
                        "name":"Выпечка"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.9,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/7141/1370147-7141c061362240fc2378dd33644693b6-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ИП Волга Максим Владимирович, 141006, МО, г. Мытищи, Олимпийский проспект д.13 к.4 кв.112, ИНН 502907483808, рег.номер 317502900053942.<br/>Режим работы ресторана: с 10:00 до 20:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"улица Рогожский Вал, 5с1",
                    "location":{
                        "latitude":55.744363,
                        "longitude":37.679134
                    }
                }
            }
        },
        {
            "place":{
                "id":46595,
                "name":"Рассольников",
                "description":null,
                "slug":"rassolnikovmira",
                "market":false,
                "tags":[
                    {
                        "id":8,
                        "name":"Русская"
                    },
                    {
                        "id":1,
                        "name":"Стейки"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.9,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/040e/1368744-040e46f0d3b8e813e020f7fee90be014-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО «ЛОРГАН», 142660, Московская область, Орехово-Зуевский район, г. Дрезна, ул. И.Н. Зимина, дом 1, этаж 1, комн. 22, ИНН 5034035843, рег.номер 1085034003757.<br/>Режим работы ресторана: с 12:00 до 23:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"проспект Мира, 68с1А",
                    "location":{
                        "latitude":55.787568,
                        "longitude":37.635826
                    }
                }
            }
        },
        {
            "place":{
                "id":39014,
                "name":"Пян-Се",
                "description":null,
                "slug":"Pyan-Se-Mira",
                "market":false,
                "tags":[
                    {
                        "id":32,
                        "name":"Корейская"
                    }
                ],
                "priceCategory":{
                    "id":1,
                    "name":"₽",
                    "value":0
                },
                "rating":4.9,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/9951/1370147-995199cfcb046648b698a66e777895da-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ЗАО \"СИНЭРГОС-МОСКВА\", 121614, Москва г, Крылатские Холмы ул, дом № 30, корпус 8, квартира 222, ИНН 7731448714, рег.номер 1137746473490.<br/>Режим работы ресторана: с 09:30 до 20:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"проспект Мира, 40",
                    "location":{
                        "latitude":55.780203,
                        "longitude":37.633949
                    }
                }
            }
        },
        {
            "place":{
                "id":38792,
                "name":"Одесса-Мама",
                "description":null,
                "slug":"Odessa_Mama_Kriv",
                "market":true,
                "tags":[
                    {
                        "id":8,
                        "name":"Русская"
                    },
                    {
                        "id":559,
                        "name":"Еврейская"
                    },
                    {
                        "id":235,
                        "name":"Завтраки"
                    },
                    {
                        "id":595,
                        "name":"Постное меню"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.9,
                "minimalOrderPrice":2400,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/48db/1370147-48db8db643f9240d9dd88581177d6fdb-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ФЕНИКС\", 125009, Москва г, Гнездниковский Б пер, дом № 10, ИНН 7710953258, рег.номер 5137746157984.<br/>ООО Феникс Юридический адрес: 125009, Москва г, Гнездниковский Б пер, дом № 10 ИНН: 7710953258 ОГРН: 5137746157984 КПП: 770145001<br/>Режим работы ресторана: с 11:00 до 22:30",
                "deliveryConditions":"Бесплатно",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"Кривоколенный переулок, 10с5",
                    "location":{
                        "latitude":55.761761,
                        "longitude":37.635673
                    }
                }
            }
        },
        {
            "place":{
                "id":37220,
                "name":"Сытый лось",
                "description":null,
                "slug":"los_medv",
                "market":false,
                "tags":[
                    {
                        "id":8,
                        "name":"Русская"
                    },
                    {
                        "id":115,
                        "name":"Европейская"
                    },
                    {
                        "id":569,
                        "name":"Бургеры"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.9,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/aa77/1380157-aa771e0880beb7b1e020aa46310fce79-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"СИТЛОС\", 127282, Москва г, Широкая ул, дом № 12Б, этаж 3, помещение 10, ИНН 7733284437, рег.номер 1167746455931.<br/>Режим работы ресторана: с 12:00 до 23:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Широкая улица, 12Б",
                    "location":{
                        "latitude":55.88661,
                        "longitude":37.660314
                    }
                }
            }
        },
        {
            "place":{
                "id":915,
                "name":"The Hummus",
                "description":null,
                "slug":"TheHummus_NKrasnoselskaya",
                "market":false,
                "tags":[
                    {
                        "id":559,
                        "name":"Еврейская"
                    }
                ],
                "priceCategory":{
                    "id":1,
                    "name":"₽",
                    "value":0
                },
                "rating":4.9,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/2efc/1387779-2efc73a2c2e7cfcd51384184e9f13b3e-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ИП Брауде Анисим Владимирович, 105484, Москва г, Сиреневый б-р, дом № 54, квартира 121, ИНН 771915058185, рег.номер 316774600423538.<br/>Режим работы ресторана: с 10:30 до 21:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"Нижняя Красносельская улица, 35с59",
                    "location":{
                        "latitude":55.776598,
                        "longitude":37.674741
                    }
                }
            }
        },
        {
            "place":{
                "id":343,
                "name":"Мясной Ресторан Бочка",
                "description":null,
                "slug":"Bochka",
                "market":false,
                "tags":[
                    {
                        "id":8,
                        "name":"Русская"
                    },
                    {
                        "id":115,
                        "name":"Европейская"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.9,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/e613/1370147-e61392b95fc1938681d800f3b229774c-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"Д-ДЕЛИВЕРИ\", 119530, Москва г, Аминьевское ш, дом № 7, корпус 1, этаж 1 Пом II Ком 9, ИНН 9729166716, рег.номер 5177746201969.<br/>Режим работы ресторана: с 00:00 до 00:30; с 08:00 до 24:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"улица 1905 года, 2",
                    "location":{
                        "latitude":55.755003,
                        "longitude":37.560413
                    }
                }
            }
        },
        {
            "place":{
                "id":298,
                "name":"Булошная",
                "description":null,
                "slug":"Buloshnaja-Jitnaya",
                "market":false,
                "tags":[
                    {
                        "id":8,
                        "name":"Русская"
                    },
                    {
                        "id":115,
                        "name":"Европейская"
                    },
                    {
                        "id":192,
                        "name":"Десерты"
                    },
                    {
                        "id":599,
                        "name":"Детское меню"
                    },
                    {
                        "id":235,
                        "name":"Завтраки"
                    },
                    {
                        "id":569,
                        "name":"Бургеры"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.9,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/2029/1370147-2029b8dea3fafa9bfb6fe60b7600b184-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО  \"ЖИТНАЯ 10\", 119049, Москва г, Житная ул, дом № 10, ИНН 7706737046, рег.номер 1107746391719.<br/>Режим работы ресторана: с 08:00 до 22:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"Житная улица, 10",
                    "location":{
                        "latitude":55.730294,
                        "longitude":37.618929
                    }
                }
            }
        },
        {
            "place":{
                "id":178,
                "name":"Corner Burger",
                "description":null,
                "slug":"Corner_Burger_Gruzinskaya",
                "market":false,
                "tags":[
                    {
                        "id":59,
                        "name":"Американская"
                    },
                    {
                        "id":393,
                        "name":"Мексиканская"
                    },
                    {
                        "id":569,
                        "name":"Бургеры"
                    },
                    {
                        "id":595,
                        "name":"Постное меню"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.9,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/22ae/1380298-22ae7ef52343486e2d0940bf686917ec-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"БРЕСТСКАЯ\", 125047, Москва г, Грузинская Б ул, дом № 76, помещение II, комната 3, ИНН 7710758539, рег.номер 1097746662980.<br/>Режим работы ресторана: с 11:00 до 23:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Большая Грузинская улица, 76",
                    "location":{
                        "latitude":55.77356,
                        "longitude":37.586904
                    }
                }
            }
        },
        {
            "place":{
                "id":127,
                "name":"China Club",
                "description":null,
                "slug":"china_club",
                "market":false,
                "tags":[
                    {
                        "id":58,
                        "name":"Паназиатская"
                    },
                    {
                        "id":626,
                        "name":"Вок"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.9,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/11bf/1370147-11bf4d94f79abf51ec1a5c7371d3a17e-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ИНТЕЛЛИ\", 123056, Москва г, Красина ул, дом № 21, ИНН 7728247687, рег.номер 1027700494348.<br/>Режим работы ресторана: с 12:00 до 22:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"улица Красина, 21",
                    "location":{
                        "latitude":55.768694,
                        "longitude":37.586104
                    }
                }
            }
        },
        {
            "place":{
                "id":114,
                "name":"Meat Me",
                "description":null,
                "slug":"Meat-Me",
                "market":false,
                "tags":[
                    {
                        "id":501,
                        "name":"Средиземноморская"
                    },
                    {
                        "id":559,
                        "name":"Еврейская"
                    }
                ],
                "priceCategory":{
                    "id":1,
                    "name":"₽",
                    "value":0
                },
                "rating":4.9,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/268c/1370147-268c56d4198bca0126c355352f79b66b-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ИП Саркисов Артур Сергеевич, 123242, Москва г, Зоологическая ул, дом № 22, квартира 79, ИНН 770373932031, рег.номер 316774600310903.<br/>Режим работы ресторана: с 10:00 до 22:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"улица Шаболовка, 29к2",
                    "location":{
                        "latitude":55.722,
                        "longitude":37.611
                    }
                }
            }
        },
        {
            "place":{
                "id":44,
                "name":"Brix",
                "description":null,
                "slug":"Brix",
                "market":false,
                "tags":[
                    {
                        "id":59,
                        "name":"Американская"
                    },
                    {
                        "id":115,
                        "name":"Европейская"
                    },
                    {
                        "id":569,
                        "name":"Бургеры"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.9,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/3a39/1380157-3a39cae401bcc78eb3674a3b635da7f7-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"МЯТА\", 123001, Москва г, Козихинский М. пер, дом № 10, строение 1, ИНН 7710915132, рег.номер 1127746469014.<br/>Режим работы ресторана: с 12:30 до 22:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"Малый Козихинский переулок, 10с1",
                    "location":{
                        "latitude":55.764349,
                        "longitude":37.59639
                    }
                }
            }
        },
        {
            "place":{
                "id":34,
                "name":"ВьетКафе",
                "description":null,
                "slug":"VietCafe_Vernadskogo",
                "market":false,
                "tags":[
                    {
                        "id":203,
                        "name":"Вьетнамская"
                    },
                    {
                        "id":626,
                        "name":"Вок"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.9,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/d637/1370147-d637e5f5ddb77c76471b8356bf537bd5-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"САЙКО\", 117526, Москва г, Вернадского пр-кт, дом № 105, корпус 1, ИНН 7729698675, рег.номер 5117746021729.<br/>Режим работы ресторана: с 12:00 до 23:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"проспект Вернадского, 105к1",
                    "location":{
                        "latitude":55.662354,
                        "longitude":37.485861
                    }
                }
            }
        },
        {
            "place":{
                "id":32122,
                "name":"Point Coffee & Food",
                "description":null,
                "slug":"Point_Coffee",
                "market":false,
                "tags":[
                    {
                        "id":59,
                        "name":"Американская"
                    },
                    {
                        "id":115,
                        "name":"Европейская"
                    },
                    {
                        "id":569,
                        "name":"Бургеры"
                    },
                    {
                        "id":192,
                        "name":"Десерты"
                    }
                ],
                "priceCategory":{
                    "id":1,
                    "name":"₽",
                    "value":0
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/e410/1387779-e4101fa7ce07c3dce2b3260f5e11c692-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"БЕЙГЛ\", 107140, Москва г, Комсомольская пл, дом № 6, помещение 1, комната 105, ИНН 7725814352, рег.номер 5137746240451.<br/>Режим работы ресторана: с 10:00 до 21:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Новослободская улица, 11",
                    "location":{
                        "latitude":55.779859,
                        "longitude":37.599372
                    }
                }
            }
        },
        {
            "place":{
                "id":25703,
                "name":"Мимино",
                "description":null,
                "slug":"miminomsk",
                "market":false,
                "tags":[
                    {
                        "id":326,
                        "name":"Грузинская"
                    },
                    {
                        "id":352,
                        "name":"Кавказская"
                    },
                    {
                        "id":593,
                        "name":"Выпечка"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/2608/1380298-26085c147d20a92c26a56c5fb3769238-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО\"ДОРИ\", 115230, Москва г, Хлебозаводский проезд, дом № 7, строение 9, этаж 5, помещение XII, комната 8, офис 5, ИНН 7724419656, рег.номер 1177746961732.<br/>Режим работы ресторана: с 12:00 до 22:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"Енисейская улица, 5",
                    "location":{
                        "latitude":55.858584,
                        "longitude":37.659838
                    }
                }
            }
        },
        {
            "place":{
                "id":6033,
                "name":"Есть хинкали пить вино",
                "description":null,
                "slug":"Est_hinkali_pit_vino_ostojenka",
                "market":false,
                "tags":[
                    {
                        "id":326,
                        "name":"Грузинская"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/f1ad/1387779-f1adf7625394b0caa4545ad7e4969984-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ПРЕМЬЕР\", 129344, Москва, улица Бабушкина Летчика, дом 1, кор. 3, помещение VIII, комн. 7, ИНН 7716837145, рег.номер 5167746232594.<br/>Режим работы ресторана: с 11:00 до 22:50",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"улица Остоженка, 19с1",
                    "location":{
                        "latitude":55.740928,
                        "longitude":37.598447
                    }
                }
            }
        },
        {
            "place":{
                "id":3987,
                "name":"Батони",
                "description":null,
                "slug":"Batoni_Dorogomilovskaya",
                "market":false,
                "tags":[
                    {
                        "id":631,
                        "name":"Шашлык"
                    },
                    {
                        "id":192,
                        "name":"Десерты"
                    },
                    {
                        "id":326,
                        "name":"Грузинская"
                    },
                    {
                        "id":593,
                        "name":"Выпечка"
                    },
                    {
                        "id":595,
                        "name":"Постное меню"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/6905/1387779-690589f07efc883d96f6ffe1c6bbca2e-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"БИОФУД\", 119048, Москва г, Комсомольский пр-кт, дом № 42, строение 3, ИНН 7704806248, рег.номер 1127746310163.<br/>Режим работы ресторана: с 11:30 до 22:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Большая Дорогомиловская улица, 12А",
                    "location":{
                        "latitude":55.746522,
                        "longitude":37.561113
                    }
                }
            }
        },
        {
            "place":{
                "id":2983,
                "name":"Plov.com",
                "description":null,
                "slug":"Plovcom_Vavilova",
                "market":false,
                "tags":[
                    {
                        "id":37,
                        "name":"Узбекская"
                    },
                    {
                        "id":555,
                        "name":"Восточная"
                    },
                    {
                        "id":593,
                        "name":"Выпечка"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/a654/1380298-a654ccd493b2358f69fec0891f6c7942-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ИП Исмаилов Зафар Шавкатович, 117405, Москва г, Варшавское ш, дом № 152, корпус 6, квартира 194, ИНН 772610368410, рег.номер 317774600581199.<br/>Режим работы ресторана: с 11:00 до 20:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"улица Вавилова, 64/1с1",
                    "location":{
                        "latitude":55.683919,
                        "longitude":37.550567
                    }
                }
            }
        },
        {
            "place":{
                "id":1743,
                "name":"Osteria Mario",
                "description":null,
                "slug":"Osteria_Mario_Khimki1",
                "market":false,
                "tags":[
                    {
                        "id":9,
                        "name":"Итальянская"
                    },
                    {
                        "id":1,
                        "name":"Стейки"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/c7f5/1387779-c7f532c7f640fe787cb633a322066083-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"АПОЛЛОН\", 111024, Москва г, Душинская ул, дом № 7, строение 1, ИНН 7722789073, рег.номер 1127747061903.<br/>Режим работы ресторана: с 11:00 до 22:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Химки",
                    "short":"8-й микрорайон, к2",
                    "location":{
                        "latitude":55.909837,
                        "longitude":37.398186
                    }
                }
            }
        },
        {
            "place":{
                "id":532,
                "name":"Ichiban Boshi",
                "description":null,
                "slug":"IchibanBoshiYakimanka",
                "market":false,
                "tags":[
                    {
                        "id":33,
                        "name":"Суши"
                    },
                    {
                        "id":52,
                        "name":"Японская"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/fcb9/1370147-fcb96a8422311f7c18c3cb125d42be5b-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ИЧИБАН БОШИ\", 119180, Москва г, Якиманка Б ул, дом № 50, ИНН 7706762282, рег.номер 1117746750186.<br/>Режим работы ресторана: с 14:00 до 22:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"улица Большая Якиманка, 50",
                    "location":{
                        "latitude":55.73218,
                        "longitude":37.611167
                    }
                }
            }
        },
        {
            "place":{
                "id":497,
                "name":"Фреско",
                "description":null,
                "slug":"Caffe_Fresco",
                "market":false,
                "tags":[
                    {
                        "id":9,
                        "name":"Итальянская"
                    },
                    {
                        "id":34,
                        "name":"Пицца"
                    },
                    {
                        "id":192,
                        "name":"Десерты"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/7b03/1370147-7b034e35b4396cb88d1b8df46b5afb81-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ФРЕСКО\", 119146, Москва г, Фрунзенская 1-Я ул, дом № 8, ИНН 7704867201, рег.номер 1147746720582.<br/>Режим работы ресторана: с 12:00 до 23:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"1-я Фрунзенская улица, 8",
                    "location":{
                        "latitude":55.727886,
                        "longitude":37.585404
                    }
                }
            }
        },
        {
            "place":{
                "id":444,
                "name":"Лимончино",
                "description":null,
                "slug":"Limoncino",
                "market":false,
                "tags":[
                    {
                        "id":9,
                        "name":"Итальянская"
                    },
                    {
                        "id":34,
                        "name":"Пицца"
                    },
                    {
                        "id":595,
                        "name":"Постное меню"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/4eba/1380298-4ebad11ea353a51e7340cc01d9a0fa3f-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ЧЕРЁМУШКИ\", 117418, Москва г, Профсоюзная ул, дом № 33, строение 1, ИНН 7727837059, рег.номер 1147746693126.<br/>Режим работы ресторана: с 11:00 до 23:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Профсоюзная улица, 33к1",
                    "location":{
                        "latitude":55.672346,
                        "longitude":37.557906
                    }
                }
            }
        },
        {
            "place":{
                "id":440,
                "name":"Китайская грамота",
                "description":null,
                "slug":"Kitayskaya_gramota",
                "market":false,
                "tags":[
                    {
                        "id":6,
                        "name":"Азиатская"
                    },
                    {
                        "id":7,
                        "name":"Китайская"
                    },
                    {
                        "id":626,
                        "name":"Вок"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/e172/1370147-e172ba9cdf049d94e37270b1633bdd42-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ИНФОРМАЦИОННОЕ АГЕНТСТВО \"МФЦ\", 107023, Москва г, Буженинова ул, дом № 30, строение 1, ИНН 7718709124, рег.номер 1087746753797.<br/>Режим работы ресторана: с 12:00 до 22:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"улица Сретенка, 1",
                    "location":{
                        "latitude":55.766532,
                        "longitude":37.630544
                    }
                }
            }
        },
        {
            "place":{
                "id":385,
                "name":"ExtraVirgin",
                "description":null,
                "slug":"ExtraVirgin",
                "market":false,
                "tags":[
                    {
                        "id":9,
                        "name":"Итальянская"
                    },
                    {
                        "id":34,
                        "name":"Пицца"
                    },
                    {
                        "id":192,
                        "name":"Десерты"
                    },
                    {
                        "id":593,
                        "name":"Выпечка"
                    },
                    {
                        "id":599,
                        "name":"Детское меню"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/2e19/1387779-2e193c39c9de9015f508039d08cf6678-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"РС КОНСАЛТИНГ\", 119571, Москва г, Академика Анохина ул, дом № 11А, помещение 34, ИНН 7729750798, рег.номер 1137746834610.<br/>Режим работы ресторана: с 12:00 до 22:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"улица Покровка, 17с1",
                    "location":{
                        "latitude":55.759851,
                        "longitude":37.64577
                    }
                }
            }
        },
        {
            "place":{
                "id":382,
                "name":"Хочу Хычин",
                "description":null,
                "slug":"Hochu_hichin",
                "market":false,
                "tags":[
                    {
                        "id":352,
                        "name":"Кавказская"
                    },
                    {
                        "id":593,
                        "name":"Выпечка"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/b6a9/1368744-b6a90bdcf36eb12a34d0feb7266f8746-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ИП Салпагарова Фатима Топшаевна, г.Кисловодск , Азербайджанская , дом № 30, ИНН 262802583636, рег.номер 308262824100032.<br/>Режим работы ресторана: с 15:30 до 23:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"улица Новый Арбат, 21",
                    "location":{
                        "latitude":55.751923,
                        "longitude":37.585925
                    }
                }
            }
        },
        {
            "place":{
                "id":370,
                "name":"Corner Café & Kitchen",
                "description":null,
                "slug":"Corner_Kitchen_Cafe",
                "market":false,
                "tags":[
                    {
                        "id":6,
                        "name":"Азиатская"
                    },
                    {
                        "id":52,
                        "name":"Японская"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/4080/1387779-40804fd4404678ec95d8ca50f50b5af9-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"РАМЕНБАР\", 121099, Москва г, Композиторская ул, дом № 17, квартира Этаж 1 Комн 9, ИНН 7733285720, рег.номер 1167746485686.<br/>Режим работы ресторана: с 12:00 до 22:15",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Композиторская улица, 17",
                    "location":{
                        "latitude":55.751224,
                        "longitude":37.586302
                    }
                }
            }
        },
        {
            "place":{
                "id":364,
                "name":"Крепери де Пари",
                "description":null,
                "slug":"Kreperi_de_Pari",
                "market":false,
                "tags":[
                    {
                        "id":192,
                        "name":"Десерты"
                    },
                    {
                        "id":423,
                        "name":"Французская"
                    },
                    {
                        "id":235,
                        "name":"Завтраки"
                    },
                    {
                        "id":595,
                        "name":"Постное меню"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/b8f6/1387779-b8f64632372653518d08708d3e5ef086-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ДЭЛИУЗ\", 107140, Москва г, Краснопрудная ул, дом № 12/1, корпус 1, квартира 15, ИНН 7708199837, рег.номер 1027700133614.<br/>Режим работы ресторана: с 09:00 до 22:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"Профсоюзная улица, 12",
                    "location":{
                        "latitude":55.685432,
                        "longitude":37.570123
                    }
                }
            }
        },
        {
            "place":{
                "id":354,
                "name":"Воронеж",
                "description":null,
                "slug":"Voronezh_na_Dmitrovke",
                "market":false,
                "tags":[
                    {
                        "id":59,
                        "name":"Американская"
                    },
                    {
                        "id":569,
                        "name":"Бургеры"
                    },
                    {
                        "id":1,
                        "name":"Стейки"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/0ef9/1380157-0ef937cf5870e76b5b50814194756d0c-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"МАНДАРИН\", 119048, Москва г, Ефремова ул, дом № 20, помещение I, офис 4, ИНН 7704321469, рег.номер 1157746600230.<br/>Режим работы ресторана: с 12:00 до 23:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"улица Большая Дмитровка, 12/1с1",
                    "location":{
                        "latitude":55.761512,
                        "longitude":37.614743
                    }
                }
            }
        },
        {
            "place":{
                "id":339,
                "name":"Кафе Пушкинъ",
                "description":null,
                "slug":"Cafe_Pushkin",
                "market":false,
                "tags":[
                    {
                        "id":27,
                        "name":"Пироги"
                    },
                    {
                        "id":8,
                        "name":"Русская"
                    },
                    {
                        "id":30,
                        "name":"Авторская"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/ce30/1380298-ce3087fe1d7da38045f3066862220ea0-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"Д-ДЕЛИВЕРИ\", 119530, Москва г, Аминьевское ш, дом № 7, корпус 1, этаж 1 Пом II Ком 9, ИНН 9729166716, рег.номер 5177746201969.<br/>Режим работы ресторана: с 00:00 до 00:30; с 08:00 до 24:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Тверской бульвар, 26А",
                    "location":{
                        "latitude":55.7637,
                        "longitude":37.605032
                    }
                }
            }
        },
        {
            "place":{
                "id":324,
                "name":"Жи Есть",
                "description":null,
                "slug":"Jiest",
                "market":false,
                "tags":[
                    {
                        "id":27,
                        "name":"Пироги"
                    },
                    {
                        "id":352,
                        "name":"Кавказская"
                    },
                    {
                        "id":235,
                        "name":"Завтраки"
                    },
                    {
                        "id":569,
                        "name":"Бургеры"
                    },
                    {
                        "id":593,
                        "name":"Выпечка"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/8c87/1370147-8c873b09420bdbd144c30b0eefe0a7d9-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ЛИДЕР+\", 115419, Москва г, Орджоникидзе ул, дом № 11, строение 17, ИНН 7725815290, рег.номер 1147746017210.<br/>Режим работы ресторана: с 00:00 до 00:30; с 08:00 до 24:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"улица Орджоникидзе, 11с17",
                    "location":{
                        "latitude":55.708212,
                        "longitude":37.591369
                    }
                }
            }
        },
        {
            "place":{
                "id":323,
                "name":"Гулиани",
                "description":null,
                "slug":"Guliani",
                "market":false,
                "tags":[
                    {
                        "id":27,
                        "name":"Пироги"
                    },
                    {
                        "id":37,
                        "name":"Узбекская"
                    },
                    {
                        "id":326,
                        "name":"Грузинская"
                    },
                    {
                        "id":352,
                        "name":"Кавказская"
                    },
                    {
                        "id":1,
                        "name":"Стейки"
                    },
                    {
                        "id":593,
                        "name":"Выпечка"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/078b/1370147-078b64fc0438c9e013f17e3c34a3e5d3-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"БЛЕСК\", 119607, Москва г, Мичуринский пр-кт, дом № 27, ИНН 7729463480, рег.номер 1157746517103.<br/>Режим работы ресторана: с 11:00 до 22:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"Мичуринский проспект, вл27",
                    "location":{
                        "latitude":55.697463,
                        "longitude":37.500207
                    }
                }
            }
        },
        {
            "place":{
                "id":316,
                "name":"Laffa Laffa",
                "description":null,
                "slug":"LaffaLaffa",
                "market":false,
                "tags":[
                    {
                        "id":26,
                        "name":"Ливанская"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/2d5b/1370147-2d5bfc6d2769635633a3d6f87194a462-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ПРОДЖЕКТ ДЖУН\", 117461, Москва г, Каховка ул, дом № 30, помещение комната 1 13, ИНН 7727836873, рег.номер 1147746683050.<br/>Режим работы ресторана: с 11:30 до 22:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Малая Бронная улица, 4",
                    "location":{
                        "latitude":55.759552,
                        "longitude":37.597477
                    }
                }
            }
        },
        {
            "place":{
                "id":306,
                "name":"Кимчи",
                "description":null,
                "slug":"Kimchi_RevolutionSq",
                "market":false,
                "tags":[
                    {
                        "id":32,
                        "name":"Корейская"
                    },
                    {
                        "id":33,
                        "name":"Суши"
                    },
                    {
                        "id":52,
                        "name":"Японская"
                    },
                    {
                        "id":626,
                        "name":"Вок"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/21f0/1370147-21f0099e716094841fd86a9b19a82328-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО ФИРМА \"СТАРАЯ ПЛОЩАДЬ\", 103012, Москва г, Черкасский Б. пер, дом № 8_6, строение 1, ИНН 7730071423, рег.номер 1037739054847.<br/>Режим работы ресторана: с 12:00 до 22:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"Большой Черкасский переулок, 8/6с1",
                    "location":{
                        "latitude":55.756057,
                        "longitude":37.626654
                    }
                }
            }
        },
        {
            "place":{
                "id":268,
                "name":"Черетто",
                "description":null,
                "slug":"Cheretto_Tsvetnoy",
                "market":false,
                "tags":[
                    {
                        "id":9,
                        "name":"Итальянская"
                    },
                    {
                        "id":33,
                        "name":"Суши"
                    },
                    {
                        "id":34,
                        "name":"Пицца"
                    },
                    {
                        "id":52,
                        "name":"Японская"
                    },
                    {
                        "id":593,
                        "name":"Выпечка"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/6eec/1370147-6eecd0787202c76b050996536641a831-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"РЕНТКАР\", 127051, Москва г, Цветной б-р, дом № 11, строение 3, ИНН 7704672450, рег.номер 1077764118915.<br/>Режим работы ресторана: с 11:00 до 22:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"Цветной бульвар, 11с3",
                    "location":{
                        "latitude":55.769697,
                        "longitude":37.620761
                    }
                }
            }
        },
        {
            "place":{
                "id":239,
                "name":"Родные люди",
                "description":null,
                "slug":"RodnuyeLuydi",
                "market":false,
                "tags":[
                    {
                        "id":9,
                        "name":"Итальянская"
                    },
                    {
                        "id":34,
                        "name":"Пицца"
                    },
                    {
                        "id":59,
                        "name":"Американская"
                    },
                    {
                        "id":235,
                        "name":"Завтраки"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/3b64/1380298-3b64965363fecedbf256782fa7981c32-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ЛЕЖЕ\", 119192, Москва г, Столетова ул, дом № 7, корпус 1, ИНН 7729460601, рег.номер 1157746438156.<br/>Режим работы ресторана: с 12:00 до 22:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"улица Столетова, 7к1",
                    "location":{
                        "latitude":55.704981,
                        "longitude":37.501618
                    }
                }
            }
        },
        {
            "place":{
                "id":211,
                "name":"Ess-Thetik",
                "description":null,
                "slug":"Ess-Thetik",
                "market":false,
                "tags":[
                    {
                        "id":9,
                        "name":"Итальянская"
                    },
                    {
                        "id":34,
                        "name":"Пицца"
                    },
                    {
                        "id":235,
                        "name":"Завтраки"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/d33b/1387779-d33bf0e80e211bd1f7c35c5d7f8cf6aa-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ВИНЕР\", 105005, Москва г, Старокирочный пер, дом № 16_2, строение 1, квартира Помещ 2 Комн 4, ИНН 9701083570, рег.номер 1177746834847.<br/>Режим работы ресторана: с 12:00 до 21:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Малая Бронная улица, 20с1",
                    "location":{
                        "latitude":55.762328,
                        "longitude":37.595779
                    }
                }
            }
        },
        {
            "place":{
                "id":207,
                "name":"Don Giulio Pasticceria",
                "description":null,
                "slug":"DonGiulioPasticceria",
                "market":false,
                "tags":[
                    {
                        "id":9,
                        "name":"Итальянская"
                    },
                    {
                        "id":34,
                        "name":"Пицца"
                    },
                    {
                        "id":192,
                        "name":"Десерты"
                    },
                    {
                        "id":235,
                        "name":"Завтраки"
                    },
                    {
                        "id":569,
                        "name":"Бургеры"
                    },
                    {
                        "id":593,
                        "name":"Выпечка"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/6850/1387779-6850b83ba00445d45ed08565860992ca-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"АГРИКА-104\", 105062, Москва г, Покровка ул, дом № 27, строение 1, ИНН 7701037932, рег.номер 1027739072855.<br/>Режим работы ресторана: с 11:00 до 21:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"улица Покровка, 27с1",
                    "location":{
                        "latitude":55.760195,
                        "longitude":37.648097
                    }
                }
            }
        },
        {
            "place":{
                "id":192,
                "name":"Максима Пицца",
                "description":null,
                "slug":"MaximaPizza",
                "market":false,
                "tags":[
                    {
                        "id":9,
                        "name":"Итальянская"
                    },
                    {
                        "id":34,
                        "name":"Пицца"
                    },
                    {
                        "id":52,
                        "name":"Японская"
                    },
                    {
                        "id":569,
                        "name":"Бургеры"
                    },
                    {
                        "id":1,
                        "name":"Стейки"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/0056/1370147-0056ef4c9d3f83f4d501612a7575cd82-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ПРОФИТ\", 125315, Москва г, Ленинградский пр-кт, дом № 78, корпус 1, ИНН 7743924485, рег.номер 1147746448068.<br/>Режим работы ресторана: с 12:00 до 22:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Ленинградский проспект, 78к1",
                    "location":{
                        "latitude":55.806059,
                        "longitude":37.513296
                    }
                }
            }
        },
        {
            "place":{
                "id":159,
                "name":"Крылышко или Ножка",
                "description":null,
                "slug":"KrylyshkoorNozhka",
                "market":false,
                "tags":[
                    {
                        "id":30,
                        "name":"Авторская"
                    },
                    {
                        "id":115,
                        "name":"Европейская"
                    },
                    {
                        "id":569,
                        "name":"Бургеры"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/ae60/1370147-ae6052ae5955cf52f8c518977a557e06-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ПОРСЕЛАНА\", 125367, Москва г, Врачебный проезд, дом № 11, корпус 2, квартира 36, ИНН 7714786706, рег.номер 1097746483405.<br/>Режим работы ресторана: с 12:00 до 22:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"проспект Мира, 77к2",
                    "location":{
                        "latitude":55.789932,
                        "longitude":37.633742
                    }
                }
            }
        },
        {
            "place":{
                "id":157,
                "name":"Mushrooms",
                "description":null,
                "slug":"Mushrooms",
                "market":false,
                "tags":[
                    {
                        "id":9,
                        "name":"Итальянская"
                    },
                    {
                        "id":34,
                        "name":"Пицца"
                    },
                    {
                        "id":115,
                        "name":"Европейская"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/2e7b/1380298-2e7b2bfee9be48d3715ef1bad2b6ecc3-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ЧЭ\", 119002, Москва г, Власьевский Б пер, дом № 8, строение 2, ИНН 7704882256, рег.номер 5147746437713.<br/>Режим работы ресторана: с 12:00 до 23:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"улица Большая Якиманка, 22",
                    "location":{
                        "latitude":55.738216,
                        "longitude":37.614545
                    }
                }
            }
        },
        {
            "place":{
                "id":92,
                "name":"Долма",
                "description":null,
                "slug":"DolmaSretenka",
                "market":false,
                "tags":[
                    {
                        "id":326,
                        "name":"Грузинская"
                    },
                    {
                        "id":555,
                        "name":"Восточная"
                    },
                    {
                        "id":593,
                        "name":"Выпечка"
                    },
                    {
                        "id":192,
                        "name":"Десерты"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/0254/1370147-025444fceb2fb18960d7a6e7d18cdc43-600x345.png",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"АВИ ТАЙМ\", 105094, Москва г, Семеновская наб, дом № 3/1, корпус 6, ИНН 7701864210, рег.номер 1107746050169.<br/>Режим работы ресторана: с 11:00 до 23:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"улица Сретенка, 12",
                    "location":{
                        "latitude":55.768,
                        "longitude":37.632
                    }
                }
            }
        },
        {
            "place":{
                "id":2,
                "name":"Mr. Ливанец",
                "description":null,
                "slug":"MrLivanets",
                "market":false,
                "tags":[
                    {
                        "id":641,
                        "name":"Шаверма"
                    },
                    {
                        "id":26,
                        "name":"Ливанская"
                    },
                    {
                        "id":235,
                        "name":"Завтраки"
                    },
                    {
                        "id":593,
                        "name":"Выпечка"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.8,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/9471/1370147-9471f1a7ed4eadf593b5d013fedd6299-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ТРУМАН\", 125009, город Москва, Глинищевский переулок, дом 3, эт 1 пом I ком 3, ИНН 7707502456, рег.номер 1169658115626.<br/>Режим работы ресторана: с 12:00 до 23:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"Глинищевский переулок, 3",
                    "location":{
                        "latitude":55.763265,
                        "longitude":37.609775
                    }
                }
            }
        },
        {
            "place":{
                "id":27781,
                "name":"Гин-но Таки",
                "description":null,
                "slug":"GinNoTaki12",
                "market":false,
                "tags":[
                    {
                        "id":52,
                        "name":"Японская"
                    },
                    {
                        "id":626,
                        "name":"Вок"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.7,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/d79e/1380298-d79ea15feec1c2cc0852d409cc6dcb96-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"КЛЕО\", 107014, Москва г, Русаковская ул, дом № 22, этаж 1, помещение V, комната 43, ИНН 7718854185, рег.номер 1117746572580.<br/>Режим работы ресторана: с 11:00 до 23:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"улица Большая Якиманка, 58/2",
                    "location":{
                        "latitude":55.730659,
                        "longitude":37.611545
                    }
                }
            }
        },
        {
            "place":{
                "id":13991,
                "name":"Шардени",
                "description":null,
                "slug":"shardenicafe",
                "market":false,
                "tags":[
                    {
                        "id":115,
                        "name":"Европейская"
                    },
                    {
                        "id":326,
                        "name":"Грузинская"
                    },
                    {
                        "id":352,
                        "name":"Кавказская"
                    },
                    {
                        "id":593,
                        "name":"Выпечка"
                    },
                    {
                        "id":235,
                        "name":"Завтраки"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.7,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/afce/1387779-afce011332242b81039dd7ac5c482446-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"РУСМИР\", 129110, Москва г, Мира пр-кт, дом № 64, этаж 1, Пом II, Ком N 1, ИНН 7702432572, рег.номер 1187746537550.<br/>Режим работы ресторана: с 10:30 до 21:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"проспект Мира, 64",
                    "location":{
                        "latitude":55.786116,
                        "longitude":37.635862
                    }
                }
            }
        },
        {
            "place":{
                "id":6725,
                "name":"Мацони",
                "description":null,
                "slug":"Matsoni_Novokuznetskaya",
                "market":false,
                "tags":[
                    {
                        "id":27,
                        "name":"Пироги"
                    },
                    {
                        "id":115,
                        "name":"Европейская"
                    },
                    {
                        "id":326,
                        "name":"Грузинская"
                    },
                    {
                        "id":593,
                        "name":"Выпечка"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.7,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/d491/1380298-d491cb52e9a929c05e7e96e66039ac93-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ЛАСТОЧКА\", 115054, г. Москва, ул. Новокузнецкая ,дом 33 стр 1, ИНН 9705110432, рег.номер 5177746109855.<br/>Режим работы ресторана: с 11:00 до 22:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"Новокузнецкая улица, 33с1",
                    "location":{
                        "latitude":55.733736,
                        "longitude":37.634326
                    }
                }
            }
        },
        {
            "place":{
                "id":4211,
                "name":"Il Forno",
                "description":null,
                "slug":"Ilforno_ostozhenka",
                "market":false,
                "tags":[
                    {
                        "id":9,
                        "name":"Итальянская"
                    },
                    {
                        "id":34,
                        "name":"Пицца"
                    },
                    {
                        "id":192,
                        "name":"Десерты"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.7,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/e1f6/1370147-e1f67c06e9a5aa3e896fe771e6c2598f-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ОСТОЖЕНКА\", 119034, г. Москва, ул. Остоженка., д.3/14, этаж 1,пом.I-II,ком 3, ИНН 7704451108, рег.номер 1187746130131.<br/>Режим работы ресторана: с 11:00 до 22:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"улица Остоженка, 3/14",
                    "location":{
                        "latitude":55.743857,
                        "longitude":37.60196
                    }
                }
            }
        },
        {
            "place":{
                "id":3403,
                "name":"Хинкальная",
                "description":null,
                "slug":"Hinkalnaya-Horosho",
                "market":false,
                "tags":[
                    {
                        "id":326,
                        "name":"Грузинская"
                    },
                    {
                        "id":569,
                        "name":"Бургеры"
                    },
                    {
                        "id":593,
                        "name":"Выпечка"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.7,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/9a44/1380157-9a4410e34b69118729331a614f746453-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ДАЛЕТ 1\", 119049, Москва г, Шаболовка ул, дом № 25, корпус 2, помещение 1Н, ИНН 7706436465, рег.номер 1167746369306.<br/>Режим работы ресторана: с 11:00 до 22:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"Хорошёвское шоссе, 27",
                    "location":{
                        "latitude":55.777084,
                        "longitude":37.523653
                    }
                }
            }
        },
        {
            "place":{
                "id":1745,
                "name":"Bar BQ cafe",
                "description":null,
                "slug":"BQ_Khimki",
                "market":false,
                "tags":[
                    {
                        "id":59,
                        "name":"Американская"
                    },
                    {
                        "id":569,
                        "name":"Бургеры"
                    },
                    {
                        "id":1,
                        "name":"Стейки"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.7,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/df99/1387779-df99288d4abe056e2c76f453005a6378-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"НИКА\", 111024, Москва г, Душинская ул, дом № 7, строение 1, ИНН 7722789098, рег.номер 1127747061936.<br/>Режим работы ресторана: с 11:00 до 22:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Химки",
                    "short":"8-й микрорайон, к2",
                    "location":{
                        "latitude":55.909837,
                        "longitude":37.398186
                    }
                }
            }
        },
        {
            "place":{
                "id":503,
                "name":"Soup Me",
                "description":null,
                "slug":"SoupMe",
                "market":false,
                "tags":[
                    {
                        "id":48,
                        "name":"Стритфуд"
                    },
                    {
                        "id":115,
                        "name":"Европейская"
                    }
                ],
                "priceCategory":{
                    "id":1,
                    "name":"₽",
                    "value":0
                },
                "rating":4.7,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/b5e1/1370147-b5e1468df6a95e4c736fecae63a216cf-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"САНДВИЧБАР\", 117105, Москва г, Варшавское ш, дом № 10, корпус 1 СТР.2, ИНН 7726598432, рег.номер 1087746759946.<br/>Режим работы ресторана: с 10:30 до 19:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"Малый Сухаревский переулок, 9с1",
                    "location":{
                        "latitude":55.770512,
                        "longitude":37.6244
                    }
                }
            }
        },
        {
            "place":{
                "id":491,
                "name":"DeliMarche",
                "description":null,
                "slug":"Deli_Marche",
                "market":false,
                "tags":[
                    {
                        "id":9,
                        "name":"Итальянская"
                    },
                    {
                        "id":34,
                        "name":"Пицца"
                    },
                    {
                        "id":569,
                        "name":"Бургеры"
                    },
                    {
                        "id":235,
                        "name":"Завтраки"
                    },
                    {
                        "id":595,
                        "name":"Постное меню"
                    },
                    {
                        "id":170,
                        "name":"Здоровая еда"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.7,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/40ae/1368744-40aeb552f9708a1f9a2d576ca1b9ac7b-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"АВРОРА РУСКО\", 123056, Москва г, Гашека ул, дом № 7, строение 1, ИНН 7710929960, рег.номер 1127747292023.<br/>Режим работы ресторана: с 08:00 до 22:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"улица Сергея Макеева, 13",
                    "location":{
                        "latitude":55.763356,
                        "longitude":37.551259
                    }
                }
            }
        },
        {
            "place":{
                "id":490,
                "name":"Паприколли",
                "description":null,
                "slug":"Paprikolli",
                "market":false,
                "tags":[
                    {
                        "id":9,
                        "name":"Итальянская"
                    },
                    {
                        "id":34,
                        "name":"Пицца"
                    },
                    {
                        "id":599,
                        "name":"Детское меню"
                    },
                    {
                        "id":593,
                        "name":"Выпечка"
                    },
                    {
                        "id":595,
                        "name":"Постное меню"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.7,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/5b43/1387779-5b434e9dc0afd3b273e0b8ed4e3bdcba-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ЛЕНГО ГРУПП\", 123056, Москва г, Красина ул, дом № 27, строение 1, ИНН 7703808612, рег.номер 1147746350795.<br/>Режим работы ресторана: с 12:00 до 22:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"улица Красина, 27с1",
                    "location":{
                        "latitude":55.769524,
                        "longitude":37.584972
                    }
                }
            }
        },
        {
            "place":{
                "id":488,
                "name":"Кабанчик",
                "description":null,
                "slug":"Kabanchik",
                "market":false,
                "tags":[
                    {
                        "id":326,
                        "name":"Грузинская"
                    },
                    {
                        "id":593,
                        "name":"Выпечка"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.7,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/d6f1/1370147-d6f1e5290dd928cdded92de1a8f9f5f2-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ЛЕНГО ГРУПП\", 123056, Москва г, Красина ул, дом № 27, строение 1, ИНН 7703808612, рег.номер 1147746350795.<br/>Режим работы ресторана: с 12:00 до 22:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"улица Красина, 27с1",
                    "location":{
                        "latitude":55.769524,
                        "longitude":37.584972
                    }
                }
            }
        },
        {
            "place":{
                "id":468,
                "name":"Fornetto",
                "description":null,
                "slug":"Fornetto_Frunze",
                "market":false,
                "tags":[
                    {
                        "id":9,
                        "name":"Итальянская"
                    },
                    {
                        "id":34,
                        "name":"Пицца"
                    },
                    {
                        "id":569,
                        "name":"Бургеры"
                    },
                    {
                        "id":599,
                        "name":"Детское меню"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.7,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/269e/1370147-269e764c94ac4bb69e58f6e604d7e89d-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ВЕДИС\", 107023, Москва г, Медовый пер, дом № 5, строение 1, ИНН 7719720201, рег.номер 1097746156562.<br/>Режим работы ресторана: с 11:00 до 22:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"улица Тимура Фрунзе, 11к2",
                    "location":{
                        "latitude":55.733705,
                        "longitude":37.589347
                    }
                }
            }
        },
        {
            "place":{
                "id":439,
                "name":"Винный Буфетъ",
                "description":null,
                "slug":"Vinnii_Bufet",
                "market":false,
                "tags":[
                    {
                        "id":115,
                        "name":"Европейская"
                    },
                    {
                        "id":569,
                        "name":"Бургеры"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.7,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/0b34/1387779-0b34c11d3161744d72dfa7be500f3531-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ВИНИЛ\", 119121, Москва г, Плющиха ул, дом № 42, ИНН 7704320377, рег.номер 1157746573049.<br/>Режим работы ресторана: с 12:00 до 22:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"проспект 60-летия Октября, 25к1",
                    "location":{
                        "latitude":55.690735,
                        "longitude":37.576133
                    }
                }
            }
        },
        {
            "place":{
                "id":437,
                "name":"Отличные Суши",
                "description":null,
                "slug":"Greatsushi",
                "market":false,
                "tags":[
                    {
                        "id":33,
                        "name":"Суши"
                    },
                    {
                        "id":52,
                        "name":"Японская"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.7,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/bf45/1370147-bf45adb8046d6b3216c2f11d1a71d5bd-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ИП Гурьев Денис Олегович, 119421, Москва г, Обручева ул, дом № 28, корпус 7, квартира 115, ИНН 772855332001, рег.номер 315774600099499.<br/>Режим работы ресторана: с 11:00 до 20:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Ленинский проспект, 67к2",
                    "location":{
                        "latitude":55.690263,
                        "longitude":37.553864
                    }
                }
            }
        },
        {
            "place":{
                "id":381,
                "name":"Luciano",
                "description":null,
                "slug":"Luciano",
                "market":false,
                "tags":[
                    {
                        "id":9,
                        "name":"Итальянская"
                    },
                    {
                        "id":34,
                        "name":"Пицца"
                    },
                    {
                        "id":170,
                        "name":"Здоровая еда"
                    },
                    {
                        "id":235,
                        "name":"Завтраки"
                    },
                    {
                        "id":595,
                        "name":"Постное меню"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.7,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/6737/1387779-67370fc9f40c881b019705df6dcdf408-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ЦВЕТИК СЕМИЦВЕТИК\", 121099, Москва г, Смоленская пл, дом № 3, ИНН 7704759608, рег.номер 1107746566399.<br/>Режим работы ресторана: с 09:00 до 23:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Смоленская площадь, 3",
                    "location":{
                        "latitude":55.747485,
                        "longitude":37.581298
                    }
                }
            }
        },
        {
            "place":{
                "id":376,
                "name":"Ryba International",
                "description":null,
                "slug":"Ryba_International",
                "market":false,
                "tags":[
                    {
                        "id":33,
                        "name":"Суши"
                    },
                    {
                        "id":52,
                        "name":"Японская"
                    },
                    {
                        "id":170,
                        "name":"Здоровая еда"
                    },
                    {
                        "id":611,
                        "name":"Морепродукты"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.7,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/6115/1370147-61156b4782e3922179586a0a610a8ed3-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ИП Рогачикова Оксана Михайловна, 119620, Москва г, Щорса ул, дом № 8, квартира 114, ИНН 773209325602, рег.номер 314774609800734.<br/>Режим работы ресторана: с 12:00 до 23:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"улица Новый Арбат, 21",
                    "location":{
                        "latitude":55.751923,
                        "longitude":37.585925
                    }
                }
            }
        },
        {
            "place":{
                "id":357,
                "name":"Мандарин. Лапша и Утки",
                "description":null,
                "slug":"Mandarin-Lapsha_i_Utki",
                "market":false,
                "tags":[
                    {
                        "id":6,
                        "name":"Азиатская"
                    },
                    {
                        "id":626,
                        "name":"Вок"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.7,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/d8b9/1380157-d8b989fca9be732bc8232590eeff9d6a-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"МАНДАРИН\", 119019, Москва г, Арбат ул, дом № 6/2, помещение I, комната 1, ИНН 7704363726, рег.номер 1167746632459.<br/>Режим работы ресторана: с 12:00 до 23:20",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Большой Черкасский переулок, 5/2/6с1",
                    "location":{
                        "latitude":55.758179,
                        "longitude":37.62572
                    }
                }
            }
        },
        {
            "place":{
                "id":342,
                "name":"Turandot",
                "description":null,
                "slug":"Turandot",
                "market":false,
                "tags":[
                    {
                        "id":7,
                        "name":"Китайская"
                    },
                    {
                        "id":52,
                        "name":"Японская"
                    },
                    {
                        "id":170,
                        "name":"Здоровая еда"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.7,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/008d/1380298-008d505d367e145f9fb610c5d16bd9c5-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"Д-ДЕЛИВЕРИ\", 119530, Москва г, Аминьевское ш, дом № 7, корпус 1, этаж 1 Пом II Ком 9, ИНН 9729166716, рег.номер 5177746201969.<br/>Режим работы ресторана: с 12:00 до 23:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Тверской бульвар, 26с3",
                    "location":{
                        "latitude":55.763336,
                        "longitude":37.604628
                    }
                }
            }
        },
        {
            "place":{
                "id":338,
                "name":"Добрыня",
                "description":null,
                "slug":"Dobrynya",
                "market":false,
                "tags":[
                    {
                        "id":8,
                        "name":"Русская"
                    },
                    {
                        "id":593,
                        "name":"Выпечка"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.7,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/8e3a/1370147-8e3a7315095cbd594322e39c7e599531-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО  \"РЕСТОРАН ДОБРЫНЯ\", 123022, Москва г, Декабрьская Б. ул, дом № 3, строение 1, ИНН 7703703521, рег.номер 1097746441616.<br/>Режим работы ресторана: с 11:00 до 22:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"Звенигородское шоссе, 4",
                    "location":{
                        "latitude":55.764065,
                        "longitude":37.557807
                    }
                }
            }
        },
        {
            "place":{
                "id":237,
                "name":"Бейрут",
                "description":null,
                "slug":"Beyrut",
                "market":false,
                "tags":[
                    {
                        "id":641,
                        "name":"Шаверма"
                    },
                    {
                        "id":26,
                        "name":"Ливанская"
                    },
                    {
                        "id":1,
                        "name":"Стейки"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.7,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/43ee/1380298-43ee0593439f9c46cea93c5e8060891e-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"КАРАМЕЛЬ\", 121069, Москва г, Никитская Б. ул, дом № 23_14_9, ИНН 7703694468, рег.номер 1097746053712.<br/>Режим работы ресторана: с 12:00 до 22:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"Машкова улица, 22",
                    "location":{
                        "latitude":55.764212,
                        "longitude":37.653173
                    }
                }
            }
        },
        {
            "place":{
                "id":209,
                "name":"Haggis Pub & Kitchen",
                "description":null,
                "slug":"HaggisPub_Petrovka",
                "market":false,
                "tags":[
                    {
                        "id":27,
                        "name":"Пироги"
                    },
                    {
                        "id":563,
                        "name":"Ланчи"
                    },
                    {
                        "id":569,
                        "name":"Бургеры"
                    },
                    {
                        "id":1,
                        "name":"Стейки"
                    },
                    {
                        "id":595,
                        "name":"Постное меню"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.7,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/1d44/1387779-1d44af1bd44056f83f2c73dbbe6f7de3-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ХАГИС\", 115201, Москва г, Котляковский 2-Й пер, дом № 1, строение 37, ИНН 7707830601, рег.номер 1147746363907.<br/>Режим работы ресторана: с 11:00 до 23:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"улица Петровка, 15с1",
                    "location":{
                        "latitude":55.763554,
                        "longitude":37.616629
                    }
                }
            }
        },
        {
            "place":{
                "id":208,
                "name":"Madame Wong",
                "description":null,
                "slug":"MadameWong",
                "market":false,
                "tags":[
                    {
                        "id":626,
                        "name":"Вок"
                    },
                    {
                        "id":7,
                        "name":"Китайская"
                    },
                    {
                        "id":33,
                        "name":"Суши"
                    },
                    {
                        "id":52,
                        "name":"Японская"
                    },
                    {
                        "id":599,
                        "name":"Детское меню"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.7,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/90dc/1387779-90dc106df974b0da2f1e791eeb988686-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"МИКИ-МИКИ\", 125196, Москва г, Лесная ул, дом № 7, этаж 1, комната 42, ИНН 7710960022, рег.номер 1147746363005.<br/>Режим работы ресторана: с 12:00 до 23:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"Лесная улица, 7",
                    "location":{
                        "latitude":55.778669,
                        "longitude":37.587964
                    }
                }
            }
        },
        {
            "place":{
                "id":198,
                "name":"Барашка",
                "description":null,
                "slug":"Barashka",
                "market":false,
                "tags":[
                    {
                        "id":326,
                        "name":"Грузинская"
                    },
                    {
                        "id":352,
                        "name":"Кавказская"
                    },
                    {
                        "id":555,
                        "name":"Восточная"
                    },
                    {
                        "id":192,
                        "name":"Десерты"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.7,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/eaae/1387779-eaae237feb77014a84a03a273f6ea65f-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ПАРНАС ТРЕЙД\", 103051, Москва г, Петровка ул, дом № 20/1, ИНН 7707201970, рег.номер 1027739578448.<br/>Режим работы ресторана: с 12:00 до 22:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"улица Петровка, 20/1",
                    "location":{
                        "latitude":55.764176,
                        "longitude":37.617384
                    }
                }
            }
        },
        {
            "place":{
                "id":191,
                "name":"Бардак",
                "description":null,
                "slug":"Bardak",
                "market":false,
                "tags":[
                    {
                        "id":78,
                        "name":"Турецкая"
                    },
                    {
                        "id":8,
                        "name":"Русская"
                    },
                    {
                        "id":593,
                        "name":"Выпечка"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.7,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/9f81/1370147-9f811e647e0a0fdc544f110c61bdaa58-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ТУРЕЦКИЕ КОФЕЙНИ\", 101000, Москва г, Маросейка ул, дом № 6-8, строение 1, ИНН 7709833220, рег.номер 1097746407660.<br/>Режим работы ресторана: с 12:00 до 22:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"улица Маросейка, 6-8с1",
                    "location":{
                        "latitude":55.757491,
                        "longitude":37.635404
                    }
                }
            }
        },
        {
            "place":{
                "id":155,
                "name":"ЧинЧин",
                "description":null,
                "slug":"ChinChin-VMaslovka",
                "market":false,
                "tags":[
                    {
                        "id":9,
                        "name":"Итальянская"
                    },
                    {
                        "id":34,
                        "name":"Пицца"
                    },
                    {
                        "id":593,
                        "name":"Выпечка"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.7,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/0f36/1380298-0f3660f40875c68adbb3b49c80d4266f-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ЧИНЧИН\", 127083, Москва г, Масловка В ул, дом № 21, ИНН 7714918222, рег.номер 1137746948404.<br/>Режим работы ресторана: с 10:30 до 22:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"улица Верхняя Масловка, 21",
                    "location":{
                        "latitude":55.795702,
                        "longitude":37.560134
                    }
                }
            }
        },
        {
            "place":{
                "id":151,
                "name":"Хорошее дело",
                "description":null,
                "slug":"Horosheedelo",
                "market":false,
                "tags":[
                    {
                        "id":59,
                        "name":"Американская"
                    },
                    {
                        "id":569,
                        "name":"Бургеры"
                    },
                    {
                        "id":1,
                        "name":"Стейки"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.7,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/905d/1380298-905d41bb0691ce508d1b89e7779dbed5-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"БИФТОРГ\", 127051, Москва г, Сухаревский Б. пер, дом № 25, строение 1, ИНН 7702383117, рег.номер 1157746429950.<br/>Режим работы ресторана: с 11:00 до 22:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"Большой Сухаревский переулок, 25с1",
                    "location":{
                        "latitude":55.770841,
                        "longitude":37.631936
                    }
                }
            }
        },
        {
            "place":{
                "id":95,
                "name":"Остерия У Сальваторе",
                "description":null,
                "slug":"Osteriya-u-Salvatore",
                "market":false,
                "tags":[
                    {
                        "id":9,
                        "name":"Итальянская"
                    },
                    {
                        "id":34,
                        "name":"Пицца"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.7,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/09f7/1370147-09f730b80c4a552d9fde58975cf51b5b-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ПИЦЦА +\", 127473, Москва г, Самотёчная ул, дом № 13, строение 1, ИНН 7707658140, рег.номер 1087746362967.<br/>Режим работы ресторана: с 10:00 до 22:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Самотёчная улица, 13",
                    "location":{
                        "latitude":55.778,
                        "longitude":37.618
                    }
                }
            }
        },
        {
            "place":{
                "id":94,
                "name":"Итальянец",
                "description":null,
                "slug":"Italianrest",
                "market":false,
                "tags":[
                    {
                        "id":9,
                        "name":"Итальянская"
                    },
                    {
                        "id":34,
                        "name":"Пицца"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.7,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/5119/1380157-511917b6b4da29e543480ec73a078b15-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ИТАЛЬЯНКА\", 127473, Москва г, Самотечная ул, дом № 13, ИНН 7707328007, рег.номер 1037707028556.<br/>Режим работы ресторана: с 12:00 до 22:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Самотёчная улица, 13",
                    "location":{
                        "latitude":55.778,
                        "longitude":37.618
                    }
                }
            }
        },
        {
            "place":{
                "id":90,
                "name":"Zinger Grill",
                "description":null,
                "slug":"ZingerGrill",
                "market":false,
                "tags":[
                    {
                        "id":40,
                        "name":"Домашняя"
                    },
                    {
                        "id":59,
                        "name":"Американская"
                    },
                    {
                        "id":569,
                        "name":"Бургеры"
                    },
                    {
                        "id":595,
                        "name":"Постное меню"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.7,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/300d/1387779-300dce58812941f32d0a75a8ed32157a-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ЗИНГЕР ГРИЛЬ\", 105094, Москва г, Семеновская наб, дом № 3/1, корпус 6, ИНН 7701391411, рег.номер 1147746332447.<br/>Режим работы ресторана: с 12:00 до 22:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"улица Арбат, 12с2",
                    "location":{
                        "latitude":55.751,
                        "longitude":37.596
                    }
                }
            }
        },
        {
            "place":{
                "id":40,
                "name":"Burgers and Crabs",
                "description":null,
                "slug":"BurgersandCrabs",
                "market":false,
                "tags":[
                    {
                        "id":59,
                        "name":"Американская"
                    },
                    {
                        "id":569,
                        "name":"Бургеры"
                    },
                    {
                        "id":599,
                        "name":"Детское меню"
                    },
                    {
                        "id":235,
                        "name":"Завтраки"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.7,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/b579/1370147-b5792a72d9a2b491c925e8a67d29f1f9-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ИП Карлов Валентин Валерьевич, 101000, Москва г, Сретенский б-р, дом № 6_1, корпус 1, ИНН 773126277000, рег.номер 314774611900613.<br/>Режим работы ресторана: с 10:00 до 22:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"2-я Звенигородская улица, 13с42",
                    "location":{
                        "latitude":55.761,
                        "longitude":37.552
                    }
                }
            }
        },
        {
            "place":{
                "id":26,
                "name":"Макото",
                "description":null,
                "slug":"Makoto",
                "market":false,
                "tags":[
                    {
                        "id":6,
                        "name":"Азиатская"
                    },
                    {
                        "id":52,
                        "name":"Японская"
                    },
                    {
                        "id":563,
                        "name":"Ланчи"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.7,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/e9bc/1370147-e9bc8d39b3359be261a1ae68b7168767-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ТОРО\", 123610, Москва г, Краснопресненская наб, дом № 12, ИНН 7703767902, рег.номер 1127746362941.<br/>Режим работы ресторана: с 11:30 до 22:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"Краснопресненская набережная, 12",
                    "location":{
                        "latitude":55.754,
                        "longitude":37.556
                    }
                }
            }
        },
        {
            "place":{
                "id":6,
                "name":"Рецептор",
                "description":null,
                "slug":"Receptor-BKozikhinsky",
                "market":false,
                "tags":[
                    {
                        "id":27,
                        "name":"Пироги"
                    },
                    {
                        "id":39,
                        "name":"Вегетарианская"
                    },
                    {
                        "id":52,
                        "name":"Японская"
                    },
                    {
                        "id":170,
                        "name":"Здоровая еда"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.7,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/68a6/1368744-68a6589b2cd9dfdce2ad4e5dba414a76-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ВЕГ\", 125368, Москва г, Дубравная ул, дом № 34_29, ИНН 7733815230, рег.номер 1127746742750.<br/>Режим работы ресторана: с 12:00 до 21:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Большой Козихинский переулок, 10",
                    "location":{
                        "latitude":55.762885,
                        "longitude":37.59736
                    }
                }
            }
        },
        {
            "place":{
                "id":41837,
                "name":"Еда Бар Нам",
                "description":null,
                "slug":"Nam_len",
                "market":false,
                "tags":[
                    {
                        "id":6,
                        "name":"Азиатская"
                    },
                    {
                        "id":203,
                        "name":"Вьетнамская"
                    }
                ],
                "priceCategory":{
                    "id":1,
                    "name":"₽",
                    "value":0
                },
                "rating":4.6,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/b678/1387779-b6783681164296c101e7cd89ee40c7a3-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"БЕЗ ХЛЕБА\", 119435, Москва г, Саввинская наб, дом № 19, строение 1А, помещение Iii, ИНН 7704360002, рег.номер 1167746537705.<br/>Режим работы ресторана: с 11:00 до 22:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Ленинградский проспект, 69с1",
                    "location":{
                        "latitude":55.802811,
                        "longitude":37.517716
                    }
                }
            }
        },
        {
            "place":{
                "id":11685,
                "name":"Изи Паб",
                "description":null,
                "slug":"easypub_angel",
                "market":true,
                "tags":[
                    {
                        "id":52,
                        "name":"Японская"
                    },
                    {
                        "id":59,
                        "name":"Американская"
                    },
                    {
                        "id":115,
                        "name":"Европейская"
                    },
                    {
                        "id":8,
                        "name":"Русская"
                    },
                    {
                        "id":569,
                        "name":"Бургеры"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.6,
                "minimalOrderPrice":750,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/7f3c/1380157-7f3cc5b426169563071bfdf51bf1f679-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ИПГ\", 115582, Москва г, Каширское ш, дом № 122, ИНН 7714942659, рег.номер 1147746927327.<br/>Режим работы ресторана: с 11:00 до 23:00",
                "deliveryConditions":"Бесплатно",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Ангелов переулок, 1к1",
                    "location":{
                        "latitude":55.852531,
                        "longitude":37.350836
                    }
                }
            }
        },
        {
            "place":{
                "id":4501,
                "name":"Кафе Пушкинъ Кондитерская",
                "description":null,
                "slug":"PushinKonditerskaya",
                "market":true,
                "tags":[
                    {
                        "id":192,
                        "name":"Десерты"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.6,
                "minimalOrderPrice":2000,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/8513/1370147-8513e3113ef5a9cabe34d57fbdd672a6-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"Д-ДЕЛИВЕРИ\", 119530, Москва г, Аминьевское ш, дом № 7, корпус 1, этаж 1 Пом II Ком 9, ИНН 9729166716, рег.номер 5177746201969.<br/>Режим работы ресторана: с 11:00 до 23:00",
                "deliveryConditions":"Бесплатно",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Тверской бульвар, 26А",
                    "location":{
                        "latitude":55.7637,
                        "longitude":37.605032
                    }
                }
            }
        },
        {
            "place":{
                "id":3411,
                "name":"Рамен-Клаб",
                "description":null,
                "slug":"Ramen-pyatnickaya",
                "market":false,
                "tags":[
                    {
                        "id":39,
                        "name":"Вегетарианская"
                    },
                    {
                        "id":52,
                        "name":"Японская"
                    },
                    {
                        "id":115,
                        "name":"Европейская"
                    },
                    {
                        "id":203,
                        "name":"Вьетнамская"
                    },
                    {
                        "id":170,
                        "name":"Здоровая еда"
                    },
                    {
                        "id":626,
                        "name":"Вок"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.6,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/e9bc/1370147-e9bc8d39b3359be261a1ae68b7168767-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"САЛМОН\", 115184, Москва г, Пятницкая ул, дом № 82_34, строение 1, этаж 1 Пом III Ком 1А 6, ИНН 9705112824, рег.номер 5177746245540.<br/>Режим работы ресторана: с 11:00 до 20:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"Пятницкая улица, 82/34с1",
                    "location":{
                        "latitude":55.730167,
                        "longitude":37.625226
                    }
                }
            }
        },
        {
            "place":{
                "id":3093,
                "name":"Паста Дели",
                "description":null,
                "slug":"pastadeli_mozhaiskiy",
                "market":false,
                "tags":[
                    {
                        "id":9,
                        "name":"Итальянская"
                    },
                    {
                        "id":40,
                        "name":"Домашняя"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.6,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/65da/1387779-65dadc6a2cd3875472f953d3b38327cf-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ПАСТА ДЕЛИ Д.М.\", 105264,г. Москва, ул, Первомайская верх.,д.43,офис 8, ИНН 7719465463, рег.номер 1177746090554.<br/>Режим работы ресторана: с 11:00 до 20:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"улица Можайский Вал, 8",
                    "location":{
                        "latitude":55.743684,
                        "longitude":37.555139
                    }
                }
            }
        },
        {
            "place":{
                "id":469,
                "name":"Тимур",
                "description":null,
                "slug":"Timur",
                "market":false,
                "tags":[
                    {
                        "id":37,
                        "name":"Узбекская"
                    },
                    {
                        "id":352,
                        "name":"Кавказская"
                    },
                    {
                        "id":631,
                        "name":"Шашлык"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.6,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/5f86/1370147-5f86a0b626835335cb2b154b8644741e-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ТИМУР\", 119526, Москва г, Ленинский пр-кт, дом № 146, комната 608, ИНН 7729431576.<br/>Режим работы ресторана: с 11:00 до 24:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"Ленинский проспект, 146",
                    "location":{
                        "latitude":55.656849,
                        "longitude":37.496291
                    }
                }
            }
        },
        {
            "place":{
                "id":372,
                "name":"Перец & Мята",
                "description":null,
                "slug":"Perez_and_Myata",
                "market":false,
                "tags":[
                    {
                        "id":9,
                        "name":"Итальянская"
                    },
                    {
                        "id":34,
                        "name":"Пицца"
                    },
                    {
                        "id":599,
                        "name":"Детское меню"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.6,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/1614/1387779-1614db844318854ef0ed6f333379cf94-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"РЕСТАРТ\", 117393, Москва г, Академика Пилюгина ул, дом № 4, этаж 1, помещение Xxiia, комната 16, ИНН 7736256029, рег.номер 5157746057112.<br/>Режим работы ресторана: с 12:00 до 22:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"улица Академика Пилюгина, 4",
                    "location":{
                        "latitude":55.672691,
                        "longitude":37.542222
                    }
                }
            }
        },
        {
            "place":{
                "id":344,
                "name":"Фаренгейт",
                "description":null,
                "slug":"Farengeit",
                "market":false,
                "tags":[
                    {
                        "id":8,
                        "name":"Русская"
                    },
                    {
                        "id":30,
                        "name":"Авторская"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.6,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/6503/1387779-650360267a6ccaf9af0d61bc40e1a986-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"Д-ДЕЛИВЕРИ\", 119530, Москва г, Аминьевское ш, дом № 7, корпус 1, этаж 1 Пом II Ком 9, ИНН 9729166716, рег.номер 5177746201969.<br/>Режим работы ресторана: с 12:00 до 22:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Тверской бульвар, 26с2",
                    "location":{
                        "latitude":55.763001,
                        "longitude":37.604277
                    }
                }
            }
        },
        {
            "place":{
                "id":304,
                "name":"Churchill`s pub",
                "description":null,
                "slug":"ChurchillsPub",
                "market":false,
                "tags":[
                    {
                        "id":569,
                        "name":"Бургеры"
                    },
                    {
                        "id":59,
                        "name":"Американская"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.6,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/f7b8/1370147-f7b8077865ead08acf70ff36ad054a87-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"АСГАРД\", 125212, Москва г, Кронштадтский б-р, дом № 9, ИНН 7743694288, рег.номер 1087746689106.<br/>Режим работы ресторана: с 12:00 до 22:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"Ленинградский проспект, 66",
                    "location":{
                        "latitude":55.802725,
                        "longitude":37.52598
                    }
                }
            }
        },
        {
            "place":{
                "id":278,
                "name":"La Scarpetta",
                "description":null,
                "slug":"LaScarpetta",
                "market":false,
                "tags":[
                    {
                        "id":9,
                        "name":"Итальянская"
                    },
                    {
                        "id":34,
                        "name":"Пицца"
                    },
                    {
                        "id":170,
                        "name":"Здоровая еда"
                    },
                    {
                        "id":593,
                        "name":"Выпечка"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.6,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/b6a5/1387779-b6a5b60667eb22e35e2a06befdd13d57-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО  \"ДОН ДЖУЛИО РЕСТ\", 115598, Москва г, Лебедянская ул, дом № 30, ИНН 7724938820, рег.номер 5147746191731.<br/>Режим работы ресторана: с 13:00 до 23:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Оболенский переулок, 9к1",
                    "location":{
                        "latitude":55.73036,
                        "longitude":37.57925
                    }
                }
            }
        },
        {
            "place":{
                "id":276,
                "name":"Xarcho & Puri",
                "description":null,
                "slug":"Xarcho-Puri",
                "market":false,
                "tags":[
                    {
                        "id":631,
                        "name":"Шашлык"
                    },
                    {
                        "id":641,
                        "name":"Шаверма"
                    },
                    {
                        "id":27,
                        "name":"Пироги"
                    },
                    {
                        "id":115,
                        "name":"Европейская"
                    },
                    {
                        "id":326,
                        "name":"Грузинская"
                    },
                    {
                        "id":563,
                        "name":"Ланчи"
                    },
                    {
                        "id":8,
                        "name":"Русская"
                    },
                    {
                        "id":593,
                        "name":"Выпечка"
                    },
                    {
                        "id":595,
                        "name":"Постное меню"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.6,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/7f16/1370147-7f168ad5b40856c38613d6a7b662b5bc-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ХАРЧОПУРИ\", 125167, Москва г, Ленинградский пр-кт, дом № 37, строение 12, комната 35-46, ИНН 7714394522, рег.номер 1167746604728.<br/>Режим работы ресторана: с 10:00 до 21:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Ленинградский проспект, 37с12",
                    "location":{
                        "latitude":55.79428,
                        "longitude":37.543533
                    }
                }
            }
        },
        {
            "place":{
                "id":213,
                "name":"Пироговая Рогова",
                "description":null,
                "slug":"PirogovayaRogova",
                "market":false,
                "tags":[
                    {
                        "id":27,
                        "name":"Пироги"
                    },
                    {
                        "id":170,
                        "name":"Здоровая еда"
                    },
                    {
                        "id":192,
                        "name":"Десерты"
                    },
                    {
                        "id":593,
                        "name":"Выпечка"
                    },
                    {
                        "id":235,
                        "name":"Завтраки"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.6,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/6c50/1387779-6c50e69a9ecfa33077c8e65bf76a3b77-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"КОНДИТЕРСКИЙ МИР\", Москва г, Вернадского пр-кт, дом № 9_10, ИНН 7722615260, рег.номер 5077746980900.<br/>Режим работы ресторана: с 11:00 до 18:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"проспект Вернадского, 9/10",
                    "location":{
                        "latitude":55.689486,
                        "longitude":37.531496
                    }
                }
            }
        },
        {
            "place":{
                "id":146,
                "name":"Dom.Cafe",
                "description":null,
                "slug":"Dom-Cafe",
                "market":false,
                "tags":[
                    {
                        "id":8,
                        "name":"Русская"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.6,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/6d1b/1370147-6d1b72b5e43a75eb9cfe2c00a748fae5-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"СЕТЬ ГОРОДСКИХ КАФЕ\", 115184, Москва г, Пятницкая ул, дом № 9/28, строение 1, ИНН 7721663430, рег.номер 1097746299980.<br/>Режим работы ресторана: с 09:00 до 23:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"Пятницкая улица, 9/28с1",
                    "location":{
                        "latitude":55.74449,
                        "longitude":37.627831
                    }
                }
            }
        },
        {
            "place":{
                "id":144,
                "name":"Беби Джоли",
                "description":null,
                "slug":"bebijoli",
                "market":false,
                "tags":[
                    {
                        "id":326,
                        "name":"Грузинская"
                    },
                    {
                        "id":593,
                        "name":"Выпечка"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.6,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/df0f/1380298-df0f6a3f354d4e9f458ddc8422df7cb8-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"АСТРАТЕКС\", 119034, г. Москва, Комсомольский проспект, д. 14/1, корпус 2, ИНН 7706190290, рег.номер 1027739544359.<br/>Режим работы ресторана: с 11:00 до 22:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"Комсомольский проспект, 14/1к2",
                    "location":{
                        "latitude":55.731374,
                        "longitude":37.589985
                    }
                }
            }
        },
        {
            "place":{
                "id":143,
                "name":"Профессор Пуф",
                "description":null,
                "slug":"Professor_Puf",
                "market":false,
                "tags":[
                    {
                        "id":40,
                        "name":"Домашняя"
                    },
                    {
                        "id":8,
                        "name":"Русская"
                    },
                    {
                        "id":593,
                        "name":"Выпечка"
                    },
                    {
                        "id":235,
                        "name":"Завтраки"
                    },
                    {
                        "id":569,
                        "name":"Бургеры"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.6,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/40e9/1368744-40e95a946eef6bed5cc31cec4f770e54-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ПРОФЕССОР ПУФ\", 105066, Москва г, Спартаковская ул, дом № 19, строение 3А, этаж 1, помещение 118, офис 2В, ИНН 9701022425, рег.номер 5157746096888.<br/>Режим работы ресторана: с 10:00 до 21:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"улица Волхонка, 9с1",
                    "location":{
                        "latitude":55.747089,
                        "longitude":37.607628
                    }
                }
            }
        },
        {
            "place":{
                "id":89,
                "name":"Гранд кафе Прованс",
                "description":null,
                "slug":"Provance",
                "market":false,
                "tags":[
                    {
                        "id":115,
                        "name":"Европейская"
                    },
                    {
                        "id":423,
                        "name":"Французская"
                    },
                    {
                        "id":8,
                        "name":"Русская"
                    },
                    {
                        "id":235,
                        "name":"Завтраки"
                    },
                    {
                        "id":569,
                        "name":"Бургеры"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.6,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/e4c9/1370147-e4c98ff2d246b2203d887f7f5debe7bd-600x345.png",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ПРОВЕНТУС\", 119034, Москва г, Обыденский 1-й пер, дом № 9/12, ИНН 7704839067, рег.номер 1137746569575.<br/>Режим работы ресторана: с 10:00 до 22:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"1-й Обыденский переулок, 9/12",
                    "location":{
                        "latitude":55.743,
                        "longitude":37.602
                    }
                }
            }
        },
        {
            "place":{
                "id":42,
                "name":"Сок",
                "description":null,
                "slug":"Sok",
                "market":false,
                "tags":[
                    {
                        "id":39,
                        "name":"Вегетарианская"
                    },
                    {
                        "id":8,
                        "name":"Русская"
                    },
                    {
                        "id":170,
                        "name":"Здоровая еда"
                    },
                    {
                        "id":34,
                        "name":"Пицца"
                    },
                    {
                        "id":595,
                        "name":"Постное меню"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.6,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/fc2d/1368744-fc2d883ef9d2855b366873e191a238bc-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"АРТИСИМО\", 129336, Москва г, Анадырский проезд, дом № 61, ИНН 7716526799, рег.номер 1057747139812.<br/>Режим работы ресторана: с 11:30 до 21:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"Лаврушинский переулок, 15с1",
                    "location":{
                        "latitude":55.742,
                        "longitude":37.621
                    }
                }
            }
        },
        {
            "place":{
                "id":24,
                "name":"Ти-Бон",
                "description":null,
                "slug":"T-bon-PrMira",
                "market":false,
                "tags":[
                    {
                        "id":59,
                        "name":"Американская"
                    },
                    {
                        "id":569,
                        "name":"Бургеры"
                    },
                    {
                        "id":1,
                        "name":"Стейки"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.6,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/35d3/1370147-35d3d982bb4cbe3967a632acda9ea0c3-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"Эй-Би-Стар\", 129110, Москва г, Мира пр-кт, дом № 58, ИНН 7702269573.<br/>Режим работы ресторана: с 12:00 до 22:40",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"проспект Мира, 58",
                    "location":{
                        "latitude":55.785392,
                        "longitude":37.63606
                    }
                }
            }
        },
        {
            "place":{
                "id":21,
                "name":"Синдбад",
                "description":null,
                "slug":"Sindbad",
                "market":false,
                "tags":[
                    {
                        "id":26,
                        "name":"Ливанская"
                    },
                    {
                        "id":1,
                        "name":"Стейки"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.6,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/82a4/1387779-82a44e6ab0e0126a8973d223db17f885-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"АРТ КИТЧЕН\", 115162, Москва г, Люсиновская ул, дом № 62, этаж 1 Пом II Ком 1-7, ИНН 7725391925, рег.номер 1177746918469.<br/>Режим работы ресторана: с 12:00 до 22:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Люсиновская улица, 62",
                    "location":{
                        "latitude":55.717726,
                        "longitude":37.62192
                    }
                }
            }
        },
        {
            "place":{
                "id":8,
                "name":"Джоведи",
                "description":null,
                "slug":"Giovedi",
                "market":false,
                "tags":[
                    {
                        "id":9,
                        "name":"Итальянская"
                    },
                    {
                        "id":34,
                        "name":"Пицца"
                    },
                    {
                        "id":170,
                        "name":"Здоровая еда"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.6,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/5fce/1370147-5fce37c9680dd0c1c43c3d6c07118775-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"РИВЕР ПЛЮС\", 115184, Москва г, Озерковская наб, дом № 26, ИНН 7705974171, рег.номер 5117746060680.<br/>Режим работы ресторана: с 11:30 до 22:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"Озерковская набережная, 26",
                    "location":{
                        "latitude":55.739387,
                        "longitude":37.638198
                    }
                }
            }
        },
        {
            "place":{
                "id":47633,
                "name":"Bruce Lee",
                "description":null,
                "slug":"Bruce_Lee_Zvenigorodskaya",
                "market":false,
                "tags":[
                    {
                        "id":7,
                        "name":"Китайская"
                    },
                    {
                        "id":626,
                        "name":"Вок"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.5,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/afbd/1380298-afbdd4550e3160c497d670bc3e85f86b-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"СЕМЕЙНЫЙ РЕСТОРАН\", 123100, Москва г, Сергея Макеева ул, дом № 11/9, строение 3, этаж 1, комната 1, ИНН 7703468003, рег.номер 1187746963425.<br/>Режим работы ресторана: с 12:00 до 23:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"улица Сергея Макеева, 11/9с1",
                    "location":{
                        "latitude":55.762925,
                        "longitude":37.550118
                    }
                }
            }
        },
        {
            "place":{
                "id":43915,
                "name":"Шафран",
                "description":null,
                "slug":"shafran_mezhdunarodnaya",
                "market":false,
                "tags":[
                    {
                        "id":78,
                        "name":"Турецкая"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.5,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/95e0/1387779-95e0d2f384b119c3bfa7bddcc8598e4d-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ШАФРАН\", 109518, Москва г, Грайвороновский 1-Й проезд, дом № 20, строение 36, этаж 5, офис 508-510, ИНН 5027186270, рег.номер 1125027005762.<br/>Режим работы ресторана: с 11:00 до 22:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Красногорск",
                    "short":"Международная улица, 12",
                    "location":{
                        "latitude":55.821012,
                        "longitude":37.386184
                    }
                }
            }
        },
        {
            "place":{
                "id":42367,
                "name":"Хинкальная №1",
                "description":null,
                "slug":"hinkalna47",
                "market":true,
                "tags":[
                    {
                        "id":326,
                        "name":"Грузинская"
                    },
                    {
                        "id":352,
                        "name":"Кавказская"
                    },
                    {
                        "id":115,
                        "name":"Европейская"
                    },
                    {
                        "id":555,
                        "name":"Восточная"
                    },
                    {
                        "id":593,
                        "name":"Выпечка"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.5,
                "minimalOrderPrice":1000,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/40a8/1380298-40a8d3921ea099c7cb659d9809892370-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ЭКСТРОСТЭЙСТУР ПЛЮС\", 127220, Москва г, Башиловская ул, дом № 3, корпус 1, ИНН 7714868606, рег.номер 1127746232558.<br/>Режим работы ресторана: с 11:00 до 23:45",
                "deliveryConditions":"Бесплатно",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Большая Академическая улица, 47с2",
                    "location":{
                        "latitude":55.835048,
                        "longitude":37.535143
                    }
                }
            }
        },
        {
            "place":{
                "id":15605,
                "name":"Марани",
                "description":null,
                "slug":"maranigar",
                "market":false,
                "tags":[
                    {
                        "id":326,
                        "name":"Грузинская"
                    },
                    {
                        "id":593,
                        "name":"Выпечка"
                    },
                    {
                        "id":631,
                        "name":"Шашлык"
                    },
                    {
                        "id":595,
                        "name":"Постное меню"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.5,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/7f67/1370147-7f67b5ddcd7beacf8471a193a7839710-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"МОНРЕТИН\", 117461, Москва г, Каховка ул, дом № 10, корпус 3, помещение II, ИНН 7728205655, рег.номер 1027739270635.<br/>Режим работы ресторана: с 12:00 до 23:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"улица Гарибальди, 23/54",
                    "location":{
                        "latitude":55.671641,
                        "longitude":37.554843
                    }
                }
            }
        },
        {
            "place":{
                "id":328,
                "name":"Хачапурия",
                "description":null,
                "slug":"Hachapuria",
                "market":false,
                "tags":[
                    {
                        "id":326,
                        "name":"Грузинская"
                    },
                    {
                        "id":555,
                        "name":"Восточная"
                    },
                    {
                        "id":593,
                        "name":"Выпечка"
                    },
                    {
                        "id":235,
                        "name":"Завтраки"
                    },
                    {
                        "id":595,
                        "name":"Постное меню"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.5,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/7f1c/1380298-7f1c2ed93973d1b0c5196471640ad30e-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"КРИСТИ\", 115035, Москва г, Пятницкая ул, дом № 6_1, строение 1, ИНН 7705982133, рег.номер 1127746248090.<br/>Режим работы ресторана: с 11:00 до 23:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Пятницкая улица, 6/1",
                    "location":{
                        "latitude":55.744409,
                        "longitude":37.627319
                    }
                }
            }
        },
        {
            "place":{
                "id":299,
                "name":"ЛуСюнь",
                "description":null,
                "slug":"Lusun",
                "market":false,
                "tags":[
                    {
                        "id":7,
                        "name":"Китайская"
                    },
                    {
                        "id":8,
                        "name":"Русская"
                    },
                    {
                        "id":593,
                        "name":"Выпечка"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.5,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/847b/1370147-847bb5d311cf3485ac1fbfb0144d44ea-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ГЕНТЭКС\", 113303, Москва г, Юшуньская Б. ул, дом № 1А, корпус 2, офис 7, ИНН 7727208822, рег.номер 1027739786491.<br/>Режим работы ресторана: с 11:30 до 21:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"улица Кржижановского, 24/35к4",
                    "location":{
                        "latitude":55.676377,
                        "longitude":37.577534
                    }
                }
            }
        },
        {
            "place":{
                "id":266,
                "name":"Гогиели",
                "description":null,
                "slug":"Gogieli",
                "market":false,
                "tags":[
                    {
                        "id":170,
                        "name":"Здоровая еда"
                    },
                    {
                        "id":593,
                        "name":"Выпечка"
                    },
                    {
                        "id":326,
                        "name":"Грузинская"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.5,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/96c2/1370147-96c20efe11ec2a47a6af407b16911ad0-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"РЕСТОРАН ГОГИЕЛИ\", 109147, Москва г, Марксистская ул, дом № 9, корпус 1, ИНН 7709419482, рег.номер 1037709036353.<br/>Режим работы ресторана: с 12:00 до 22:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"Марксистская улица, 9",
                    "location":{
                        "latitude":55.734805,
                        "longitude":37.668156
                    }
                }
            }
        },
        {
            "place":{
                "id":51144,
                "name":"Ramen House",
                "description":null,
                "slug":"Ramen_House_Mira",
                "market":false,
                "tags":[
                    {
                        "id":52,
                        "name":"Японская"
                    },
                    {
                        "id":33,
                        "name":"Суши"
                    },
                    {
                        "id":626,
                        "name":"Вок"
                    },
                    {
                        "id":6,
                        "name":"Азиатская"
                    }
                ],
                "priceCategory":{
                    "id":1,
                    "name":"₽",
                    "value":0
                },
                "rating":4.4,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/956b/1370147-956bc72d9bd6d4afa6816ae794380ec2-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"РАМЭН ХАУС\", 119034, г.Москва, ул. Льва Толстого, дом 23, строение 3, этаж 1, помещение V, комната 2, ИНН 7725319502, рег.номер 1167746537408.<br/>Режим работы ресторана: с 10:00 до 22:45",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"проспект Мира, 40",
                    "location":{
                        "latitude":55.780203,
                        "longitude":37.633949
                    }
                }
            }
        },
        {
            "place":{
                "id":4521,
                "name":"Ресторан Шинок",
                "description":null,
                "slug":"Shinok",
                "market":true,
                "tags":[
                    {
                        "id":8,
                        "name":"Русская"
                    },
                    {
                        "id":30,
                        "name":"Авторская"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":4.1,
                "minimalOrderPrice":2500,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/caed/1387779-caed4713d1dee874a07ace3cc246b8a9-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"Д-ДЕЛИВЕРИ\", 119530, Москва г, Аминьевское ш, дом № 7, корпус 1, этаж 1 Пом II Ком 9, ИНН 9729166716, рег.номер 5177746201969.<br/>Режим работы ресторана: с 12:00 до 23:00",
                "deliveryConditions":"Бесплатно",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"улица 1905 года, 2",
                    "location":{
                        "latitude":55.755003,
                        "longitude":37.560413
                    }
                }
            }
        },
        {
            "place":{
                "id":167,
                "name":"Старая мансарда",
                "description":null,
                "slug":"Staraya-mansarda",
                "market":false,
                "tags":[
                    {
                        "id":115,
                        "name":"Европейская"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":4.1,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/68fa/1387779-68fa73a676cf57baab4bdcae72a4443e-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ИП Бутунц Валерий Грачикович, 117405, Москва г, Газопровод ул, дом № 6Г, корпус 1, ИНН 772408424638, рег.номер 315774600070855.<br/>Режим работы ресторана: с 11:30 до 22:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"улица Усачёва, 62с1",
                    "location":{
                        "latitude":55.72529,
                        "longitude":37.5622
                    }
                }
            }
        },
        {
            "place":{
                "id":58223,
                "name":"Шоколадница",
                "description":null,
                "slug":"shokoladnitsa_mkad",
                "market":false,
                "tags":[
                    {
                        "id":115,
                        "name":"Европейская"
                    },
                    {
                        "id":192,
                        "name":"Десерты"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":null,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/b01e/1370147-b01ea3088ea659e31b33af1972235ad5-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"Фелицитас\", 129085, г. Москва, Проспект Мира, д. 101, стр. 2, оф. 426а, ИНН 7717714266, рег.номер 1117746992373.<br/>Режим работы ресторана: с 10:30 до 21:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Реутов",
                    "short":"МКАД, 2-й километр, 2",
                    "location":{
                        "latitude":55.763802,
                        "longitude":37.84499
                    }
                }
            }
        },
        {
            "place":{
                "id":57860,
                "name":"Ferma burger",
                "description":null,
                "slug":"fermaburger_21",
                "market":false,
                "tags":[
                    {
                        "id":59,
                        "name":"Американская"
                    },
                    {
                        "id":569,
                        "name":"Бургеры"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":null,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/07ae/1380298-07aec469f0b23f6cdf8a411910ffe098-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): Индивидуальный предприниматель Пограницкая Наталья Геннадьевна, 690092, г. Владивосток, ул. Пацаева, д. 7, кв. 39, ИНН 253716822893, рег.номер 319253600013132.<br/>Режим работы ресторана: с 12:00 до 22:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"улица Новый Арбат, 21",
                    "location":{
                        "latitude":55.751923,
                        "longitude":37.585925
                    }
                }
            }
        },
        {
            "place":{
                "id":52209,
                "name":"Самарканд",
                "description":null,
                "slug":"samarkand_ryazanskiy",
                "market":false,
                "tags":[
                    {
                        "id":115,
                        "name":"Европейская"
                    },
                    {
                        "id":555,
                        "name":"Восточная"
                    },
                    {
                        "id":593,
                        "name":"Выпечка"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":null,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/b6b9/1387779-b6b9e2d21afa7cc1f3d4f83ca511a34b-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ИП Малахова Ирина Петровна, 216642, Смоленская обл., Хиславский р-н, д. Козловка, ИНН 671800715385, рег.номер 1187746411270.<br/>Режим работы ресторана: с 09:00 до 24:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Рязанский проспект, 46к7",
                    "location":{
                        "latitude":55.717031,
                        "longitude":37.793292
                    }
                }
            }
        },
        {
            "place":{
                "id":51192,
                "name":"La Taverna",
                "description":null,
                "slug":"La_Taverna",
                "market":false,
                "tags":[
                    {
                        "id":115,
                        "name":"Европейская"
                    },
                    {
                        "id":501,
                        "name":"Средиземноморская"
                    },
                    {
                        "id":34,
                        "name":"Пицца"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":null,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/fa13/1370147-fa1305e5abffd94a85b9016329a2bab0-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО\"Эллада\", 129110,г Москва,Проспект мира,дом48,стр 6, ИНН 7702810707, рег.номер 1137746208522.<br/>Режим работы ресторана: с 12:00 до 23:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Шмитовский проезд, 3с1А",
                    "location":{
                        "latitude":55.758352,
                        "longitude":37.555364
                    }
                }
            }
        },
        {
            "place":{
                "id":51045,
                "name":"Ацатун",
                "description":null,
                "slug":"hatsatun",
                "market":false,
                "tags":[
                    {
                        "id":86,
                        "name":"Армянская"
                    },
                    {
                        "id":8,
                        "name":"Русская"
                    },
                    {
                        "id":115,
                        "name":"Европейская"
                    },
                    {
                        "id":593,
                        "name":"Выпечка"
                    }
                ],
                "priceCategory":{
                    "id":2,
                    "name":"₽₽",
                    "value":0.5
                },
                "rating":null,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/75a4/1387779-75a49456667df4b347e2f2cb92571aee-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): Индивидуальный Предприниматель Симонян И.С., 141700 г. Долгопрудный Новый бульвар д.15 15 кв. 9, ИНН 500716083192, рег.номер 317502900023629.<br/>Режим работы ресторана: с 11:00 до 22:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Волоколамское шоссе, 2",
                    "location":{
                        "latitude":55.807476,
                        "longitude":37.505292
                    }
                }
            }
        },
        {
            "place":{
                "id":35957,
                "name":"Gayane's",
                "description":null,
                "slug":"gayanes2",
                "market":false,
                "tags":[
                    {
                        "id":115,
                        "name":"Европейская"
                    },
                    {
                        "id":593,
                        "name":"Выпечка"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":null,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/e3ae/1370147-e3ae3a79413357f38fa912c798ed4d60-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"ГАЯНЕС\", 121099, Москва г, Смоленский 2-Й пер, дом № 1/4, этаж 1, помещение VII, комната 2, ИНН 7704457759, рег.номер 1187746634030.<br/>Режим работы ресторана: с 12:00 до 20:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"2-й Смоленский переулок, 1/4",
                    "location":{
                        "latitude":55.747024,
                        "longitude":37.581523
                    }
                }
            }
        },
        {
            "place":{
                "id":407,
                "name":"Kinki",
                "description":null,
                "slug":"Kinki",
                "market":false,
                "tags":[
                    {
                        "id":33,
                        "name":"Суши"
                    },
                    {
                        "id":52,
                        "name":"Японская"
                    },
                    {
                        "id":599,
                        "name":"Детское меню"
                    },
                    {
                        "id":626,
                        "name":"Вок"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":null,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/4b62/1368744-4b62f457d8ace7e4ddcdb6a54bb9dc5d-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"АЗАРИКА\", 121609, Москва г, Осенняя ул, дом № 11, ИНН 7731586383, рег.номер 1087746214753.<br/>Режим работы ресторана: с 13:00 до 22:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"Осенняя улица, 11",
                    "location":{
                        "latitude":55.762318,
                        "longitude":37.40433
                    }
                }
            }
        },
        {
            "place":{
                "id":336,
                "name":"Буйабес",
                "description":null,
                "slug":"Buyabes",
                "market":false,
                "tags":[
                    {
                        "id":423,
                        "name":"Французская"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":null,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/6074/1368744-607485bd729ffa477e906377f5b780e1-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"СИТИСТАР\", 119334, Москва г, Ленинский пр-кт, дом № 37, ИНН 7705614877, рег.номер 1047796629374.<br/>Режим работы ресторана: с 11:30 до 22:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"Ленинский проспект, 37",
                    "location":{
                        "latitude":55.709865,
                        "longitude":37.5865
                    }
                }
            }
        },
        {
            "place":{
                "id":113,
                "name":"Ноев ковчег",
                "description":null,
                "slug":"Noev-Kovcheg",
                "market":false,
                "tags":[
                    {
                        "id":86,
                        "name":"Армянская"
                    },
                    {
                        "id":593,
                        "name":"Выпечка"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":null,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/eb52/1387779-eb52bc1ca738a7f2a882bcca4f04cf7a-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): \"ТАЙП 2000\", 109028 г Москва, Малый Ивановский пер, дом 7- 9, стр 1, ИНН 7701122930, рег.номер 1027739151736.<br/>Режим работы ресторана: с 11:00 до 23:00",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":null,
                "address":{
                    "city":"Москва",
                    "short":"Малый Ивановский переулок, 7-9с1",
                    "location":{
                        "latitude":55.754,
                        "longitude":37.641
                    }
                }
            }
        },
        {
            "place":{
                "id":106,
                "name":"19 Bar & Atmosphere",
                "description":null,
                "slug":"19Bar",
                "market":false,
                "tags":[
                    {
                        "id":9,
                        "name":"Итальянская"
                    },
                    {
                        "id":34,
                        "name":"Пицца"
                    },
                    {
                        "id":59,
                        "name":"Американская"
                    }
                ],
                "priceCategory":{
                    "id":3,
                    "name":"₽₽₽",
                    "value":1
                },
                "rating":null,
                "minimalOrderPrice":0,
                "minimalDeliveryCost":0,
                "isNew":false,
                "isStore":false,
                "items":[

                ],
                "promos":[

                ],
                "picture":{
                    "uri":"https://eda.yandex/images/places/74d1/1370147-74d1ff578f79119756c2fed4f9087b56-600x345.jpeg",
                    "ratio":1.33
                },
                "isPromoAvailable":false,
                "personalizationStrategy":null,
                "footerDescription":"Исполнитель (продавец): ООО \"БОГАТЫРЬ\", 101000, Москва г, Покровка ул. дом № 19, квартира Подв. Пом. VI Ком 1, ИНН 7707833850, рег.номер 1147746525959.<br/>Режим работы ресторана: с 12:00 до 22:30",
                "deliveryConditions":"Доставка 39 ₽ на заказ от 500 ₽",
                "promoTypes":[

                ],
                "type":{
                    "id":1,
                    "name":"Ресторан"
                },
                "address":{
                    "city":"Москва",
                    "short":"улица Покровка, 19",
                    "location":{
                        "latitude":55.76,
                        "longitude":37.646
                    }
                }
            }
        }
    ]