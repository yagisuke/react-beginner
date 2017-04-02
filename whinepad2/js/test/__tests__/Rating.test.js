jest
  .dontMock('../../source/components/Rating')
  .dontMock('classnames')
;

import React from 'react';
import TestUtils from 'react-addons-test-utils';

const Rating = require('../../source/components/Rating').default;

describe('評価を表します', () => {
  it('ユーザの操作に応答します', () => {
    const input = TestUtils.renderIntoDocument(<Rating />);
    const stars = TestUtils.scryRenderedDOMComponentsWithTag(input, 'span');

    TestUtils.Simulate.mouseOver(stars[3]);
    expect(stars[0].className).toBe('RatingOn');
    expect(stars[3].className).toBe('RatingOn');
    expect(stars[4].className).toBeFalsy();
    expect(input.state.rating).toBe(0);
    expect(input.state.tmpRating).toBe(4);
  });
});
