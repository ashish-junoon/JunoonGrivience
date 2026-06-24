import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { RemarksData, tableData } from "../assets/data";
import Modal from "../utils/Modal";
import Button from "../utils/Button";
import TextInput from "../components/fields/TextInput";
import SelectInput from "../components/fields/SelectInput";
import UploadInput from "../components/fields/UploadInput";
import Escalate from "../components/forms/Escalate";
import Reject from "../components/forms/Reject";
import { toast } from "react-toastify";
import Resolve from "../components/forms/Resolve";
import { getActionHistory, getIndivisualComplaint } from "../api/ApiFunction";
import { useAuth } from "../context/AuthContext";
import ReOpen from "../components/forms/ReOpen";
import FileUpload from "../utils/FileUpload";

const TicketDetail = () => {
  const [isAssignOpen, setisAssignOpen] = useState(false);
  const [isReject, setisReject] = useState(false);
  const [isResolved, setisResolved] = useState(false);
  const [isReopen, setIsReopen] = useState(false);
  const [isUploadOpen, setisUploadOpen] = useState(false);
  const [ticket, setTicket] = useState(null);
  const [ticketData, setTicketData] = useState({});
  const [historyData, setHistoryData] = useState([]);

  const location = useLocation();
  const ticketId = location?.state?.ticketId;

  const { adminUser } = useAuth();
  const isAdmin = adminUser?.role === "ADMIN";
  const isActionAllowed = adminUser?.empId == ticketData?.assignedTo;

  // const ticketData = tableData.find((item) => item.complaintRefNo === ticketId);

  const fetchData = async (ticketId) => {
    try {
      const req = {
        id: ticketId,
      };
      const response = await getIndivisualComplaint(req);

      if (response.status) {
        setTicketData(response.data);
        fetchActionHistory({ id: ticketId });
      }
    } catch (error) {
      console.log("Error in Fetching getIndivisualComplaint:", error);
    }
  };

  useEffect(() => {
    fetchData(ticketId);
  }, []);

  if (!ticketData) {
    return (
      <div className="p-6 text-center text-red-500 font-semibold">
        No Ticket Found
      </div>
    );
  }

  const statusColor = {
    "In Progress": "bg-blue-100 text-blue-600",
    New: "bg-yellow-100 text-yellow-600",
    Open: "bg-yellow-100 text-yellow-600",
    Resolved: "bg-green-100 text-green-600",
    Rejected: "bg-red-100 text-red-600",
    ReOpen: "bg-amber-200 text-amber-600",
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const formateTime = (date) => new Date(date).toLocaleTimeString("en-IN");

  const handleAssign = (data) => {
    setisAssignOpen(true);
    setTicket(data);
  };

  const handleAssignReopen = (data) => {
    setIsReopen(true);
    setTicket(data);
  };

  const handleReject = (data) => {
    setisReject(true);
    setTicket(data);
  };

  const handleResolved = (data) => {
    setisResolved(true);
    setTicket(data);
  };

  const fetchActionHistory = async (req) => {
    console.log(req);

    try {
      const response = await getActionHistory(req);
      if (response.status) {
        setHistoryData(response.data);
      } else {
        toast.info(response.message || "Unable to fetch history data!");
      }
    } catch (error) {
      console.log("ERROR IN FETCH HISTORY DATA", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    fetchActionHistory({ id: ticketId });
  }, []);

  return (
    <div className="space-y-2 min-h-screen">
      {/* 🔥 Header */}
      <div className="bg-white p-5 rounded-md shadow-sm flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-400">Ticket ID</p>
          <h2 className="text-xl font-bold text-gray-800 tracking-wide">
            {ticketData.complaintRefNo}
          </h2>
          <p className="text-xs text-gray-400 mt-0">
            Created on {formatDate(ticketData.createdAt)}
          </p>
        </div>

        <span
          className={`px-4 py-1 text-sm font-medium rounded-full ${statusColor[ticketData.status]}`}
        >
          {ticketData.status}
        </span>
      </div>

      {/* 📊 Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-2">
        {/* LEFT */}
        <div className="lg:col-span-3 space-y-2">
          {/* 👤 User Info */}
          <div className="bg-white p-5 rounded-md shadow-sm">
            <p className="text-sm font-semibold text-primary mb-4">
              User Information
            </p>

            <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-400 text-xs">Name</p>
                <p className="font-medium">{ticketData.customerName}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Mobile</p>
                <p className="font-medium">{ticketData.mobile}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Email</p>
                <p className="font-medium">{ticketData.email}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Product</p>
                <p className="font-medium">{ticketData.productName}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Loan Id</p>
                <p className="font-medium">{ticketData.loanId || "N/A"}</p>
              </div>
              {/* <div>
                <p className="text-gray-400 text-xs">
                  Responsible department or owner
                </p>
                <p className="font-medium">
                  {ticketData.responsibleDepartment || "N/A"}
                </p>
              </div> */}
              {!ticketData.closerDate && (
                <div>
                  <p className="text-gray-400 text-xs">Assigned To</p>
                  <p className="font-medium">
                    {ticketData.assignedToName || "Not Assigned"}
                  </p>
                </div>
              )}
              {/* <div>
                <p className="text-gray-400 text-xs">
                  Expected Resolution Date
                </p>
                <p className="font-medium">
                  {new Date(ticketData.expectedResolutionDate).toLocaleDateString()}
                </p>
              </div> */}
              <div>
                <p className="text-gray-400 text-xs">channel</p>
                <p className="font-medium">{ticketData.channel}</p>
              </div>

              {ticketData.closerDate && (
                <>
                  <div>
                    <p className="text-gray-400 text-xs">Closure Reason</p>
                    <p className="font-medium">{ticketData.closureReason}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Closure Date</p>
                    <p className="font-medium">{ticketData.closerDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Closure By</p>
                    <p className="font-medium">{ticketData.closedByName}</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* 📝 Complaint Details */}
          <div className="bg-white p-5 rounded-md shadow-sm">
            <p className="text-sm font-semibold text-primary mb-4">
              Complaint Details
            </p>

            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-400 text-xs">Category</p>
                <p className="font-medium">{ticketData.complaintCategory}</p>
              </div>

              <div>
                <p className="text-gray-400 text-xs">Description</p>
                <p className="text-gray-600 leading-relaxed">
                  {ticketData.complaintDescription}
                </p>
              </div>
            </div>
          </div>

          {/* 📎 Documents */}
          <div className="bg-white p-5 rounded-md shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm font-semibold text-primary">
                Document Attachment
              </p>

              {/* <button classa */}
              <button
                className="border border-primary px-5 py-1 rounded-full text-primary font-semibold text-xs cursor-pointer"
                onClick={() => setisUploadOpen(true)}
              >
                Upload
              </button>
            </div>

            {ticketData.file && ticketData.file.length > 0 ? (
              <div className="space-y-2">
                {ticketData.file.map((doc, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border border-gray-100 rounded-lg p-3 hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center gap-3">
                      {/* Icon */}
                      <div className="w-9 h-9 flex items-center justify-center rounded bg-gray-100 text-gray-600 text-sm">
                        {doc.type === "image" ? "🖼️" : "📄"}
                      </div>

                      {/* Info */}
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {doc.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          Uploaded on {formatDate(doc.uploadedAt)} by{" "}
                          {doc.createdBy}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 text-sm">
                      <a
                        href={`${import.meta.env.VITE_SERVER_BASE_URL}${doc.url}`}
                        target="_blank"
                        className="text-primary hover:underline"
                      >
                        View
                      </a>
                      {/* <a
                        href={doc.url}
                        download
                        className="text-gray-500 hover:text-gray-700"
                      >
                        Download
                      </a> */}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">No documents uploaded</p>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-2 lg:col-span-2">
          {/* ⏳ Timeline */}

          <div className="bg-white p-5 rounded-md shadow-sm">
            <p className="text  -sm font-semibold text-primary mb-5">
              Activity Timeline
            </p>

            <div className="relative border-l border-gray-300 pl-6 space-y-2 max-h-[500px] overflow-y-auto">
              {/* Created */}
              <div className="relative">
                <span className="absolute -left-6 -translate-x-1/2 top-2 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>

                <p className="text-xs text-gray-400">
                  {formatDate(ticketData.createdAt)}
                </p>
                <p className="text-sm font-semibold text-gray-800">
                  Complaint Submitted
                </p>
              </div>

              {/* History */}
              {historyData?.map((item) => (
                <div key={item._id} className="relative">
                  {/* ✅ PERFECTLY CENTERED DOT */}
                  <span
                    className={`absolute -left-6 -translate-x-1/2 top-2 w-3 h-3 rounded-full border-2 border-white ${
                      item.type === "Escalated"
                        ? "bg-blue-500"
                        : item.type === "Rejected"
                          ? "bg-red-500"
                          : item.type === "Resolved"
                            ? "bg-green-500"
                            : "bg-gray-400"
                    }`}
                  ></span>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm font-semibold text-gray-800">
                        {item.type}
                      </p>
                      <p className="text-xs text-gray-400">
                        {formatDate(item.createdAt)} •{" "}
                        {formateTime(item.createdAt)}
                      </p>
                    </div>

                    <p className="text-sm text-gray-700">{item.text}</p>

                    {item.description && (
                      <p className="text-xs text-gray-500 mt-1">
                        {item.description}
                      </p>
                    )}

                    <p className="text-[11px] text-gray-400 mt-2">
                      By {item.createdByName}{" "}
                      {item.createdFor && `→ ${item.createdForName}`}
                    </p>
                  </div>
                </div>
              ))}

              {/* Final Status */}
              <div className="relative">
                <span className="absolute -left-6 -translate-x-1/2 top-2 w-3 h-3 bg-purple-500 rounded-full border-2 border-white"></span>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                  <p className="text-sm font-semibold text-purple-700">
                    Current Status: {ticketData.status}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ⚙️ Actions */}
          <div className="bg-white p-5 rounded-md shadow-sm">
            <p className="text-sm font-semibold text-primary mb-4">Actions</p>

            <div className="space-y-2">
              {!ticketData.closerDate && (isActionAllowed || isAdmin) && (
                <>
                  <button
                    onClick={() => handleResolved(ticketData)}
                    className="w-full py-2 rounded bg-primary text-white text-sm hover:bg-primary/80 cursor-pointer"
                  >
                    Mark as Resolved
                  </button>

                  {/* <button
                    onClick={() => handleReject(ticketData)}
                    className="w-full py-2 rounded bg-red-500 text-gray-100 text-sm hover:bg-red-400 cursor-pointer"
                  >
                    Reject Ticket
                  </button> */}
                  <button
                    onClick={() => handleAssign(ticketData)}
                    className="w-full py-2 rounded bg-gray-200 text-gray-700 text-sm hover:bg-gray-300/80 cursor-pointer"
                  >
                    Escalate Ticket
                  </button>
                </>
              )}

              {ticketData.closerDate && isAdmin && (
                <button
                  onClick={() => handleAssignReopen(ticketData)}
                  className="w-full py-2 rounded bg-primary text-gray-100 text-sm hover:bg-primary/80 cursor-pointer"
                >
                  ReOpen Ticket
                </button>
              )}

              {ticketData.closerDate && !isAdmin && (
                <p className="text-sm text-gray-400">Actions Not Allowed</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isAssignOpen}
        onClose={() => setisAssignOpen(false)}
        title="Assign Complaint"
      >
        <Escalate
          isAssignOpen={isAssignOpen}
          setisAssignOpen={setisAssignOpen}
          ticket={ticket}
          fetchData={fetchData}
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
          fetchData={fetchData}
        />
      </Modal>

      <Modal
        isOpen={isResolved}
        onClose={() => setisResolved(false)}
        title="Mark as Resolved"
      >
        <Resolve
          isResolved={isResolved}
          setisResolved={setisResolved}
          ticket={ticket}
          fetchData={fetchData}
        />
      </Modal>

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

      <Modal
        isOpen={isUploadOpen}
        onClose={() => setisUploadOpen(false)}
        title="Upload Files"
      >
        <FileUpload
          complaintRefNo={ticketData?.complaintRefNo}
          ticketId={ticketId}
          setisUploadOpen={setisUploadOpen}
          fetchData={fetchData}
          fetchActionHistory={fetchActionHistory}
        />
      </Modal>
    </div>
  );
};

export default TicketDetail;
