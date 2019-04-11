import React      from 'react';
import SignIn       from '../Auth/SignIn';
import SignUp       from '../Auth/SignUp';
import AuthExample  from '../Navigation/Auth'
import PublickPage from '../PublickPage/PublickPage'
import {BrowserRouter as Router, Route, Redirect, withRouter, Switch} from "react-router-dom";
import './App.scss';

class Home extends React.PureComponent {
    previousLocation = this.props.location;

    componentDidMount() {
        if( this.props.location.state && this.props.location.state.modal) {
            this.props.history.push({pathname: "/", state:{modal: false}});
        }
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

    render() {
        let { location } = this.props;
        let isModal = (location.state && location.state.modal && this.previousLocation !== location);

        return (
            <>
                <Switch location={isModal ? this.previousLocation : location} >
                    <Route exact path="/" component={PublickPage} />
                </Switch>
                {isModal ? <Route path="/sign-in" component={SignIn} /> : null}
                {isModal ? <Route path="/sign-up" component={SignUp} /> : null}
            </>
        )
    }

}

export default function App() {
    return (
        <Router>
            <Route  component={Home}/>
        </Router>
    );
}

//
// <Link to="/" >Home</Link>
// <AuthExample/>
//
// import TestStand  from '../TestEnvironment/TestStand'
// import Header     from '../../component/Header/Header';
// import Section    from '../../component/Section/Section';
// import Background from '../../component/Backgroud/Background';

//  <Auth/>

// <Nav/>
// <Header/>
// <Section/>
// <Background/>
// <TestStand/>

//
// <div className="App">
//   <AuthExample/>
// </div>