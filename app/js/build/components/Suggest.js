'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import React from 'react';
// const Component = React.Component;
// const PropTypes = React.PropTypes;

var Suggest = function (_Component) {
  _inherits(Suggest, _Component);

  function Suggest(props) {
    _classCallCheck(this, Suggest);

    var _this = _possibleConstructorReturn(this, (Suggest.__proto__ || Object.getPrototypeOf(Suggest)).call(this, props));

    _this.state = {
      value: props.defaultValue
    };
    return _this;
  }

  _createClass(Suggest, [{
    key: 'getValue',
    value: function getValue() {
      return this.state.value;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var randomid = Math.random().toString(16).substring(2);
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('input', {
          id: this.props.id,
          list: randomid,
          defaultValue: this.props.defaultValue,
          onChange: function onChange(e) {
            return _this2.setState({ value: e.target.value });
          }
        }),
        _react2.default.createElement(
          'datalist',
          { id: randomid },
          this.props.options.map(function (item, index) {
            return _react2.default.createElement('option', { key: index, value: item });
          })
        )
      );
    }
  }]);

  return Suggest;
}(_react.Component);

Suggest.propTypes = {
  options: _react.PropTypes.arrayOf(_react.PropTypes.string)
};

exports.default = Suggest;