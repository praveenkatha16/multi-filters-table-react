import * as csv from "csvtojson";
import { useEffect, useState } from "react";

export default function useCsvData(filePath) {
  const [data, setData] = useState([]);

  async function fetchData() {
    const data = await fetch(filePath)
      .then((res) => res.text())
      .then((text) => csv().fromString(text));
    setData(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return data;
}
