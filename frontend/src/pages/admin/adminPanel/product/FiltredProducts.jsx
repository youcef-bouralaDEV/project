import { useParams } from "react-router-dom";
import axios from "../../../axios";
import React, { useEffect } from "react";

export default function FiltredProducts() {

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    let isMounted = true;
  const product_slug = useParams();
   
    axios.get(`fetchproducts/${product_slug}`).then((res) => {
      if (isMounted) {
        if (res.data.status === 200) {
            console.log(res.data);
        //   setProduct(res.data.product_data.product);
        //   setCategory(res.data.product_data.category);
          setLoading(false);
        } else if (res.data.status === 400) {
          console.log("Warning", res.data.message, " ");
        } else if (res.data.status === 404) {
       
          console.log("Warning", res.data.message, "error")
        }
      }
    });
  });

  return <div>FiltredProducts</div>;
}
