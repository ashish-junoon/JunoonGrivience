import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

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

// To Registere User
export const createUsers = async (req) => {
  try {
    const response = await api.post("/usera/createUsers", req);
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
