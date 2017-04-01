jest
  .dontMock('../source/components/Button')
  .dontMock('classnames')
;

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const Button = require('../source/components/Button').default;

describe('Buttonコンポーネンの描画', () => {
  it('<a>または<button>を描画', () => {

    const button = TestUtils.renderIntoDocument(
      <div>
        <Button>こんにちわ</Button>
      </div>
    );

    const a = TestUtils.renderIntoDocument(
      <div>
        <Button href="#">こんにちわ</Button>
      </div>
    );
    const b = TestUtils.renderIntoDocument(
      <div>
        <Button>こんにちわ</Button>
      </div>
    );

    expect(ReactDOM.findDOMNode(a).children[0].nodeName).toEqual('A');
    expect(ReactDOM.findDOMNode(b).children[0].nodeName).toEqual('BUTTON');
  });

  it('カスタムのCSSクラスを指定', () => {
    const button = TestUtils.renderIntoDocument(
      <div><Button className="YAGISUKE">こんにちわ</Button></div>
    );

    const buttonNode = ReactDOM.findDOMNode(button).children[0];
    console.log(buttonNode.getAttribute('class'));
    expect(buttonNode.getAttribute('class')).toEqual('Button YAGISUKE');
  });
});
