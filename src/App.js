import "./styles.css";
import datasets from "./data/tableData";
import useCsvData from "./hooks/useCsvData";
import useMultiFilter from "./hooks/useMultiFilter";
import AutocompleteDropdown from "./MyDropdown";
import DataTable from "react-data-table-component";

const customStyles = {
  tableWrapper: {
    style: {
      display: "block",
      height: "100%",
    },
  },
};

export default function App() {
  const { columns, path } = datasets.large;

  const data = useCsvData(path);
  const [filteredData, options, onFilterChange] = useMultiFilter(data, columns);

  return (
    <div className="App">
      <div className="filters">
        {columns.map((column) => (
          <AutocompleteDropdown
            key={column.name}
            placeholder={column.name}
            onChange={(filterValue) => onFilterChange(column, filterValue)}
            options={options[column.name]}
          />
        ))}
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        className="table"
        pagination
        customStyles={customStyles}
        paginationPerPage={100}
      />
    </div>
  );
}
