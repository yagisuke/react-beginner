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

  _preFilterData: null,

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

  _toggleFilter: function _toggleFilter() {
    if (this.state.isfilter) {
      this.setState({
        data: this._preFilterData,
        isfilter: false
      });
      this._preFilterData = null;
    } else {
      this._preFilterData = this.state.data;
      this.setState({ isfilter: true });
    }
  },

  _filter: function _filter(e) {
    var inputtext = e.target.value.toLowerCase();

    if (!inputtext) {
      this.setState({ data: this._preFilterData });
      return;
    }

    var index = e.target.dataset.index;
    var filterdata = this._preFilterData.filter(function (rowitem) {
      return rowitem[index].toString().toLowerCase().indexOf(inputtext) > -1;
    });
    this.setState({ data: filterdata });
  },

  _download: function _download(format, ev) {
    var contents = format === 'json' ? JSON.stringify(this.state.data) : this.state.data.reduce(function (result, row) {
      return result + row.reduce(function (rowresult, cell, idx) {
        return rowresult + '"' + cell.replace(/"/g, '""') + '"' + (idx < row.length - 1 ? ',' : '');
      }, '') + "\n";
    }, '');

    var URL = window.URL || window.webkitURL;
    var blob = new Blob([contents], { type: 'text/' + format });
    ev.target.href = URL.createObjectURL(blob);
    ev.target.download = format + '-data.' + format;
  },

  _renderFilter: function _renderFilter() {
    if (!this.state.isfilter) {
      return null;
    }
    return _react2.default.createElement(
      'tr',
      { onChange: this._filter },
      this.props.headers.map(function (_ignore, index) {
        return _react2.default.createElement(
          'td',
          { key: index },
          _react2.default.createElement('input', { type: 'text', 'data-index': index })
        );
      })
    );
  },

  _renderToolbox: function _renderToolbox() {
    return _react2.default.createElement(
      'div',
      { className: "Toolbox" },
      _react2.default.createElement(
        'button',
        { onClick: this._toggleFilter },
        '\u691C\u7D22'
      ),
      _react2.default.createElement(
        'a',
        { onClick: this._download.bind(this, 'json'), href: 'data.json' },
        'JSON\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9'
      ),
      _react2.default.createElement(
        'a',
        { onClick: this._download.bind(this, 'csv'), href: 'data.csv' },
        'CSV\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9'
      )
    );
  },

  _renderTable: function _renderTable() {
    var state = this.state;

    return _react2.default.createElement(
      'table',
      { className: "Excel" },
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
        this._renderFilter(),
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
    );
  },

  render: function render() {
    return _react2.default.createElement(
      'div',
      null,
      this._renderToolbox(),
      this._renderTable()
    );
  }
});

exports.default = Excel;