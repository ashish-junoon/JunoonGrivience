import React from "react";
import SelectInput from "../fields/SelectInput";
import TextInput from "../fields/TextInput";
import Button from "../../utils/Button";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { RemarksData } from "../../assets/data";

const Escalate = ({ setisAssignOpen, ticket }) => {

  const formik = useFormik({
    initialValues: {
      remarks: "",
      escalateemp: "",
    },

    onSubmit: (values, { resetForm }) => {
      console.log(values);
      toast.success(`Complaint ${ticket.loanId} is forwarded.`);
      setisAssignOpen(false);
      resetForm();
    },
  });

  // console.log(formik.values);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="p-2">
        <div className="grid grid-cols-2 gap-2 pb-5">
          <div>
            <SelectInput
              label="Escalate to"
              placeholder="Select"
              name="escalateemp"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.escalateemp}
              options={[
                { label: "Emp1", value: "Emp1" },
                { label: "Emp2", value: "Emp2" },
              ]}
            />
          </div>

          {/* <div>
            <TextInput
              label="Remarks"
              placeholder="Remarks"
              name="remarks"
              value={formik.values.remarks}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
          </div> */}
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
          btnName="Yes"
          style="cursor-pointer bg-primary hover:bg-primary/80 text-white"
        />
      </div>
    </form>
  );
};

export default Escalate;
