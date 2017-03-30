'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _Dialog = require('./Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _Excel = require('./Excel');

var _Excel2 = _interopRequireDefault(_Excel);

var _Form = require('./Form');

var _Form2 = _interopRequireDefault(_Form);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Whinepad = function (_Component) {
  _inherits(Whinepad, _Component);

  function Whinepad(props) {
    _classCallCheck(this, Whinepad);

    var _this = _possibleConstructorReturn(this, (Whinepad.__proto__ || Object.getPrototypeOf(Whinepad)).call(this, props));

    _this.state = {
      data: props.initialData,
      addnew: false
    };
    _this._preSearchData = null;
    return _this;
  }

  _createClass(Whinepad, [{
    key: '_addNewDialog',
    value: function _addNewDialog() {
      this.setState({ addnew: true });
    }
  }, {
    key: '_addNew',
    value: function _addNew(action) {
      if (action === 'dismiss') {
        this.setState({ addnew: false });
        return;
      }
      var data = Array.from(this.state.data);
      data.unshift(this.refs.form.getData());
      this.setState({
        addnew: false,
        data: data
      });
      this._commitToStorage(data);
    }
  }, {
    key: '_onExcelDataChange',
    value: function _onExcelDataChange(data) {
      this.setState({ data: data });
      this._commitToStorage(data);
    }
  }, {
    key: '_commitToStorage',
    value: function _commitToStorage(data) {
      localStorage.setItem('data', JSON.stringify(data));
    }
  }, {
    key: '_startSearching',
    value: function _startSearching() {
      this._preSearchData = this.state.data;
    }
  }, {
    key: '_search',
    value: function _search(e) {
      var inputText = e.target.value.toLowerCase();
      if (!inputText) {
        this.setState({ data: this._preSearchData });
        return;
      }
      var fields = this.props.schema.map(function (item) {
        return item.id;
      });
      var searchdata = this._preSearchData.filter(function (row) {
        for (var f = 0; f < fields.length; f++) {
          if (row[fields[f]].toString().toLowerCase().indexOf(inputText) > -1) {
            return true;
          }
        }
        return false;
      });
      this.setState({ data: searchdata });
    }
  }, {
    key: '_doneSearching',
    value: function _doneSearching() {
      this.setState({ data: this._preSearchData });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'Whinepad' },
        _react2.default.createElement(
          'div',
          { className: 'WhinepadToolbar' },
          _react2.default.createElement(
            'div',
            { className: 'WhinepadToolbarSearch' },
            _react2.default.createElement('input', {
              placeholder: 'Search...',
              onFocus: this._startSearching.bind(this),
              onChange: this._search.bind(this),
              onBlur: this._doneSearching.bind(this) })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'WhinepadDatagrid' },
          _react2.default.createElement(_Excel2.default, {
            schema: this.props.schema,
            initialData: this.state.data,
            onDataChange: this._onExcelDataChange.bind(this) })
        ),
        _react2.default.createElement(
          'div',
          { className: 'WhinepadToolbar' },
          _react2.default.createElement(
            'div',
            { className: 'WhinepadToolbarAdd' },
            _react2.default.createElement(
              _Button2.default,
              { onClick: this._addNewDialog.bind(this), className: 'WhinepadToolbarAddButton' },
              '+ add'
            )
          )
        ),
        this.state.addnew ? _react2.default.createElement(
          _Dialog2.default,
          { header: '\u65B0\u898F\u8FFD\u52A0', confirmLabel: '\u8FFD\u52A0', modal: true, onAction: this._addNew.bind(this) },
          _react2.default.createElement(_Form2.default, { ref: 'form', fields: this.props.schema })
        ) : null
      );
    }
  }]);

  return Whinepad;
}(_react.Component);

Whinepad.propTypes = {
  schema: _react.PropTypes.arrayOf(_react.PropTypes.object),
  initialData: _react.PropTypes.arrayOf(_react.PropTypes.object)
};

exports.default = Whinepad;