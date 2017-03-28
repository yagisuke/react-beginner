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

  _preFilterData: null,

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

  _toggleFilter: function() {
    if (this.state.isfilter) {
      this.setState({
        data: this._preFilterData,
        isfilter: false
      });
      this._preFilterData = null;
    } else {
      this._preFilterData = this.state.data;
      this.setState({isfilter: true});
    }
  },

  _filter: function(e) {
    var inputtext = e.target.value.toLowerCase();

    if (!inputtext) {
      this.setState({data: this._preFilterData});
      return;
    }

    var index = e.target.dataset.index;
    var filterdata = this._preFilterData.filter(function(rowitem) {
      return rowitem[index].toString().toLowerCase().indexOf(inputtext) > -1;
    });
    this.setState({data: filterdata});
  },

  _download: function(format, ev) {
    var contents = format === 'json' ? JSON.stringify(this.state.data) : this.state.data.reduce(function(result, row) {
      return result + row.reduce(function(rowresult, cell, idx) {
        return rowresult + '"' + cell.replace(/"/g, '""') + '"' + (idx < row.length - 1 ? ',' : '');
      }, '') + "\n";
    }, '');

    var URL = window.URL || window.webkitURL;
    var blob = new Blob([contents], {type: 'text/' + format});
    ev.target.href = URL.createObjectURL(blob);
    ev.target.download = format + '-data.' + format;
  },

  _renderFilter: function() {
    if (!this.state.isfilter) {
      return null;
    }
    return (
      <tr onChange={this._filter}>
        {this.props.headers.map(function(_ignore, index) {
          return <td key={index}><input type="text" data-index={index}/></td>;
        })}
      </tr>
    );
  },

  _renderToolbox: function() {
    return (
      <div className={"Toolbox"}>
        <button onClick={this._toggleFilter}>検索</button>
        <a onClick={this._download.bind(this, 'json')} href="data.json">JSONダウンロード</a>
        <a onClick={this._download.bind(this, 'csv')} href="data.csv">CSVダウンロード</a>
      </div>
    );
  },

  _renderTable: function() {
    var state = this.state;

    return (
      <table className={"Excel"}>
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
          {this._renderFilter()}
          {
            state.data.map(function(rowitems, rowindex) {
              return (
                <tr key={rowindex}>
                  {
                    rowitems.map(function(name, index) {
                      return <td key={index}>{name}</td>;
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  },

  render: function() {
    return (
      <div>
        {this._renderToolbox()}
        {this._renderTable()}
      </div>
    );
  }
});

export default Excel
