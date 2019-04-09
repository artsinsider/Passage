import React      from 'react';

import Nav from '../Navigation/Navigations'
import './App.scss';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Nav/>
      </div>
    );
  }
}

export default App;
//
// import TestStand  from '../TestEnvironment/TestStand'
// import Header     from '../../component/Header/Header';
// import Section    from '../../component/Section/Section';
// import Background from '../../component/Backgroud/Background';
// import Auth       from '../Auth/Auth';


// <Auth/>
// <Header/>
// <Section/>
// <Background/>
// <TestStand/>