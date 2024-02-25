import React from "react";
import { Link} from "react-router-dom";
import { SiShopware } from "react-icons/si";
import { useGlobelContext } from "../../../context/Context";
import ClientFiltration from "./ClientFiltration";
import { MdOutlineCancel } from "react-icons/md";


const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2';
const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 hover:text-orange-500 m-2';


const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } =
    useGlobelContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };


  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <SiShopware /> <span>Qomondi</span>
            </Link>
            <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
          </div>
          <div className="mt-5 ">
            <ClientFiltration/>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
