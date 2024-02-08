import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useGlobelContext } from "../../context/Context";
import UserProfile from "./adminPanel/components/UserProfile";
import Notification from "./adminPanel/components/Notification";
import Cart from "./adminPanel/components/Cart";


const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
 
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>

);

const Navbar = () => {
  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
  } = useGlobelContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
   
      <div className="flex justify-between py-6 md:ml-6 md:mr-6 relative">
        <NavButton
          title="Menu"
          customFunc={handleActiveMenu}
          color={currentColor}
          icon={<AiOutlineMenu />}
        />
        <div className="flex">
          <NavButton
            title="Cart"
            customFunc={() => handleClick("cart")}
            color={currentColor}
            icon={<FiShoppingCart />}
          />
          <NavButton
            title="Notification"
            dotColor="rgb(254, 201, 15)"
            customFunc={() => handleClick("notification")}
            color={currentColor}
            icon={<RiNotification3Line />}
          />
         
            <div
              className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
              onClick={() => handleClick("userProfile")}
            >
              <img
                className="rounded-full w-8 h-8"
                src="/src/assets/skills-01.jpg"
                alt="user-profile"
              />
              <p>
                <span className="text-gray-400 text-14">Hi,</span>{" "}
                <span className="text-gray-400 font-bold ml-1 text-14">
                  Admin
                </span>
              </p>
              <MdKeyboardArrowDown className="text-gray-400 text-14" />
            </div>
       

          {isClicked.cart && <Cart />}
          {isClicked.notification && <Notification />}
          {isClicked.userProfile && <UserProfile />}
        </div>
      </div>
   
    
  );
};

export default Navbar;
