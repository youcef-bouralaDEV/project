
import { useEffect } from "react";
import { useProductContext } from "../../../context/ProductContext";
import ProductsList from "../components/ProductsList";


export default function ClientDashBoard() {
  const { loading, filtredProducts ,getProducts } = useProductContext();

  useEffect(()=> {
    getProducts();
  },[])


  
  return (
    <div>
      <ProductsList />
    </div>
  );
}
