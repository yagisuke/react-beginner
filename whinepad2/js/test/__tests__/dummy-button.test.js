import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

describe('ボタンの描画', () => {
  it('クリックされると文字列が変化します', () => {

    const button = TestUtils.renderIntoDocument(
      <button onClick={ev => ev.target.innerHTML = 'さようなら'}>
        こんにちわ
      </button>
    );

    expect(ReactDOM.findDOMNode(button).textContent).toEqual('こんにちわ');
    TestUtils.Simulate.click(button);
    expect(ReactDOM.findDOMNode(button).textContent).toEqual('さようなら');
  });
});
