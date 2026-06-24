import React, { useEffect, useState } from "react";
import TextInput from "../fields/TextInput";
import Button from "../../utils/Button";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import SelectInput from "../fields/SelectInput";
import { getRemarksByType, rejectComplaint } from "../../api/ApiFunction";
import * as Yup from "yup";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Reject = ({ setisReject, ticket, fetchData, isReject }) => {

  const [RemarksData ,setRemarksData] = useState([])
  // console.log(ticket?.complaintRefNo);
  const {adminUser} = useAuth()
  const navigate = useNavigate()
  

  const formik = useFormik({
    initialValues: {
      remarks: "",
      id: "",
      description: "",
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
      // const REMARKS =
      // values.remarks == "OTHERS" ? values.description : values.remarks;
      const req = {
        remarks: values.remarks,
        description: values.description,
        empId: adminUser?.empId,
        id: ticket?._id,
        complaintRefNo: ticket?._complaintRefNo,
      };

      try {
        const response = await rejectComplaint(req);
        if (response.status) {
          setisReject(false);
          toast.success(response.message || "Complait Rejected");
          fetchData(ticket?.complaintRefNo);
          resetForm();
          if(location.pathname === "/tickets/ticket-detail"){
            navigate(-1)
          }
        } else {
          toast.info(response.message || "Error in rejecting complaint!");
        }
      } catch (error) {
        console.log("Error in rejectComplaint", error.response?.data?.message);
        toast.error(error.response?.data?.message || "Something went wrong!")
      }
    },
  });

  const ErrorMsg = ({ error, touched }) => {
    if (!touched || !error) return null;
    return <p className="text-red-500 text-xs">{error}</p>;
  };

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
        const response = await getRemarksByType(req)
        if(response.status){
          setRemarksData(response.data)
        }else{
          setRemarksData([])
        }
      } catch (error) {
        console.log("Error in fetchRemarksData: ", error);
        toast.error(error.response?.data?.message || "Something went wrong!");
      }
    }
    useEffect(()=> {
      if(!isReject) return

      const req = {
        type: "REJECT"
      }
  
      fetchRemarksData(req)
    }, [ticket, isReject])

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="p-2">
        <div className="pb-2">
          <p>Are you sure you want to Reject this complaint?</p>
        </div>

        <div className="grid grid-cols-1 gap-2">
          <div>
            <SelectInput
              label="Select Remarks"
              placeholder="Select Remarks"
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

          {/* {formik.values.remarks === "OTHERS" && ( */}
          <div className="w-full">
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
          {/* )} */}
        </div>
      </div>

      <div className="flex items-center gap-2 justify-end">
        <Button
          onClick={() => setisReject(false)}
          btnName="Cancel"
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

export default Reject;
