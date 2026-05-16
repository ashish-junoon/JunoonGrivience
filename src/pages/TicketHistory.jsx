import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import { RemarksData, tableData } from "../assets/data";
import Icon from "../utils/Icons";
import { useNavigate } from "react-router-dom";
import Modal from "../utils/Modal";
import TextInput from "../components/fields/TextInput";
import Button from "../utils/Button";
import SelectInput from "../components/fields/SelectInput";
import { getHistoryComplaints } from "../api/ApiFunction";

const TicketHistory = () => {
  const [isReopen, setIsReopen] = useState(false)
  const [Tickets, setTickets] = useState([])
  const navigate = useNavigate();
  // const historyData = tableData.filter((item) => item.closureDate);

  const fetchData = async () => {
      try {
        const req={}
        const response = await getHistoryComplaints(req)
        if(response.status){
          setTickets(response.data)
        }
      } catch (error) {
        console.log("Error in Fetching complaints")
      }
    }
  
    useEffect(()=> {
      fetchData()
    }, [])

  const columnsData = [
    {
      name: "Id",
      // selector: (row, index) => row.id,
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "RefNo",
      width: "150px",
      selector: (row) => row.complaintRefNo,
      sortable: true,
    },
    {
      name: "customer Name",
      selector: (row) => row.customerName,
      sortable: true,
    },
    {
      name: "Loan Id",
      selector: (row) => row.loanId,
      sortable: true,
    },
    {
      name: "complaint Category",
      width: "250px",
      // selector: (row) => row.reason,
      cell: (row) => {
        return <p title={row.complaintDescription}>{row.complaintCategory}</p>;
      },
    },
    {
      name: "Mobile No",
      selector: (row) => row.mobile,
    },
    {
      name: "Created Date",
      sortable: true,
      selector: (row) => row.createdAt,
    },
    {
      name: "Closer Date",
      sortable: true,
      selector: (row) => row.closerDate,
    },
    {
      name: "Closed By",
      sortable: true,
        selector: (row) => row.closedBy || "---",
    },
    {
      name: "Status",
      // selector: (row) => row.status,
      sortable: true,
      cell: (row) => {
        return (
          <span className="text-green-500 bg-green-100 font-bold text-[10px] border border-green-500 px-2 py-0.5 rounded-full shadow-md italic">
            {row.status}
          </span>
        );
      },
    },
    {
      name: "View",
      cell: (row) => {
        return (
          <span
            onClick={() =>
              navigate("/tickets/ticket-detail", {
                state: { ticketId: row.complaintRefNo },
              })
            }
          >
            <Icon name="FaEye" size={20} color="#088395" />
          </span>
        );
      },
    },
    {
      name: "Reopen",
      cell: (row) => {
        return (
          <span onClick={() => setIsReopen(true)}>
            <Icon name="FaFolderOpen" size={18} color="#088395" />
          </span>
        );
      },
    },
  ];

  return (
    <>
      <div className="mt-0">
        <Table
          columns={columnsData}
          data={Tickets}
          title="Manage History"
          // handleFilter={handleFilterBtn}
          // exportable={true}
        />
      </div>

      <Modal
        isOpen={isReopen}
        onClose={() => setIsReopen(false)}
        title="ReOpen Ticket"
      >
        <div className="p-2">

          <div className="grid grid-cols-2">
            {/* <div>
              <TextInput label="Remarks" />
            </div> */}

            <div>
            <SelectInput
              label="Remarks"
              placeholder="Remarks"
              name="remarks"
              options={RemarksData}
              // value={formik.values.remarks}
              // onBlur={formik.handleBlur}
              // onChange={formik.handleChange}
            />
          </div>
          </div>
        </div>

        <div className="flex items-center gap-2 justify-end">
          <Button
            onClick={() => setIsReopen(false)}
            btnName="Cancel"
            style="cursor-pointer border border-gray-300"
          />
          <Button
            onClick={() => setIsReopen(false)}
            btnName="ReOpen"
            style="cursor-pointer bg-primary hover:bg-primary/80 text-white"
          />
        </div>
      </Modal>
    </>
  );
};

export default TicketHistory;
