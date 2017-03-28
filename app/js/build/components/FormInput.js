'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Rating = require('./Rating');

var _Rating2 = _interopRequireDefault(_Rating);

var _Suggest = require('./Suggest');

var _Suggest2 = _interopRequireDefault(_Suggest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormInput = function (_Component) {
  _inherits(FormInput, _Component);

  function FormInput() {
    _classCallCheck(this, FormInput);

    return _possibleConstructorReturn(this, (FormInput.__proto__ || Object.getPrototypeOf(FormInput)).apply(this, arguments));
  }

  _createClass(FormInput, [{
    key: 'getValue',
    value: function getValue() {
      return 'value' in this.refs.input ? this.refs.input.value : this.refs.input.getValue();
    }
  }, {
    key: 'render',
    value: function render() {
      var common = {
        ref: 'input',
        defaultValue: this.props.defaultValue
      };

      switch (this.props.type) {
        case 'year':
          return _react2.default.createElement('input', _extends({}, common, { type: 'number',
            defaultValue: this.props.defaultValue || new Date().getFullYear() }));
        case 'suggest':
          return _react2.default.createElement(_Suggest2.default, _extends({}, common, { options: this.props.options }));
        case 'rating':
          return _react2.default.createElement(_Rating2.default, _extends({}, common, { defaultValue: parseInt(this.props.defaultValue, 10) }));
        case 'text':
          return _react2.default.createElement('textarea', common);
        default:
          return _react2.default.createElement('input', _extends({}, common, { type: 'text' }));
      }
    }
  }]);

  return FormInput;
}(_react.Component);

FormInput.propTypes = {
  type: _react.PropTypes.oneOf(['year', 'suggest', 'rating', 'text', 'input']),
  options: _react.PropTypes.array, // 入力候補の<option>
  defaultValue: _react.PropTypes.any
};

exports.default = FormInput;