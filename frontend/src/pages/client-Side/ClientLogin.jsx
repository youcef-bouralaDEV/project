import { useGlobelContext } from "../../context/Context";
import axios from "../../axios";
import React, { useState } from "react";

const ClientLogin = () => {
  const { saveToken, setRole } = useGlobelContext();
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    message: "",
  });

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  console.log(credentials);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("login", {
        ...credentials,
      });
      console.log(response);

      const userRole = response.data["user"].role.toString();
      if (response.status === 200 && userRole === "user") {
        saveToken(response.data.token);
        console.log("userRole", userRole);
        setRole(userRole);
      } else {
        // Display specific error for invalid role
        setErrors({ message: "Provided email or password is incorrect" });
      }
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors, {
          message: "Invalid user role for admin login.",
        });
      } else if (error.response && error.response.data.message) {
        setErrors({ message: error.response.data.message });
      } else {
        console.log("Error", error.message);
      }
    }
  };

  return (
    <section className="bg-blue-400 dark:bg-gray-900">
      <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Client Access
      </h1>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form
              onSubmit={handleLogin}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              <div className="text-red-500">{errors.message}</div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  onChange={(e) =>
                    setCredentials({ ...credentials, email: e.target.value })
                  }
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
                <div className="text-red-500">{errors.email}</div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
                <div className="text-red-500">{errors.password}</div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Connecter
              </button>
             
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogin;
