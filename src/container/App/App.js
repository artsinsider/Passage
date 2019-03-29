import React   from 'react';
import Header  from '../../component/Header/Header';
import Section from '../../component/Section/Section';
import Background from '../../component/Backgroud/Background';
import './App.scss';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Section/>
        <Background/>
      </div>
    );
  }
}

export default App;