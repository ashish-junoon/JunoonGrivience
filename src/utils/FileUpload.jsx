import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { uploadComplaintFiles } from "../api/ApiFunction";
import { toast } from "react-toastify";
import SpinnerLoader from "./SpinnerLoader/SpinnerLoader";

const FileUpload = ({ complaintRefNo, setisUploadOpen, fetchData, fetchActionHistory, ticketId }) => {
  const formik = useFormik({
    initialValues: {
      files: [],
    },

    validationSchema: Yup.object({
      files: Yup.array()
        .max(5, "Max 5 files allowed")
        .of(
          Yup.mixed()
            .test("fileSize", "Max 10MB", (file) =>
              file ? file.size <= 10 * 1024 * 1024 : true
            )
            .test("fileType", "Invalid file type", (file) =>
              file
                ? [
                    "image/jpeg",
                    "image/png",
                    "application/pdf",
                  ].includes(file.type)
                : true
            )
        ),
    }),

    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = new FormData();

        values.files.forEach((file) => {
          formData.append("files", file);
        });

        formData.append("complaintRefNo", complaintRefNo);

        const response = await uploadComplaintFiles({req: formData, complaintRefNo})

        if(response.status){
            toast.success(response.message || "Files Uploaded Successfully.")
            fetchActionHistory({ id: ticketId })
            fetchData(ticketId)
        }else{
            toast.info(response.message || "Unable to Upload files!.")
        }
        resetForm();
        setisUploadOpen(false)
      } catch (err) {
        console.log(err);
        toast.error(err.message)
      }
    },
  });

  // 🔥 Handle file select
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    const totalFiles = [...formik.values.files, ...selectedFiles];

    if (totalFiles.length > 5) {
      alert("Max 5 files allowed");
      return;
    }

    formik.setFieldValue("files", totalFiles);
  };

  // 🔥 Remove file
  const removeFile = (index) => {
    const updated = formik.values.files.filter((_, i) => i !== index);
    formik.setFieldValue("files", updated);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">

      {/* Upload Box */}
      <div className="bg-primary/10 p-6 rounded-md relative text-center cursor-pointer">
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />

        <p className="text-sm font-semibold text-gray-600">
          Upload Files (Max 5)
        </p>
        <p className="text-xs text-red-500 mt-1">
          Only JPG, PNG, PDF (Max 10MB)
        </p>
      </div>

      {/* Error */}
      {formik.errors.files && (
        <p className="text-red-500 text-sm">{formik.errors.files}</p>
      )}

      {/* Selected Files */}
      <div className="space-y-2">
        {formik.values.files.map((file, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded"
          >
            <p className="text-sm truncate">{file.name}</p>

            <button
              type="button"
              onClick={() => removeFile(index)}
              className="text-red-500 text-xs font-bold cursor-pointer"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className={`${formik.isSubmitting ? "bg-gray-500" : "bg-primary text-white"} px-4 py-2 rounded cursor-pointer float-right`}
      >
        {formik.isSubmitting ? <SpinnerLoader /> : "Upload"}
      </button>
    </form>
  );
};

export default FileUpload;