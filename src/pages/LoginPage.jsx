import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../api/ApiFunction";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {login} = useAuth()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Minimum 6 characters").max(15)
        .required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await userLogin(values)

        if(response.status){
          login(response.data);
          // navigate("/dashboard")
          window.location.href="/dashboard"
        }else{
          toast.info(response.message || "Error in Login")
        }
      } catch (error) {
        console.error("Error in User Login");
        toast.info(error.message || "Server Error") 
      }
    },
  });

  return (
    <div className="flex flex-col md:flex-row h-screen w-full max-md:justify-center">
      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-[#055051] to-primary text-white flex-col justify-center px-20">
        <h1 className="text-2xl leading-snug">Welcome to</h1>
        <h1 className="text-4xl font-bold mb-4 leading-snug">
          Grievance Management Portal
        </h1>

        <p className="text-gray-300 text-sm max-w-md leading-relaxed">
          Manage and resolve grievances efficiently with a centralized system that ensures transparency, accountability, and faster response times.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-4">
        <div className="w-full max-w-sm sm:max-w-md  max-md:border-1 max-md:border-gray-200 p-5 rounded-md max-md:shadow">
          {/* <Link to="/dashboard" className="text-sm text-gray-400 mb-6 cursor-pointer">
            ← Back to portals
          </Link> */}

          <h2 className="text-2xl font-semibold mb-2">Portal Login</h2>
          <p className="text-sm text-gray-500 mb-6">
            Sign in to manage the organization
          </p>

          <form onSubmit={formik.handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-sm text-gray-600">Email address</label>
              <input
                type="email"
                name="email"
                placeholder="admin@example.com"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-1 focus:ring-primary"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-600">Password</label>

              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md outline-none focus:ring-1 focus:ring-primary"
                />

                {/* Eye Icon */}
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </span>
              </div>

              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.password}
                </p>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full py-2.5 rounded-md text-white bg-gradient-to-r from-primary/90 to-primary hover:opacity-90 transition"
            >
              {formik.isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
