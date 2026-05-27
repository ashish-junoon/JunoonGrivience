import React, { useState, useMemo, Children } from "react";
import DataTable from "react-data-table-component";
import Papa from "papaparse";
// import { CSVLink } from "react-csv";
// import { CSVLink } from "react-csv/lib/components/Link";
// import Tooltip from "./utils/Tooltip";
import Icon from "../utils/Icons";

const Table = ({
  columns,
  data,
  title,
  subtitle,
  handleFilter,
  pagination = true,
  selectableRows = false,
  onRowClicked,
  exportable = false,
  csvData,
  filename,
  children,
}) => {
  const [filterText, setFilterText] = useState("");

  // 🔥 Optimized filter
  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(filterText.toLowerCase()),
      ),
    );
  }, [data, filterText]);

  // 🔥 Optimized filter
  const filteredcsvData = useMemo(() => {
    if (!filterText) return csvData;

    const search = filterText.toLowerCase();

    return csvData.filter((item) =>
      Object.values(item).some(
        (value) => value && value.toString().toLowerCase().includes(search),
      ),
    );
  }, [csvData, filterText]);

  const downloadCSV = ({ data, filename }) => {
    const csv = Papa.unparse(data);

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename || "data.csv";
    link.click();
  };

  // 🎨 Screenshot-like table styles
  // const customStyles = {
  //   headCells: {
  //     style: {
  //       backgroundColor: "#f1f5f9",
  //       color: "#475569",
  //       fontSize: "12px",
  //       fontWeight: "600",
  //       textTransform: "uppercase",
  //       borderBottom: "1px solid #e2e8f0",
  //     },
  //   },
  //   rows: {
  //     style: {
  //       minHeight: "56px",
  //       fontSize: "12px",
  //       color: "#334155",
  //       // borderBottom: "1px solid #f1f5f9",
  //     },
  //     highlightOnHoverStyle: {
  //       // backgroundColor: "#f8fafc",
  //       // transition: "all 0.2s ease",
  //     },
  //   },
  //   cells: {
  //     style: {
  //       paddingTop: "10px",
  //       paddingBottom: "10px",
  //     },
  //   },
  // };

  const customStyles = {
    table: {
      style: {
        backgroundColor: "#ffffff",
      },
    },
    headCells: {
      style: {
        backgroundColor: "#f8fafc",
        color: "#64748b",
        fontSize: "11px",
        fontWeight: "600",
        textTransform: "uppercase",
        borderBottom: "1px solid #e2e8f0",
        paddingLeft: "12px",
        paddingRight: "12px",
      },
    },
    rows: {
      style: {
        minHeight: "48px",
        fontSize: "12px",
        color: "#334155",
        borderBottom: "1px solid #f1f5f9",
      },
      highlightOnHoverStyle: {
        backgroundColor: "#f8fafc",
        cursor: "pointer",
      },
    },
    cells: {
      style: {
        paddingTop: "8px",
        paddingBottom: "8px",
        paddingLeft: "12px",
        paddingRight: "12px",
      },
    },
    pagination: {
      style: {
        borderTop: "1px solid #e2e8f0",
        fontSize: "12px",
      },
    },
  };

  const sortIcon = <Icon name="RiArrowUpSLine" size={18} />;

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* 🔥 Header */}
      <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Actions */}
        <div className="flex flex-col md:justify-between w-full sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Search"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-md bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-400 transition"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Icon name="IoSearchSharp" size={16} />
            </div>
          </div>

          {/* Filter Button */}
          {/* <button
            onClick={handleFilter}
            className="px-3 py-2 border rounded-md text-sm text-gray-600 flex items-center gap-2 border-gray-300 hover:bg-gray-100 transition"
          >
            <Icon name="RiFilter3Line" size={16} />
            Filters
          </button> */}

          {/* <div className="">
              <Tooltip
                  message={"Advance Filter"}
                  position="top"
                  delay={200}
                  offset={8}
              >
                  <button className="bg-primary rounded-full p-1.5 shadow-md"
                      onClick={handleFilter}
                  >
                      <Icon name="RiFilter2Line" size={18} color="#fff" />
                  </button>
              </Tooltip>
          </div> */}

          {/* Export Button */}
          <div>
            {exportable === true && (
              <button
                className="px-3 py-2 bg-primary hover:bg-primary/90 text-white text-sm rounded-md flex items-center gap-2 shadow cursor-pointer"
                onClick={() =>
                  downloadCSV({
                    data: filteredcsvData ? filteredcsvData : filteredData,
                    filename,
                  })
                }
              >
                Download Excel
              </button>
            )}
          </div>

          {/* Download UI Button (visual only like screenshot) */}
          {/* <button className="px-3 py-2 border rounded-md text-sm text-gray-600 flex items-center gap-2 border-gray-300 hover:bg-gray-100 transition">
            <Icon name="RiDownloadLine" size={16} />
            Download
          </button> */}
        </div>

        {children && <div>{children}</div>}
      </div>

      {/* 🔥 Table */}
      <div>
        <DataTable
          columns={columns}
          data={filteredData}
          customStyles={customStyles}
          pagination={pagination}
          paginationPerPage={10}
          selectableRows={selectableRows}
          onRowClicked={onRowClicked}
          highlightOnHover
          pointerOnHover
          sortIcon={sortIcon}
          dense
          responsive
        />
      </div>
    </div>
  );
};

export default Table;
