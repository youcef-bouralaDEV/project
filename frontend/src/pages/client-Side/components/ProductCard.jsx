import { useState } from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const [productUnit, setProductUnit] = useState(0);
console.log(product.name);
  const handleIncrement = () => {
    setProductUnit((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (productUnit > 1) {
      setProductUnit((prevQuantity) => prevQuantity - 1);
    }
  };
  const divisionResult = (productUnit / product.coulissage).toFixed(2);
  
  return (
    <div
      key={product.id}
      className="relative  flex  w-[250px] max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
    >
      <div className="relative w-full mx-3 mt-3  h-60 overflow-hidden rounded-xl">
        <img
          className="object-cover"
          src={product.images}
          alt="product image"
        />
        <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
          39% OFF
        </span>
      </div>

      <div className="mt-4 px-5 pb-5">
        <a href="#">
          <h5 className="text-xl tracking-tight text-slate-900">
            {product.name}
          </h5>
        </a>
        <div className="mt-2 mb-2 flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-slate-900">
              {product.prix}$
            </span>
            <span className="text-sm text-slate-900 line-through">$687</span>
          </p>
        </div>
        <div className="flex mb-5 items-center font-bold text-green-600">
          {product.etat_du_stock}
        </div>

        <form className="max-w-xs mx-auto">
          <div className="relative flex items-center max-w-[8rem]">
            <button
              type="button"
              id="decrement-button"
              onClick={handleIncrement}
              className={`bg-gray-100 ${
                productUnit >= product.quantity
                  ? "opacity-50 cursor-not-allowed"
                  : "dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200"
              } border rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none`}
              disabled={productUnit >= product.quantity}
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
              className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
            >
              -
            </button>
          </div>

          <div className="flex gap-2">
            {divisionResult}
            <div>({product.coulissage}u)</div>
          </div>
        </form>
      </div>
      <div className=" block w-fit text-right p-1 mb-5 bg-blue-500 ">
        <Link to={"/client/productCardDetails/" + product.id}>Details</Link>
      </div>
    </div>
  );
}
