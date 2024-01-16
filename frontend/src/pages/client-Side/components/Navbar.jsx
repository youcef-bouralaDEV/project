import React from "react";
import { FaRegBell } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";


export default function Navbar({onLogout}) {
   
  return (
    <div className="flex items-center justify-between h-[70px] shadow-lg px-[25px] ">
        <button onClick={onLogout}>Logout</button>
      <div className="flex items-center rounded-[5px]">
        <input
          type="text"
          className=" bg-[#F8F9FC] h-[40px] outline-none pl-[13px] w-[350px] rounded-[5px] placeholder:text-[14px] leading-[20px] font-normal"
          placeholder="Search for..."
        />
        <div className="bg-[#4E73DF] h-[40px] px-[14px] flex items-center justify-center cursor-pointer rounded-tr-[5px] rounded-br-[5px]">
          <IoSearchOutline color="white" />
        </div>
      </div>
      <div className="flex items-center gap-[20px]">
        <div className="flex items-center gap-[25px] border-r-[1px] pr-[25px]">
          <FaRegBell />
        </div>
        <div className="flex items-center gap-[15px] relative "></div>
      </div>
    </div>
  );
}
