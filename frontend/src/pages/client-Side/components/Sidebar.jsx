import React from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { useProductContext } from "../../../context/ProductContext";

export default function Sidebar() {
  const { categories } = useProductContext();
  console.log(categories);
  return (
    <div className="bg-[#4E73DF] px-[25px] h-screen">
      <div className="px-[15px] py-[30px] flex items-center justify-center border-b-[1px] border-[#EDEDED]/[0.3]">
        <Link
          to={"/"}
          className="text-white text-[20px] leading-[24px] font-extrabold cursor-pointer"
        >
          Admin panel
        </Link>
      </div>
      <div className="flex items-center gap-[15px] py-[20px] border-b-[1px] border-[#EDEDED]/[0.3] cursor-pointer">
        <p className="text-[14px] leading-[20px] font-bold text-white">
          Dashboard
        </p>
      </div>

      <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
        <div className="flex items-center gap-[10px]">
          <FaUser color="white" />

          <Link
            to={"admin/client"}
            className="text-[14px] leading-[20px] font-normal text-white"
          >
            Client
          </Link>
        </div>
        <IoIosArrowForward color="white" />
      </div>
      <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
        <div className="flex items-center gap-[10px]">
          <div className="text-[14px] leading-[20px] font-normal text-white">
            Categories
            {categories.map((category) => (
              <div key={category.id}>{category.Nom} </div>
            ))}
          </div>
        </div>
        <IoIosArrowForward color="white" />
      </div>
    </div>
  );
}
