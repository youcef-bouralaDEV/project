import React from "react";
import { FaHeart, FaPowerOff, FaRegBell } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { FaFileAlt, FaShoppingCart, FaUser, FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";



export default function Navbar() {

  const DropdownMenu = () => {

    return (
      <div className="absolute  top-14 mt-3 right-[42px]  w-47 bg-white rounded-md shadow-lg hidden ">
        <div className="py-1">
          <Link to="/mes-commandes" className="flex  items-center  px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
            <FaShoppingCart className="mr-2" />
            Mes Commandes
          </Link>
          <Link to="/mes-factures" className="flex items-center  px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
            <FaFileAlt className="mr-2" />
            Mes Factures
          </Link>
          <Link to="/mes-favoris" className="flex items-center  px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
            <FaHeart className="mr-2" />
            Mes Favoris
          </Link>
          <Link to="/mon-profil" className="flex items-center  px-3  py-2 text-sm text-gray-700 hover:bg-gray-100">
            <FaUserAlt className="mr-2" />
            Mon Profil
          </Link>
          <button className="flex justify-end items-center  w-full text-left px-4 py-2 text-sm text-white bg-blue-500 hover:bg-gray-100">
            <FaPowerOff className="mr-2" />
            Déconnexion
          </button>
        </div>
      </div>
    );
  };
   
  return (
    <div className="flex items-center justify-between h-[70px] shadow-lg px-[25px] ">
        
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
      <div className="flex">

      <div className="flex items-center mr-5">
        <div className="flex items-center ">
          <FaRegBell className="text-yellow-500" />
        </div>
      </div>
      <div className="flex items-center  border-l-[1px] gap-[10px] p-2">
        <div className="flex items-center ">
          <FaCartShopping className="text-blue-500"/> 
        </div>
        <Link><p className="text-sm">Mon Panier</p></Link>
     
      </div>
      
      <div className="flex items-center  border-l-[1px] gap-[10px] p-2">
        <div className="flex items-center ">
          <FaUser className="text-blue-500"/> 
        </div>
        <Link><p className="text-sm">Mon Compte</p></Link>
        <DropdownMenu/>
     
      </div>
      </div>
    </div>
  );
}
