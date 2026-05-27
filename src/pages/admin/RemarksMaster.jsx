import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextInput from "../../components/fields/TextInput";
import SelectInput from "../../components/fields/SelectInput";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import {
  createRemark,
  getRemarksByType,
  removeRemark,
} from "../../api/ApiFunction";
import Icon from "../../utils/Icons";
import Modal from "../../utils/Modal";
import { FaRegEdit } from "react-icons/fa";



const TYPES = [
  { label: "Complaint", value: "COMPLAINT" },
  { label: "Escalation", value: "ESCALATION" },
  { label: "Reject", value: "REJECT" },
  { label: "Resolve", value: "RESOLVE" },
  { label: "ReOpen", value: "REOPEN" },
];

const TAB_OPTIONS = [{ label: "All", value: "ALL" }, ...TYPES];

const typeStyles = {
  COMPLAINT: "bg-yellow-100 text-yellow-700",
  ESCALATION: "bg-blue-100 text-blue-700",
  REJECT: "bg-red-100 text-red-700",
  RESOLVE: "bg-green-100 text-green-700",
  REOPEN: "bg-primary/20 text-primary",
};

const RemarksMaster = () => {
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [remarkData, setRemarkData] = useState({});
  const { adminUser } = useAuth();

  // ================= FORM =================
  const formik = useFormik({
    initialValues: {
      label: "",
      description: "",
      type: "COMPLAINT",
    },

    validationSchema: Yup.object({
      label: Yup.string().required("Label is required"),
      type: Yup.string().required("Type is required"),
      description: Yup.string()
        .max(200, "Max 200 chars allowed")
        .required("Description is required"),
    }),

    onSubmit: async (values, { resetForm }) => {
      const req = {
        label: values.label,
        value: values.description,
        type: values.type,
        empId: adminUser?.empId,
        id: remarkData?._id || ""
      };

      try {
        const response = await createRemark(req);

        if (response.status) {
          toast.success(response.message);
          resetForm();
          setIsModalOpen(false);
          fetchRemarks();
        } else {
          toast.info(response.message);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Error");
      }
    },
  });

  // ================= FETCH =================
  const fetchRemarks = async () => {
    try {
      const response = await getRemarksByType({
        type: activeTab === "ALL" ? "" : activeTab,
      });
      setData(response?.data || []);
    } catch (error) {
      toast.error("Error fetching remarks");
    }
  };

  useEffect(() => {
    fetchRemarks();
  }, [activeTab]);

  // ================= DELETE =================
  const handleRemove = async (item) => {
    if (!window.confirm("Delete this remark?")) return;

    try {
      const res = await removeRemark(item._id);
      if (res.status) {
        toast.success(res.message);
        fetchRemarks();
      } else {
        toast.info(res.message);
      }
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleUpdate = (data) => {
    setIsModalOpen(true)
    setRemarkData(data)
    console.log(data);
  }

  useEffect(()=> {
    if(!remarkData) return

    formik.setValues({
      label: remarkData?.value,
      description: remarkData?.description,
      type: remarkData?.type,
    })
  }, [remarkData])

  const ErrorMsg = ({ error, touched }) => {
    if (!touched || !error) return null;
    return <p className="text-red-500 text-xs">{error}</p>;
  };

  // ================= UI =================
  return (
    <div className="p-5 space-y-4 bg-slate-50 min-h-screen rounded-md">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        {/* TABS */}
        <div className="flex gap-2 flex-wrap">
          {TAB_OPTIONS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-3 py-1 rounded-md text-sm cursor-pointer ${
                activeTab === tab.value
                  ? "bg-primary text-white"
                  : "bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => {setRemarkData({}), formik.resetForm(), setIsModalOpen(true)}}
          className="flex items-center gap-2 bg-primary text-white px-3 py-2 rounded-md text-sm cursor-pointer"
        >
          <Icon name="MdOutlineAddCircle" size={18} />
          Add
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-md shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-200 text-gray-600">
            <tr>
              <th className="p-3 text-left">Label</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Created</th>
              <th className="p-3 text-center">Update</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item._id} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium">{item.label}</td>

                  <td className="p-3 text-gray-600">{item.description}</td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${typeStyles[item.type]}`}
                    >
                      {item.type}
                    </span>
                  </td>

                  <td className="p-3 text-gray-500 text-xs">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-3 text-center">
                    <button onClick={() => handleUpdate(item)}>
                      <Icon name="FaRegEdit" color="blue" size={20} />
                    </button>
                  </td>
                  <td className="p-3 text-center">
                    <button onClick={() => handleRemove(item)}>
                      <Icon name="MdOutlineDeleteSweep" color="red" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-5 text-center text-gray-500">
                  No Remarks Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Remark"
      >
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <TextInput
              name="label"
              placeholder="Label"
              value={formik.values.label}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <ErrorMsg
              error={formik.errors.label}
              touched={formik.touched.label}
            />
          </div>

          <div>
            <SelectInput
              name="type"
              placeholder="Select"
              value={formik.values.type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              options={TYPES}
            />
            <ErrorMsg
              error={formik.errors.type}
              touched={formik.touched.type}
            />
          </div>

          <div>
            <textarea
              name="description"
              placeholder="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border border-gray-200 p-2 rounded outline-primary"
            />
            <ErrorMsg
              error={formik.errors.description}
              touched={formik.touched.description}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded cursor-pointer"
          >
            Save
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default RemarksMaster;
