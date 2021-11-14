import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

import Header from './Header.jsx';
import ActivityFeed from './ActivityFeed.jsx';

const App = () => {
  

  return (
    <div className='container'>
      <Header/>
      {/* <h1>{activityFeed[0].id}</h1> */}
      {/* <div className="container-view">Some activities should be here</div> */}
      <ActivityFeed/>
    </div>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
