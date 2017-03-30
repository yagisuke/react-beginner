'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classification = require('./classification');

var _classification2 = _interopRequireDefault(_classification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  id: 'name',
  label: '名前',
  show: true, // Excelに表示するか否か
  align: 'left', // Excelでの配置
  sample: '2ドルのジャック'
}, {
  id: 'year',
  label: '年',
  type: 'year',
  show: true,
  sample: '2015'
}, {
  id: 'grape',
  label: 'ぶどう',
  type: 'suggest',
  options: _classification2.default.grapes,
  show: true,
  align: 'left',
  sample: _classification2.default.grapes[3]
}, {
  id: 'rating',
  label: '評価',
  type: 'rating',
  show: true,
  sample: 3
}, {
  id: 'comments',
  label: 'コメント',
  type: 'text',
  sample: '値段の割には良い'
}];