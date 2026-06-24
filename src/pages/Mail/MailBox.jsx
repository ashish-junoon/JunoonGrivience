import { useEffect, useState } from "react";
import { getInboxMail, getThreadMail } from "../../api/ApiFunction";

export default function MailBox() {
  const [active, setActive] = useState("inbox");
  const [selectedMail, setSelectedMail] = useState(null);

  const isMe = (from) => from.includes("rohitkolisd@gmail.com");
  // apna email yaha daal

  const tabs = [
    { key: "inbox", label: "Inbox" },
    // { key: "sent", label: "Sent" },
    // { key: "draft", label: "Draft" },
  ];

  return (
    <div className="p-0">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold text-gray-800">Mail Box</h2>

        {/* <button className="bg-primary text-white px-4 py-2 rounded-md text-sm hover:bg-primary/90 cursor-pointer">
          + Compose
        </button> */}
      </div>

      {/* ================= TABS ================= */}
      <div className="flex gap-2 mb-4 border-b border-gray-300">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={`px-4 py-2 text-sm font-medium border-b-3 transition cursor-pointer ${
              active === tab.key
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-primary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ================= SEARCH ================= */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search mails..."
          className="w-full md:w-80 px-3 py-2 border border-gray-400 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex bg-white rounded-md border border-gray-300 h-[500px]">
        {/* ================= LEFT: LIST ================= */}
        <div className="w-1/3 border-r border-gray-300 overflow-y-auto">
          {active === "inbox" && <Inbox setSelectedMail={setSelectedMail} />}
          {active === "sent" && <Sent setSelectedMail={setSelectedMail} />}
          {active === "draft" && <Draft setSelectedMail={setSelectedMail} />}
        </div>

        {/* ================= RIGHT: VIEW ================= */}
        <div className="flex-1 p-4">
          {!selectedMail ? (
            <div className="h-full flex items-center justify-center text-gray-400">
              Select a mail to view
            </div>
          ) : (
            <div className="flex flex-col h-full bg-gray-50">
              {/* ================= HEADER ================= */}
              <div className="border-b px-5 py-4 bg-white flex justify-between items-center">
                <div>
                  <h3 className="text-base font-semibold text-gray-800">
                    {selectedMail?.[0]?.subject || "No Subject"}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Conversation with {selectedMail?.[0]?.to}
                  </p>
                </div>
              </div>

              {/* ================= CHAT ================= */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {selectedMail.map((mail) => {
                  const mine = isMe(mail.from);

                  const senderName = mail.from?.split("<")[0]?.trim();

                  return (
                    <div
                      key={mail._id}
                      className={`flex ${mine ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[65%] rounded-lg px-4 py-3 shadow-sm ${
                          mine
                            ? "bg-primary text-white"
                            : "bg-white border border-gray-200 text-gray-800"
                        }`}
                      >
                        {/* Sender */}
                        <div className="flex justify-between items-center mb-1">
                          <p
                            className={`text-xs font-medium ${
                              mine ? "text-white/80" : "text-gray-600"
                            }`}
                          >
                            {senderName}
                          </p>

                          <span
                            className={`text-[10px] ${
                              mine ? "text-white/70" : "text-gray-400"
                            }`}
                          >
                            {new Date(mail.date).toLocaleString()}
                          </span>
                        </div>

                        {/* Message */}
                        <p className="text-sm leading-relaxed whitespace-pre-line">
                          {mail.body}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ================= REPLY ================= */}
              <div className="border-t bg-white px-4 py-3">
                <div className="flex items-end gap-3">
                  <textarea
                    placeholder="Write a reply..."
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    rows={2}
                  />

                  <button className="bg-primary text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition">
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================= MAIL ROW ================= */
function MailRow({ mail, onClick }) {
  const { subject, snippet, createdAt, isRead, from } = mail;

  // Format time (simple)
  const formatTime = (date) => {
    const d = new Date(date);
    return d.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      onClick={() => onClick(mail)}
      className={`flex justify-between items-center px-4 py-3 border-b border-gray-300 cursor-pointer transition ${
        !isRead ? "bg-primary/10 font-medium" : "bg-white hover:bg-gray-50"
      }`}
    >
      {/* LEFT */}
      <div className="flex flex-col">
        <p className="text-sm text-gray-800">
          {subject?.length > 30
            ? `${snippet?.slice(0, 30)}...`
            : subject || "No Subject"}
        </p>

        <p className="text-xs text-gray-500 truncate max-w-[400px]">
          {(snippet?.length > 30 ? `${snippet?.slice(0, 30)}...` : snippet) ||
            "No message"}
        </p>

        {from && (
          <span className="text-[11px] text-gray-400 mt-1">From: {from}</span>
        )}
      </div>

      {/* RIGHT */}
      <div className="text-right">
        <span className="text-xs text-gray-400">{formatTime(createdAt)}</span>

        {/* {!isRead && (
          <div className="w-2 h-2 bg-blue-500 rounded-full mt-1 ml-auto" />
        )} */}
      </div>
    </div>
  );
}

// function MailRow({ title, desc, time, unread, onClick }) {
//   return (
//     <div
//       onClick={onClick}
//       className={`flex justify-between items-center px-4 py-3 border-b border-gray-300 cursor-pointer hover:bg-gray-50 ${
//         unread ? "bg-primary/20 font-medium" : ""
//       }`}
//     >
//       <div>
//         <p className="text-sm text-gray-800">{title}</p>
//         <p className="text-xs text-gray-500">{desc}</p>
//       </div>
//       <span className="text-xs text-gray-400">{time}</span>
//     </div>
//   );
// }

/* ================= PAGES ================= */

function Inbox({ setSelectedMail }) {
  const [inboxData, setInboxData] = useState([]);
  const [selectedmailsData, setSelectedmailsData] = useState([]);

  const fetchGetInboxMail = async () => {
    try {
      const response = await getInboxMail();
      if (response.status) {
        setInboxData(response.data);
      }
    } catch (error) {
      console.log("ERROR IN FETCHING INBOX: ", error);
    }
  };

  const fetchSingleMail = async (threadId) => {
    try {
      const response = await getThreadMail(threadId);
      if (response.status) {
        setSelectedMail(response.data);
        // setSelectedmailsData(response.data);
        console.log(response);
      }
    } catch (error) {
      console.log("ERROR IN FETCHING INBOX: ", error);
    }
  };

  const handleGetEmails = (threadId) => {
    fetchSingleMail(threadId);
  };

  useEffect(() => {
    fetchGetInboxMail();
  }, []);

  return (
    <>
      {
        // inboxData?.map((mail) =>  <MailRow key={mail._id} mail={mail} onClick={setSelectedMail} />)
        inboxData?.map((mail) => (
          <MailRow
            key={mail._id}
            mail={mail}
            onClick={() => handleGetEmails(mail.threadId)}
          />
        ))
      }
    </>
  );
}

function Sent() {
  return (
    <>
      <MailRow
        title="Re: Complaint Resolved"
        desc="We have fixed your issue"
        time="1 hr ago"
      />
    </>
  );
}

function Draft() {
  return (
    <>
      <MailRow
        title="Pending Reply"
        desc="Draft saved for escalation"
        time="Yesterday"
      />
    </>
  );
}
