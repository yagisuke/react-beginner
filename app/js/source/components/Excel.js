import React from 'react';

var Excel = React.createClass({
  displayName: 'Excel',

  propTypes: {
    headers: React.PropTypes.arrayOf(
      React.PropTypes.string
    ),
    initialData: React.PropTypes.arrayOf(
      React.PropTypes.arrayOf(
        React.PropTypes.string
      )
    )
  },

  getInitialState: function() {
    return {
      data: this.props.initialData,
      sortby: null,
      isdesc: false,
      edit: null, // {row, cell}
      isfilter: false,
    };
  },

  _sort: function(e) {
    var column = e.target.cellIndex;
    var data = this.state.data.slice();
    var isdesc = this.state.sortby === column && !this.state.isdesc;

    data.sort(function(a, b) {
      return isdesc ? (a[column] < b[column] ? 1 : -1) : (a[column] > b[column] ? 1 : -1);
    });

    this.setState({
      data: data,
      sortby: column,
      isdesc: isdesc,
    });
  },

  render: function() {
    var state = this.state;
    return (
      <div className="Excel">
        <table>
          <thead onClick={this._sort}>
            <tr>
              {
                this.props.headers.map(function(title, index) {
                  return (
                    <th key={index}>
                      {
                        state.sortby === index ?
                          state.isdesc ?
                            title + ' \u2191' :
                            title + ' \u2193' :
                          title
                      }
                    </th>
                  );
                })
              }
            </tr>
          </thead>
          <tbody>
            {
              state.data.map(function(rowitems, rowindex) {
                return (
                  <tr key={rowindex}>
                    {
                      rowitems.map(function(name, index) {
                        return (
                          <td key={index}>{name}</td>
                        );
                      })
                    }
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
});

export default Excel
