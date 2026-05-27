import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
// import { Users } from "../../assets/data";
import Button from "../../utils/Button";
import Modal from "../../utils/Modal";
import ComplaintForm from "../../components/forms/ComplaintForm";
import Loading from "../../utils/Loading";
import Icon from "../../utils/Icons";
import { toast } from "react-toastify";
import FileUploadModal from "../../components/fields/FileUploadModal";
import { useNavigate } from "react-router-dom";
import AddComplaint from "../../components/forms/AddComplaint";
import TextInput from "../../components/fields/TextInput";
import SelectInput from "../../components/fields/SelectInput";
import AddUser from "../../components/forms/AddUser";
import { getUsers } from "../../api/ApiFunction";

const UserMaster = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setuserData] = useState({});
  const [users, setusers] = useState([]);

  const navigate = useNavigate();

  const handleUpdateUser = (data) => {
    setIsOpen(true);
    setuserData(data);
  };

  const fetchData = async () => {
    try {
      const req = {};
      const response = await getUsers(req);
      if (response.status) {
        setusers(response.data);
      }
    } catch (error) {
      console.log("Error in Fetching complaints");
    }
  };

  useEffect(() => {
    fetchData()
  }, []);

  const columnsData = [
    {
      name: "Emp Id",
      selector: (row) => row.empId,
      // width:"100px",
      sortable: true,
    },
    {
      name: "Applicant Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Mobile No",
      selector: (row) => row.mobile,
    },
    {
      name: "Email ID",
      selector: (row) => row.email,
    },
    {
      name: "Product",
      selector: (row) => row.product || "N/A",
    },
    {
      name: "Level 1",
      selector: (row) => row.level,
    },
    {
      name: "Created Date",
      sortable: true,
      selector: (row) => row.createdAt,
    },
    {
      name: "Update",
      cell: (row) => {
        return (
          <span
            onClick={() => handleUpdateUser(row)}
            // className="text-primary bg-primary/20 shadow-2xl font-bold text-[10px] border border-primary px-2 py-1 rounded-sm italic"
          >
            {/* Assign */}
            <Icon name="FaUserEdit" color="#088395" size={20} />
          </span>
        );
      },
    },
  ];

  return (
    <>
      <section>
        <div className="mb-2 flex justify-end gap-2">
          <Button
            onClick={() => {
              (setuserData({}), setIsOpen(true));
            }}
            btnName="Add User"
            style="bg-primary text-white cursor-pointer hover:bg-primary/90"
          />
        </div>

        <div className="mt-0">
          <Table
            columns={columnsData}
            data={users}
            title="Manage User"
            // handleFilter={handleFilterBtn}
            exportable={true}
          />
        </div>

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Add User"
        >
          {/* <p>Are you sure you want to perform this action?</p>  */}
          <div className="rounded-md">
            <AddUser userData={userData} setIsOpen={setIsOpen} fetchData={fetchData} />
          </div>
        </Modal>

        {/* <FileUploadModal
          isOpen={open}
          onClose={() => setOpen(false)}
          accepts=".csv"
          // onUpload={handleUpload}
        /> */}

        {/* <Loading /> */}
      </section>
    </>
  );
};

export default UserMaster;
