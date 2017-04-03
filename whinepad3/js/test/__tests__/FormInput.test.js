jest
  .dontMock('../../source/components/FormInput')
  .dontMock('../../source/components/Rating')
  .dontMock('../../source/components/Suggest')
  .dontMock('classnames')
;

import React from 'react';
import TestUtils from 'react-addons-test-utils';
const FormInput = require('../../source/components/FormInput').default;

describe('フォームインプットのテスト', () => {
  it('返却値のテスト', () => {
    expect(
      TestUtils.findRenderedDOMComponentWithTag(
        TestUtils.renderIntoDocument(<FormInput />),
        'input',
      ).type
    ).toBe('text');

    expect(
      TestUtils.findRenderedDOMComponentWithTag(
        TestUtils.renderIntoDocument(<FormInput type="year" />),
        'input',
      ).type
    ).toBe('number');

    expect(
      TestUtils.findRenderedDOMComponentWithTag(
        TestUtils.renderIntoDocument(<FormInput type="rating" id="rating" />),
        'input',
      ).type
    ).toBe('hidden');

    expect(
      TestUtils.findRenderedDOMComponentWithTag(
        TestUtils.renderIntoDocument(<FormInput type="suggest" options={['r', 'g', 'b']} />),
        'datalist',
      ).id
    ).toBeTruthy();

    expect(
      TestUtils.findRenderedDOMComponentWithTag(
        TestUtils.renderIntoDocument(<FormInput type="text" />),
        'textarea',
      ).nodeName
    ).toBe('TEXTAREA');
  });
});
