import React from 'react'
import { MdDashboard ,MdOutlineShoppingCart } from "react-icons/md";
import { IoMdPerson ,IoIosArrowForward } from "react-icons/io";
import { Link} from 'react-router-dom';




const Sidebar = () => {
  
    return (
        <div className='bg-[#4E73DF] px-[25px] h-screen'>
            <div className='px-[15px] py-[30px] flex items-center justify-center border-b-[1px] border-[#EDEDED]/[0.3]'>
                <Link to={'/'} className='text-white text-[20px] leading-[24px] font-extrabold cursor-pointer'>Admin panel</Link>
            </div>
            <div className='flex items-center gap-[15px] py-[20px] border-b-[1px] border-[#EDEDED]/[0.3] cursor-pointer'>
                <MdDashboard color='white' />
                <p className='text-[14px] leading-[20px] font-bold text-white'>Dashboard</p>
            </div>
            <div className='pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]'>
                <p className='text-[10px] font-exstrabold leading-[16px] text-white/[0.4]'> List</p>
                <div className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer'>
                    <div className='flex items-center gap-[10px]'>
                    <MdOutlineShoppingCart color='white' />

                        <Link to={"admin/product"} className='text-[14px] leading-[20px] font-normal text-white'>Product</Link>

                    </div>
                    <IoIosArrowForward color='white' />
                </div>
                <div className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer'>
                    <div className='flex items-center gap-[10px]'>
                    
                    <IoMdPerson color='white' />

                         <Link to={"admin/client"} className='text-[14px] leading-[20px] font-normal text-white'>Client</Link>
                    </div>
                    <IoIosArrowForward color='white' />
                </div>
                <div className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer'>
                    <div className='flex items-center gap-[10px]'>
                    
                    <IoMdPerson color='white' />

                         <Link to={"/adminLogin"} className='text-[14px] leading-[20px] font-normal text-white'>Login</Link>
                    </div>
                    <IoIosArrowForward color='white' />
                </div>
            </div>
      
        </div>
    )
}

export default Sidebar