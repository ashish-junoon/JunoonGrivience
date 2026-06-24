import axios from "axios";

const token = JSON.parse(localStorage.getItem("adminUser"))?.token;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized - Logging out...");
      localStorage.removeItem("adminUser");

      // ✅ Redirect to login
      window.location.href = "/admin/login";
    }

    return Promise.reject(error);
  },
);

// To Fetch IP Address
export const GetIPAdress = async () => {
  try {
    const response = await api.get(import.meta.env.VITE_GET_IP_URL);
    return response.data; // Return the API response data
  } catch (error) {
    console.error("Get IP error:", error.response?.data || error.message);
    throw error; // Rethrow error to handle it in the calling function
  }
};

// To getDashboardData
export const getDashboardData = async (req) => {
  try {
    const response = await api.post("/dashboard/getDashboardData", req);
    return response.data; // Return the API response data
  } catch (error) {
    console.error(
      "Create Complaint error:",
      error.response?.data || error.message,
    );
    throw error; // Rethrow error to handle it in the calling function
  }
};

// To Register Complaints
export const createComplaint = async (req) => {
  try {
    const response = await api.post("/complaint/createComplaint", req, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data; // Return the API response data
  } catch (error) {
    console.error(
      "Create Complaint error:",
      error.response?.data || error.message,
    );
    throw error; // Rethrow error to handle it in the calling function
  }
};

export const uploadComplaintFiles = async ({ req, complaintRefNo }) => {
  try {
    const response = await api.post(
      `/complaint/uploadComplaintFiles/${complaintRefNo}`,
      req,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    return response.data; // Return the API response data
  } catch (error) {
    console.error(
      "Create Complaint error:",
      error.response?.data || error.message,
    );
    throw error; // Rethrow error to handle it in the calling function
  }
};

// To Upload Complaints
export const uploadExcel = async (req) => {
  try {
    const response = await api.post("/complaint/uploadExcel", req, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data; // Return the API response data
  } catch (error) {
    console.error(
      "Create Complaint error:",
      error.response?.data || error.message,
    );
    throw error; // Rethrow error to handle it in the calling function
  }
};

// To Send Email OTP
export const sendEmailOtp = async (req) => {
  try {
    const response = await api.post("/otp/sendEmailOtp", req);
    return response.data; // Return the API response data
  } catch (error) {
    console.error(
      "Send Email OTP error:",
      error.response?.data || error.message,
    );
    throw error; // Rethrow error to handle it in the calling function
  }
};

// To Verify Email OTP
export const verifyEmailOtp = async (req) => {
  try {
    const response = await api.post("/otp/verifyEmailOtp", req);
    return response.data; // Return the API response data
  } catch (error) {
    console.error(
      "Verify Email OTP error:",
      error.response?.data || error.message,
    );
    throw error; // Rethrow error to handle it in the calling function
  }
};

// To Send Mobile OTP
export const sendMobileOtp = async (req) => {
  try {
    const response = await api.post("/otp/sendMobileOtp", req);
    return response.data; // Return the API response data
  } catch (error) {
    console.error(
      "Send Mobile OTP error:",
      error.response?.data || error.message,
    );
    throw error; // Rethrow error to handle it in the calling function
  }
};

// To Verify Mobile OTP
export const verifyMobileOtp = async (req) => {
  try {
    const response = await api.post("/otp/verifyMobileOtp", req);
    return response.data; // Return the API response data
  } catch (error) {
    console.error(
      "Verify Mobile OTP error:",
      error.response?.data || error.message,
    );
    throw error; // Rethrow error to handle it in the calling function
  }
};

// To get Complaints
export const getComplaints = async (req) => {
  try {
    const response = await api.post("/complaint/getComplaints", req);
    return response.data; // Return the API response data
  } catch (error) {
    console.error(
      "Get Complaints error:",
      error.response?.data || error.message,
    );
    throw error; // Rethrow error to handle it in the calling function
  }
};

// To get IndivisualComplaint
export const getIndivisualComplaint = async (req) => {
  try {
    const response = await api.post("/complaint/getIndivisualComplaint", req);
    return response.data; // Return the API response data
  } catch (error) {
    console.error(
      "Get Indivisual Complaint error:",
      error.response?.data || error.message,
    );
    throw error; // Rethrow error to handle it in the calling function
  }
};

// To get Open Complaints
export const getOpenComplaints = async (req) => {
  try {
    const response = await api.post("/complaint/getOpenComplaints", req);
    return response.data; // Return the API response data
  } catch (error) {
    console.error(
      "Get Complaint History error:",
      error.response?.data || error.message,
    );
    throw error; // Rethrow error to handle it in the calling function
  }
};

// To get History Complaints
export const getHistoryComplaints = async (req) => {
  try {
    const response = await api.post("/complaint/getHistoryComplaints", req);
    return response.data; // Return the API response data
  } catch (error) {
    console.error(
      "Get Complaint History error:",
      error.response?.data || error.message,
    );
    throw error; // Rethrow error to handle it in the calling function
  }
};

// To get getComplaintStatus
export const getComplaintStatus = async (req) => {
  try {
    const response = await api.post("/complaint/getComplaintStatus", req);
    return response.data; // Return the API response data
  } catch (error) {
    console.error(
      "Get Complaint History error:",
      error.response?.data || error.message,
    );
    throw error; // Rethrow error to handle it in the calling function
  }
};

// To reject Complaints
export const rejectComplaint = async (req) => {
  try {
    const response = await api.post("/complaint/rejectComplaint", req);
    return response.data; // Return the API response data
  } catch (error) {
    console.error(
      "Get Complaint History error:",
      error.response?.data || error.message,
    );
    throw error; // Rethrow error to handle it in the calling function
  }
};

// To reOpen Complaints
export const reOpenComplaint = async (req) => {
  try {
    const response = await api.post("/complaint/reOpenComplaint", req);
    return response.data; // Return the API response data
  } catch (error) {
    console.error(
      "Get Complaint History error:",
      error.response?.data || error.message,
    );
    throw error; // Rethrow error to handle it in the calling function
  }
};

// To resolve Complaints
export const resolveComplaint = async (req) => {
  try {
    const response = await api.post("/complaint/resolveComplaint", req, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data; // Return the API response data
  } catch (error) {
    console.error(
      "Get Complaint History error:",
      error.response?.data || error.message,
    );
    throw error; // Rethrow error to handle it in the calling function
  }
};

// To Escalate Complaints
export const escalateComplaint = async (req) => {
  try {
    const response = await api.post("/complaint/escalateComplaint", req);
    return response.data; // Return the API response data
  } catch (error) {
    console.error(
      "Get Complaint History error:",
      error.response?.data || error.message,
    );
    throw error; // Rethrow error to handle it in the calling function
  }
};

// To Escalate Complaints
export const getActionHistory = async (req) => {
  try {
    const response = await api.post("/complaint/getActionHistory", req);
    return response.data; // Return the API response data
  } catch (error) {
    console.error(
      "Get Complaint History error:",
      error.response?.data || error.message,
    );
    throw error; // Rethrow error to handle it in the calling function
  }
};

// getUserDetailsWithLoanId
export const getUserDetailsWithLoanId = async (req) => {
  try {
    const response = await api.post("/complaint/getUserDetailsWithLoanId", req);
    return response.data; // Return the API response data
  } catch (error) {
    console.error(
      "Get Complaint History error:",
      error.response?.data || error.message,
    );
    throw error; // Rethrow error to handle it in the calling function
  }
};

// To Registere User
export const createUsers = async (req) => {
  try {
    const response = await api.post("/user/createUsers", req);
    return response.data; // Return the API response data
  } catch (error) {
    console.error("Create User error:", error.response?.data || error.message);
    throw error; // Rethrow error to handle it in the calling function
  }
};

// To get Users
export const getUsers = async (req) => {
  try {
    const response = await api.get("/user/getUsers", req);
    return response.data; // Return the API response data
  } catch (error) {
    console.error("Create User error:", error.response?.data || error.message);
    throw error; // Rethrow error to handle it in the calling function
  }
};

// To get UsersByProduct
export const getUsersByProduct = async (req) => {
  try {
    const response = await api.post("/user/getUsersByProduct", req);
    return response.data; // Return the API response data
  } catch (error) {
    console.error("Create User error:", error.response?.data || error.message);
    throw error; // Rethrow error to handle it in the calling function
  }
};

// For userLogin
export const userLogin = async (req) => {
  try {
    const response = await api.post("/user/userLogin", req);
    return response.data; // Return the API response data
  } catch (error) {
    console.error("Create User error:", error.response?.data || error.message);
    throw error; // Rethrow error to handle it in the calling function
  }
};

// Add Remarks
export const createRemark = async (req) => {
  try {
    const response = await api.post("/master/createRemark", req);
    return response.data; // Return the API response data
  } catch (error) {
    console.error("Create User error:", error.response?.data || error.message);
    throw error; // Rethrow error to handle it in the calling function
  }
};

// Get Remarks
export const getRemarksByType = async (req) => {
  try {
    const response = await api.post("/master/getRemarksByType", req);
    return response.data; // Return the API response data
  } catch (error) {
    console.error("Create User error:", error.response?.data || error.message);
    throw error; // Rethrow error to handle it in the calling function
  }
};

// to removeRemark
export const removeRemark = async (req) => {
  try {
    const response = await api.delete(`/master/removeRemark/${req}`);
    return response.data; // Return the API response data
  } catch (error) {
    console.error("Create User error:", error.response?.data || error.message);
    throw error; // Rethrow error to handle it in the calling function
  }
};

// ?================================================>
// !===================================================>
// * MAIL BOX API'S =======================================>
// !===================================================>
// ?================================================>


// ? To Get inBox Mails
// * =========================

export const getInboxMail = async (req) => {
  try {
    const response = await api.get("/mail/getInbox");
    return response.data; // Return the API response data
  } catch (error) {
    console.error("Create User error:", error.response?.data || error.message);
    throw error; // Rethrow error to handle it in the calling function
  }
};


// ? To Get Threads Of Mail Mails
// * =========================

export const getThreadMail = async (threadId) => {
  try {
    const response = await api.get(`/mail/getThread/${threadId}`);
    return response.data; // Return the API response data
  } catch (error) {
    console.error("Create User error:", error.response?.data || error.message);
    throw error; // Rethrow error to handle it in the calling function
  }
};
