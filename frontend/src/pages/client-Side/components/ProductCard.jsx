import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdFavoriteBorder, MdOutlineArrowRightAlt } from "react-icons/md";
import { useProductQuantity } from "../../../context/ProductQuantityContext";
import axiosClient from "../../../axios";
import Modal2 from "../../../modal/Modal2";

const AddToCartButton = ({ id, quantity }) => {
  const [loading, setLoading] = useState(false);

  const addToCart = async () => {
    try {
      setLoading(true);

      const response = await axiosClient.post('add-to-cart', {
        product_id: id,
        product_qty: quantity,
      });

      

      // Handle success, e.g., show a success message or update the UI
    } catch (error) {
      console.error('Error:', error.message);
      // Handle error, e.g., show an error message to the user
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={addToCart} disabled={loading}>
      {loading ? 'Adding to Cart...' : 'Add to Cart'}
    </button>
  );
};


export default function ProductCard({ product }) {
  const { productQuantity,updateProductQuantity } = useProductQuantity();
  const [open, setOpen] = useState(false);

  const [productUnit, setProductUnit] = useState(0);
  
  useEffect(() => {
    setProductUnit(productQuantity[product.id] || 0);
  }, [product.id, productQuantity]);

  const handleIncrement = () => {
    setProductUnit((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      updateProductQuantity(product.id, newQuantity);
      return newQuantity;
    });
  };

  const handleDecrement = () => {
    if (productUnit > 1) {
      setProductUnit((prevQuantity) => {
        const newQuantity = prevQuantity - 1;
        updateProductQuantity(product.id, newQuantity);
        return newQuantity;
      });
    }
  };

 
  const divisionResult = (productUnit / product.coulissage).toFixed(2);
  const etatColorClass =
    product.etat === "Active"
      ? "border-green-500 text-green-700 "
      : "border-red-500 text-red-700";

  return (
    <div
      key={product.id}
      className="w-[290px] bg-white shadow  md:w-60 rounded  "
    >
  <Modal2 open={open} setOpen={setOpen} message={"fff"}/>

      <div
        className="h-48 w-full bg-gray-200 flex flex-col justify-between p-4 bg-cover bg-center rounded"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/7989741/pexels-photo-7989741.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')",
        }}
      >
        <div className="flex justify-between">
          <button className="text-white hover:text-yellow-500 ">
            <MdFavoriteBorder />
          </button>
        </div>
        <div>
          <span
            className={`uppercase text-xs bg-green-50 p-1 font-medium select-none rounded ${etatColorClass}`}
          >
            {product.etat}
          </span>
        </div>
      </div>
      <div className="p-4 flex flex-col items-center">
        <h1 className="text-gray-800 text-center mt-1 font-bold">
          {product.name}
        </h1>
        <p className="text-center text-gray-800 mt-1"> {product.prix} DZD</p>
        {/* <div className="inline-flex items-center mt-2">
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

            <div className="flex justify-center my-1">
              {divisionResult}
              <div>({product.coulissage}u)</div>
            </div>
          </form>
        </div> */}
           <button onClick={()=>setOpen(!open)}>
        <AddToCartButton id={product.id} quantity={product.quantity} />
          </button>
        <button className="py-1 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50 mt-2 w-full flex items-center justify-center">
          <Link to={"/client/productCardDetails/" + product.id}>Details</Link>
          <MdOutlineArrowRightAlt  />

       
        </button>
      </div>
    </div>

   
  );
}
