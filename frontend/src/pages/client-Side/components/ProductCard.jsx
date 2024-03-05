import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdFavoriteBorder, MdOutlineArrowRightAlt } from "react-icons/md";
import { useProductQuantity } from "../../../context/ProductQuantityContext";
import Modal2 from "../../../modal/Modal2";

export default function ProductCard({ product }) {
  const { productQuantity, updateProductQuantity } = useProductQuantity();
  const [open, setOpen] = useState(false);

  const [productUnit, setProductUnit] = useState(0);

  

  useEffect(() => {
    setProductUnit(productQuantity[product.id] || 0);
  }, [product.id, productQuantity]);

 
  const etatColorClass =
    product.etat_du_stock === "Disponible"
      ? "border-green-500 text-green-700 "
      : "border-red-500 text-red-700";

  return (
    <div
      key={product.id}
      className="w-[290px] bg-white shadow  md:w-60 rounded  "
    >
      <Modal2 open={open} setOpen={setOpen} message={"fff"} />

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
            {product.etat_du_stock}
          </span>
        </div>
      </div>
      <div className="p-4 flex flex-col items-center">
        <h1 className="text-gray-800 text-center mt-1 font-bold">
          {product.name}
        </h1>
        <p className="text-center text-gray-800 mt-1"> {product.prix} DZD</p>
      
        {/* <div onClick={() => setOpen(!open)}>
          <AddToCartButton id={product.id} quantity={product.quantity} />
        </div> */}
        <button className="py-1 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50 mt-2 w-full flex items-center justify-center">
          <Link to={"/client/productCardDetails/" + product.id}>Details</Link>
          <MdOutlineArrowRightAlt />
        </button>
      </div>
    </div>
  );
}
