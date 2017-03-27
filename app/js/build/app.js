'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Logo = require('./components/Logo');

var _Logo2 = _interopRequireDefault(_Logo);

var _Excel = require('./components/Excel');

var _Excel2 = _interopRequireDefault(_Excel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var headers = localStorage.getItem("headers");
var data = localStorage.getItem("data");

if (!headers) {
  headers = ['タイトル', '年', '評価', 'コメント'];
  data = [['テスト', '2015', '3', '普通でした。'], ['てすと', '2000', '4', 'ちょっと良かったです。'], ['TEST', '1977', '1', 'ダメです。']];
}

_reactDom2.default.render(_react2.default.createElement(
  'main',
  null,
  _react2.default.createElement(
    'h1',
    null,
    _react2.default.createElement(_Logo2.default, null),
    '\u30A2\u30D7\u30EA\u30B1\u30FC\u30B7\u30E7\u30F3\u3078\u3088\u3046\u3053\u305D\u3002'
  ),
  _react2.default.createElement(_Excel2.default, { headers: headers, initialData: data })
), document.getElementById('app'));