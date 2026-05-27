import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useContext, useState } from "react";
import { uploadExcel } from "../../api/ApiFunction";
import { useAuth } from "../../context/AuthContext";

const FileUploadModal = ({
  isOpen,
  onClose,
  onUpload,
  userVendorCode,
  fetchDocuments,
  fetchData,
  accepts
}) => {
  if (!isOpen) return null;
  const [isLoading, setisLoading] = useState(false);

  const { adminUser } = useAuth()
  

  const formik = useFormik({
    initialValues: {
    //   fileName: "",
      file: {},
    },
    validationSchema: Yup.object({
        file: Yup.mixed().required("File is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("file", values.file);

      try {
        setisLoading(true);
        const response = await uploadExcel(formData);
        if (response.status) {
          toast.success("Document uploaded successfully.");
          fetchData({ empId: adminUser?.empId});
        } else {
          toast.error(response.message || "Failed to upload document!");
        }
      } catch (error) {
        console.log("Error in upload Excel: ", error);
        toast.error(error.response?.data?.message || "Something went wrong!");
      } finally {
        resetForm();
        onClose();
        setisLoading(false);
      }
    
    },
  });

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-md shadow-xl p-6 space-y-5">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Upload Document</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black cursor-pointer">
            ✕
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* File Upload */}
          <div className="relative bg-primary/10 rounded-md h-[80px] flex items-center justify-center">
            <label className="text-sm text-gray-500 font-semibold">
              Upload File
            </label>

            <input
              type="file"
              name="file"
              accept={accepts || "image/*,application/pdf"}
              onChange={(e) =>
                formik.setFieldValue("file", e.currentTarget.files[0])
              }
              onBlur={formik.handleBlur}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />

            {formik.values.file && (
              <p className="text-xs text-gray-500 absolute bottom-1">
                {formik.values.file.name}
              </p>
            )}
          </div>

          {formik.touched.file && formik.errors.file && (
            <p className="text-red-500 text-xs">{formik.errors.file}</p>
          )}

          {/* ACTIONS */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-md bg-gray-200 cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-sm font-semibold rounded-md bg-primary hover:bg-primary/70 text-white cursor-pointer"
            >
              {!isLoading ? "Upload" : "Uploading..."}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FileUploadModal;
