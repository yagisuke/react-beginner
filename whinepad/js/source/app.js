'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import schema from './schema';
import Logo from './components/Logo';
import Whinepad from './components/Whinepad';

let data = JSON.parse(localStorage.getItem('data'));
if (!data) {
  data = {};
  schema.forEach(item => data[item.id] = item.sample);
  data = [data];
}

ReactDOM.render(
  <div>
    <div className="app-header">
      <Logo />Whinepad.
    </div>
    <Whinepad schema={schema} initialData={data} />
  </div>,
  document.getElementById('app')
)
