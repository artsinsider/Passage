import React      from 'react';
import SignIn       from '../Auth/SignIn';
import SignUp       from '../Auth/SignUp';
// import Nav         from '../Navigation/Navigations'
import AuthExample  from '../Navigation/Auth'
import './App.scss';
import PublickPage from '../PublickPage/PublickPage'
import {BrowserRouter as Router, Route, Link, Redirect, withRouter} from "react-router-dom";




class App extends React.Component {
  render() {
    return (
        <Router>
          <Route exact path="/" component={PublickPage} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/sign-up" component={SignUp} />
            <Link to="/" >Home</Link>
          <AuthExample/>
        </Router>
    );
  }
}

export default App;
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