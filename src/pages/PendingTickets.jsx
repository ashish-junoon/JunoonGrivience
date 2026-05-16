import React, { useState } from "react";
import Table from "../components/Table";
import { tableData } from "../assets/data";
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

const PendingTickets = () => {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isAssignOpen, setisAssignOpen] = useState(false);
  const [isReject, setisReject] = useState(false);
  const [ticket, setTicket] = useState(null);

  const navigate = useNavigate();

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
      name: "Applicant Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Loan Id",
      selector: (row) => row.loanId,
      sortable: true,
    },
    {
      name: "Reason",
      width: "250px",
      // selector: (row) => row.reason,
      cell: (row) => {
        return <p title={row.description}>{row.reason}</p>;
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
    // {
    //   name: "Loan Amount",
    //   sortable: true,
    //   selector: (row) => row.amount,
    // },
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
      name: "Action",
      cell: (row) => {
        return (
          <span
            onClick={() => handleAssign(row)}
            // className="text-primary bg-primary/20 shadow-2xl font-bold text-[10px] border border-primary px-2 py-1 rounded-sm italic"
          >
            {/* Assign */}
            <Icon name="RiShareForwardFill" size={20} />
          </span>
        );
      },
    },
    {
      name: "Reject",
      cell: (row) => {
        return (
          <span
            onClick={() => handleReject(row)}
            // className="text-red-500 bg-red-500/20 shadow-2xl font-bold text-[10px] border border-red-500 px-2 py-1 rounded-sm italic"
            className="text-red-500 shadow-2xl font-bold text-[10px]"
          >
            {/* Assign */}
            <Icon name="MdOutlineDeleteSweep" size={20} />
          </span>
        );
      },
    },
  ];

  return (
    <>
      <section>
        <div className="mt-0">
          <Table
            columns={columnsData}
            data={tableData}
            title="Pending Tickets"
            // handleFilter={handleFilterBtn}
            exportable={true}
          />
        </div>

        <Modal
          isOpen={isAssignOpen}
          onClose={() => setisAssignOpen(false)}
          title="Escalate Complaint"
        >
          <Escalate
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
