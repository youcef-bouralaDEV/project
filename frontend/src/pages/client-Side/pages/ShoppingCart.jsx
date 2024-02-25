import axios from "../../../axios";
import React, { useEffect, useState } from "react";

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]);
  const [productUnit, setProductUnit] = useState(0);

  const handleIncrement = () => {
    setProductUnit((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      updateProductQuantity(id, newQuantity);
      return newQuantity;
    });
  };

  const handleDecrement = () => {
    if (productUnit > 1) {
      setProductUnit((prevQuantity) => {
        const newQuantity = prevQuantity - 1;
        updateProductQuantity(id, newQuantity);
        return newQuantity;
      });
    }
  };

  const divisionResult = (productUnit / SingleProduct.coulissage).toFixed(2);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get("/getCart");
        setCartItems(response.data.data);
      } catch (error) {
        console.error("Error fetching shopping cart data:", error);
      }
    };

    fetchCartData();
  }, []);
  console.log(cartItems);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-16 py-3">
              <span className="sr-only">Image</span>
            </th>
            <th scope="col" className="px-6 py-3">
              Product
            </th>
            <th scope="col" className="px-6 py-3">
              Qty
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="p-4">
                <img
                  src="/docs/images/products/apple-watch.png"
                  className="w-16 md:w-32 max-w-full max-h-full"
                  alt="Apple Watch"
                />
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {item.product.name}
              </td>
              <td className="px-6 py-4">
                <div className=" py-6 mb-6 border-t border-b border-gray-200 dark:border-gray-700">
                  <div className="inline-flex flex-col items-center mt-2">
                    <form className="max-w-xs mx-auto">
                      <div className="relative flex items-center max-w-[8rem]">
                        <button
                          type="button"
                          id="decrement-button"
                          onClick={handleIncrement}
                          className={`bg-blue-500 ${
                            productUnit >= SingleProduct.quantity
                              ? "opacity-50 cursor-not-allowed"
                              : " hover:bg-gray-200"
                          } border rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none`}
                          disabled={productUnit >= SingleProduct.quantity}
                        >
                          +
                        </button>
                        <input
                          type="text"
                          id="quantity-input"
                          value={productUnit}
                          className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          readOnly
                        />
                        <button
                          type="button"
                          onClick={handleDecrement}
                          id="increment-button"
                          data-input-counter-increment="quantity-input"
                          className="bg-blue-500-200 border border-bg-blue-500-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                        >
                          -
                        </button>
                      </div>

                      <div className="flex justify-center my-1 text-sm text">
                        {divisionResult}
                        <div className="text-[#db9a00]">
                          ({SingleProduct.coulissage}u)
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </td>

              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {item.prix}
              </td>
              <td className="px-6 py-4">
                <a
                  href="#"
                  className="font-medium text-red-600 dark:text-red-500 hover:underline"
                >
                  Remove
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
