import React, { useEffect, useState } from "react";
import SelectInput from "../fields/SelectInput";
import TextInput from "../fields/TextInput";
import Button from "../../utils/Button";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import {
  escalateComplaint,
  getRemarksByType,
  getUsersByProduct,
} from "../../api/ApiFunction";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import SpinnerLoader from "../../utils/SpinnerLoader/SpinnerLoader";

const Escalate = ({ setisAssignOpen, ticket, isAssignOpen, fetchData }) => {
  const [usersList, setUsersList] = useState([]);
  const [RemarksData, setRemarksData] = useState([]);
  const { adminUser } = useAuth();
  const navigate = useNavigate();

  console.log(ticket?.complaintRefNo);
  

  const formik = useFormik({
    initialValues: {
      remarks: "",
      description: "",
      escalatedTo: "",
      empId: "",
      id: "",
    },
    validationSchema: Yup.object({
      remarks: Yup.string().required().min(3).max(100),
      description: Yup.string().required(),
      escalatedTo: Yup.string().required(),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const req = {
          remarks: values.remarks,
          description: values.description,
          escalatedTo: values.escalatedTo,
          empId: adminUser?.empId,
          id: ticket?._id,
          complaintRefNo: ticket?.complaintRefNo,
        };
        console.log(req);

        const response = await escalateComplaint(req);
        if (response.status) {
          toast.success(response.message || "Complaint escalated successfully");
          setisAssignOpen(false);
          resetForm();
          fetchData();
          if (location.pathname === "/tickets/ticket-detail") {
            navigate(-1);
          }
        } else {
          toast.info(response.info || "Unable to Escalate Complaint!");
        }
      } catch (error) {
        console.log("Error in Escalate Complaint: ", error);
        toast.error(error.response?.data?.message || "Something went wrong!");
      }
    },
  });

  const ErrorMsg = ({ error, touched }) => {
    if (!touched || !error) return null;
    return <p className="text-red-500 text-xs">{error}</p>;
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

  const fetchUsersByProduct = async (req) => {
    try {
      const response = await getUsersByProduct(req);
      if (response.status) {
        const empdata = response?.data?.map((emp) => {
          return { label: emp.name, value: emp.empId };
        });
        setUsersList(empdata);
      } else {
        toast.info(response.message || "could not find Employees list!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    if (!isAssignOpen) return;

    fetchUsersByProduct({
      productCode: ticket?.productName,
      level: ticket?.escalationLevel,
    });

    const req = {
      type: "ESCALATION",
    };

    fetchRemarksData(req);
  }, [ticket, isAssignOpen]);

  useEffect(() => {
    const selected = RemarksData.find(
      (item) => item.value === formik.values.remarks,
    );

    if (!selected) return;

    if (selected.value === "OTHERS") {
      formik.setFieldValue("description", "");
    } else {
      formik.setFieldValue("description", selected.description);
    }
  }, [formik.values.remarks]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="p-2">
        <div className="grid grid-cols-2 gap-2 pb-5">
          <div>
            <SelectInput
              label="Assign To"
              placeholder="Select"
              name="escalatedTo"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.escalatedTo}
              options={usersList}
            />
            <ErrorMsg
              error={formik.errors.escalatedTo}
              touched={formik.touched.escalatedTo}
            />
          </div>

          <div>
            <SelectInput
              label="Remarks"
              placeholder="Remarks"
              name="remarks"
              options={RemarksData}
              value={formik.values.remarks}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <ErrorMsg
              error={formik.errors.remarks}
              touched={formik.touched.remarks}
            />
          </div>

          <div className="w-full col-span-2">
            <textarea
              className="w-full mt-4 border border-gray-300 p-3 rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-400"
              label="Description"
              placeholder="Description"
              name="description"
              value={formik.values.description}
              onBlur={formik.handleBlur}
              // readOnly={formik.values.remarks !== "OTHERS"}
              onChange={(e) =>
                formik.setFieldValue("description", e.target.value)
              }
            />
            <ErrorMsg
              error={formik.errors.description}
              touched={formik.touched.description}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 justify-end">
        <Button
          onClick={() => {
            (setisAssignOpen(false), formik.resetForm());
          }}
          btnName="Cancel"
          style="cursor-pointer border border-gray-300"
        />
        <Button
          type="submit"
          btnName={formik.isSubmitting ? <SpinnerLoader /> : "Assign"}
          disabled={formik.isSubmitting}
          style={`${!formik.isSubmitting ? "cursor-pointer bg-primary" : "cursor-not-allowed bg-gray-500"} hover:bg-primary/80 text-white`}
        />
      </div>
    </form>
  );
};

export default Escalate;
