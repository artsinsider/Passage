import React     from 'react';
import Component from '../../container/Auth/Styled';
import styled    from 'styled-components';
import theme     from '../../records/theme';

const ItemList = styled.li`
  color: ${props=> props.selected ? '#86c232' : '#fff'};
  ${props=> !props.selected ? `list-style-type: none;` :''};   
`;

const Theme = styled.div`
    position: absolute;
    top: 50px;
    background: #313030;
    right: 4px;
    border-radius: 0 0 2px 2px;
    padding: 3px;
    
    svg {
        height: 1.2em;
        width: 1.5em;
        position: relative;
        top: 2px;
        fill:#fff;
        transition: all .3s cubic-bezier(.645, .045, .355, 1);
        cursor: pointer;
        &:hover {
          opacity: .65;
        }
    }
`;

export default class Themes extends React.PureComponent {
    state = {
        showLIst: false,
        activeTheme: localStorage.getItem('theme')
    };

    selectedTheme = (theme) => () => {
        this.props.selectedTheme(theme);
        this.setState({showLIst: !this.state.showLIst, activeTheme: theme});
    };

    render() {
        return (
            <Theme>
                <svg onClick={() => this.setState({showLIst: !this.state.showLIst})} xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
                    <path d="M 3 0 C 1.346 0 0 1.346 0 3 L 0 27 C 0 28.654 1.346 30 3 30 L 17 30 L 17 28 L 3 28 C 2.449 28 2 27.552 2 27 L 2 7 L 32 7 L 32 19 L 34 19 L 34 3 C 34 1.346 32.654 0 31 0 L 3 0 z M 8 12 C 6.841 12 6 12.841 6 14 L 6 20 C 6 21.159 6.841 22 8 22 L 13 22 C 14.159 22 15 21.159 15 20 L 15 14 C 15 12.841 14.159 12 13 12 L 8 12 z M 21 12 C 19.841 12 19 12.841 19 14 L 19 19.125 C 19.319 19.048 19.65 19 20 19 L 28 19 L 28 14 C 28 12.841 27.159 12 26 12 L 21 12 z M 20 20 C 19.477778 20 18.939531 20.185469 18.5625 20.5625 C 18.185469 20.939531 18 21.477778 18 22 L 18 26 L 18 48 C 18 48.144875 18.00599 48.272334 18.03125 48.40625 C 18.057049 48.550093 18.101611 48.67677 18.15625 48.8125 C 18.200212 48.921708 18.249716 49.025448 18.3125 49.125 C 18.453885 49.347215 18.624035 49.542952 18.84375 49.6875 C 18.850502 49.691881 18.868193 49.683207 18.875 49.6875 C 18.974007 49.750493 19.075696 49.798926 19.1875 49.84375 C 19.32323 49.898389 19.449907 49.942951 19.59375 49.96875 C 19.727666 49.99401 19.855125 50 20 50 L 48 50 C 48.144875 50 48.272334 49.99401 48.40625 49.96875 C 48.550093 49.942951 48.67677 49.898389 48.8125 49.84375 C 48.866332 49.822168 48.917788 49.807141 48.96875 49.78125 C 49.141376 49.694256 49.299415 49.575585 49.4375 49.4375 C 49.575585 49.299415 49.694256 49.141376 49.78125 48.96875 C 49.807141 48.917788 49.822168 48.866332 49.84375 48.8125 C 49.898389 48.67677 49.942951 48.550093 49.96875 48.40625 C 49.99401 48.272334 50 48.144875 50 48 L 50 26 L 50 22 C 50 21.477778 49.814531 20.939531 49.4375 20.5625 C 49.060469 20.185469 48.522222 20 48 20 L 20 20 z M 20 22 L 48 22 L 48 26 L 20 26 L 20 22 z M 25 35 L 30 35 C 30.6 35 31 35.4 31 36 L 31 42 C 31 42.6 30.6 43 30 43 L 25 43 C 24.4 43 24 42.6 24 42 L 24 36 C 24 35.4 24.4 35 25 35 z M 38 35 L 43 35 C 43.6 35 44 35.4 44 36 L 44 42 C 44 42.6 43.6 43 43 43 L 38 43 C 37.4 43 37 42.6 37 42 L 37 36 C 37 35.4 37.4 35 38 35 z"/>
                </svg>

                {this.state.showLIst ?
                    <Component.Form style={{top: 49, right: 0, left: 'auto',padding: '0 20px'}}>
                        {theme.map((el, i) => <ItemList key={`${el}_${i}`} selected={this.state.activeTheme === el} onClick={this.selectedTheme(el)} >{el}</ItemList>)}
                    </Component.Form>
                : null}
            </Theme>
        )
    }
}