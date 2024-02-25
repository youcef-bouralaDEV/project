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
  const { id } = useParams();
    
  const [SingleProduct, setSingleProduct] = useState([]);
  const [isDescriptionOpen, setDescriptionOpen] = useState(false);
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

  const toggleDescription = () => {
    setDescriptionOpen(!isDescriptionOpen);
  };

  // console.log(SingleProduct)
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
      setProductUnit(productQuantity[id] || 0);
    }
  }, [id , productQuantity]);

  console.log(SingleProduct);

  return (
    <>
      <Header category="single" role="client" title="product"  />
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
                    {SingleProduct.etat_du_stock === "Indisponible" ? (
                      <span className="text-xs text-white bg-red-600 rounded-full px-1">
                        Vous ne pouvez pas commander cette quantité
                      </span>
                    ) : (
                      "Disponible"
                    )}
                  </div>

              
                </div>
                <div>
                  <lable>Colissage</lable>
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
        </div>
      </section>
    </>
    // <div
    //   className="container mx-auto my-8 p-6
    //  rounded-md"
    // >
    //   <Header/>
    //   <h2 className="text-2xl font-semibold text-white mb-4">
    //     SingleProduct Details
    //   </h2>
    //   <div>
    //     <img className="w-[200px]" src={SingleProduct.images} alt="" />
    //   </div>
    //   <div className="flex justify-center items-center flex-col gap-4">
    //     <div className="border border-black p-4 mb-4 ">
    //       <span className="font-bold">Name:</span>
    //       <span>{SingleProduct.name}</span>

    //       <span className="font-bold">Code:</span>
    //       <span>{SingleProduct.code}</span>
    //       <div className="flex ">
    //         <span className="font-bold ">Réf:</span>
    //         <span>{SingleProduct.ref}</span>
    //       </div>

    //       <span className="font-bold">Code Barre (EAN13):</span>
    //       <p>{SingleProduct.codebarreEAN13}</p>
    //       <span className="font-bold">Catégorie:</span>
    //       <p>{SingleProduct.categoryName}</p>
    //       <span className="font-bold">Type:</span>
    //       <p>{SingleProduct.type}</p>
    //       <span className="font-bold">Prix:</span>
    //       <p>{SingleProduct.prix}</p>
    //       <span className="font-bold">Prix d'achat:</span>
    //       <p>{SingleProduct.prix_dachat}</p>
    //       <span className="font-bold">Quantité:</span>
    //       <p>{SingleProduct.quantity}</p>
    //       <span className="font-bold">État du stock:</span>
    //       <p>{SingleProduct.etat}</p>
    //       <span className="font-bold">quantité_minimal:</span>
    //       <p>{SingleProduct.quantité_minimal}</p>

    //       {/* Add other details as needed */}
    //     </div>

    //     <div className="border border-black p-4 mb-4">
    //       <h1>Prix par groupe de clients</h1>
    //       <span className="font-bold">Grossite</span>
    //       <p>{SingleProduct.grossiste}</p>
    //     </div>
    //     <div className="border border-black p-4 mb-4">
    //       <h1>Informations sur le colisage</h1>
    //       <span className="font-bold">Colisage</span>
    //       <p>{SingleProduct.coulissage}</p>
    //       <span className="font-bold">Dimensions ( L X L X H)</span>
    //       <p>{SingleProduct.uniteLongueur}</p>
    //       <span className="font-bold">Colisage:</span>
    //       <p>{SingleProduct.width}</p>
    //       <span className="font-bold">Poids:</span>
    //       <p>{SingleProduct.Poid}</p>
    //     </div>
    //   </div>
    //   <Link
    //     to={"/admin/product"}
    //     className="bg-blue-500 p-5 rounded text-white font-bold "
    //   >
    //     retour
    //   </Link>
    // </div>
  );
}
