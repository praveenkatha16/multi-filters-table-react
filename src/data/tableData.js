function getColumns(columns) {
  return columns.map((name) => ({
    name,
    selector: (row) => row[name],
  }));
}

export default {
  small: {
    path: "./dataset_small.csv",
    columns: getColumns(["number", "mod3", "mod4", "mod5", "mod6"]),
  },
  large: {
    path: "./dataset_large.csv",
    columns: getColumns(["number", "mod350", "mod8000", "mod20002"]),
  },
};
