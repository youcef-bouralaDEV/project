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
      default:
        break;
    }
  };
  const handleFilterClick = () => {
    const filtered = products.filter((product) => {
      const categoryMatch =
        !selectedCategory ||
        product.category_id.toString() === selectedCategory;
      const markMatch =
        !selectedMark || product.mark_id.toString() === selectedMark;
      const nameMatch =
        !searchName ||
        product.nom.toLowerCase().includes(searchName.toLowerCase());
      const etatMatch =
        !searchByEtat ||
        product.etat.toLowerCase() === searchByEtat.toLowerCase();

      const codeMatch =
        !searchByCode ||
        (product.code && product.code.toString()) === searchByCode;

      const refMatch =
        !searchByRef || (product.ref && product.ref.toString()) === searchByRef;

      return (
        categoryMatch &&
        markMatch &&
        nameMatch &&
        etatMatch &&
        codeMatch &&
        refMatch
      );
    });

    setFiltredProducts(filtered);
    console.log(filtredProducts);
  };

  //   console.log(products);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    setLaoding(true);
    try {
      let response = await axios.get("/getProducts");
    //   console.log(response.data);
      setLaoding(false);
      setProducts(response.data);
      setFiltredProducts(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getCategories = async () => {
    try {
      const response = await axios.get("/getCategories");
      // console.log(response.data);
      setCategories(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getMarks = async () => {
    try {
      const response = await axios.get("/getMarks");
      // console.log(response.data);
      setMarks(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCategories();
    getMarks();
    getProducts();
  }, []);
  return (
    <ProductContx.Provider
      value={{
        products,
        loading,
        filtredProducts,
        handleChanges,
        handleFilterClick,
        searchName,
        searchByCode,
        searchByRef,
        searchByEtat,
        getProducts,
        selectedCategory,
        selectedMark,
        categories,
        marks,
      }}
    >
      {children}
    </ProductContx.Provider>
  );
};

export const useProductContext = () => useContext(ProductContx);
