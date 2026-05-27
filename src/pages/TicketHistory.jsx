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
import { useAuth } from "../context/AuthContext";
import ReOpen from "../components/forms/ReOpen";

const TicketHistory = () => {
  const [isReopen, setIsReopen] = useState(false);
  const [ticket, setTicket] = useState(null);
  const [Tickets, setTickets] = useState([]);
  const [csvData, setcsvData] = useState({});
  const navigate = useNavigate();
  // const historyData = tableData.filter((item) => item.closureDate);

  const { adminUser } = useAuth();

  const fetchData = async () => {
    try {
      const req = { empId: adminUser?.empId };
      const response = await getHistoryComplaints(req);
      if (response.status) {
        setTickets(response.data);
      }
    } catch (error) {
      console.log("Error in Fetching complaints");
    }
  };

  const handleReopen = (data) => {
    setIsReopen(true);
    setTicket(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      selector: (row) => row.loanId || "N/A",
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
      selector: (row) => row.closedByName || "---",
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
          <span onClick={() => handleReopen(row)}>
            <Icon name="FaFolderOpen" size={18} color="#088395" />
          </span>
        );
      },
    },
  ];

  useEffect(() => {
    if (!Tickets || Tickets.length === 0) return;

    const ExportableData = Tickets.map((data) => ({
      "Complaint Id": data?.complaintRefNo,
      "Customer Name": data?.customerName,
      "Loan Id": data?.loanId || "N/A",
      Mobile: data?.mobile,
      Email: data?.email,
      "Product Name": data?.productName,
      "Complaint Category": data?.complaintCategory,
      "Complaint Description": data?.complaintDescription,
      "Created By": data?.createdByName,
      "Status": data?.status,
      // "Assigned To": data?.assignedToName || "N/A",
      "Closed By": data?.closedByName || "-",
      // "ReOpen By": data?.reOpenByName || "-",
      "Created At": data?.createdAt,
      "Closed Remark": data?.closureReason,
    }));

    setcsvData(ExportableData);
  }, [Tickets]);

  return (
    <>
      <div className="mt-0">
        <Table
          columns={columnsData}
          data={Tickets}
          title="Manage History"
          exportable={true}
          filename="Closed Tickets"
          csvData={csvData}
          // handleFilter={handleFilterBtn}
          // exportable={true}
        />
      </div>

      <Modal
        isOpen={isReopen}
        onClose={() => setIsReopen(false)}
        title="ReOpen Ticket"
      >
        <ReOpen
          setisReOpen={setIsReopen}
          isReOpen={isReopen}
          ticket={ticket}
          fetchData={fetchData}
        />
      </Modal>
    </>
  );
};

export default TicketHistory;
