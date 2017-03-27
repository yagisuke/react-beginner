'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Logo from './components/Logo';
import Excel from './components/Excel';

var headers = localStorage.getItem("headers");
var data = localStorage.getItem("data");

if (!headers) {
  headers = ['タイトル', '年', '評価', 'コメント'];
  data = [
    ['テスト', '2015', '3', '普通でした。'],
    ['てすと', '2000', '4', 'ちょっと良かったです。'],
    ['TEST',  '1977', '1', 'ダメです。']
  ];
}

ReactDOM.render(
  <main>
    <h1><Logo />アプリケーションへようこそ。</h1>
    <Excel headers={headers} initialData={data} />
  </main>,
  document.getElementById('app')
);
