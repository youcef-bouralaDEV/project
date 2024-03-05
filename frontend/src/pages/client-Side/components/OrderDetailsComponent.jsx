import axios from "../../../axios";
import { useEffect, useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { BiArrowBack } from "react-icons/bi";


function calculateHTAndTVA(prixTTC, tvaRate = 0.19) {
  const prixHT = prixTTC / (1 + tvaRate);
  const tva = prixTTC - prixHT;
  return {
    prixHT: prixHT.toFixed(2),
    tva: tva.toFixed(2),
  };
}

const OrderDetailsComponent = ({ order, orderItem }) => {
  const [isCancelled, setIsCancelled] = useState(
    order.orderState === "Canceled"
  );

  const [calculatedValues, setCalculatedValues] = useState({
    prixHT: "",
    tva: "",
  });

  // Update calculated values when the order prop changes
  useEffect(() => {
    if (order && order.total_ttc) {
      const { prixHT, tva } = calculateHTAndTVA(parseFloat(order.total_ttc));
      setCalculatedValues({ prixHT, tva });
    }
  }, [order]);

  const handleCancelOrder = async () => {
    try {
      // Make an API call to cancel the order
      const response = await axios.post(`/cancel/${order[0].id}`);
      // Handle success, e.g., show a success message
      console.log("Order canceled:", response.data);
      setIsCancelled(true);
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error("Error canceling order:", error);
    }
  };

  const handleRecreateOrder = async () => {
    try {
      // Make an API call to recreate the order
      const response = await axios.post(`/recreate/${order.id}`);
      // Handle success, e.g., show a success message
      console.log("Order recreated:", response.data);
      setIsCancelled(true);
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error("Error recreating order:", error);
    }
  };

  return (
    <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      <div className="flex justify-between">
        <div className="flex justify-start item-start space-y-2 flex-col">
          <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-gray-800">
            Commande# {order.order_nmbr}
          </h1>
          <h4 className="text    text-gray-800">Facture#{}</h4>
          <p className="text-base font-medium leading-6 text-gray-600">
            {order.created_at.match(/(\d{4}-\d{2}-\d{2})/)[0]}
          </p>
        </div>
        <div>
          {isCancelled ? (
             <div className="flex justify-center items-center bg-blue-500  rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300  py-1 px-4 gap-x-2  text-sm ">
             <BiArrowBack color="white" />
             <button onClick={handleRecreateOrder} className="  text-white">
               Commander à nouveau
             </button>
           </div>
          ) : (
            <div className="flex justify-center items-center bg-red-500  rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300  py-1 px-4 gap-x-2  text-sm ">
              <ImCancelCircle color="white" />
              <button onClick={handleCancelOrder} className="  text-white">
                Annuller
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="mt-10 flex flex-col xl:flex-row justify-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
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
                        {(item.product.prix * item.quantity).toFixed(2)}DZD
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
                    <p className="text-base leading-4 text-blue-500">
                      {order.nombre_articles}
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
                    {order.total_ttc.toFixed(2)}DZD
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
                          {order.user.name}
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
                      <p className="cursor-pointer text-sm leading-5 text-blue-500">
                        {order.user.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between xl:h-full  items-stretch w-full flex-col mt-6 md:mt-0">
                    <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-4 md:space-y-0 md:flex-row  items-center md:items-start ">
                      <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 xl:mt-8">
                        <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                          Wilaya
                        </p>
                        <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                          {order.user.wilaya}
                        </p>
                      </div>
                      <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 ">
                        <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                          commune
                        </p>
                        <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                          {order.user.commune}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full justify-center items-center md:justify-start md:items-start">
                      <button className="mt-6 md:mt-0 py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base leading-4 text-gray-800">
                        Edit Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsComponent;
