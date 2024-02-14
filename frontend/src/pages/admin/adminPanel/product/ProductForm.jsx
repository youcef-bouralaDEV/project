import { useNavigate, useParams } from "react-router-dom";
import axios from "../../../../axios";
import React, { useEffect, useState } from "react";
import { useProductContext } from "../../../../context/ProductContext";
import Loading from "../../../../components/Loading";
import Header from "../components/Header";
import { FaCheck } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

export default function ProductForm() {
  const { categories, marks } = useProductContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [etatDropdownOpen, setEtatDropdownOpen] = useState(false);
  const [etatDuStockDropdownOpen, setEtatDuStockDropdownOpen] = useState(false);
  const [commandeParColisDropdownOpen, setCommandeParColisDropdownOpen] =
    useState(false);

  const [errors, setErrors] = useState({
    category_id: "",
    mark_id: "",
    name: "",
    quantity: "",
    prix: "",
  });
  const [NonRequiredValid, setNonRequiredValid] = useState({
    codebarreEAN13: false,
    code: false,
    ref: false,
    quantité_minimal: false,
    prix_dachat: false,
    grossiste: false,
    coulissage: false,
    height: false,
    length: false,
    width: false,
    poid: false,
    etat_du_stock: false,
    commande_Colis: false,
    uniteLongueur: false,
    unité_poids: false,
    description: false,
    // Add other non-required fields here as needed
  });

  const [productData, setProductData] = useState({
    id: "",
    name: "",
    category_id: "",
    mark_id: "",
    code: "",
    codebarreEAN13: "",
    ref: "",
    quantity: "",
    unite_poids: "",
    prix: "",
    prix_dachat: "",
    grossiste: "",
    coulissage: "",
    height: "",
    length: "",
    width: "",
    poid: "",
    etat_du_stock: "",
    uniteLongueur: "",
    description: "",
    etat: "",
    commande_Colis: "",
    Unite_poids: "",
    images: "",
  });

  const handleChanges = (e) => {
    const { name, files } = e.target;

    if (files) {
      console.log(files);
      setProductData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      // console.log(name);
      setProductData((prev) => ({ ...prev, [name]: e.target.value }));
    }
  };

  // console.log("productData Product Data:", productData);

  const validateForm = () => {
    let formValid = true;
    const newErrors = {
      category_id: "",
      mark_id: "",
      name: "",
      quantity: "",
      prix: "",
    };
    if (productData.name.trim() === "") {
      console.log("name", productData.name.trim());
      formValid = false;
      newErrors.name = "Nom ne peut être vide.";
    }
    if (productData.category_id.trim() === "") {
      console.log("category", productData.category_id.trim());

      formValid = false;
      newErrors.category_id = "category ne peut être vide.";
    }
    if (productData.mark_id.trim() === "") {
      formValid = false;
      newErrors.mark_id = "mark ne peut être vide.";
    }
    if (productData.quantity.toString().trim() === "") {
      formValid = false;
      newErrors.quantity = "Quantité ne peut être vide.";
    }

    if (productData.prix.toString().trim() === "") {
      formValid = false;
      newErrors.prix = "Prix d'achat ne peut être vide.";
    }

    setErrors(newErrors);
    setFormSubmitted(true);
    return formValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("validateForm");
      if (id) {
        try {
          await axios.put(`updateProduct/${id}`, {
            ...productData,
            category_id: productData.category.id,
            mark_id: productData.mark.id,
          });
          navigate("/admin/product");
        } catch (err) {
          console.log(err);ؤ        }
      } else {
        try {
          const formData = new FormData();
          for (const key in productData) {
            if (key === "category" || key === "mark") {
              // If the key is 'category' or 'mark', append their 'id' property
              formData.append(`${key}_id`, productData[key].id);
            } else {
              formData.append(key, productData[key]);
            }
          }
          await axios.post(`/createProducts`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          // console.log("create Product Data:", productData);
          navigate("/admin/product");
          console.log(formData);
        } catch (error) {
          console.error("Error creating product", error.message);
        }
      }
      // console.log(formData);
      setNonRequiredValid({
        codebarreEAN13: true,
        code: true,
        ref: true,
        quantité_minimal: true,
        prix_dachat: true,
        grossiste: true,
        coulissage: true,
        height: true,
        length: true,
        width: true,
        poid: true,
        etat_du_stock: true,
        commande_Colis: true,
        uniteLongueur: true,
        unité_poids: true,
        description: true,
      });
    }
  };
  console.log("productData Product Data:", productData);

  useEffect(() => {
    if (id) {
      setLoading(true);

      try {
        axios.get("getProduct/" + id).then(({ data }) => {
          // console.log(data);
          setProductData(data);
          setLoading(false);
        });
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  const handleDropdownToggle = (dropdown) => {
    switch (dropdown) {
      case "etat":
        setEtatDropdownOpen((prev) => !prev);
        setEtatDuStockDropdownOpen(false);
        setCommandeParColisDropdownOpen(false);
        break;
      case "etatDuStock":
        setEtatDuStockDropdownOpen((prev) => !prev);
        setEtatDropdownOpen(false);
        setCommandeParColisDropdownOpen(false);
        break;
      case "commandeParColis":
        setCommandeParColisDropdownOpen((prev) => !prev);
        setEtatDropdownOpen(false);
        setEtatDuStockDropdownOpen(false);
        break;
      default:
        break;
    }
  };

  return (
    <div className="px-5 w-full">
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <>
          <Header category="Nouveau" title="client" />
          <div className="md:m-8 rounded-3xl">
            <div className="py-4 bg-white rounded">
              <form onSubmit={handleSubmit} className="rounded px-5">
                <h1 className="mb-3 mt-5 text-lg font-medium opacity-90">
                  Détails du produit
                </h1>
                <hr className="mb-5" />

                <div className="w-[90%] mb-3 col-span-2 px-5">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-normal text-[#7a878e] dark:text-white"
                  >
                    Désignation
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={productData.name}
                    className={`w-full border border-solid border-opacity-3 rounded-md py-1 px-3 focus:outline-none focus:border-orange-400 transition duration-500 ${
                      formSubmitted
                        ? errors.name
                          ? "border-red-500"
                          : "border-green-400 focus:border-green-400"
                        : ""
                    }`}
                    onChange={handleChanges}
                  />
                  <span className="text-red-500 text-sm font-bold">
                    {errors.name}
                  </span>
                </div>

                <div className="w-[90%] mb-3 col-span-2 px-5">
                  <label
                    htmlFor="lastname"
                    className="block mb-2 text-sm font-medium text-[#7a878e] dark:text-white"
                  >
                    Code
                  </label>
                  <input
                    type="text"
                    name="code"
                    value={productData.code}
                    className={`w-full border ${
                      NonRequiredValid.code
                        ? "border-green-400 focus:border-green-400"
                        : "border-opacity-3"
                    } border-solid rounded-md py-1 px-3 focus:outline-none focus:border-orange-500 transition duration-500`}
                    onChange={handleChanges}
                  />
                </div>
                <div className="w-[90%] mb-3 col-span-2 px-5">
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-normal text-[#7a878e] dark:text-white"
                  >
                    Réf
                  </label>
                  <input
                    type="text"
                    name="ref"
                    value={productData.ref}
                    className={`w-full border ${
                      NonRequiredValid.ref
                        ? "border-green-400 focus:border-green-400"
                        : "border-opacity-3"
                    } border-solid rounded-md py-1 px-3 focus:outline-none focus:border-orange-500 transition duration-500`}
                    onChange={handleChanges}
                  />
                </div>

                <div className="w-[90%] mb-3 col-span-2 px-5">
                  <label className="block mb-2 text-sm font-normal text-[#7a878e] dark:text-white">
                    Code Barre (EAN13)
                  </label>
                  <input
                    name="codebarreEAN13"
                    type="text"
                    value={productData.codebarreEAN13}
                    className={`w-full border ${
                      NonRequiredValid.codebarreEAN13
                        ? "border-green-400 focus:border-green-400"
                        : "border-opacity-3"
                    } border-solid rounded-md py-1 px-3 focus:outline-none focus:border-orange-500 transition duration-500`}
                    onChange={handleChanges}
                  />
                </div>

                <div className="w-[90%] mb-3 col-span-2 px-5">
                  <label
                    htmlFor="category_id"
                    className="block mb-2 text-sm font-normal text-[#7a878e] dark:text-white"
                  >
                    Catégorie
                  </label>
                  <select
                    id="category_id"
                    name="category_id"
                    value={productData.category_id}
                    onChange={handleChanges}
                    className={`w-full border border-solid border-opacity-3 rounded-md py-1 px-3 focus:outline-none focus:border-orange-400 transition duration-500 ${
                      formSubmitted
                        ? errors.category_id
                          ? "border-red-500"
                          : "border-green-400 focus:border-green-400"
                        : ""
                    }`}
                  >
                    <option className="font-normal text-[#7a878e]">
                      {productData.category?.name || "Sélectionnez ..."}
                    </option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <span className="text-red-500 text-sm font-bold">
                    {errors.categories}
                  </span>
                </div>
                <div className="w-[90%] mb-3 col-span-2 px-5">
                  <label
                    htmlFor="mark"
                    className="block mb-2 text-sm font-normal text-[#7a878e] dark:text-white"
                  >
                    Marque
                  </label>
                  <select
                    id="mark"
                    name="mark_id"
                    value={productData.mark_id}
                    onChange={handleChanges}
                    className={`w-full border border-solid border-opacity-3 rounded-md py-1 px-3 focus:outline-none focus:border-orange-400 transition duration-500 ${
                      formSubmitted
                        ? errors.mark_id
                          ? "border-red-500"
                          : "border-green-400 focus:border-green-400"
                        : ""
                    }`}
                  >
                    <option className="font-normal text-[#7a878e]" value="">
                      {productData.mark?.name || "Sélectionnez ..."}
                    </option>
                    {marks.map((mark) => (
                      <option key={mark.id} value={mark.id}>
                        {mark.name}
                      </option>
                    ))}
                  </select>
                  <span className="text-red-500 text-sm font-bold">
                    {errors.marks}
                  </span>
                </div>
                <div className="w-[90%] mb-3 col-span-2 px-5">
                  <label className="block mb-2 text-sm font-normal text-[#7a878e] dark:text-white">
                    Quantité
                  </label>
                  <input
                    name="quantity"
                    type="text"
                    value={productData.quantity}
                    className={`w-full border border-solid border-opacity-3 rounded-md py-1 px-3 focus:outline-none focus:border-orange-400 transition duration-500 ${
                      formSubmitted
                        ? errors.quantity
                          ? "border-red-500"
                          : "border-green-400 focus:border-green-400"
                        : ""
                    }`}
                    onChange={handleChanges}
                  />
                  <span className="text-red-500 text-sm font-bold">
                    {errors.quantity}
                  </span>
                </div>
                <div className="w-[90%] mb-3 col-span-2 px-5">
                  <label
                    htmlFor="raison_social"
                    className="block mb-2 text-sm font-normal text-[#7a878e] dark:text-white"
                  >
                    Quantité minimale
                  </label>
                  <input
                    type="text"
                    name="quantité_minimal"
                    value={productData.quantité_minimal}
                    className={`w-full border ${
                      NonRequiredValid.quantité_minimal
                        ? "border-green-400 focus:border-green-400"
                        : "border-opacity-3"
                    } border-solid rounded-md py-1 px-3 focus:outline-none focus:border-orange-500 transition duration-500`}
                    onChange={handleChanges}
                  />
                </div>

                <div className="w-[90%] mb-3 col-span-2 px-5">
                  <label className="block mb-2 text-sm font-normal text-[#7a878e] dark:text-white">
                    Prix par défaut
                  </label>
                  <input
                    type="text"
                    name="prix"
                    value={productData.prix}
                    placeholder="DZD"
                    className={`w-full border border-solid border-opacity-3 rounded-md py-1 px-3 focus:outline-none focus:border-orange-400 transition duration-500 ${
                      formSubmitted
                        ? errors.prix
                          ? "border-red-500"
                          : "border-green-400 focus:border-green-400"
                        : ""
                    }`}
                    onChange={handleChanges}
                  />
                  <span className="text-red-500 text-sm font-bold">
                    {errors.prix}
                  </span>
                </div>
                <div className="w-[90%] mb-3 col-span-2 px-5">
                  <label className="block mb-2 text-sm font-normal text-[#7a878e] dark:text-white">
                    Prix d'achat Moyen Pondéré
                  </label>
                  <input
                    type="text"
                    name="prix_dachat"
                    value={productData.prix_dachat}
                    placeholder="DZD"
                    className={`w-full border ${
                      NonRequiredValid.prix_dachat
                        ? "border-green-400 focus:border-green-500"
                        : "border-opacity-3"
                    } border-solid rounded-md py-1 px-3 focus:outline-none focus:border-orange-500 transition duration-500`}
                    onChange={handleChanges}
                  />
                </div>
                <div className="flex justify-around items-center gap-x-3 w-[90%] my-16">
                  <div className="relative inline-block text-left">
                    <button
                      id="etatRadioButton"
                      onClick={() => handleDropdownToggle("etat")}
                      type="button"
                      className="text-white bg-orange-500 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      État
                      <IoIosArrowDown className="w-4 h-4 ms-2.5" />
                    </button>

                    {etatDropdownOpen && (
                      <div
                        id="état"
                        className="z-10 absolute left-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-60"
                      >
                        <ul className="p-2 space-y-1 text-sm text-gray-700">
                          <li>
                            <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                              <div className="flex items-center h-5">
                                <input
                                  checked
                                  id="Actif"
                                  name="etat"
                                  type="radio"
                                  value="Active"
                                  className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:orange:ring-blue-600"
                                  onChange={handleChanges}
                                />
                              </div>
                              <div className="ms-2 text-sm">
                                <label
                                  htmlFor="Actif"
                                  className="font-medium text-gray-900 dark:text-gray-300"
                                >
                                  <div>Actif</div>
                                </label>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                              <div className="flex items-center h-5">
                                <input
                                  id="Inactif"
                                  name="etat"
                                  type="radio"
                                  value="Inactive"
                                  onChange={handleChanges}
                                  className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:orange:ring-blue-600"
                                />
                              </div>
                              <div className="ms-2 text-sm">
                                <label
                                  htmlFor="Inactif"
                                  className="font-medium text-gray-900 dark:text-gray-300"
                                >
                                  <div>Inactif</div>
                                </label>
                              </div>
                            </div>
                          </li>
                          {/* Add more items as needed */}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="relative inline-block text-left">
                    <button
                      id="etatDuStock"
                      onClick={() => handleDropdownToggle("etatDuStock")}
                      type="button"
                      className="text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      État du stock
                      <IoIosArrowDown className="w-4 h-4 ms-2.5" />
                    </button>

                    {etatDuStockDropdownOpen && (
                      <div
                        id="etatDuStock"
                        className="z-10 absolute left-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-60 dark:bg-gray-700 dark:divide-gray-600"
                      >
                        <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200">
                          <li>
                            <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                              <div className="flex items-center h-5">
                                <input
                                  checked
                                  name="etat_du_stock"
                                  type="radio"
                                  value="Disponible"
                                  className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300  dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                  onChange={handleChanges}
                                />
                              </div>
                              <div className="ms-2 text-sm">
                                <label className="font-medium text-gray-900 dark:text-gray-300">
                                  <div>Disponible</div>
                                </label>
                              </div>
                            </div>
                          </li>
                          <li>
                            {/* First item example */}
                            <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                              <div className="flex items-center h-5">
                                <input
                                  name="etat_du_stock"
                                  type="radio"
                                  value="Indisponible"
                                  onChange={handleChanges}
                                  className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 focus:ring-2 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                />
                              </div>
                              <div className="ms-2 text-sm">
                                <label className="font-medium text-gray-900 dark:text-gray-300">
                                  <div>Indisponible</div>
                                </label>
                              </div>
                            </div>
                          </li>
                          <li>
                            {/* First item example */}
                            <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                              <div className="flex items-center h-5">
                                <input
                                  name="etat_du_stock"
                                  type="radio"
                                  value="Disponible_Prochainement"
                                  onChange={handleChanges}
                                  className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 focus:ring-2 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700  dark:bg-gray-600 dark:border-gray-500"
                                />
                              </div>
                              <div className="ms-2 text-sm">
                                <label className="font-medium text-gray-900 dark:text-gray-300">
                                  <div>Disponible Prochainement</div>
                                </label>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="relative inline-block text-left">
                    <button
                      id="CommandeParColisButton"
                      onClick={() => handleDropdownToggle("commandeParColis")}
                      type="button"
                      className="text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center "
                    >
                      CommandeParColisButton
                      <IoIosArrowDown className="w-4 h-4 ms-2.5" />
                    </button>

                    {commandeParColisDropdownOpen && (
                      <div
                        id="CommandeParColisButton"
                        className="z-10 absolute left-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-60 dark:bg-gray-700 dark:divide-gray-600"
                      >
                        <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200">
                          <li>
                            {/* First item example */}
                            <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                              <div className="flex items-center h-5">
                                <input
                                  checked
                                  id="ParDefaut"
                                  name="commande_Colis"
                                  type="radio"
                                  value="Par Defaut"
                                  onChange={handleChanges}
                                  className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:orange:ring-blue-600"
                                />
                              </div>
                              <div className="ms-2 text-sm">
                                <label
                                  htmlFor="ParDefaut"
                                  className="font-medium text-gray-900 dark:text-gray-300"
                                >
                                  <div>ParDefaut</div>
                                </label>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                              <div className="flex items-center h-5">
                                <input
                                  id="Oui"
                                  name="commande_Colis"
                                  type="radio"
                                  value="Oui"
                                  onChange={handleChanges}
                                  className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:orange:ring-blue-600"
                                />
                              </div>
                              <div className="ms-2 text-sm">
                                <label
                                  htmlFor="Oui"
                                  className="font-medium text-gray-900 dark:text-gray-300"
                                >
                                  <div>Oui</div>
                                </label>
                              </div>
                            </div>
                          </li>
                          <li>
                            {/* First item example */}
                            <div className="flex p-2 rounded hover:bg-gray-100">
                              <div className="flex items-center h-5">
                                <input
                                  id="Non"
                                  name="commande_Colis"
                                  type="radio"
                                  value="Non"
                                  onChange={handleChanges}
                                  className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:orange:ring-blue-600"
                                />
                              </div>
                              <div className="ms-2 text-sm">
                                <label
                                  htmlFor="Non"
                                  className="font-medium text-gray-900 dark:text-gray-300"
                                >
                                  <div>Non</div>
                                </label>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                <h1 className="mb-3 mt-8 text-2xl font-medium opacity-90">
                  Prix par groupe
                </h1>
                <hr className="mb-5" />
                <div className="w-[90%] mb-3 col-span-2 px-5">
                  <label
                    htmlFor="adresse"
                    className="block mb-2 text-sm font-normal text-[#7a878e] dark:text-white"
                  >
                    Grossite
                  </label>
                  <input
                    type="text"
                    name="grossiste"
                    value={productData.grossiste}
                    placeholder="DZD"
                    className={`w-full border ${
                      NonRequiredValid.grossiste
                        ? "border-green-400 focus:border-green-500"
                        : "border-opacity-3"
                    } border-solid rounded-md py-1 px-3 focus:outline-none focus:border-orange-500 transition duration-500`}
                    onChange={handleChanges}
                  />
                </div>
                <h1 className="mb-3 mt-8 text-2xl font-medium opacity-90">
                  Colisage de lots du produit
                </h1>
                <hr className="mb-5" />
                <div className="w-[90%] mb-3 col-span-2 px-5">
                  <label
                    htmlFor="raison_social"
                    className="block mb-2 text-sm font-normal text-[#7a878e] dark:text-white"
                  >
                    Colisage
                  </label>
                  <input
                    type="text"
                    name="coulissage"
                    value={productData.coulissage}
                    className={`w-full border ${
                      NonRequiredValid.coulissage
                        ? "border-green-400 focus:border-green-400"
                        : "border-opacity-3"
                    } border-solid rounded-md py-1 px-3 focus:outline-none focus:border-orange-500 transition duration-500`}
                    onChange={handleChanges}
                  />
                </div>
                <div className="w-[90%] mb-3 col-span-2 px-5">
                  <label className="block mb-2 text-sm font-normal text-[#7a878e] dark:text-white">
                    Dimensions (L x l x H)
                  </label>
                  <input
                    name="length"
                    type="text"
                    placeholder="Longeur"
                    value={productData.length}
                    className={`w-full border ${
                      NonRequiredValid.length
                        ? "border-green-400 focus:border-green-400"
                        : "border-opacity-3"
                    } border-solid rounded-md py-1 px-3 focus:outline-none focus:border-orange-500 transition duration-500`}
                    onChange={handleChanges}
                  />
                  <input
                    type="text"
                    name="width"
                    placeholder="Largeur"
                    value={productData.width}
                    className={`w-full border ${
                      NonRequiredValid.width
                        ? "border-green-400 focus:border-green-400"
                        : "border-opacity-3"
                    } border-solid rounded-md py-1 px-3 focus:outline-none focus:border-orange-500 transition duration-500`}
                    onChange={handleChanges}
                  />
                  <input
                    type="text"
                    name="height"
                    placeholder="Hauteur"
                    value={productData.height}
                    className={`w-full border ${
                      NonRequiredValid.height
                        ? "border-green-400 focus:border-green-400"
                        : "border-opacity-3"
                    } border-solid rounded-md py-1 px-3 focus:outline-none focus:border-orange-500 transition duration-500`}
                    onChange={handleChanges}
                  />
                  <span className="text-red-500 text-sm font-bold">
                    {errors.colisage}
                  </span>
                </div>
                <div className="w-[90%] mb-3 col-span-2 px-5">
                  <label className="block mb-2 text-sm font-normal text-[#7a878e] dark:text-white">
                    Unité de longueur
                  </label>
                  <select
                    name="uniteLongueur"
                    value={productData.uniteLongueur}
                    onChange={handleChanges}
                    className={`w-full border ${
                      NonRequiredValid.uniteLongueur
                        ? "border-green-400 focus:border-green-400"
                        : "border-opacity-3"
                    } border-solid rounded-md py-1 px-3 focus:outline-none focus:border-orange-500 transition duration-500`}
                  >
                    <option className="font-normal text-[#7a878e]" value="">
                      Sélectionnez ...
                    </option>
                    <option>Métre (m)</option>
                    <option>Centimétre (cm)</option>
                  </select>
                </div>
                <div className="w-[90%] mb-3 col-span-2 px-5">
                  <label className="block mb-2 text-sm font-normal text-[#7a878e] dark:text-white">
                    Poids
                  </label>
                  <input
                    type="text"
                    name="poid"
                    value={productData.poid}
                    className={`w-full border ${
                      NonRequiredValid.poid
                        ? "border-green-400 focus:border-green-400"
                        : "border-opacity-3"
                    } border-solid rounded-md py-1 px-3 focus:outline-none focus:border-orange-500 transition duration-500`}
                    onChange={handleChanges}
                  />
                </div>
                <div className="w-[90%] mb-3 col-span-2 px-5">
                  <label
                    htmlFor="wilaya"
                    className="block mb-2 text-sm font-normal text-[#7a878e] dark:text-white"
                  >
                    Unité poids
                  </label>
                  <select
                    name="Unité_poids"
                    value={productData.Unité_poids}
                    onChange={handleChanges}
                    className={`w-full border ${
                      NonRequiredValid.unité_poids
                        ? "border-green-400 focus:border-green-400"
                        : "border-opacity-3"
                    } border-solid rounded-md py-1 px-3 focus:outline-none focus:border-orange-500 transition duration-500`}
                  >
                    <option className="font-normal text-[#7a878e]" value="">
                      Sélectionnez ...
                    </option>
                    <option>kilogramme (kg)</option>
                    <option>Gramme (g)</option>
                  </select>
                </div>
                <h1 className="mb-3 mt-8 text-2xl font-medium opacity-90">
                  Images
                </h1>
                <hr className="mb-5" />
                <>
                  <link />

                  <div className="py-20 bg-white px-2">
                    <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
                      <div className="md:flex">
                        <div className="w-full p-3">
                          <div className="relative border-dotted h-48 rounded-lg  border-2 border-blue-700 bg-gray-100 flex justify-center items-center">
                            <div className="absolute">
                              <div className="flex flex-col items-center">
                                <i className="fa fa-folder-open fa-4x text-blue-700"></i>
                                <span className="block text-gray-400 font-normal">
                                  Attach your files here
                                </span>
                              </div>
                            </div>
                            <input
                              type="file"
                              className="h-full w-full opacity-0"
                              name="images"
                              onChange={handleChanges}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>

                <div className="w-full text-center">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2.5 rounded-full border border-green-400 mt-6 px-15 py-2 text-center font-medium text-green-400 hover:bg-opacity-90 lg:px-8 xl:px-10 hover:bg-green-300 hover:text-white sm:px-10"
                  >
                    <FaCheck className="text-green-400" />
                    Sauvegarder
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
