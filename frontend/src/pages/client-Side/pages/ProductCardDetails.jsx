import axios from "../../../axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BiChevronLeft,
  BiChevronRight,
  BiStar,
  BiHeart,
  BiCaretDown,
} from "react-icons/bi";
import Header from "../../admin/adminPanel/components/Header";
import { useProductQuantity } from "../../../context/ProductQuantityContext";
import Modal2 from "../../../modal/Modal2";

export default function ProductDetails() {
  const { productQuantity, updateProductQuantity } = useProductQuantity();
  const [SingleProduct, setSingleProduct] = useState([]);
  const [productUnit, setProductUnit] = useState(1);
  const { id } = useParams();
  const [isDescriptionOpen, setDescriptionOpen] = useState(false);

  useEffect(() => {
    if (id) {
      try {
        axios
          .get(`viewProduct/${id}`)
          .then((response) => {
            console.log(response.data.data);
            setSingleProduct(response.data.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
      setProductUnit(productQuantity[id] || 1);
    }
  }, [id, productQuantity]);

  const AddToCart = async () => {
    console.log(id);
    console.log(productUnit);
    try {
      const response = await axios.post("add-to-cart", {
        product_id: id,
        product_qty: productUnit,
      });
      console.log(response.data);
      console.log(product_id);
      console.log(product_qty);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleIncrement = () => {
    setProductUnit((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      updateProductQuantity(id, newQuantity);
      return newQuantity;
    });
  };
  console.log(productUnit);
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

  const toggleDescription = () => {
    setDescriptionOpen(!isDescriptionOpen);
  };

  console.log(SingleProduct);

  return (
    <>
      <Header category="single" role="client" title="product" />
      <section className="py-6 ">
        <div className="max-w-5xl  mx-auto">
          <div className="flex flex-wrap mb-24 -mx-4 border border-gray-300 py-2">
            <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0  ">
              <div className="sticky top-0 overflow-hidden">
                <div className="relative mb-6 lg:mb-10 lg:h-96 border border-gray-200 hover:border-yellow-400">
                  <a
                    className="absolute left-0 transform lg:ml-2 top-1/2 translate-1/2"
                    href="#"
                  >
                    <BiChevronLeft className="w-5 h-5 text-yellow-500 dark:text-yellow-200" />
                  </a>
                  <img
                    className="object-contain w-full lg:h-full"
                    src="https://i.postimg.cc/0jwyVgqz/Microprocessor1-removebg-preview.png"
                    alt=""
                  />
                  <a
                    className="absolute right-0 transform lg:mr-2 top-1/2 translate-1/2"
                    href="#"
                  >
                    <BiChevronRight className="w-5 h-5 text-yellow-500 dark:text-yellow-200" />
                  </a>
                </div>
                <div className="flex-wrap hidden -mx-2 md:flex">
                  <div className="w-1/2 p-2 sm:w-1/4">
                    <a
                      className="block border border-gray-200 hover:border-yellow-400 "
                      href="#"
                    >
                      <img
                        className="object-contain w-full lg:h-28"
                        src="https://i.postimg.cc/Z5KhRkD6/download-1-removebg-preview.png"
                        alt=""
                      />
                    </a>
                  </div>
                  <div className="w-1/2 p-2 sm:w-1/4">
                    <a
                      className="block border border-gray-200 hover:border-yellow-400 dark:border-gray-700 dark:hover:border-yellow-300"
                      href="#"
                    >
                      <img
                        className="object-contain w-full lg:h-28"
                        src="https://i.postimg.cc/Z5KhRkD6/download-1-removebg-preview.png"
                        alt=""
                      />
                    </a>
                  </div>
                  <div className="w-1/2 p-2 sm:w-1/4">
                    <a
                      className="block border border-gray-200 hover:border-yellow-400 dark:border-gray-700 dark:hover:border-yellow-300"
                      href="#"
                    >
                      <img
                        className="object-contain w-full lg:h-28"
                        src="https://i.postimg.cc/Z5KhRkD6/download-1-removebg-preview.png"
                        alt=""
                      />
                    </a>
                  </div>
                  {/* ... (repeat similar structure for other images) */}
                </div>
              </div>
            </div>
            <div className="w-full px-4 md:w-1/2">
              <div className="lg:pl-20">
                <div className="mb-6 ">
                  <div className="flex justify-between items-center">
                    <h2 className="mt-6 mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl">
                      {SingleProduct.name}
                    </h2>
                    <div className="flex flex-wrap items-center mb-6">
                      <ul className="flex mb-4 mr-2 lg:mb-0">
                        <li>
                          <a href="#">
                            <BiStar className="w-4 mr-1 text-yellow-500 dark:text-gray-400" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <BiStar className="w-4 mr-1 text-yellow-500 dark:text-gray-400" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <BiStar className="w-4 mr-1 text-yellow-500 dark:text-gray-400" />
                          </a>
                        </li>
                        {/* ... (repeat similar structure for other star icons) */}
                      </ul>
                    </div>
                  </div>
                  <p className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400 ">
                    <span>DZD {SingleProduct.prix}</span>
                    <span className="ml-3 text-base font-normal text-gray-500 line-through dark:text-gray-400">
                      DZD .10,000.00
                    </span>
                  </p>
                </div>
                <div className=" py-6 mb-6 border-t border-b border-gray-200">
                  <div className="flex items-center  ">
                    {SingleProduct.quantity > 0 ? (
                      <div className="flex flex-col  gap-y-6 justify-start items-center gap-x-6 ">
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
                            value={productUnit || 1}
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

                        <div className="flex justify-center my-1 text-sm text-gray-400">
                          {divisionResult}
                          <div className="text-[#db9a00]">
                            ({SingleProduct.coulissage}u)
                          </div>
                        </div>
                      </form>
                       {SingleProduct.quantity > 0 ? (
                
                        <button onClick={AddToCart} className="bg-orange-500 hover:bg-orange-500 text-white font-bold py-1 px-3 rounded">add to cart</button>
                      ):"not available"}
                       </div>
                    ) : (
                      <span className="text-xs text-white bg-red-600 rounded-full px-1">
                        Vous ne pouvez pas commander cette quantité
                      </span>
                    )}
                     
                  </div>
                </div>
              </div>
              <div>
                <label>Colissage</label>
              </div>
              <div className="mb-6">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={toggleDescription}
                >
                  <BiCaretDown
                    className={`w-6 h-6 mr-2 text-yellow-500 dark:text-yellow-200 ${
                      isDescriptionOpen ? "transform rotate-180" : ""
                    }`}
                  />
                  <span className="text-base text-gray-600 dark:text-gray-400">
                    Product Description
                  </span>
                </div>
                {isDescriptionOpen && (
                  <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                    {/* Add your product description here */}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nulla nec elit sit amet arcu molestie sollicitudin...
                  </div>
                )}
              </div>
             
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
