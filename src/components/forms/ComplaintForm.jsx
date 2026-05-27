import React, { useEffect, useState } from "react";
import TextInput from "../fields/TextInput";
import SelectInput from "../fields/SelectInput.jsx";
import Button from "../../utils/Button.jsx";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { UserData, products } from "../../assets/data.js";
import Background from "../../utils/Background.jsx";
import Icon from "../../utils/Icons.jsx";
import { addDays, formatDate } from "../../Functions/CommonFunction.jsx";
import {
  createComplaint,
  getComplaintStatus,
  getRemarksByType,
  getUserDetailsWithLoanId,
  sendEmailOtp,
  sendMobileOtp,
  verifyEmailOtp,
  verifyMobileOtp,
} from "../../api/ApiFunction.jsx";

const ComplaintForm = ({ user }) => {
  // const [loanData, setLoanData] = useState([]);
  const [hasLoan, setHasLoan] = useState("YES");
  const [hasApplied, setHasApplied] = useState("NO");
  const [statusData, setstatusData] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [isInvalidLoan, setisInvalidLoan] = useState(false);
  const [isReadOnly, setisReadOnly] = useState(true);
  const [RemarksData, setRemarksData] = useState([]);

  //OTP Verifying States
  const [mobileOtp, setMobileOtp] = useState("");
  const [emailOtp, setEmailOtp] = useState("");

  const [sentMobileOtp, setSentMobileOtp] = useState(false);
  const [sentEmailOtp, setSentEmailOtp] = useState(false);

  const [isMobileVerified, setIsMobileVerified] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const [otpMobileTimer, setOtpMobileTimer] = useState(0);
  const [otpEmailTimer, setOtpEmailTimer] = useState(0);

  //Sent OTP Mobile
  const handleSendMobileOtp = async () => {
    try {
      setisLoading(true);
      const req = {
        mobile: formikUser.values.mobile,
      };

      const response = await sendMobileOtp(req);
      if (response.status) {
        toast.success(
          response.message + " " + response.otp || "Otp sent successfully",
        );
        setSentMobileOtp(true);
        setOtpMobileTimer(30);
      } else {
        toast.info(response.message || "Error in Sending Otp");
      }
    } catch (error) {
      console.error("Error in Sending Otp : ", error);
    } finally {
      setisLoading(false);
    }
  };

  // Verify OTP
  const verifyMobile = async () => {
    try {
      const req = {
        mobile: formikUser.values.mobile,
        otp: mobileOtp,
      };

      const response = await verifyMobileOtp(req);
      if (response.status) {
        toast.success(response.message || "Otp verified successfully");
        setIsMobileVerified(true);
      } else {
        toast.info(response.message || "Error in Sending Otp");
        d;
      }
    } catch (error) {
      console.error("Error in Sending Otp : ", error);
    }
  };

  //Sent OTP Email
  const handleSendEmailOtp = async () => {
    try {
      setisLoading(true);
      const req = {
        email: formikUser.values.email,
      };

      const response = await sendEmailOtp(req);
      if (response.status) {
        toast.success(response.message || "Otp sent successfully");
        setSentEmailOtp(true);
        setOtpEmailTimer(30);
      } else {
        toast.info(response.message || "Error in Sending Otp");
      }
    } catch (error) {
      console.error("Error in Sending Otp : ", error);
    } finally {
      setisLoading(false);
    }
  };

  const verifyEmail = async () => {
    try {
      const req = {
        email: formikUser.values.email,
        otp: emailOtp,
      };

      const response = await verifyEmailOtp(req);
      if (response.status) {
        toast.success(response.message || "Otp verified successfully");
        setIsEmailVerified(true);
      } else {
        toast.info(response.message || "Error in Sending Otp");
      }
    } catch (error) {
      console.error("Error in Sending Otp : ", error);
    }
  };

  useEffect(() => {
    let interval;

    if (otpMobileTimer > 0) {
      interval = setInterval(() => {
        setOtpMobileTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [otpMobileTimer]);

  useEffect(() => {
    let interval;

    if (otpEmailTimer > 0) {
      interval = setInterval(() => {
        setOtpEmailTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [otpEmailTimer]);

  const today = new Date();

  const complaintSchema = Yup.object().shape({
    loanId: Yup.string().when("hasLoan", {
      is: "YES",
      then: (schema) => schema.required("Loan ID is required"),
      otherwise: (schema) => schema.notRequired(),
    }),

    customerName: Yup.string()
      .required()
      .min(3)
      .max(30)
      .matches(/^[A-Za-z ]+$/, "Only alphabets allowed"),
    productName: Yup.string().required(),

    mobile: Yup.string()
      .matches(/^[6-9]\d{9}$/, "Enter valid mobile number")
      .required("Mobile is required"),

    email: Yup.string().email("Invalid email").required("Email is required"),

    complaintCategory: Yup.string().required("Please select a reason"),
    geolocation: Yup.string().required("Geolocation is Required!"),

    description: Yup.string().when("complaintCategory", {
      is: "OTHERS",
      then: (schema) =>
        schema
          .min(5, "Please enter at least 5 characters")
          .required("Description is required"),
      otherwise: (schema) => schema.notRequired(),

      file: Yup.mixed()
        .nullable()
        .test("fileSize", "File too large (Max 5MB)", (value) => {
          if (!value) return true; // optional
          return value.size <= 5 * 1024 * 1024;
        })
        .test("fileType", "Unsupported file format", (value) => {
          if (!value) return true;
          return ["image/jpeg", "image/png", "application/pdf"].includes(
            value.type,
          );
        }),
    }),
  });

  const formikUser = useFormik({
    initialValues: {
      hasLoan: "YES",
      a: "",
      loanId: "",
      mobile: "",
      email: "",
      complaintCategory: "",
      description: "",
      response_time_in_days: "",
      customerName: "",
      file: {},
      geolocation: "",
      createdBy: "USER",
    },

    validationSchema: complaintSchema,

    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      const formData = new FormData();
      formData.append("customerName", values.customerName);
      formData.append("loanId", values.loanId?.trim());
      formData.append("mobile", values.mobile);
      formData.append("email", values.email);
      formData.append("channel", "web");
      formData.append("productName", values.productName);
      formData.append("complaintCategory", values.complaintCategory);
      formData.append("complaintDescription", values.description);
      formData.append("location", values.geolocation);
      formData.append("createdBy", values.createdBy);
      // formData.append("file", values.file);

      if (values.file && values.file.name) {
        formData.append("file", values.file);
      }

      try {
        const response = await createComplaint(formData);
        if (response.status) {
          toast.success(response.message || "Complaint registered succesfully");
          resetForm();
          setIsMobileVerified(false);
          setIsEmailVerified(false);
          setSentEmailOtp(false);
          setSentMobileOtp(false);
          setEmailOtp("");
          setMobileOtp("");
          handleLoanToggle("YES");
          handleisAppliedToggle("YES");
          setstatusData(response.data);
        } else {
          toast.info(response.message || "Complaint not registered");
        }
      } catch (error) {
        console.log("Error in complaint register");
        toast.error(error.response?.data?.message || "Something went wrong!");
      }
    },
  });

  // console.log(formikUser.values)

  const formikRefference = useFormik({
    initialValues: {
      complaintRefNo: "",
    },

    onSubmit: async (values) => {
      try {
        const response = await getComplaintStatus(values);
        if (response.status) {
          setstatusData(response.data);
        } else {
          toast.info(response.message || "Ref number not found!");
        }
      } catch (error) {}
    },
  });

  
  // ✅ SEARCH BY LOAN ID
  const handleSearch = async () => {

    const req = {
      loanId: formikUser.values.loanId
    }
    setisLoading(true)
    try {
      const response = await getUserDetailsWithLoanId(req)
      if(response.status){
           formikUser.setValues({
        ...formikUser.values,
        productName: response?.data?.productName,
        email: response?.data?.email,
        mobile: response?.data?.mobile,
        customerName: response?.data?.customerName,
      });

      toast.success("Loan verified");
      setisInvalidLoan(false);
      }else{
        toast.info("LoanId not found!");
        setisInvalidLoan(true);
        formikUser.resetForm();
      }
    } catch (error) {
      console.log("Error in fetchRemarksData: ", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }finally{
      setisLoading(false)
    }
  };

  //Toggle Button
  const handleLoanToggle = (value) => {
    setHasLoan(value);
    formikUser.resetForm();
    formikUser.setFieldValue("hasLoan", value);
  };

  const handleisAppliedToggle = (value) => {
    setHasApplied(value);
    // formikUser.setFieldValue("hasLoan", value);
  };

  // ✅ AUTO DESCRIPTION
  useEffect(() => {
    if (formikUser.values.complaintCategory === "OTHERS") {
      formikUser.setFieldValue("description", "");
      return;
    }

    const selectedReason = RemarksData?.find(
      (item) => item?.value === formikUser?.values?.complaintCategory,
    );

    formikUser.setFieldValue("description", selectedReason?.description || "");

    // formikUser.setFieldValue(
    //   "response_time_in_days",
    //   selectedReason?.response_time_in_days || "",
    // );
  }, [formikUser.values.complaintCategory]);

  const ErrorMsg = ({ error, touched }) => {
    if (!touched || !error) return null;
    return <p className="text-red-500 text-xs">{error}</p>;
  };

  const GetLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject("Geolocation nor suppoeted!");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            long: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        },
      );
    });
  };

  const handleGetLocation = async () => {
    const permision = await navigator.permissions.query({
      name: "geolocation",
    });

    if (permision.state === "denied") {
      toast.info("Loaction is blocked. Please enable it in browsers settings.");
      return;
    }

    try {
      setisLoading(true);
      const location = await GetLocation();

      if (!location) {
        toast.info("Location is required");
        return;
      }

      const url = `https://nominatim.openstreetmap.org/reverse?lat=${location.lat}&lon=${location.long}&format=json`;
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        formikUser.setFieldValue("geolocation", data.display_name);
      } else {
        return toast.error("Geo Coding failed!");
      }
    } catch (error) {
      console.error("Error in Location: ", error);
    } finally {
      setisLoading(false);
    }
  };

  const fetchRemarksData = async (req) => {
    try {
      const response = await getRemarksByType(req);
      if (response.status) {
        setRemarksData(response.data);
      } else {
        setRemarksData([]);
      }
    } catch (error) {
      console.log("Error in fetchRemarksData: ", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };
  useEffect(() => {
    const req = {
      type: "COMPLAINT",
    };

    fetchRemarksData(req);
  }, []);

  // console.log(formikUser.errors);
  // console.log(formikUser.values);
  // console.log(handleGetLocation());

  return (
    <section className="min-h-screen">
      {/* <Background /> */}
      <div className="">
        {/* QUESTIONS */}
        <div className="bg-white shadow rounded-lg p-6 mb-2">
          {user && (
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-600">
                Have you already raised this grievance earlier?
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleisAppliedToggle("YES")}
                  className={`px-4 py-1 rounded ${hasApplied === "YES" ? "bg-gray-800 text-white" : "bg-gray-200"} cursor-pointer`}
                >
                  Yes
                </button>
                <button
                  onClick={() => handleisAppliedToggle("NO")}
                  className={`px-4 py-1 rounded ${hasApplied === "NO" ? "bg-gray-800 text-white" : "bg-gray-200"} cursor-pointer`}
                >
                  No
                </button>
              </div>
            </div>
          )}

          {hasApplied === "NO" && (
            <div className="flex justify-between items-center">
              <p className="text-gray-600">Do you have a Loan Account?</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleLoanToggle("YES")}
                  className={`px-4 py-1 rounded cursor-pointer ${
                    hasLoan === "YES" ? "bg-gray-800 text-white" : "bg-gray-200"
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => handleLoanToggle("NO")}
                  // onClick={() => { setHasLoan("NO"), formikUser.resetForm()}}
                  className={`px-4 py-1 rounded cursor-pointer ${
                    hasLoan === "NO" ? "bg-gray-800 text-white" : "bg-gray-200"
                  }`}
                >
                  No
                </button>
              </div>
            </div>
          )}
        </div>

        {/* FORM */}
        {hasApplied === "NO" ? (
          <form onSubmit={formikUser.handleSubmit}>
            {/* ✅ IF USER HAS LOAN */}
            {hasLoan === "YES" && (
              <div className="bg-white p-6 rounded-lg shadow mb-2">
                {/* <div className="flex gap-3 items-end mb-4">
                  <div className="w-full">
                    <TextInput
                      label="Loan Account No."
                      name="loanId"
                      value={formikUser.values.loanId}
                      onChange={formikUser.handleChange}
                      onBlur={formikUser.handleBlur}
                    />
                    <ErrorMsg
                      error={formikUser.errors.loanId}
                      touched={formikUser.touched.loanId}
                    />
                  </div>

                  {isReadOnly && <Button
                    type="button"
                    btnName="Verify"
                    onClick={handleSearch}
                    style="bg-primary hover:bg-primary/90 text-white px-4 py-2 cursor-pointer"
                  />}

                  {isInvalidLoan && (
                    <Button
                      type="button"
                      btnName={isReadOnly ? "LoanId Not Found?" : "Search with loanId"}
                      onClick={() => setisReadOnly(prev => !prev)}
                      style="bg-black hover:bg-black/80 text-white px-4 py-2 cursor-pointer text-nowrap"
                    />
                  )}
                </div> */}

                <div className="mb-2">
                  <div className="flex gap-3 items-start mb-4">
                    {/* Input + Error */}
                    <div className="w-full">
                      <TextInput
                        label="Loan Account No."
                        name="loanId"
                        value={formikUser.values.loanId}
                        // onChange={formikUser.handleChange}
                        onChange={(e) =>
                          formikUser.setFieldValue(
                            "loanId",
                            e.target.value?.toUpperCase(),
                          )
                        }
                        onBlur={formikUser.handleBlur}
                        // disabled={!isReadOnly}
                      />

                      {/* Error */}
                      {formikUser.touched.loanId &&
                        formikUser.errors.loanId && (
                          <p className="text-red-500 text-xs mt-1">
                            {formikUser.errors.loanId}
                          </p>
                        )}

                      {/* API Error */}
                      {/* {isInvalidLoan && (
                        <p className="text-red-500 text-xs mt-1">
                          Loan not found. Enter manually.
                        </p>
                      )} */}
                    </div>

                    {/* Button aligned independently */}
                    {isReadOnly && (
                      <div className="pt-6">
                        <Button
                          type="button"
                          btnName="Verify"
                          onClick={handleSearch}
                          style="bg-primary hover:bg-primary/90 text-white px-4 py-2 cursor-pointer"
                        />
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end mt-2">
                    {isInvalidLoan && isReadOnly && (
                      <Button
                        type="button"
                        btnName="Enter Details Manually"
                        onClick={() => setisReadOnly(false)}
                        style="bg-black hover:bg-black/80 text-white px-4 py-2 cursor-pointer"
                      />
                    )}

                    {!isReadOnly && (
                      <Button
                        type="button"
                        btnName="Search with Loan ID"
                        onClick={() => {
                          setisReadOnly(true);
                          setisInvalidLoan(false);
                          formikUser.resetForm();
                        }}
                        style="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 cursor-pointer"
                      />
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <TextInput
                      label="Customer Name"
                      name="customerName"
                      value={formikUser.values.customerName}
                      onChange={formikUser.handleChange}
                      onBlur={formikUser.handleBlur}
                      readOnly={isReadOnly}
                      style={isReadOnly && "!bg-gray-100"}
                    />

                    <ErrorMsg
                      error={formikUser.errors.customerName}
                      touched={formikUser.touched.customerName}
                    />
                  </div>

                  <div>
                    <SelectInput
                      placeholder="Select products"
                      label="Select products"
                      name="productName"
                      value={formikUser.values.productName}
                      onChange={formikUser.handleChange}
                      onBlur={formikUser.handleBlur}
                      options={products}
                      style={isReadOnly && "!bg-gray-100"}
                      disabled={isReadOnly}
                    />
                    <ErrorMsg
                      error={formikUser.errors.productName}
                      touched={formikUser.touched.productName}
                    />
                  </div>

                  {/* <div>
                    <TextInput
                      label="Mobile"
                      name="mobile"
                      value={formikUser.values.mobile}
                      onChange={formikUser.handleChange}
                      onBlur={formikUser.handleBlur}
                      readOnly={isReadOnly}
                      style={isReadOnly && "!bg-gray-100"}
                    />
                  </div> */}

                  <div className="flex gap-2 items-end">
                    <div className="w-full">
                      <TextInput
                        label="Mobile"
                        name="mobile"
                        maxLength={10}
                        value={formikUser.values.mobile}
                        onChange={formikUser.handleChange}
                        readOnly={isMobileVerified || isReadOnly}
                        style={isReadOnly && "!bg-gray-100"}
                      />
                    </div>

                    {/* OTP Button Logic */}
                    {!isMobileVerified &&
                      formikUser.values.mobile.length === 10 && (
                        <Button
                          type="button"
                          btnName={
                            sentMobileOtp
                              ? otpMobileTimer > 0
                                ? `Resend in ${otpMobileTimer}s`
                                : "Resend OTP"
                              : "Send OTP"
                          }
                          onClick={handleSendMobileOtp}
                          disabled={otpMobileTimer > 0 || isLoading}
                          style={`${
                            otpMobileTimer > 0 || isLoading
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-black hover:bg-black/80"
                          } text-white px-3 py-2 text-nowrap`}
                        />
                      )}
                  </div>

                  <div className="flex gap-2 items-end">
                    <div className="w-full">
                      <TextInput
                        label="Email"
                        name="email"
                        value={formikUser.values.email}
                        onChange={formikUser.handleChange}
                        readOnly={isEmailVerified || isReadOnly}
                        style={isReadOnly && "!bg-gray-100"}
                      />
                    </div>

                    {/* OTP Button Logic */}
                    {!isEmailVerified &&
                      formikUser.values.email &&
                      !formikUser.errors.email && (
                        <Button
                          type="button"
                          btnName={
                            sentEmailOtp
                              ? otpEmailTimer > 0
                                ? `Resend in ${otpEmailTimer}s`
                                : "Resend OTP"
                              : "Send OTP"
                          }
                          onClick={handleSendEmailOtp}
                          disabled={otpEmailTimer > 0 || isLoading}
                          style={`${
                            otpEmailTimer > 0 || isLoading
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-black hover:bg-black/80"
                          } text-white px-3 py-2 text-nowrap`}
                        />
                      )}
                  </div>

                  {/* Mobile OTP Verify  */}
                  {!isMobileVerified && sentMobileOtp && (
                    <div className="flex gap-2 mt-2 w-full items-end">
                      <div className="w-full">
                        <TextInput
                          placeholder="Enter OTP"
                          value={mobileOtp}
                          onChange={(e) => setMobileOtp(e.target.value)}
                        />
                      </div>

                      <div>
                        <Button
                          type="button"
                          btnName="Verify"
                          onClick={verifyMobile}
                          style="bg-green-500 text-white px-3 cursor-pointer"
                        />
                      </div>
                    </div>
                  )}

                  {/* Email OTP Verify  */}
                  {!isEmailVerified && sentEmailOtp && (
                    <div className="flex gap-2 mt-2 items-end">
                      <div className="w-full">
                        <TextInput
                          placeholder="Enter OTP"
                          value={emailOtp}
                          onChange={(e) => setEmailOtp(e.target.value)}
                        />
                      </div>

                      <div>
                        <Button
                          type="button"
                          btnName="Verify"
                          onClick={verifyEmail}
                          style="bg-green-500 text-white px-3 cursor-pointer"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ❌ NO LOAN → MANUAL FORM */}
            {hasLoan === "NO" && (
              <div className="bg-white p-6 rounded-lg shadow mb-2 grid grid-cols-2 gap-4">
                <div>
                  <TextInput
                    label="Customer Name"
                    name="customerName"
                    value={formikUser.values.customerName}
                    onChange={formikUser.handleChange}
                    onBlur={formikUser.handleBlur}
                  />
                  <ErrorMsg
                    error={formikUser.errors.customerName}
                    touched={formikUser.touched.customerName}
                  />
                </div>

                <div>
                  <SelectInput
                    placeholder="Select products"
                    label="Select products"
                    name="productName"
                    value={formikUser.values.productName}
                    onChange={formikUser.handleChange}
                    onBlur={formikUser.handleBlur}
                    options={products}
                  />
                  <ErrorMsg
                    error={formikUser.errors.productName}
                    touched={formikUser.touched.productName}
                  />
                </div>

                <div className="flex gap-2 items-end">
                  <div className="w-full">
                    <TextInput
                      label="Mobile"
                      name="mobile"
                      maxLength={10}
                      value={formikUser.values.mobile}
                      onChange={formikUser.handleChange}
                      // readOnly={isMobileVerified || isReadOnly}
                      // style={isReadOnly && "!bg-gray-100"}
                    />
                  </div>

                  {/* OTP Button Logic */}
                  {!isMobileVerified &&
                    formikUser.values.mobile.length === 10 && (
                      <Button
                        type="button"
                        btnName={
                          sentMobileOtp
                            ? otpMobileTimer > 0
                              ? `Resend in ${otpMobileTimer}s`
                              : "Resend OTP"
                            : "Send OTP"
                        }
                        onClick={handleSendMobileOtp}
                        disabled={otpMobileTimer > 0 || isLoading}
                        style={`${
                          otpMobileTimer > 0 || isLoading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-black hover:bg-black/80"
                        } text-white px-3 py-2 text-nowrap`}
                      />
                    )}
                </div>

                <div className="flex gap-2 items-end">
                  <div className="w-full">
                    <TextInput
                      label="Email"
                      name="email"
                      value={formikUser.values.email}
                      onChange={formikUser.handleChange}
                      // readOnly={isEmailVerified}
                      // style={isEmailVerified && "!bg-gray-100"}
                    />
                  </div>

                  {/* OTP Button Logic */}
                  {!isEmailVerified &&
                    formikUser.values.email &&
                    !formikUser.errors.email && (
                      <Button
                        type="button"
                        btnName={
                          sentEmailOtp
                            ? otpEmailTimer > 0 || isLoading
                              ? `Resend in ${otpEmailTimer}s`
                              : "Resend OTP"
                            : "Send OTP"
                        }
                        onClick={handleSendEmailOtp}
                        disabled={otpEmailTimer > 0 || isLoading}
                        style={`${
                          otpEmailTimer > 0 || isLoading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-black hover:bg-black/80"
                        } text-white px-3 py-2 text-nowrap`}
                      />
                    )}
                </div>

                {/* Mobile OTP Verify  */}
                {!isMobileVerified && sentMobileOtp && (
                  <div className="flex gap-2 mt-2 w-full items-end">
                    <div className="w-full">
                      <TextInput
                        placeholder="Enter OTP"
                        value={mobileOtp}
                        onChange={(e) => setMobileOtp(e.target.value)}
                      />
                    </div>

                    <div>
                      <Button
                        type="button"
                        btnName="Verify"
                        onClick={verifyMobile}
                        style="bg-green-500 text-white px-3"
                      />
                    </div>
                  </div>
                )}

                {/* Email OTP Verify  */}
                {!isEmailVerified && sentEmailOtp && (
                  <div className="flex gap-2 mt-2 items-end">
                    <div className="w-full">
                      <TextInput
                        placeholder="Enter OTP"
                        value={emailOtp}
                        onChange={(e) => setEmailOtp(e.target.value)}
                      />
                    </div>

                    <div>
                      <Button
                        type="button"
                        btnName="Verify"
                        onClick={verifyEmail}
                        style="bg-green-500 text-white px-3"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* COMMON SECTION */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex gap-3 items-end mb-4">
                <div className="w-full">
                  <TextInput
                    label="Current Live Location"
                    name="geolocation"
                    value={formikUser.values.geolocation}
                    onChange={formikUser.handleChange}
                    readOnly
                  />
                  <ErrorMsg
                    error={formikUser.errors.geolocation}
                    touched={formikUser.touched.geolocation}
                  />
                </div>

                <div>
                  <Button
                    type="button"
                    disabled={isLoading || formikUser.values.geolocation}
                    btnName={!isLoading ? "Get Location" : "Getting..."}
                    onClick={handleGetLocation}
                    style={`${formikUser.values.geolocation || isLoading ? "bg-gray-500" : "bg-primary hover:bg-primary/90"} text-white px-4 py-2 cursor-pointer text-nowrap`}
                  />
                </div>
              </div>

              <div>
                <SelectInput
                  placeholder="Select Query Type"
                  label="Select Query Type"
                  name="complaintCategory"
                  value={formikUser.values.complaintCategory}
                  onChange={formikUser.handleChange}
                  onBlur={formikUser.handleBlur}
                  options={RemarksData}
                />
                <ErrorMsg
                  error={formikUser.errors.complaintCategory}
                  touched={formikUser.touched.complaintCategory}
                />
              </div>

              <div>
                <textarea
                  className="w-full mt-4 border border-gray-300 p-3 rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-400"
                  placeholder="Write Your Grievance Here..."
                  value={formikUser.values.description}
                  readOnly={formikUser.values.complaintCategory !== "OTHERS"}
                  onChange={(e) =>
                    formikUser.setFieldValue("description", e.target.value)
                  }
                  onBlur={formikUser.handleBlur}
                />
                <ErrorMsg
                  error={formikUser.errors.description}
                  touched={formikUser.touched.description}
                />
              </div>

              {/* <div>
                <TextInput
                  label="response_time_in_days"
                  name="response_time_in_days"
                  value={formikUser.values.response_time_in_days}
                  onChange={(e) =>
                    formikUser.setFieldValue(
                      "response_time_in_days",
                      e.target.value,
                    )
                  }
                  onBlur={formikUser.handleBlur}
                />
                <ErrorMsg
                  error={formikUser.errors.response_time_in_days}
                  touched={formikUser.touched.response_time_in_days}
                />
              </div> */}

              {/* {formikUser.values.response_time_in_days &&
                formikUser.values.reason !== "OTHERS" && (
                  <div className="my-2">
                    <p className="bg-primary/10 p-2 border-l-4 border-primary">
                      <span>Your Query might be Resolved by: </span>
                      <span>
                        {addDays(formikUser.values.response_time_in_days || 15)}
                      </span>
                    </p>
                  </div>
                )} */}

              <div className="bg-primary/10 py-10 relative flex justify-center rounded-md">
                <input
                  name="file"
                  onChange={(e) =>
                    formikUser.setFieldValue("file", e.target.files[0])
                  }
                  type="file"
                  className="cursor-pointer absolute inset-0 opacity-0"
                />
                <div className="flex flex-col items-center">
                  <Icon name="FaFileUpload" color="#088395" size={25} />
                  <p className="text-gray-600 text-sm font-medium">
                    {formikUser?.values.file?.name
                      ? formikUser?.values?.file.name
                      : "Uplaod File"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 justify-end">
                <div className="flex justify-center mt-5">
                  <Button
                    type="button"
                    btnName="Reset"
                    onClick={() => formikUser.resetForm()}
                    style="bg-black hover:bg-black/80 text-white px-6 py-2 rounded-md cursor-pointer"
                  />
                </div>
                <div className="flex justify-center mt-5">
                  {/* <Button
                    type="submit"
                    btnName="Submit"
                    style="bg-primary hover:bg-primary/80 text-white px-6 py-2 rounded-md cursor-pointer"
                  /> */}
                  <Button
                    type="submit"
                    btnName="Submit"
                    disabled={!isMobileVerified || !isEmailVerified}
                    style={`${
                      !isMobileVerified || !isEmailVerified
                        ? "bg-gray-400"
                        : "bg-primary hover:bg-primary/80"
                    } text-white px-6 py-2 rounded-md cursor-pointer`}
                  />
                </div>
              </div>
            </div>
          </form>
        ) : (
          <div>
            {statusData ? (
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 printable-content">
                {/* 🔷 Header */}
                <div className="text-center border-b border-gray-300 pb-3 mb-4">
                  <h2 className="text-xl font-semibold text-gray-800 tracking-wide">
                    Complaint Acknowledgement
                  </h2>
                  <p className="text-xs text-gray-400 mt-1">
                    Thank you for reaching out. Your complaint has been
                    registered successfully.
                  </p>
                </div>

                {/* 📊 Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 text-sm">
                  <div>
                    <p className="text-gray-400 text-xs">Customer Name</p>
                    <p className="font-medium text-gray-800">
                      {statusData?.customerName || "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-xs">Complaint Ref No</p>
                    <p className="font-medium text-gray-800">
                      {statusData?.complaintRefNo || "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-xs">Complaint Date</p>
                    <p className="font-medium text-gray-800">
                      {formatDate(statusData?.createdAt)}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-xs">Issue Category</p>
                    <p className="font-medium text-gray-800">
                      {statusData?.complaintCategory || "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-xs">Current Status</p>
                    <span
                      className={`inline-block px-3 py-1 text-xs rounded-full mt-1
        ${
          statusData?.status === "Resolved"
            ? "bg-green-100 text-green-700"
            : statusData?.status === "Rejected"
              ? "bg-red-100 text-red-700"
              : "bg-blue-100 text-blue-700"
        }`}
                    >
                      {statusData?.status || "Pending"}
                    </span>
                  </div>

                  {statusData?.closerDate && (
                    <>
                      <div>
                        <p className="text-gray-400 text-xs">Closed Reason</p>
                        <p className="font-medium text-gray-800">
                          {statusData?.closureReason}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Closed Date</p>
                        <p className="font-medium text-gray-800">
                          {statusData?.closerDate}
                        </p>
                      </div>
                    </>
                  )}
                </div>

                <div className="space-y-2 grid grid-cols-2 gap-2 my-3">
                  {statusData?.files?.map((doc, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between border border-gray-100 rounded-lg px-3 py-1 hover:bg-gray-50 transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 flex items-center justify-center rounded bg-gray-100 text-gray-600 text-sm">
                        {doc.mimeType !== "application/pdf" ? "🖼️" : "📄"}
                      </div>
                      
                        {/* Info */}
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {doc.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            Uploaded on {formatDate(doc.uploadedAt)}
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
                      </div>
                    </div>
                  ))}
                </div>

                {/* 📝 Footer Note */}
                <div className="mt-5 border-t border-gray-300 pt-3 text-xs text-gray-500 text-center">
                  Please keep this reference number for future communication.
                </div>

                {/* ⚙️ Actions */}
                <div className="flex justify-center gap-3 mt-5 no-print">
                  <Button
                    onClick={() => {
                      setstatusData(null);
                      formikRefference.resetForm();
                    }}
                    btnName="Reset"
                    style="border border-gray-300 text-gray-700 hover:bg-gray-100 px-5 py-2 rounded-md cursor-pointer"
                  />

                  <Button
                    btnIcon="FaPrint"
                    onClick={() => window.print()}
                    btnName="Print"
                    style="bg-primary hover:bg-primary/80 text-white px-5 py-2 rounded-md cursor-pointer"
                  />
                </div>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow mb-2">
                <form onSubmit={formikRefference.handleSubmit}>
                  <div className="flex gap-2">
                    <div className="w-full">
                      <TextInput
                        label="Refference No."
                        name="complaintRefNo"
                        value={formikRefference.values.complaintRefNo}
                        onBlur={formikRefference.handleBlur}
                        onChange={formikRefference.handleChange}
                      />
                    </div>

                    <div className="flex justify-center mt-5">
                      <Button
                        type="submit"
                        btnName="Check status"
                        style="bg-primary text-white px-6 py-2 rounded-md text-nowrap cursor-pointer"
                      />
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ComplaintForm;
