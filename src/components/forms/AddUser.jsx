import React, { useEffect } from "react";
import TextInput from "../fields/TextInput";
import SelectInput from "../fields/SelectInput";
import Button from "../../utils/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createUsers } from "../../api/ApiFunction";
import { toast } from "react-toastify";

const AddUser = ({ userData, setIsOpen }) => {
//   console.log(userData);

  const userformik = useFormik({
    initialValues: {
      name: "",
      level: "",
      mobile: "",
      email: "",
      product: "",
      password: "",
      // designation: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      mobile: Yup.string().required("Mobile is required"),
      level: Yup.string().required("Level is required"),
    }),
    onSubmit: async (values) => {
      try {
        // const
        const response = await createUsers(values)
        if(response.status){
          toast.success(response.message || "User Registered.")
          setIsOpen(false)
        }else{
          toast.info(response.message)
        }
      } catch (error) {
        console.log("Error in Adding User: ", error)
      }
    },
  });

  useEffect(() => {
    if (userData) {
      userformik.setValues({
        name: userData.name || "",
        level: userData.level || "",
        email: userData.email || "",
        mobile: userData.mobile || "",
        product: userData.product || "",
        // designation: userData.role || "",
      });
      userformik.setTouched({});
    }
  }, [userData]);
  return (
    <div>
      <form onSubmit={userformik.handleSubmit}>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <TextInput
              name="name"
              placeholder="Enter name"
              label="Name"
              onChange={userformik.handleChange}
              onBlur={userformik.handleChange}
              value={userformik.values.name}
            />
            {userformik.errors.name && userformik.touched.name && (
              <p className="text-red-500 text-xs">{userformik.errors.name}</p>
            )}
          </div>

          <div>
            <SelectInput
              name="level"
              placeholder="Select Level"
              label="Select Level"
              options={[
                { label: "Level 1", value: 1 },
                { label: "Level 2", value: 2 },
                { label: "Level 3", value: 3 },
              ]}
              onChange={userformik.handleChange}
              onBlur={userformik.handleChange}
              value={userformik.values.level}
            />
            {userformik.errors.level && userformik.touched.level && (
              <p className="text-red-500 text-xs">{userformik.errors.level}</p>
            )}
          </div>

          <div>
            <TextInput
              name="mobile"
              placeholder="Enter mobile"
              label="Mobile No."
              onChange={userformik.handleChange}
              onBlur={userformik.handleChange}
              value={userformik.values.mobile}
            />
            {userformik.errors.mobile && userformik.touched.mobile && (
              <p className="text-red-500 text-xs">{userformik.errors.mobile}</p>
            )}
          </div>

          <div>
            <TextInput
              name="email"
              placeholder="Enter Email"
              label="Email Id"
              onChange={userformik.handleChange}
              onBlur={userformik.handleChange}
              value={userformik.values.email}
            />
            {userformik.errors.email && userformik.touched.email && (
              <p className="text-red-500 text-xs">{userformik.errors.email}</p>
            )}
          </div>
          
          <div>
            <TextInput
              name="password"
              placeholder="Enter Password"
              label="Password"
              onChange={userformik.handleChange}
              onBlur={userformik.handleChange}
              value={userformik.values.password}
            />
            {userformik.errors.password && userformik.touched.password && (
              <p className="text-red-500 text-xs">{userformik.errors.password}</p>
            )}
          </div>

          <div>
            <SelectInput
              name="product"
              placeholder="Select Product"
              label="Select Product"
              options={[
                { label: "PU", value: "PU" },
                { label: "EW", value: "EW" },
                // { label: "Other", value: "" },
              ]}
              onChange={userformik.handleChange}
              onBlur={userformik.handleChange}
              value={userformik.values.product}
            />
            {userformik.errors.product && userformik.touched.product && (
              <p className="text-red-500 text-xs">
                {userformik.errors.product}
              </p>
            )}
          </div>

          {/* <div>
            <SelectInput
              name="designation"
              placeholder="Select Designation"
              label="Select Designation"
              options={[
                { label: "D1", value: "D1" },
                { label: "D2", value: "D2" },
                { label: "D3", value: "D3" },
              ]}
              onChange={userformik.handleChange}
              onBlur={userformik.handleChange}
              value={userformik.values.designation}
            />
            {userformik.errors.product && userformik.touched.product && (
              <p className="text-red-500 text-xs">
                {userformik.errors.product}
              </p>
            )}
          </div> */}
        </div>

        <div className="flex items-center gap-2 justify-end mt-5">
          <Button
            onClick={() => {setIsOpen(false), userformik.resetForm()}}
            btnName="Cancel"
            style="cursor-pointer border border-gray-300"
          />
          <Button
            type="submit"
            btnName="Add User"
            style="cursor-pointer bg-primary hover:bg-primary/80 text-white"
          />
        </div>
      </form>
    </div>
  );
};

export default AddUser;
