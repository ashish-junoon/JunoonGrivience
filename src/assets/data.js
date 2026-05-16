// export const UserData = [
//     {
//         mobile : "9582207407",
//         loanDetails: [
//             {
//                 name: "Rohit Koli",
//                 mobile : "9582207407",
//                 loanId:"111111",
//                 product:"PU",
//                 email: "rohit.koli@junooncapital.in",
//             },
//             {
//                 name: "Rohit Koli",
//                 mobile : "9582207407",
//                 loanId:"222222",
//                 product:"EW",
//                 email: "rohit.koli@junooncapital.in",
//             }
//         ]
//     },
//     {
//         mobile : "9170734822",
//         loanDetails: [
//             {
//                 name: "Anil Kumar",
//                 mobile : "9170734822",
//                 loanId:"555555",
//                 product:"PU",
//                 email: "anil.kumar@junooncapital.in",
//             },
//             {
//                 name: "Anil kumar",
//                 mobile : "9170734822",
//                 loanId:"888888",
//                 product:"PU",
//                 email: "anil.kumar@junooncapital.in",
//             }
//         ]
//     },
// ]

export const UserData = [
  {
    loanId: "111111",
    customerName: "Rohit Koli",
    mobile: "9582207407",
    productName: "PU",
    email: "rohit.koli@junooncapital.in",
  },
  {
    loanId: "222222",
    customerName: "Rohit Koli",
    mobile: "9582207407",
    productName: "EW",
    email: "rohit.koli@junooncapital.in",
  },
  {
    loanId: "555555",
    customerName: "Anil Kumar",
    mobile: "9170734822",
    productName: "PU",
    email: "anil.kumar@junooncapital.in",
  },
  {
    loanId: "888888",
    customerName: "Anil Kumar", // fixed casing
    mobile: "9170734822",
    productName: "PU",
    email: "anil.kumar@junooncapital.in",
  },
  {
    loanId: "999999",
    customerName: "Anil Kumar", // fixed casing
    mobile: "9170734822",
    productName: "PU",
    email: "anil.kumar@junooncapital.in",
  },
];

export const complaintsData = [
  {
    complaintRefNo: "GRV-2026-0001",
    receivedAt: "2026-04-29",
    customerName: "Rohit Koli",
    loanId: "111111",
    mobile: "9582207407",
    email: "rohit.koli@junooncapital.in",
    source: "App", // App / Web / Call / Email
    product: "Personal Loan",
    category: "Charges, Fees, or Interest Dispute",
    description:
      "Customer reports extra charges applied on EMI which were not communicated earlier.",
    department: "Finance",
    owner: "Agent_01",
    status: "Open",
    acknowledgementDate: "2026-04-29",
    remarks: "",
    escalationLevel: 0,
    closureDate: null,
    closureReason: null,
    customerConfirmation: false,
    ageingDays: 0,
    ageingBucket: "0-2 Days",
    isRepeat: false,
    compensation: null,
  },
  {
    complaintRefNo: "GRV-2026-0002",
    receivedAt: "2026-04-28",
    customerName: "Anil Kumar",
    loanId: "555555",
    mobile: "9170734822",
    email: "anil.kumar@junooncapital.in",
    source: "Email",
    product: "Personal Loan",
    category: "Payment Not Updated",
    description: "EMI paid on 5th April is still not reflecting in the system.",
    department: "Operations",
    owner: "Agent_02",
    status: "In Progress",
    acknowledgementDate: "2026-04-28",
    remarks: "Payment reconciliation in progress",
    escalationLevel: 1,
    closureDate: null,
    closureReason: null,
    customerConfirmation: false,
    ageingDays: 1,
    ageingBucket: "0-2 Days",
    isRepeat: false,
    compensation: null,
  },
  {
    complaintRefNo: "GRV-2026-0003",
    receivedAt: "2026-04-25",
    customerName: "Ravi Sharma",
    loanId: "999999",
    mobile: "9012345678",
    email: "ravi.sharma@email.com",
    source: "Call",
    product: "Personal Loan",
    category: "Loan Processing Issue",
    description: "Loan approval delayed without proper communication.",
    department: "Credit",
    owner: "Agent_03",
    status: "Open",
    acknowledgementDate: "2026-04-25",
    remarks: "",
    escalationLevel: 0,
    closureDate: null,
    closureReason: null,
    customerConfirmation: false,
    ageingDays: 4,
    ageingBucket: "3-7 Days",
    isRepeat: true,
    compensation: null,
  },
];

// export const complaintRemarks = [
//   {
//     label: "Incorrect Charges",
//     value: "Customer reports being charged extra or unauthorized fees on the loan account.",
//     response_time_in_days: 7
//   },
//   {
//     label: "Payment Not Updated",
//     value: "EMI/payment made by the customer is not reflecting in the system.",
//     response_time_in_days: 7
//   },
//   {
//     label: "Loan Account Details Issue",
//     value: "Mismatch or incorrect information in loan account details like balance, tenure, or EMI.",
//     response_time_in_days: 7
//   },
//   {
//     label: "Poor Customer Service",
//     value: "Unsatisfactory response or delay from customer support team.",
//     response_time_in_days: 7
//   },
//   {
//     label: "Others",
//     value: "OTHERS",
//     response_time_in_days: 7
//   }
// ];

export const products = [
  { label: "Paisa Udhaar", value: "PU" },
  { label: "Early Wages", value: "EW" },
  // { label: "Others", value: "Others" },
];

export const channels = [
  { label: "Website", value: "web" },
  { label: "Phone", value: "phone" },
  { label: "Email", value: "email" },
  { label: "Branch", value: "branch" },
];

export const complaintRemarks = [
  {
    label: "Harassment or misconduct by collection staff",
    value: "Harassment or misconduct by collection staffffffffffffff",
    response_time_in_days: 5,
  },
  {
    label: "Incorrect charges / penalties",
    value: "Incorrect charges / penalties",
    response_time_in_days: 5,
  },
  {
    label: "Wrong DPD or payment update",
    value: "Wrong DPD or payment update",
    response_time_in_days: 5,
  },
  {
    label: "Privacy violation",
    value: "Privacy violation",
    response_time_in_days: 5,
  },
  {
    label: "Any service-related issue",
    value: "Any service-related issue",
    response_time_in_days: 5,
  },
  // {
  //   label: "Service Delay",
  //   value: "Delay in processing requests, responses, or services.",
  //   response_time_in_days: 5,
  // },
  // {
  //   label: "Staff Behavior or Misconduct",
  //   value: "Unprofessional or inappropriate behavior by staff or support agents.",
  //   response_time_in_days: 3,
  // },
  // {
  //   label: "Loan Processing Issue",
  //   value: "Issues related to loan approval, rejection, or processing delays.",
  //   response_time_in_days: 7,
  // },
  // {
  //   label: "Disbursement Issue",
  //   value: "Loan amount not disbursed or delayed disbursement.",
  //   response_time_in_days: 5,
  // },
  // {
  //   label: "Repayment or Settlement Issue",
  //   value: "Issues in EMI payment, foreclosure, or settlement amount.",
  //   response_time_in_days: 7,
  // },
  // {
  //   label: "Charges, Fees, or Interest Dispute",
  //   value: "Dispute regarding extra charges, penalties, or interest applied.",
  //   response_time_in_days: 7,
  // },
  // {
  //   label: "Technical / App / Website Issue",
  //   value: "Errors, bugs, or failures in app or website functionality.",
  //   response_time_in_days: 3,
  // },
  // {
  //   label: "Collection or Recovery Complaint",
  //   value: "Issues related to recovery agents or collection practices.",
  //   response_time_in_days: 2,
  // },
  // {
  //   label: "Wrong Communication or Misinformation",
  //   value: "Incorrect details shared via SMS, email, or calls.",
  //   response_time_in_days: 4,
  // },
  // {
  //   label: "Documentation Issue",
  //   value: "Problems related to missing, incorrect, or rejected documents.",
  //   response_time_in_days: 5,
  // },
  // {
  //   label: "Credit Bureau Reporting Issue",
  //   value: "Incorrect reporting to CIBIL/Experian affecting credit score.",
  //   response_time_in_days: 10,
  // },
  // {
  //   label: "Fraud or Suspicious Transaction",
  //   value: "Unauthorized or suspicious activity in account.",
  //   response_time_in_days: 1,
  // },
  // {
  //   label: "Privacy or Data Confidentiality",
  //   value: "Concerns regarding misuse or leakage of personal data.",
  //   response_time_in_days: 2,
  // },
  // {
  //   label: "Partner / Agent Complaint",
  //   value: "Issues related to third-party agents or outsourced services.",
  //   response_time_in_days: 5,
  // },
  {
    label: "Other",
    value: "OTHERS",
    response_time_in_days: 15,
  },
];

// export const RemarksData = [
//   { label: "No issue found.", value: "No issue found." },
//   { label: "Invalid complaint.", value: "Invalid complaint." },
//   { label: "Insufficient details.", value: "Insufficient details." },
//   { label: "Duplicate request.", value: "Duplicate request." },
//   { label: "Not eligible as per policy.", value: "Not eligible as per policy." },
//   { label: "Unable to verify issue.", value: "Unable to verify issue." },
//   { label: "No issue found after verification.", value: "No issue found after verification." },
//   {label:"Others", value: "OTHERS"}
// ]

export const RemarksData = [
  {
    label: "No issue found.",
    value: "No issue found.",
    description: "No issue found after verification.",
  },
  {
    label: "Invalid complaint.",
    value: "Invalid complaint.",
    description: "The complaint is invalid as per records.",
  },
  {
    label: "Insufficient details.",
    value: "Insufficient details.",
    description: "The complaint has insufficient details to proceed.",
  },
  {
    label: "Duplicate request.",
    value: "Duplicate request.",
    description: "This complaint has already been raised earlier.",
  },
  {
    label: "Not eligible as per policy.",
    value: "Not eligible as per policy.",
    description: "The request is not eligible as per company policy.",
  },
  {
    label: "Unable to verify issue.",
    value: "Unable to verify issue.",
    description: "We are unable to verify the issue with available data.",
  },
  {
    label: "Others",
    value: "OTHERS",
    description: "",
  },
];

export const ComplaintResolutionData = [
  {
    label: "Payment related issue",
    value: "Payment related issue",
    description: "Your payment related issue will be resolved within 2 days.",
  },
  {
    label: "Loan account issue",
    value: "Loan account issue",
    description: "Your loan account issue will be resolved within 3 days.",
  },
  {
    label: "Technical issue",
    value: "Technical issue",
    description: "Technical issues are usually resolved within 24 hours.",
  },
  {
    label: "Service delay complaint",
    value: "Service delay complaint",
    description: "We will resolve the service delay complaint within 4 days.",
  },
  {
    label: "Charges related complaint",
    value: "Charges related complaint",
    description: "Charges related complaints may take up to 5 days to resolve.",
  },
  {
    label: "Others",
    value: "OTHERS",
    description: "",
  },
];

// export const tableData = [
//   {
//     id: "1",
//     name: "Rohit Koli",
//     amount: 10000,
//     mobile: "9582207407",
//     loanId: "111111",
//     product: "PU",
//     email: "rohit.koli@junooncapital.in",
//     reason: "Incorrect Charges",
//     description:
//       "Customer reports extra charges applied on EMI which were not communicated earlier.",
//     status: "Open",
//     createdAt: "2026-04-20",
//   },
//   {
//     id: "2",
//     name: "Rohit Koli",
//     amount: 10000,
//     mobile: "9582207407",
//     loanId: "222222",
//     product: "EW",
//     email: "rohit.koli@junooncapital.in",
//     reason: "Payment Not Updated",
//     description: "EMI paid on 5th April is still not reflecting in the system.",
//     status: "In Progress",
//     createdAt: "2026-04-18",
//   },
//   {
//     id: "3",
//     name: "Anil Kumar",
//     amount: 10000,
//     mobile: "9170734822",
//     loanId: "555555",
//     product: "PU",
//     email: "anil.kumar@junooncapital.in",
//     reason: "Loan Account Details Issue",
//     description: "Loan tenure showing incorrect duration in dashboard.",
//     status: "Resolved",
//     createdAt: "2026-04-15",
//   },
//   {
//     id: "4",
//     name: "Anil Kumar",
//     amount: 10000,
//     mobile: "9170734822",
//     loanId: "888888",
//     product: "PU",
//     email: "anil.kumar@junooncapital.in",
//     reason: "Poor Customer Service",
//     description: "Support team did not respond properly to previous complaint.",
//     status: "Open",
//     createdAt: "2026-04-19",
//   },
//   {
//     id: "5",
//     name: "Ravi Sharma",
//     amount: 10000,
//     mobile: "9012345678",
//     loanId: "999999",
//     product: "PL",
//     email: "ravi.sharma@email.com",
//     reason: "Others",
//     description:
//       "Customer wants foreclosure details but not getting proper guidance.",
//     status: "In Progress",
//     createdAt: "2026-04-21",
//   },
// ];

export const tableData = [
  {
    id: "1",
    complaintRefNo: "GRV-2026-0001",
    name: "Rohit Koli",
    amount: 10000,
    mobile: "9582207407",
    loanId: "111111",
    product: "Personal Loan",
    email: "rohit.koli@junooncapital.in",

    // 🆕 New Fields
    source: "App",
    reason: "Incorrect Charges",
    description:
      "Customer reports extra charges applied on EMI which were not communicated earlier.",

    department: "Finance",
    owner: "Agent_01",

    status: "Open", // Open | In Progress | Resolved | Closed
    escalationLevel: 0,
    isRepeat: false,

    createdAt: "2026-04-20",
    acknowledgementDate: "2026-04-20",

    expectedResolutionDate: "2026-04-27", // SLA
    closureDate: null,
    closureReason: null,

    remarks: "",
    customerConfirmation: false,
    compensation: null,

    documents: [
      {
        name: "Payment Screenshot.png",
        url: "https://www.mamp.one/wp-content/uploads/2024/09/image-resources2.jpg",
        type: "image",
        uploadedAt: "2026-04-20",
      },
      {
        name: "Bank Statement.pdf",
        url: "#",
        type: "pdf",
        uploadedAt: "2026-04-21",
      },
    ],
  },

  {
    id: "2",
    complaintRefNo: "GRV-2026-0002",
    name: "Rohit Koli",
    amount: 10000,
    mobile: "9582207407",
    loanId: "222222",
    product: "Electronics Warranty",
    email: "rohit.koli@junooncapital.in",

    source: "Web",
    reason: "Payment Not Updated",
    description: "EMI paid on 5th April is still not reflecting in the system.",

    department: "Operations",
    owner: "Agent_02",

    status: "In Progress",
    escalationLevel: 1,
    isRepeat: false,

    createdAt: "2026-04-18",
    acknowledgementDate: "2026-04-18",

    expectedResolutionDate: "2026-04-25",
    closureDate: null,
    closureReason: null,

    remarks: "Payment reconciliation in progress",
    customerConfirmation: false,
    compensation: null,
  },

  {
    id: "3",
    complaintRefNo: "GRV-2026-0003",
    name: "Anil Kumar",
    amount: 10000,
    mobile: "9170734822",
    loanId: "555555",
    product: "Personal Loan",
    email: "anil.kumar@junooncapital.in",

    source: "Call",
    reason: "Loan Account Details Issue",
    description: "Loan tenure showing incorrect duration in dashboard.",

    department: "Tech",
    owner: "Agent_03",

    status: "Resolved",
    escalationLevel: 0,
    isRepeat: false,

    createdAt: "2026-04-15",
    acknowledgementDate: "2026-04-15",

    expectedResolutionDate: "2026-04-22",
    closureDate: "2026-04-21",
    closureReason: "Corrected tenure in system",

    remarks: "Issue fixed from backend",
    customerConfirmation: true,
    compensation: 0,

    documents: [
      {
        name: "Payment Screenshot.png",
        url: "https://www.mamp.one/wp-content/uploads/2024/09/image-resources2.jpg",
        type: "image",
        uploadedAt: "2026-04-20",
      },
      {
        name: "Bank Statement.pdf",
        url: "#",
        type: "pdf",
        uploadedAt: "2026-04-21",
      },
    ],
  },

  {
    id: "4",
    complaintRefNo: "GRV-2026-0004",
    name: "Anil Kumar",
    amount: 10000,
    mobile: "9170734822",
    loanId: "888888",
    product: "Personal Loan",
    email: "anil.kumar@junooncapital.in",

    source: "Email",
    reason: "Poor Customer Service",
    description: "Support team did not respond properly to previous complaint.",

    department: "Support",
    owner: "Agent_04",

    status: "Open",
    escalationLevel: 2,
    isRepeat: true,

    createdAt: "2026-04-19",
    acknowledgementDate: "2026-04-19",

    expectedResolutionDate: "2026-04-26",
    closureDate: null,
    closureReason: null,

    remarks: "",
    customerConfirmation: false,
    compensation: null,
  },

  {
    id: "5",
    complaintRefNo: "GRV-2026-0005",
    name: "Ravi Sharma",
    amount: 10000,
    mobile: "9012345678",
    loanId: "999999",
    product: "Personal Loan",
    email: "ravi.sharma@email.com",

    source: "App",
    reason: "Others",
    description:
      "Customer wants foreclosure details but not getting proper guidance.",

    department: "Operations",
    owner: "Agent_05",

    status: "In Progress",
    escalationLevel: 0,
    isRepeat: false,

    createdAt: "2026-04-21",
    acknowledgementDate: "2026-04-21",

    expectedResolutionDate: "2026-04-28",
    closureDate: null,
    closureReason: null,

    remarks: "Explaining foreclosure process",
    customerConfirmation: false,
    compensation: null,
    documents: [
      {
        name: "Payment Screenshot.png",
        url: "https://www.mamp.one/wp-content/uploads/2024/09/image-resources2.jpg",
        type: "image",
        uploadedAt: "2026-04-20",
      },
      {
        name: "Bank Statement.pdf",
        url: "#",
        type: "pdf",
        uploadedAt: "2026-04-21",
      },
    ],
  },
];

export const Users = [
  {
    empId: "EMP001",
    name: "Anil",
    role: "emp",
    level: 1,
    product: "PU",
    email: "anil.kumar@junooncapital.in",
    mobile: "9582207407",
    createdAt: "12-04-2026",
  },
];
