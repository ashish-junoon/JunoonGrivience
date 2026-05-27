import React, { useEffect, useState } from "react";
import TextInput from "../fields/TextInput";
import UploadInput from "../fields/UploadInput";
import Button from "../../utils/Button";
import { ComplaintResolutionData } from "../../assets/data";
import SelectInput from "../fields/SelectInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getRemarksByType, resolveComplaint } from "../../api/ApiFunction";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { href, useNavigate } from "react-router-dom";

const Resolve = ({ setisResolved, ticket, fetchData, isResolved }) => {
  const [RemarksData, setRemarksData] = useState([]);

  // console.log(ticket);
  const { adminUser } = useAuth();
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      remarks: "",
      description: "",
      file: {},
    },

    validationSchema: Yup.object({
      remarks: Yup.string().required(),
      description: Yup.string().when("remarks", {
        is: "OTHERS",
        then: (schema) =>
          schema
            .min(5, "Please enter at least 5 characters")
            .required("Description is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
    }),

    onSubmit: async (values, { resetForm, setFieldValue }) => {
      const formData = new FormData();
      formData.append("remarks", values.remarks);
      formData.append("description", values.description);
      formData.append("empId", adminUser?.empId);
      formData.append("id", ticket?._id);

      if (values.file && values.file.name) {
        formData.append("file", values.file);
      }

      try {
        const response = await resolveComplaint(formData);
        if (response.status) {
          toast.success(response.message || "Complait Rejected");
          fetchData(ticket?.complaintRefNo);
          resetForm();
          setisResolved(false);
          if(location.pathname === "/tickets/ticket-detail"){
            navigate(-1)
          }
        } else {
          toast.info(response.message || "Error in rejecting complaint!");
        }
      } catch (error) {
        console.log("Error in resolve Complaint", error);
        toast.error(error.response?.data?.message || "Something went wrong!");
      }
    },
  });

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
    if(!isResolved) return;

    const req = {
      type: "RESOLVE",
    };

    fetchRemarksData(req);
  }, [ticket, isResolved]);
  

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="p-2">
        <div className="grid grid-cols-2 gap-2">
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
          </div>

          <div>
            <UploadInput
              onChange={(e) => {
                formik.setFieldValue("file", e.target.files[0]);
              }}
              label="Document"
              name="file"
              value={formik.values.file}
              onBlur={formik.handleBlur}
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
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 justify-end mt-5">
        <Button
          onClick={() => setisResolved(false)}
          btnName="Cancel"
          disabled={formik.isSubmitting}
          style="cursor-pointer border border-gray-300"
        />
        <Button
          type="submit"
          btnName="Yes"
          disabled={formik.isSubmitting}
          style={`${!formik.isSubmitting ? "cursor-pointer bg-primary" : "cursor-not-allowed bg-gray-500"} hover:bg-primary/80 text-white`}
        />
      </div>
    </form>
  );
};

export default Resolve;
