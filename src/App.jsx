import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

import Header from './Header.jsx';
import ActivityFeed from './ActivityFeed.jsx';

const App = () => {
  

  return (
    <div className='container'>
      <Header/>
      <ActivityFeed/>
    </div>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
