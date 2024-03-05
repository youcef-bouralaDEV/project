import { useParams } from "react-router-dom";
import axios from "../axios";
import { createContext, useContext, useEffect, useState } from "react";

const ProductContx = createContext();
export const ProductProvider = ({ children }) => {
  const [loading, setLaoding] = useState(false);
  const [products, setProducts] = useState([]);
  const [filtredProducts, setFiltredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedMark, setSelectedMark] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchByCode, setSearchByCode] = useState("");
  const [searchByRef, setSearchByRef] = useState("");
  const [searchByEtat, setSearchByEtat] = useState("");
  const [categories, setCategories] = useState([]);
  const [marks, setMarks] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2000);
 

  useEffect(() => {
    getCategories();
    getMarks();
    getProducts();
  }, []);

  const handleChanges = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "category":
        setSelectedCategory(value);
        break;
      case "name":
        setSearchName(value);
        break;
      case "mark":
        setSelectedMark(value);
        break;
      case "etat":
        setSearchByEtat(value);
        break;
      case "code":
        setSearchByCode(value);
        break;
      case "ref":
        setSearchByRef(value);
        break;
      case "minPrice":
        setMinPrice(value);
        break;
      case "maxPrice":
        setMaxPrice(value);
        break;
      default:
        break;
    }
  };

  const handleFilterClick = () => {
    const filtered = products.filter((product) => {
      const categoryMatch =
        !selectedCategory ||
        product.category.id.toString() === selectedCategory;
      // console.log(selectedCategory);
      // console.log(!selectedCategory || product.category.id.toString() === selectedCategory);

      const markMatch =
        !selectedMark || product.mark.id.toString() === selectedMark;

      const nameMatch =
        !searchName ||
        product.name.toLowerCase().includes(searchName.toLowerCase());
      // console.log("product.name:", product.name);
      // console.log("searchName:", searchName);
      // console.log("markMatch:", nameMatch);

      const etatMatch =
        !searchByEtat ||
        product.etat.toLowerCase() === searchByEtat.toLowerCase();

      const codeMatch =
        !searchByCode ||
        (product.code && product.code.toString()) === searchByCode;

      const refMatch =
        !searchByRef || (product.ref && product.ref.toString()) === searchByRef;
      const priceMatch =
        (!minPrice || parseFloat(product.prix) >= parseFloat(minPrice)) &&
        (!maxPrice || parseFloat(product.prix) <= parseFloat(maxPrice));
      // console.log("product.price:", parseFloat(product.prix));
      // console.log("minPrice:", parseFloat(minPrice));
      // console.log("maxPrice:", parseFloat(maxPrice));
      // console.log("priceMatch:", priceMatch);
      return (
        categoryMatch &&
        markMatch &&
        nameMatch &&
        etatMatch &&
        codeMatch &&
        refMatch &&
        priceMatch
      );
    });

    setFiltredProducts(filtered);
    // console.log(filtered);
  };

 

  // console.log(filtredProducts);
  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedMark("");
    setMinPrice(0);
    setMaxPrice(2000);
    setSearchByEtat(""), setSearchByRef(null);
    setSearchByCode(null);
    setSearchName("");
    handleFilterClick();
  };
  const getProducts = async () => {
    setLaoding(true);
    try {
      let response = await axios.get("/getProducts");
      // console.log(response.data);
      setProducts(response.data);
      setFiltredProducts(response.data);
      setLaoding(false);
    } catch (err) {
      console.log(err);
    }
  };
  const getCategories = async () => {
    try {
      const response = await axios.get("/getCategory");
      console.log(response.data);
      setCategories(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getMarks = async () => {
    try {
      const response = await axios.get("/getMarks");
      // console.log(response.data.marks);
      setMarks(response.data.marks);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ProductContx.Provider
      value={{
        products,
        loading,
        filtredProducts,
        handleChanges,
        handleFilterClick,
        clearFilters,
        searchName,
        searchByCode,
        searchByRef,
        searchByEtat,
        getProducts,
        selectedCategory,
        selectedMark,
        categories,
        marks,
        minPrice,
        maxPrice,
      
      }}
    >
      {children}
    </ProductContx.Provider>
  );
};

export const useProductContext = () => useContext(ProductContx);
