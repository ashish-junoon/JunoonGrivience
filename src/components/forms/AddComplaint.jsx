import React, { useEffect, useState } from "react";
import TextInput from "../fields/TextInput";
import SelectInput from "../fields/SelectInput.jsx";
import Button from "../../utils/Button.jsx";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
  UserData,
  channels,
  complaintRemarks,
  products,
  tableData,
} from "../../assets/data.js";
import Background from "../../utils/Background.jsx";
import Icon from "../../utils/Icons.jsx";
import { addDays } from "../../Functions/CommonFunction.jsx";
import { createComplaint } from "../../api/ApiFunction.jsx";

const ComplaintForm = ({ user, fetchData, setIsOpen }) => {
  // const [loanData, setLoanData] = useState([]);
  const [hasLoan, setHasLoan] = useState("YES");
  const [hasApplied, setHasApplied] = useState("NO");
  const [statusData, setstatusData] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [isInvalidLoan, setisInvalidLoan] = useState(false);
  const [isReadOnly, setisReadOnly] = useState(true);

  const today = new Date();

  const complaintSchema = Yup.object().shape({
    loanId: Yup.string().when("hasLoan", {
      is: "YES",
      then: (schema) => schema.required("Loan ID is required"),
      otherwise: (schema) => schema.notRequired(),
    }),

    customerName: Yup.string().when("hasLoan", {
      is: "NO",
      then: (schema) =>
        schema
          .matches(/^[A-Za-z ]+$/, "Only alphabets allowed")
          .required("First name is required"),
    }),

    // lastName: Yup.string().when("hasLoan", {
    //   is: "NO",
    //   then: (schema) =>
    //     schema.matches(/^[A-Za-z ]+$/, "Only alphabets allowed"),
    // }),

    mobile: Yup.string()
      .matches(/^[6-9]\d{9}$/, "Enter valid mobile number")
      .required("Mobile is required"),

    email: Yup.string().email("Invalid email").required("Email is required"),

    complaintCategory: Yup.string().required("Please select a reason"),
    geolocation: Yup.string().required("Geolocation is Required!"),

    description: Yup.string().when("reason", {
      is: "OTHERS",
      then: (schema) =>
        schema
          .min(5, "Please enter at least 5 characters")
          .required("Description is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  });

  const formikUser = useFormik({
    initialValues: {
      productName: "",
      loanId: "",
      mobile: "",
      email: "",
      complaintCategory: "",
      description: "",
      response_time_in_days: "",
      customerName: "",
      file: {},
      geolocation: "",
      createdBy: "-----------",
      channel: "",
    },

    validationSchema: complaintSchema,

    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      const formData = new FormData();
      formData.append("customerName", values.customerName);
      formData.append("loanId", values.loanId);
      formData.append("mobile", values.mobile);
      formData.append("email", values.email);
      formData.append("channel", values.channel);
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
          fetchData();
          resetForm();
          setIsOpen(false);
        } else {
          toast.info(response.message || "Complaint not registered");
        }
      } catch (error) {
        console.log("Error in complaint register");
      }
    },
  });

  const formikRefference = useFormik({
    initialValues: {
      refference: "",
    },

    onSubmit: (values) => {
      // console.log(values.refference);
      const grivienceStatus = tableData.find(
        (item) => item.id == values.refference,
      );
      if (grivienceStatus) {
        setstatusData(grivienceStatus);
      } else {
        toast.error("Status Not Found!");
      }
    },
  });

  // ✅ SEARCH BY LOAN ID
  const handleSearch = () => {
    const loan = UserData.find(
      (item) => item.loanId === formikUser.values.loanId,
    );

    if (loan) {
      // const [customerName, ...rest] = loan.name.split(" ");
      // const lastName = rest.join(" ");

      formikUser.setValues({
        ...formikUser.values,
        productName: loan.productName,
        email: loan.email,
        mobile: loan.mobile,
        customerName: loan.customerName,
      });

      toast.success("Loan verified");
      setisInvalidLoan(false);
    } else {
      toast.error("Loan not found");
      setisInvalidLoan(true);
      formikUser.resetForm();
    }
  };

  //Toggle Button
  const handleLoanToggle = (value) => {
    setHasLoan(value);
    formikUser.setFieldValue("hasLoan", value);
    formikUser.resetForm();
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

    const selectedReason = complaintRemarks.find(
      (item) => item.value === formikUser.values.complaintCategory,
    );

    formikUser.setFieldValue(
      "description",
      formikUser.values.complaintCategory || "",
    );
    formikUser.setFieldValue(
      "response_time_in_days",
      selectedReason?.response_time_in_days || "",
    );
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

  // console.log(formikUser.values);
  // console.log(formikUser.errors);
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
                <div className="flex gap-3 items-end mb-4">
                  <div className="w-full">
                    <TextInput
                      label="Loan Account No."
                      name="loanId"
                      value={formikUser.values.loanId}
                      onChange={formikUser.handleChange}
                    />
                    <ErrorMsg
                      error={formikUser.errors.loanId}
                      touched={formikUser.touched.loanId}
                    />
                  </div>

                  <Button
                    type="button"
                    btnName="Verify"
                    onClick={handleSearch}
                    style="bg-primary hover:bg-primary/90 text-white px-4 py-2 cursor-pointer"
                  />

                  {isInvalidLoan && (
                    <Button
                      type="button"
                      btnName="Not Found"
                      onClick={() => setisReadOnly(false)}
                      style="bg-black hover:bg-black/80 text-white px-4 py-2 cursor-pointer text-nowrap"
                    />
                  )}
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
                  </div>

                  <div>
                    <TextInput
                      label="Mobile"
                      name="mobile"
                      maxLength={10}
                      value={formikUser.values.mobile}
                      onChange={formikUser.handleChange}
                      onBlur={formikUser.handleBlur}
                      readOnly={isReadOnly}
                      style={isReadOnly && "!bg-gray-100"}
                    />
                  </div>

                  <div>
                    <TextInput
                      label="Email"
                      name="email"
                      value={formikUser.values.email}
                      onChange={formikUser.handleChange}
                      onBlur={formikUser.handleBlur}
                      readOnly={isReadOnly}
                      style={isReadOnly && "!bg-gray-100"}
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
                      disabled={isReadOnly}
                      style={isReadOnly && "!bg-gray-100"}
                    />
                    <ErrorMsg
                      error={formikUser.errors.productName}
                      touched={formikUser.touched.productName}
                    />
                  </div>

                  <div>
                    <SelectInput
                      placeholder="Select channel"
                      label="Select channel"
                      name="channel"
                      value={formikUser.values.channel}
                      onChange={formikUser.handleChange}
                      onBlur={formikUser.handleBlur}
                      options={channels}
                    />
                    <ErrorMsg
                      error={formikUser.errors.channel}
                      touched={formikUser.touched.channel}
                    />
                  </div>
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
                  <TextInput
                    label="Mobile"
                    name="mobile"
                    value={formikUser.values.mobile}
                    onChange={formikUser.handleChange}
                    onBlur={formikUser.handleBlur}
                    maxLength={10}
                  />
                  <ErrorMsg
                    error={formikUser.errors.mobile}
                    touched={formikUser.touched.mobile}
                  />
                </div>

                <div>
                  <TextInput
                    label="Email"
                    name="email"
                    value={formikUser.values.email}
                    onChange={formikUser.handleChange}
                    onBlur={formikUser.handleBlur}
                  />
                  <ErrorMsg
                    error={formikUser.errors.email}
                    touched={formikUser.touched.email}
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

                <div>
                  <SelectInput
                    placeholder="Select channel"
                    label="Select channel"
                    name="channel"
                    value={formikUser.values.channel}
                    onChange={formikUser.handleChange}
                    onBlur={formikUser.handleBlur}
                    options={channels}
                  />
                  <ErrorMsg
                    error={formikUser.errors.channel}
                    touched={formikUser.touched.channel}
                  />
                </div>
              </div>
            )}

            {/* COMMON SECTION */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex gap-3 items-end mb-4">
                <div className="w-full">
                  <TextInput
                    label="User Location"
                    name="geolocation"
                    value={formikUser.values.geolocation}
                    onChange={formikUser.handleChange}
                    // readOnly
                  />
                  <ErrorMsg
                    error={formikUser.errors.geolocation}
                    touched={formikUser.touched.geolocation}
                  />
                </div>

                {/* <Button
                  type="button"
                  disabled={isLoading || formikUser.values.geolocation}
                  btnName={!isLoading ? "Get Location" : "Getting..."}
                  onClick={handleGetLocation}
                  style={`${formikUser.values.geolocation || isLoading ? "bg-gray-500" : "bg-primary hover:bg-primary/90"} text-white px-4 py-2 cursor-pointer text-nowrap`}
                /> */}
              </div>

              <div>
                <SelectInput
                  placeholder="Select Query Type"
                  label="Select Query Type"
                  name="complaintCategory"
                  value={formikUser.values.complaintCategory}
                  onChange={formikUser.handleChange}
                  onBlur={formikUser.handleBlur}
                  options={complaintRemarks}
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

              {formikUser.values.response_time_in_days &&
                formikUser.values.complaintCategory !== "OTHERS" && (
                  <div className="my-2">
                    <p className="bg-primary/10 p-2 border-l-4 border-primary">
                      <span>Your Query might be Resolved by: </span>
                      <span>
                        {addDays(formikUser.values.response_time_in_days || 15)}
                      </span>
                    </p>
                  </div>
                )}

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

              {/* {formikUser.values.file && 
              <div className="w-full h-[150px]">
                <img className="w-full h-full object-contain" src={URL.createObjectURL(formikUser?.values?.file)} alt="" />
              </div>
              } */}

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
                  <Button
                    type="submit"
                    btnName="Submit"
                    style="bg-primary hover:bg-primary/80 text-white px-6 py-2 rounded-md cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </form>
        ) : (
          <div>
            {statusData ? (
              <div className="bg-white p-6 rounded-lg shadow mb-2 printable-content">
                <p className="text-lg font-semibold text-center text-gray-800 underline">
                  Complaint Acknowledgement
                </p>
                <div className="grid grid-cols-2 gap-2 text-md my-5">
                  <p>Complaint reference number: {"xxxxxxxxxxxx"}</p>
                  <p>Date of receipt: {"xxxxxxxxxxxx"}</p>
                  <p>Broad issue recorded: {"xxxxxxxxxxxx"}</p>
                  <p>Expected timeline for response: {"xxxxxxxxxxxx"}</p>
                  <p>
                    Escalation route in case of dissatisfaction:{" "}
                    {"xxxxxxxxxxxx"}
                  </p>
                </div>

                <div className="flex justify-center gap-2 no-print">
                  <div className="">
                    <Button
                      onClick={() => {
                        (setstatusData(null), formikRefference.resetForm());
                      }}
                      btnName="Reset"
                      style="bg-primary hover:bg-primary/80 text-white m-auto cursor-pointer"
                    />
                  </div>

                  <div>
                    <Button
                      btnIcon="FaPrint"
                      onClick={() => window.print()}
                      btnName="Print"
                      style="bg-primary hover:bg-primary/80 text-white m-auto cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow mb-2">
                <form onSubmit={formikRefference.handleSubmit}>
                  <div className="flex gap-2">
                    <div className="w-full">
                      <TextInput
                        label="Refference No."
                        name="refference"
                        value={formikRefference.values.refference}
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
