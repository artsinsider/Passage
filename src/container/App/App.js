import React           from 'react';
import SignIn          from '../Auth/SignIn';
import SignUp          from '../Auth/SignUp';
import Loader          from '../../component/Library/Loader/Loader';
import Header          from '../../component/Header/Header';
import Navigation      from '../../component/Navigation/Navigation';
import Home            from '../Pages/Home/Home';
import Claim           from '../Pages/Сlaim/Сlaim'
import Themes          from '../../component/Themes/Themes';
import {Route, Switch} from "react-router-dom";
import theme           from '../../records/theme';
import {ThemeProvider} from 'styled-components';
import './App.scss';

const routes = [
    {
        path: "/",
        linkName: "Home",
        component: Home,
        exact: true
    }, {
        path: "/content",
        linkName: "About money",
        component: content,
        exact: false
    },{
        path: "/claim",
        linkName: "Сlaim",
        component: Claim,
        exact: false
    },{
        path: "/faq",
        linkName: "FAQ",
        component: faq,
        exact: false
    }
];

class App extends React.PureComponent {
    state = {
        show: true,
        activeTheme: localStorage.getItem('theme') ? localStorage.getItem('theme') : 'Default_Theme'
    };
    previousLocation = this.props.location;

    componentDidMount() {
        if( this.props.location.state && this.props.location.state.modal) {
            this.props.history.push({pathname: "/", state:{modal: false}});
        }
        window.setTimeout(() => this.setState({show: !this.state.show}), 2000)
    }

    componentWillUpdate(nextProps) {
        let { location } = this.props;
        if (
            nextProps.history.action !== "POP" &&
            (!location.state || !location.state.modal)
        ) {
            this.previousLocation = this.props.location;
        }
    }

    changeTheme = (name) => {
        localStorage.setItem('theme', name);
        this.setState({activeTheme: name})
    };

    render() {
        let { location } = this.props;
        let isModal = (location.state && location.state.modal && this.previousLocation !== location);

        return (
            <>
                <ThemeProvider theme={theme[this.state.activeTheme]}>
                    <Loader show={this.state.show} />
                </ThemeProvider>

                <Header>
                    <Navigation items={routes}/>
                    <Themes selectedTheme={this.props.changeTheme}/>
                </Header>

                <Switch location={isModal ? this.previousLocation : location} >
                    {routes.map((route, i) =>
                            <Route exact={route.exact}
                               key={i}
                               path={route.path}
                                   component={route.component}/>
                    )}
                    <Route component={notFound}/>
                </Switch>


                {isModal ?
                    <Route path="/sign-in"
                           render={() =>
                               <ThemeProvider theme={theme[this.state.activeTheme]}>
                                   <SignIn {...this.props}/>
                                 </ThemeProvider>}/>
                    : null}
                {isModal ?
                    <Route path="/sign-up"
                              render={() =>
                                  <ThemeProvider theme={theme[this.state.activeTheme]}>
                                      <SignUp {...this.props}/>
                                  </ThemeProvider>}/>
                    : null}
            </>
        )
    }
}
export default App

function content() {
    return <h3>CONTENT</h3>
}

function faq() {
    return <h3>FAQ</h3>
}
function notFound() {
    return <div>
            <h1>404</h1>
            <p>не найдено</p>
    </div>
}