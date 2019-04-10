import React      from 'react';
import Auth       from '../Auth/Auth';
import './App.scss';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Auth/>

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

//import Nav         from '../Navigation/Navigations'


// <Nav/>
// <Header/>
// <Section/>
// <Background/>
// <TestStand/>