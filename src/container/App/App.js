import React      from 'react';
import SignIn       from '../Auth/SignIn';
import SignUp       from '../Auth/SignUp';
// import Nav         from '../Navigation/Navigations'
import AuthExample  from '../Navigation/Auth'
import './App.scss';

import {BrowserRouter as Router, Route, Link, Redirect, withRouter} from "react-router-dom";

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signout(cb) {
        this.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};

const FormAuthorized = withRouter(
    ({ history }) =>
        fakeAuth.isAuthenticated ? (
              <button onClick={() => {fakeAuth.signout(() => history.push("/"));}}> Sign out </button>
        ) : (
            <ul>
              <li>
                <Link to="/sign-in" >Sign in</Link>
              </li>
              <li>
                <Link to="/sign-up">Sign up</Link>
              </li>
            </ul>
        )
);

class App extends React.Component {
  render() {
    return (
        <Router>

          <FormAuthorized/>

          <Route path="/sign-in" component={SignIn} />
          <Route path="/sign-up" component={SignUp} />

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