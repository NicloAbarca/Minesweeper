import { Component } from 'react';


class Table extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // Data
    let dataColumns = this.props.data.columns;
    let dataRows = this.props.data.rows;

    let tableHeaders = (
      <thead>
          <tr>
            {dataColumns.map(function(column) {
              return <th>{column}</th>; })}
          </tr>
      </thead>);

    let tableBody = dataRows.map(function(row) {
      return (
        <tr>
          {dataColumns.map(function(column) {
            return <td>{row[column]}</td>; })}
        </tr>); });
    return (
      // Data
      <table className="table table-bordered table-hover" width="100%">
        {tableHeaders}
        {tableBody}
      </table>) 
  }
}


export default Table;
