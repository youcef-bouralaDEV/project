import axios from "../../../axios";
import React, { useEffect, useState } from "react";
import { useProductQuantity } from "../../../context/ProductQuantityContext";
import { TiArrowForwardOutline } from "react-icons/ti";
import Header from "../../admin/adminPanel/components/Header";
import { Link } from "react-router-dom";
import Loading from "../../../components/Loading";

export default function ShoppingCart() {
  const { productQuantity, updateProductQuantity } = useProductQuantity();
  const [cartItems, setCartItems] = useState([]);
  const [productUnit, setProductUnit] = useState(1);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalHT, setTotalHT] = useState(0);
  const [totalTVA, setTotalTVA] = useState(0);
  const [totalTTC, setTotalTTC] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get("/getCart");
        setCartItems(response.data.data);
        setLoading(false);
        // calculateTotals(response.data.data);
      } catch (error) {
        console.error("Error fetching shopping cart data:", error);
      }
    };

    fetchCartData();
  }, []);

  useEffect(() => {
    const updatedProductUnits = {};

    cartItems.forEach((item) => {
      updatedProductUnits[item.product.id] =
        productQuantity[item.product.id] || 1;
    });

    setProductUnit(updatedProductUnits);
  }, [cartItems, productQuantity]);

  const handleIncrement = (productId) => {
    try {
    } catch (error) {
      console.error("Error updating product quantity:", error);
      // Handle the error as needed
    }
    setProductUnit((prevUnits) => {
      const newQuantity = (prevUnits[productId] || 1) + 1;
      updateProductQuantity(productId, newQuantity);

      return { ...prevUnits, [productId]: newQuantity };
    });
    handleUpdateUnit(productId, "inc");
  };

  const handleDecrement = (productId) => {
    if (productUnit > 1) {
      setProductUnit((prevUnits) => {
        const currentQuantity = prevUnits[productId] || 1;
        const newQuantity = currentQuantity > 1 ? currentQuantity - 1 : 1;
        updateProductQuantity(productId, newQuantity);

        return { ...prevUnits, [productId]: newQuantity };
      });
    }
    handleUpdateUnit(productId, "dec");
  };

  const handleUpdateUnit = async (productId, scope) => {
    console.log(productId);
    console.log(scope);
    try {
      const response = await axios.put(`/updateProductQuantity/${productId}`, {
        scope,
      });
      console.log(response.data);

      const newQuantity = response.data.quantity;

      // Update the product quantity context
      updateProductQuantity(productId, newQuantity);

      setProductUnit((prevUnits) => ({
        ...prevUnits,
        [productId]: newQuantity,
      }));
    } catch (error) {
      console.error("Error updating product quantity:", error);
      // Handle the error as needed
    }
  };

  useEffect(() => {
    const updatedProductUnits = {};

    let newTotalHT = 0;
    let newTotalTVA = 0;

    cartItems.forEach((item) => {
      updatedProductUnits[item.product.id] =
        productQuantity[item.product.id] || 0;

      // Calculate totalHT for each item
      newTotalHT += item.product.prix * (productQuantity[item.product.id] || 0);
      // Calculate totalTVA for each item
      newTotalTVA +=
        item.product.prix * 0.19 * (productQuantity[item.product.id] || 0);
    });

    // Set the calculated totals to state
    setTotalHT(newTotalHT);
    setTotalTVA(newTotalTVA);
    setTotalTTC(newTotalHT + newTotalTVA);

    setProductUnit(updatedProductUnits);
  }, [cartItems, productQuantity]);

  const formatMoney = (amount) => {
    // Format the amount as a number with two decimal places
    const formattedAmount = Number(amount).toFixed(2);

    // Replace commas with spaces for thousands separator
    const numberWithSpaces = formattedAmount.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      " "
    );

    // Concatenate ",00" to the end
    return `${numberWithSpaces},00 DZD`;
  };

  const removeProductInCart = async (id) => {
    axios
      .delete(`/removeProductInCart/${id}`)
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });

  };

  // Usage in your component
  <td className="py-2 pl-2 text-right font-bold text-[#4d627b] text-xl tracking-[0.15rem]">
    {formatMoney(totalHT)}
  </td>;

  return (
    <div className="w-[90%] mx-auto">
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <>
          <Header category="cart" title="cart" role="client" />
          {cartItems && cartItems.length === 0 ? (
            <Link to={"/client/home"}>order Again</Link>
          ) : (
            <>
              <div className="relative overflow-x-auto  shadow-lg rounded-lg  my-8">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-5">
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
                    {cartItems.map((item, index) => (
                      <tr
                        className={`bg-${
                          index % 2 === 0 ? "white" : "green-800"
                        } border-b`}
                      >
                        <td className="p-4">
                          <img
                            src="/docs/images/products/apple-watch.png"
                            className="w-16 md:w-32 max-w-full max-h-full"
                            alt="Apple Watch"
                          />
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 ">
                          {item.product.name}
                        </td>
                        <td className="px-6 py-4">
                          <div className="">
                            <div className="inline-flex items-center mt-2">
                              <form className="max-w-xs mx-auto">
                                <div className="relative flex items-center max-w-[8rem]">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleIncrement(item.product.id)
                                    }
                                    className={`bg-blue-500 ${
                                      productUnit[item.product.id] >=
                                      item.product.quantity
                                        ? "opacity-50 cursor-not-allowed"
                                        : " hover:bg-gray-200"
                                    } text-white font-bold border rounded-s-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none`}
                                    disabled={
                                      productUnit[item.product.id] >=
                                      item.product.quantity
                                    }
                                  >
                                    +
                                  </button>
                                  <input
                                    type="text"
                                    value={productUnit[item.product.id] || 1}
                                    className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 "
                                    readOnly
                                  />
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleDecrement(
                                        item.product.id,
                                        productUnit
                                      )
                                    }
                                    className="bg-blue-500 border text-white font-bold border-bg-blue-500 rounded-e-lg p-3 h-11 focus:ring-gray-100  focus:ring-2 focus:outline-none"
                                  >
                                    -
                                  </button>
                                </div>

                                <div className="flex justify-center my-1 text-sm text">
                                  {(
                                    (productUnit[item.product.id] || 0) /
                                    item.product.coulissage
                                  ).toFixed(2)}
                                  <div className="text-[#db9a00]">
                                    ({item.product.coulissage}u)
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {item.product.prix}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => removeProductInCart(item.product.id)}
                            className="font-medium text-red-600 dark:text-red-500 hover:underline"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-14 mb-20 px-14 flex  float-end flex-col ">
                <table className="w-full">
                  <tbody>
                    <tr className="border-y border-gray-200">
                      <td className="py-2 pr-4 text-[#4d627b]">
                        Nombre d'articles:
                      </td>
                      <td className="py-2 pl-2 text-right text-[#4d627b] font-bold">
                        {cartItems.length}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 pr-4 text-[#4d627b] font-bold">
                        TOTAL HT:
                      </td>
                      <td className="py-2 pl-2 text-right font-bold text-[#4d627b] text-xl tracking-[0.15rem]">
                        {formatMoney(totalHT)}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 pr-4  text-[#4d627b]">TVA 19%:</td>
                      <td className="py-2 pl-2 text-[#4d627b] text-sm">
                        {totalTVA.toFixed(2)} %
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 border-b border-gray-300 text-[#4d627b]">
                        TOTAL TTC:
                      </td>
                      <td className="py-2 pl-2 border-b border-gray-300 font-bold text-blue-500 text-trackling of the oprerating of the process the amount of the recongnation of the  text-xl tracking-[0.15rem]">
                        {formatMoney(totalTTC)}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="flex justify-end my-6  text-white  ">
                  <Link
                    to={"/client/ordersummery"}
                    className=" w-fit flex justify-center items-center rounded px-2 py-1 bg-[#6285ae] text-white"
                  >
                    <TiArrowForwardOutline />
                    valider les commande
                  </Link>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
