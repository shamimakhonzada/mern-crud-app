import axios from "axios";
import { UserList } from "./user/userlist";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { Button, Checkbox, Label, TextInput, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";

export default function User() {
  const [userList, setUserList] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cnic: "",
    address: "",
    password: "",
  });

  const saveUser = (e) => {
    e.preventDefault();

    if (formData._id) {
      // 🛠️ Updating existing user
      axios
        .put(
          `http://localhost:5000/api/user/updateUser/${formData._id}`,
          formData
        )
        .then((res) => {
          toast.success("User Updated Successfully");
          resetForm();
          getAllUser();
        });
    } else {
      // 🧩 Creating new user
      axios
        .post("http://localhost:5000/api/user/register", formData)
        .then((res) => {
          toast.success("User Registered Successfully");
          resetForm();
          getAllUser();
        })
        .catch((err) => {
          console.error(
            "Registration Error:",
            err.response?.data || err.message
          );
          toast.error("Registration Failed");
        });
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      cnic: "",
      address: "",
      password: "",
      _id: "",
    });
  };

  const getValue = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getAllUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/user/getUser");
      if (res.data?.userList) {
        setUserList(res.data.userList);
      } else {
        toast.warning("No users found");
      }
    } catch (error) {
      toast.error("Failed to load users");
    }
  };

  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 p-4">
      <ToastContainer />
      {/* 🌟 Beautiful Header */}
      <div className="mb-6 p-6 rounded-xl bg-gradient-to-r from-indigo-700 to-purple-600 shadow-lg text-white text-center">
        <h1 className="text-4xl font-extrabold tracking-wide">
          User Management Portal
        </h1>
        <p className="mt-2 text-sm sm:text-base font-medium text-indigo-100">
          Register, update, and view users in one place
        </p>
      </div>

      {/*  Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(300px,1fr)_2fr] gap-6">
        {/* Form Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
          <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">
            {formData._id ? "Update User" : "Register New User"}
          </h2>

          <form className="space-y-4" onSubmit={saveUser}>
            {/*  Full Name */}
            <div>
              <Label htmlFor="name" value="Full Name" />
              <TextInput
                id="name"
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={getValue}
                required
              />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" value="Email Address" />
              <TextInput
                id="email"
                type="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={getValue}
                required
              />
            </div>

            {/*  Phone */}
            <div>
              <Label htmlFor="phone" value="Phone Number" />
              <TextInput
                id="phone"
                type="tel"
                name="phone"
                placeholder="03xxxxxxxxx"
                pattern="[0-9]{11}"
                maxLength={11}
                value={formData.phone}
                onChange={getValue}
              />
            </div>

            {/*  CNIC */}
            <div>
              <Label htmlFor="cnic" value="CNIC" />
              <TextInput
                id="cnic"
                type="text"
                name="cnic"
                placeholder="Enter 13-digit CNIC"
                maxLength={13}
                pattern="[0-9]{13}"
                value={formData.cnic}
                onChange={getValue}
              />
            </div>

            {/*  Address */}
            <div>
              <Label htmlFor="address" value="Address" />
              <Textarea
                id="address"
                name="address"
                placeholder="Enter your full address"
                value={formData.address}
                onChange={getValue}
                rows={2}
                required
              />
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" value="Password" />
              <TextInput
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={getValue}
                required
              />
            </div>

            {/*  Terms Checkbox */}
            <div className="flex items-center gap-2">
              <Checkbox id="terms" required />
              <Label htmlFor="terms" className="text-sm">
                I agree to the{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  terms and conditions
                </a>
              </Label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              gradientDuoTone="purpleToBlue"
              className="w-full text-white font-semibold tracking-wide"
            >
              {formData._id ? "Update User" : "Register User"}
            </Button>
          </form>
        </div>

        {/* 📋 User List Section */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-slate-200 overflow-auto">
          <UserList
            data={userList}
            getAllUser={getAllUser}
            Swal={Swal}
            setFormData={setFormData}
          />
        </div>
      </div>
    </div>
  );
}
