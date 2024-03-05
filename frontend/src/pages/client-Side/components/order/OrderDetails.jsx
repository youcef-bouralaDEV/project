import React, { useEffect, useState } from "react";
import axios from "../../../../axios";
import { useParams } from "react-router-dom";

function calculateHTAndTVA(prixTTC, tvaRate = 0.19) {
  const prixHT = prixTTC / (1 + tvaRate);
  const tva = prixTTC - prixHT;
  return {
    prixHT: prixHT.toFixed(2),
    tva: tva.toFixed(2),
  };
}

export default function OrderDetails({ order, orderItem, previousOrders }) {
  const [calculatedValues, setCalculatedValues] = useState({
    prixHT: "",
    tva: "",
  });

  useEffect(() => {
    if (order && order[0].total_ttc) {
      const { prixHT, tva } = calculateHTAndTVA(parseFloat(order[0].total_ttc));
      setCalculatedValues({ prixHT, tva });
    }
  }, [order]);

  console.log(order.total_ttc);
  console.log(orderItem);

  return (
    <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      <div className="flex justify-start item-start space-y-2 flex-col ">
        <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-gray-800">
          Commande# {order[0].order_nmbr}
        </h1>
        <h4 className="text    text-gray-800">Facture#{order[0].id}</h4>
        <p className="text-base font-medium leading-6 text-gray-600">
          {order[0].created_at.match(/(\d{4}-\d{2}-\d{2})/)[0]}
        </p>
      </div>
      <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
          <div className="flex flex-col justify-start items-start bg-white px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
            <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">
              Customer’s Cart
            </p>

            {orderItem?.map((item) => (
              <div key={item.id}>
                <div className="mt-4 md:mt-6 flex  flex-col md:flex-row items-start md:items-center md:space-x-6 xl:space-x-8 w-full ">
                  <div className="pb-4 md:pb-8 w-full md:w-40">
                    <img
                      className="w-full hidden md:block"
                      src="https://i.ibb.co/84qQR4p/Rectangle-10.png"
                      alt="dress"
                    />
                    <img
                      className="w-full md:hidden"
                      src="https://i.ibb.co/L039qbN/Rectangle-10.png"
                      alt="dress"
                    />
                  </div>
                  <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                    <div className="w-full flex flex-col justify-start items-start space-y-8">
                      <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">
                        {item.product.name}
                      </h3>
                      <div className="flex justify-start items-start flex-col space-y-2">
                        <p className="text-sm leading-none text-gray-800">
                          <span className="text-gray-300">Mark: </span>
                        </p>
                        <p className="text-sm leading-none text-gray-800">
                          <span className="text-gray-300">code: </span>
                          {item.product.code}
                        </p>
                        <p className="text-sm leading-none text-gray-800">
                          <span className="text-gray-300">ref: </span>
                          {item.product.ref}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between space-x-8 items-start w-full">
                      <p className="text-base xl:text-lg leading-6">
                        ${item.product.prix}
                        {/* <span className="text-red-300 line-through">
                           discount
                         55
                          </span> */}
                      </p>
                      <p className="text-base xl:text-lg leading-6 text-gray-800">
                        {item.quantity}
                      </p>
                      <p className="text-base xl:text-lg font-semibold leading-6 text-blue-500">
                        {(
                          parseFloat(item.product.prix * item.quantity) || 0
                        ).toFixed(2)}
                        DZD
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
              <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
                <h3 className="text-xl font-semibold leading-5 text-gray-800">
                  Summary
                </h3>
                <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                  <div className="flex justify-between  w-full">
                    <p className="text-base leading-4 text-gray-800">nmbr</p>
                    <p className="text-base font-bold leading-4 text-blue-500">
                      {order[0].nombre_articles}
                    </p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base leading-4 text-gray-800">
                      TVA{" "}
                      <span className="bg-gray-200 p-1 text-xs font-medium leading-3  text-gray-800">
                        (19%)
                      </span>
                    </p>
                    <p className="text-base leading-4 text-gray-600">
                      {calculatedValues.tva} DZD
                    </p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base leading-4 text-gray-800">
                      total_ht
                    </p>
                    <p className="text-base leading-4 text-gray-600">
                      {calculatedValues.prixHT}DZD
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base font-semibold leading-4 text-gray-800">
                    Total ttc
                  </p>
                  <p className="text-base font-semibold leading-4 text-blue-500">
                    {(parseFloat(order[0].total_ttc) || 0).toFixed(2)} DZD
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col ">
                <h3 className="text-xl font-semibold leading-5 text-gray-800">
                  Client
                </h3>
                <div className="flex  flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0 ">
                  <div className="flex flex-col justify-start items-start flex-shrink-0">
                    <div className="flex justify-center  w-full  md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                      <img
                        src="https://i.ibb.co/5TSg7f6/Rectangle-18.png"
                        alt="avatar"
                      />
                      <div className=" flex justify-start items-start flex-col space-y-2">
                        <p className="text-base font-semibold leading-4 text-left text-gray-800">
                          {order[0].user.name}
                        </p>
                        <p className="text-sm leading-5 text-gray-600">
                          <span className="text-blue-500 font-bold">
                            {previousOrders}{" "}
                          </span>
                          Previous Orders
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-center  md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                          stroke="#1F2937"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M3 7L12 13L21 7"
                          stroke="#1F2937"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="cursor-pointer text-sm leading-5 text-blue-500 font-bold">
                        {order[0].user.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between xl:h-full  items-stretch w-full flex-col mt-3 md:mt-0">
                    <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-1 xl:space-y-8 md:space-y-0 md:flex-row  items-center md:items-start ">
                      <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-1 xl:mt-4">
                        <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                          Wilaya
                        </p>
                        <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                          {order[0].user.wilaya}
                        </p>
                      </div>
                      <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-2 ">
                        <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                          commune
                        </p>
                        <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                          {order[0].user.commune}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full justify-center items-center md:justify-start md:items-start"></div>
                  </div>
                </div>
              </div>
              {/* <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
                    <h3 className="text-xl font-semibold leading-5 text-gray-800">Shipping</h3>
                    <div className="flex justify-between items-start w-full">
                        <div className="flex justify-center items-center space-x-4">
                            <div class="w-8 h-8">
                                <img class="w-full h-full" alt="logo" src="https://i.ibb.co/L8KSdNQ/image-3.png" />
                            </div>
                            <div className="flex flex-col justify-start items-center">
                                <p className="text-lg leading-6 font-semibold text-gray-800">
                                    DPD Delivery
                                    <br />
                                    <span className="font-normal">Delivery with 24 Hours</span>
                                </p>
                            </div>
                        </div>
                        <p className="text-lg font-semibold leading-6 text-gray-800">$8.00</p>
                    </div>
                    <div className="w-full flex justify-center items-center">
                        <button className="hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white">View Carrier Details</button>
                    </div>
                </div>  */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
