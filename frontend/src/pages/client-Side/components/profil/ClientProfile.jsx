import React from "react";
import { useGlobelContext } from "../../../../context/Context";
import { MdOutlineCancel } from "react-icons/md";
import { ClientProfileData } from "../../../../data/dummy";
import Button from "../../../admin/adminPanel/components/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../../../axios";

export default function ClientProfile() {
  const navigate = useNavigate();

  const { currentColor } = useGlobelContext();

  const onLogout = async (ev) => {
    ev.preventDefault();
      try {
        await axios.post("/logout");
        saveToken(null);
        localStorage.removeItem('userRole');
        navigate("/adminlogin");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };

  return (
    <div className="nav-item absolute right-1 top-16 bg-white p-2 rounded-lg w-90">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg">User Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-2 border-color border-b-1 pb-2">
        <img
          className="rounded-full h-16 w-16"
          src="/src/assets/skills-01.jpg"
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200"> Michael </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            {" "}
            Administrator{" "}
          </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
            {" "}
            info@shop.com{" "}
          </p>
        </div>
      </div>
      <div>
        {ClientProfileData.map((item, index) => (
          <Link to={item.link} key={index}>
            <div
              key={index}
              className="flex gap-5 border-b-1 border-color p-1 hover:bg-light-gray cursor-pointer "
            >
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className=" text-xl rounded-lg p-2 hover:bg-light-gray"
              >
                {item.icon}
              </button>

              <div>
                <p className="font-semibold dark:text-gray-200 ">
                  {item.title}
                </p>
                <p className="text-gray-500 text-sm dark:text-gray-400">
                  {" "}
                  {item.desc}{" "}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-3" onClick={onLogout}>
        <Button
          color="white"
          bgColor={currentColor}
          text="Logout"
          borderRadius="10px"
          width="full"
        />
      </div>
    </div>
  );
}
