import React, { useEffect } from "react";
import TextInput from "../fields/TextInput";
import Button from "../../utils/Button";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { RemarksData } from "../../assets/data";
import SelectInput from "../fields/SelectInput";
import { rejectComplaint } from "../../api/ApiFunction";
import * as Yup from "yup";

const Reject = ({ setisReject, ticket, fetchData }) => {
  // console.log(ticket?.complaintRefNo);

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
        empId: "EMP0001",
        id: ticket?._id,
      };

      try {
        const response = await rejectComplaint(req);
        if (response.status) {
          setisReject(false);
          toast.success(response.message || "Complait Rejected");
          fetchData(ticket?.complaintRefNo);
          resetForm();
        } else {
          toast.info(response.message || "Error in rejecting complaint!");
        }
      } catch (error) {
        console.log("Error in rejectComplaint", error);
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
              readOnly={formik.values.remarks !== "OTHERS"}
              onChange={(e) =>
                formik.setFieldValue("description", e.target.value)
              }
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
          style="cursor-pointer bg-primary hover:bg-primary/80 text-white"
        />
      </div>
    </form>
  );
};

export default Reject;
