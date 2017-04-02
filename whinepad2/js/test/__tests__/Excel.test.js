jest.autoMockOff();

import React from 'react';
import TestUtils from 'react-addons-test-utils';

const Excel = require('../../source/components/Excel').default;
const schema = require('../../source/schema').default;

let data = [{}];
schema.forEach(item => data[0][item.id] = item.sample);

describe('データの編集', () => {
  it('新規データを保存します', () => {
    const callback = jest.genMockFunction();
    const table = TestUtils.renderIntoDocument(
      <Excel
        schema={schema}
        initialData={data}
        onDataChange={callback} />
    );
    const newname = "2.99ドルのジャック";
    const cell = TestUtils.scryRenderedDOMComponentsWithTag(table, 'td')[0];
    cell.dataset = {
      row: cell.getAttribute('data-row'),
      key: cell.getAttribute('data-key'),
    }

    TestUtils.Simulate.doubleClick(cell);
    cell.getElementsByTagName('input')[0].value = newname;
    TestUtils.Simulate.submit(cell.getElementsByTagName('form')[0]);

    expect(cell.textContent).toBe(newname);
    expect(callback.mock.calls[0][0][0].name).toBe(newname)
  });
});
