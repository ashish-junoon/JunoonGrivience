// Sidebar.jsx
function MailSidebar({ emails, onSelect }) {
  return (
    <div style={{ width: "30%", borderRight: "1px solid #ccc" }}>
      <h3>Inbox</h3>

      {emails.map((mail) => (
        <div
          key={mail.id}
          onClick={() => onSelect(mail.threadId)}
          style={{ padding: 10, cursor: "pointer" }}
        >
          <b>{mail.subject}</b>
          <p>{mail.from}</p>
        </div>
      ))}
    </div>
  );
}

export default MailSidebar