import React       from 'react';
import SignIn      from '../Auth/SignIn';
import SignUp      from '../Auth/SignUp';
import Loader      from '../../component/Library/Loader/Loader';
import PublickPage from '../PublickPage/PublickPage'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.scss';

class Home extends React.PureComponent {
    state = {
        show: true
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

    render() {
        let { location } = this.props;
        let isModal = (location.state && location.state.modal && this.previousLocation !== location);

        return (
            <>
                <Loader show={this.state.show} />
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