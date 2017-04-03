jest
  .dontMock('../../source/components/Button')
  .dontMock('../Wrap')
  .dontMock('classnames')
;

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const Button = require('../../source/components/Button').default;
const Wrap = require('../Wrap').default;

describe('Buttonコンポーネンの描画', () => {
  it('<a>または<button>を描画', () => {

    const button = TestUtils.renderIntoDocument(
      <Wrap>
        <Button>こんにちわ</Button>
      </Wrap>
    );

    const a = TestUtils.renderIntoDocument(
      <Wrap>
        <Button href="#">こんにちわ</Button>
      </Wrap>
    );
    const b = TestUtils.renderIntoDocument(
      <Wrap>
        <Button>こんにちわ</Button>
      </Wrap>
    );

    expect(ReactDOM.findDOMNode(a).children[0].nodeName).toEqual('A');
    expect(ReactDOM.findDOMNode(b).children[0].nodeName).toEqual('BUTTON');
  });

  it('カスタムのCSSクラスを指定', () => {
    const button = TestUtils.renderIntoDocument(
      <Wrap><Button className="YAGISUKE">こんにちわ</Button></Wrap>
    );

    const buttonNode = ReactDOM.findDOMNode(button).children[0];
    expect(buttonNode.getAttribute('class')).toEqual('Button YAGISUKE');
  });
});
