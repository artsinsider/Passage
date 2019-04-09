import React      from 'react';
import Header     from '../../component/Header/Header';
import Section    from '../../component/Section/Section';
import Background from '../../component/Backgroud/Background';
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
//
// <Header/>
// <Section/>
// <Background/>