import { isGridCellRoot } from "@mui/x-data-grid/utils/domUtils";
import React, { useState } from "react";
import ReactDom from "react-dom";


export default function Modal2({open ,setOpen}) {

    if(!open) return null

  return ReactDom.createPortal(
    <div
      id="popup-modal"
      tabIndex="-1"
      className=" fixed  bottom-0  bg-black bg-opacity-40 z-50 top-0 right-0 left-0  w-full md:inset-0 h-full max-h-full"
    >
      <div className="fixed  w-full  transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 z-1000 max-w-md max-h-full">
        <div className="bg-white  rounded-lg shadow p-4">
         
          <div className="p-6 md:p-5 text-center">
            <svg
              className="mx-auto mb-4 text-orange-400 w-12 h-12 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3 className="my-6 text-xl font-bold text-gray-500 ">
              Status du client est mis à jour.
            </h3>
            <button
            onClick={()=>setOpen(false)}
              data-modal-hide="popup-modal"
              type="button"
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
            >
              OK
            </button>
          
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
}
