'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Excel = _react2.default.createClass({
  displayName: 'Excel',

  propTypes: {
    headers: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string),
    initialData: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string))
  },

  getInitialState: function getInitialState() {
    return {
      data: this.props.initialData,
      sortby: null,
      isdesc: false,
      edit: null, // {row, cell}
      isfilter: false
    };
  },

  _sort: function _sort(e) {
    var column = e.target.cellIndex;
    var data = this.state.data.slice();
    var isdesc = this.state.sortby === column && !this.state.isdesc;

    data.sort(function (a, b) {
      return isdesc ? a[column] < b[column] ? 1 : -1 : a[column] > b[column] ? 1 : -1;
    });

    this.setState({
      data: data,
      sortby: column,
      isdesc: isdesc
    });
  },

  render: function render() {
    var state = this.state;
    return _react2.default.createElement(
      'div',
      { className: 'Excel' },
      _react2.default.createElement(
        'table',
        null,
        _react2.default.createElement(
          'thead',
          { onClick: this._sort },
          _react2.default.createElement(
            'tr',
            null,
            this.props.headers.map(function (title, index) {
              return _react2.default.createElement(
                'th',
                { key: index },
                state.sortby === index ? state.isdesc ? title + ' \u2191' : title + ' \u2193' : title
              );
            })
          )
        ),
        _react2.default.createElement(
          'tbody',
          null,
          state.data.map(function (rowitems, rowindex) {
            return _react2.default.createElement(
              'tr',
              { key: rowindex },
              rowitems.map(function (name, index) {
                return _react2.default.createElement(
                  'td',
                  { key: index },
                  name
                );
              })
            );
          })
        )
      )
    );
  }
});

exports.default = Excel;