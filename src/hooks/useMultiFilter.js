import { useState } from "react";

export default function useMultiFilter(data, columns) {
  const [filterValue, setFilterValue] = useState({});

  function onFilterChange(column, columnFilter) {
    setFilterValue((filterValue) => ({
      ...filterValue,
      [column.name]: columnFilter,
    }));
  }

  const filteredData = filter(data, columns, filterValue);

  const options = columns.reduce(
    (options, col) => ({
      ...options,
      [col.name]: getOptions(data, columns, filterValue, col),
    }),
    {}
  );
  return [filteredData, options, onFilterChange];
}

function getOptions(data, columns, filterValue, column) {
  const filteredColumns = columns.filter(
    (col) =>
      col.name !== column.name &&
      filterValue[col.name] !== null &&
      filterValue[col.name] !== undefined &&
      !!filterValue[col.name].length
  );

  const filteredData = filteredColumns.length
    ? data.filter((item) =>
        filteredColumns.every((col) =>
          filterValue[col.name].includes(col.selector(item))
        )
      )
    : data;

  return [...new Set(filteredData.map(column.selector))];
}

function filter(data, columns, filterValue) {
  const filteredColumns = columns.filter(
    (col) =>
      filterValue[col.name] !== null &&
      filterValue[col.name] !== undefined &&
      !!filterValue[col.name].length
  );

  const filteredData = filteredColumns.length
    ? data.filter((item) =>
        filteredColumns.every((col) =>
          filterValue[col.name].includes(col.selector(item))
        )
      )
    : data;
  return filteredData;
}
