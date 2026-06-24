import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import { priorityStyles, tableData } from "../assets/data";
import Button from "../utils/Button";
import Modal from "../utils/Modal";
import ComplaintForm from "../components/forms/ComplaintForm";
import Loading from "../utils/Loading";
import Icon from "../utils/Icons";
import { toast } from "react-toastify";
import FileUploadModal from "../components/fields/FileUploadModal";
import { useNavigate } from "react-router-dom";
import AddComplaint from "../components/forms/AddComplaint";
import TextInput from "../components/fields/TextInput";
import SelectInput from "../components/fields/SelectInput";
import Escalate from "../components/forms/Escalate";
import Reject from "../components/forms/Reject";
import { getOpenComplaints } from "../api/ApiFunction";
import { useAuth } from "../context/AuthContext";

const PendingTickets = () => {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isAssignOpen, setisAssignOpen] = useState(false);
  const [isReject, setisReject] = useState(false);
  const [ticket, setTicket] = useState(null);
  const [Tickets, setTickets] = useState([]);
  const [csvData, setcsvData] = useState([]);
  const navigate = useNavigate();

  const { adminUser } = useAuth();

  const handleAssign = (data) => {
    setisAssignOpen(true);
    setTicket(data);
  };

  const handleReject = (data) => {
    setisReject(true);
    setTicket(data);
  };

  const columnsData = [
    {
      name: "S.No",
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
      name: "Category",
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
      name: "product",
      selector: (row) => row.productName,
    },
    {
      name: "Priority",
      selector: (row) => row.priority,
      sortable: true,
      cell: (row) => {
        return (
          <span
            className={`px-2 py-0.5 rounded text-[10px] ${priorityStyles[row.priority]}`}
          >
            {row.priority}
          </span>
        );
      },
    },
    adminUser?.role && {
      name: "assigned To",
      selector: (row) => row.assignedToName,
    },
    {
      name: "Created Date",
      sortable: true,
      selector: (row) => row.createdAt,
    },
    {
      name: "Created By",
      sortable: true,
      selector: (row) => row.createdByName || "USER",
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
                state: { ticketId: row.complaintRefNo, isOpen: true },
              })
            }
          >
            <Icon name="FaEye" size={20} color="#088395" />
          </span>
        );
      },
    },
    // {
    //   name: "Action",
    //   cell: (row) => {
    //     return (
    //       <span
    //         onClick={() => handleAssign(row)}
    //         // className="text-primary bg-primary/20 shadow-2xl font-bold text-[10px] border border-primary px-2 py-1 rounded-sm italic"
    //       >
    //         {/* Assign */}
    //         <Icon name="RiShareForwardFill" size={20} />
    //       </span>
    //     );
    //   },
    // },
    // {
    //   name: "Reject",
    //   cell: (row) => {
    //     return (
    //       <span
    //         onClick={() => handleReject(row)}
    //         // className="text-red-500 bg-red-500/20 shadow-2xl font-bold text-[10px] border border-red-500 px-2 py-1 rounded-sm italic"
    //         className="text-red-500 shadow-2xl font-bold text-[10px]"
    //       >
    //         {/* Assign */}
    //         <Icon name="MdOutlineDeleteSweep" size={20} />
    //       </span>
    //     );
    //   },
    // },
  ];

  const fetchData = async () => {
    try {
      const req = {
        empId: adminUser?.empId,
      };
      const response = await getOpenComplaints(req);
      if (response.status) {
        setTickets(response.data);
      }
    } catch (error) {
      console.log("Error in Fetching complaints", error);
    }
  };

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
      Status: data?.status,
      "Assigned To": data?.assignedToName || "N/A",
      // "Closed By": data?.closedByName || "-",
      "ReOpen By": data?.reOpenByName || "-",
      "Created At": data?.createdAt,
    }));

    setcsvData(ExportableData);
  }, [Tickets]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <section>
        <div className="mt-0">
          <Table
            columns={columnsData}
            data={Tickets}
            title="Pending Tickets"
            csvData={csvData}
            // handleFilter={handleFilterBtn}
            exportable={true}
            filename="Inprocess Tickets"
          />
        </div>

        <Modal
          isOpen={isAssignOpen}
          onClose={() => setisAssignOpen(false)}
          title="Escalate Complaint"
        >
          <Escalate
            isAssignOpen={isAssignOpen}
            setisAssignOpen={setisAssignOpen}
            ticket={ticket}
          />
        </Modal>

        <Modal
          isOpen={isReject}
          onClose={() => setisReject(false)}
          title="Reject Complaint"
        >
          <Reject
            isReject={isReject}
            setisReject={setisReject}
            ticket={ticket}
          />
        </Modal>

        <FileUploadModal
          isOpen={open}
          onClose={() => setOpen(false)}
          accepts=".csv"
          // onUpload={handleUpload}
        />

        {/* <Loading /> */}
      </section>
    </>
  );
};

export default PendingTickets;
