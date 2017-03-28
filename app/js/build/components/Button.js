'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// $ npm install --save-dev classnames

function Button(props) {
  var cssclasses = (0, _classnames2.default)('Button', props.className);
  return props.href ? _react2.default.createElement('a', _extends({}, props, { className: cssclasses })) : _react2.default.createElement('button', _extends({}, props, { className: cssclasses }));
}

Button.propTypes = {
  href: _react.PropTypes.string
};

exports.default = Button;