import { useNavigate, useParams } from "react-router-dom";
import axios from "../../../../axios";
import React, { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { FaCheck } from "react-icons/fa";
import Header from "../components/Header";
import Loading from "../../../../components/Loading";

export default function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [wilayaData, setWilayaData] = useState([]);
  const [uniqueWilayas, setUniqueWilayas] = useState([]);
  const [selectedWilaya, setSelectedWilaya] = useState("");
  const [communeNames, setCommuneNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [Update, setUpdate] = useState({
    id: null,
    name: "",
    lastname: "",
    email: "",
    password: "",
    mobile: "",
    raison_social: "",
    wilaya: "",
    commune: "",
    username: "",
    adresse: "",
    groupe: "",
    seuil_paiement: "",
    mobile_2: "",
    tel_fix: "",
    fax: "",
    coordonnees_fiscales: "",
    registre_commerce: "",
    num_identite_fiscal: "",
    num_identite_statistique: "",
    article_imposition: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    lastname: "",
    email: "",
    raison_social: "",
    mobile: "",
    wilaya: "",
    commune: "",
  });
  const [nonRequiredValid, setNonRequiredValid] = useState({
    username: false,
    adresse: false,
    groupe: false,
    seuil_paiement: false,
    mobile_2: false,
    tel_fix: false,
    fax: false,
    coordonnees_fiscales: false,
    registre_commerce: false,
    num_identite_fiscal: false,
    num_identite_statistique: false,
    article_imposition: false,
  });
  const validateForm = () => {
    let formValid = true;
    const newErrors = {
      name: "",
      lastname: "",
      email: "",
      raison_social: "",
      mobile: "",
      wilaya: "",
      commune: "",
    };

    // Validate required fields
    if (Update.name.trim() === "") {
      formValid = false;
      newErrors.name = "Nom ne peut être vide.";
    }

    if (Update.lastname.trim() === "") {
      formValid = false;
      newErrors.lastname = "Prénom ne peut être vide.";
    }

    if (Update.email.trim() === "") {
      formValid = false;
      newErrors.email = "Email ne peut être vide.";
    }

    if (Update.raison_social.trim() === "") {
      formValid = false;
      newErrors.raison_social = "Raison Social ne peut être vide.";
    }

    if (Update.mobile.trim() === "") {
      formValid = false;
      newErrors.mobile = "Mobile ne peut être vide.";
    } else if (Update.mobile.trim().length > 10) {
      formValid = false;
      newErrors.mobile = "Mobile doit comporter entre 1 et 10 chiffres.";
    }

    if (Update.wilaya.trim() === "") {
      formValid = false;
      newErrors.wilaya = "Wilaya ne peut être vide.";
    }

    if (Update.commune.trim() === "") {
      formValid = false;
      newErrors.commune = "Commune ne peut être vide.";
    }

    setErrors(newErrors);
    setFormSubmitted(true);
    return formValid;
  };

  // console.log(id);
  useEffect(() => {
    if (id) {
      setLoading(true);
      try {
        axios.get(`GetClient/${id}`).then(({ data }) => {
          setUpdate(data);
          // console.log(data);
          setLoading(false);
        });
      } catch (error) {
        console.log(error.response.data);
      }
    }
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(validateForm());
    if (validateForm()) {
      if (Update.id) {
        try {
          let response = await axios.put(`updateClient/${Update.id}`, Update);
          setUpdate(response.data);
          navigate("/admin/client");
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          axios.post("/CreateClient", Update).then(({ data }) => {
            setUpdate(data);
            navigate("/admin/client");
          });
        } catch (error) {
          console.log(error.response.data);
        }
      }
    }
    setNonRequiredValid({
      username: true,
      adresse: true,
      groupe: true,
      seuil_paiement: true,
      mobile_2: true,
      tel_fix: true,
      fax: true,
      coordonnees_fiscales: true,
      registre_commerce: true,
      num_identite_fiscal: true,
      num_identite_statistique: true,
      article_imposition: true,
    });
  };
  useEffect(() => {
    try {
      axios.get("getWilayasAndCommunes").then((response) => {
        setWilayaData(response.data);
        setUniqueWilayas(
          Array.from(new Set(response.data.map((entry) => entry.wilaya_name)))
        );
      });
    } catch (error) {
      console.error("Error fetching wilaya data:", error);
    }
  }, []);

  useEffect(() => {
    if (Update.wilaya) {
      const selectedWilayaData = wilayaData.filter(
        (entry) => entry.wilaya_name === Update.wilaya
      );
      console.log(selectedWilayaData);
      console.log(selectedWilaya);
      if (selectedWilayaData) {
        setCommuneNames(
          selectedWilayaData.map((commune) => commune.commune_name)
        );
      } else {
        setCommuneNames([]);
      }
    }
  }, [Update.wilaya, wilayaData]);

  // console.log(wilayaData);
  // console.log(communeNames);
  console.log(Update);

  return (
    <>
      <div className="px-5 w-full">
        {loading ? (
          <Loading loading={loading} />
        ) : (
          <>
            <Header category="Nouveau" title="client" />
            <div className="md:m-8 rounded-3xl">
              <div className="py-4 bg-white rounded">
                <form onSubmit={onSubmit} className="rounded px-5">
                  {Update.id ? <p>user: {Update.name}</p> : <p>New user</p>}
                  <h1 className="mb-3 mt-5 text-lg font-medium opacity-90">
                    Informations générales
                  </h1>
                  <hr className="mb-5" />

                  <div className="w-[90%] mb-3 col-span-2 px-5">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-normal text-[#7a878e] dark:text-white"
                    >
                      Nom
                    </label>
                    <input
                      type="text"
                      value={Update.name}
                      className={`w-full border border-solid border-opacity-3 rounded-md py-1 px-3 focus:outline-none focus:border-orange-400 transition duration-500 ${
                        formSubmitted
                          ? errors.name
                            ? "border-red-500"
                            : "border-green-400 focus:border-green-400"
                          : ""
                      }`}
                      onChange={(e) =>
                        setUpdate({ ...Update, name: e.target.value })
                      }
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
                      Prénom
                    </label>
                    <input
                      type="text"
                      value={Update.lastname}
                      className={`w-full border border-solid border-opacity-3 rounded-md py-1 px-3 focus:outline-none focus:border-orange-400 transition duration-500 ${
                        formSubmitted
                          ? errors.lastname
                            ? "border-red-500"
                            : "border-green-400 focus:border-green-400"
                          : ""
                      }`}
                      onChange={(e) =>
                        setUpdate({ ...Update, lastname: e.target.value })
                      }
                    />
                    <span className="text-red-500 text-sm font-bold">
                      {errors.lastname}
                    </span>
                  </div>
                  <div className="w-[90%] mb-3 col-span-2 px-5">
                    <label
                      htmlFor="username"
                      className="block mb-2 text-sm font-normal text-[#7a878e] dark:text-white"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      value={Update.username}
                      className={`w-full border ${
                        nonRequiredValid.username
                          ? "border-green-400 focus:border-green-400"
                          : "border-opacity-3"
                      } border-solid rounded-md py-1 px-3 focus:outline-none focus:border-orange-500 transition duration-500`}
                      onChange={(e) =>
                        setUpdate({ ...Update, username: e.target.value })
                      }
                    />
                  </div>

                  <div className="w-[90%] mb-3 col-span-2 px-5">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-normal text-[#7a878e] dark:text-white"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      value={Update.email}
                      className={`w-full border border-solid border-opacity-3 rounded-md py-1 px-3 focus:outline-none focus:border-orange-400 transition duration-500 ${
                        formSubmitted
                          ? errors.email
                            ? "border-red-500"
                            : "border-green-400 focus:border-green-400"
                          : ""
                      }`}
                      onChange={(e) =>
                        setUpdate({ ...Update, email: e.target.value })
                      }
                    />
                    <span className="text-red-500 text-sm font-bold">
                      {errors.email}
                    </span>
                  </div>
                  <div className="w-[90%] mb-3 col-span-2 px-5">
                    <label
                      htmlFor="groupe"
                      className="block mb-2 text-sm font-normal text-[#7a878e] dark:text-white"
                    >
                      Groupe
                    </label>
                    <input
                      type="text"
                      value={Update.groupe}
                      className={`w-full border ${
                        nonRequiredValid.groupe
                          ? "border-green-400 focus:border-green-400"
                          : "border-opacity-3"
                      } border-solid rounded-md py-1 px-3 focus:outline-none focus:border-orange-500 transition duration-500`}
                      onChange={(e) =>
                        setUpdate({ ...Update, groupe: e.target.value })
                      }
                    />
                  </div>
                  <div className="w-[90%] mb-3 col-span-2 px-5">
                    <label
                      htmlFor="raison_social"
                      className="block mb-2 text-sm font-normal text-[#7a878e] dark:text-white"
                    >
                      Raison Social
                    </label>
                    <input
                      type="text"
                      value={Update.raison_social}
                      className={`w-full border border-solid border-opacity-3 rounded-md py-1 px-3 focus:outline-none focus:border-orange-400 transition duration-500 ${
                        formSubmitted
                          ? errors.raison_social
                            ? "border-red-500"
                            : "border-green-400 focus:border-green-400"
                          : ""
                      }`}
                      onChange={(e) =>
                        setUpdate({ ...Update, raison_social: e.target.value })
                      }
                    />
                    <span className="text-red-500 text-sm font-bold">
                      {errors.raison_social}
                    </span>
                  </div>

                  <div className="w-[90%] mb-3 col-span-2 px-5">
                    <label
                      htmlFor="wilaya"
                      className="block mb-2 text-sm font-normal text-[#7a878e] dark:text-white"
                    >
                      Wilaya
                    </label>
                    <select
                      id="wilaya"
                      className={`w-full border border-solid border-opacity-3 rounded-md py-1 px-3 focus:outline-none focus:border-orange-400 transition duration-500 ${
                        formSubmitted
                          ? errors.wilaya
                            ? "border-red-500"
                            : "border-green-400 focus:border-green-400"
                          : ""
                      }`}
                      value={Update.wilaya}
                      onChange={(e) =>
                        setUpdate({ ...Update, wilaya: e.target.value })
                      }
                    >
                      <option className="font-normal text-[#7a878e]" value="">
                        Sélectionnez une wilaya
                      </option>
                      {uniqueWilayas?.map((wilaya, index) => (
                        <option
                          className="font-normal text-gray-500"
                          key={index}
                          value={wilaya}
                        >
                          {index + 1}- {wilaya}
                        </option>
                      ))}
                    </select>
                    <span className="text-red-500 text-sm font-bold">
                      {errors.wilaya}
                    </span>
                  </div>
                  <div className="w-[90%] mb-3 col-span-2 px-5">
                    <label
                      htmlFor="commune"
                      className="block mb-2 text-sm font-normal text-[#7a878e] dark:text-white"
                    >
                      Commune
                    </label>

                    <select
                      id="commun"
                      value={Update.commune}
                      className={`w-full border border-solid border-opacity-3 rounded-md py-1 px-3 focus:outline-none focus:border-orange-400 transition duration-500 ${
                        formSubmitted
                          ? errors.commune
                            ? "border-red-500"
                            : "border-green-400 focus:border-green-400"
                          : ""
                      }`}
                      onChange={(e) =>
                        setUpdate({ ...Update, commune: e.target.value })
                      }
                    >
                      <option className="font-normal text-[#7a878e] " value="">
                        Sélectionnez une commun
                      </option>
                      {communeNames.map((communeName, index) => (
                        <option key={index}>
                          {" "}
                          {index + 1}- {communeName}
                        </option>
                      ))}
                    </select>
                    <span className="text-red-500 text-sm font-bold">
                      {errors.commune}
                    </span>
                  </div>

                  <div className="w-[90%] mb-3 col-span-2 px-5">
                    <label
                      htmlFor="adresse"
                      className="block mb-2 text-sm font-normal text-[#7a878e] dark:text-white"
                    >
                      Adresse
                    </label>
                    <input
                      type="text"
                      value={Update.adresse}
                      className={`w-full border ${
                        nonRequiredValid.adresse
                          ? "border-green-400 focus:border-green-500"
                          : "border-opacity-3"
                      } border-solid rounded-md py-1 px-3 focus:outline-none focus:border-orange-500 transition duration-500`}
                      onChange={(e) =>
                        setUpdate({ ...Update, adresse: e.target.value })
                      }
                    />
                  </div>

                  <h1 className="mb-3 mt-8 text-2xl font-medium opacity-90">
                    Information de contact
                  </h1>
                  <hr className="mb-5" />

                  <div className="w-[90%] mb-3 col-span-2 px-5">
                    <label
                      htmlFor="mobile"
                      className="block mb-2 text-sm font-normal text-[#7a878e] dark:text-white"
                    >
                      Mobile
                    </label>
                    <input
                      type="tel"
                      value={Update.mobile}
                      className={`w-full border border-solid border-opacity-3 rounded-md py-1 px-3 focus:outline-none focus:border-orange-400 transition duration-500 ${
                        formSubmitted
                          ? errors.mobile
                            ? "border-red-500"
                            : "border-green-400 focus:border-green-400"
                          : ""
                      }`}
                      onChange={(e) =>
                        setUpdate({ ...Update, mobile: e.target.value })
                      }
                    />
                    <span className="text-red-500 text-sm font-bold">
                      {errors.mobile}
                    </span>
                  </div>
                  <div className="w-[90%] mb-3 col-span-2 px-5">
                    <label
                      htmlFor="mobile_2"
                      className="block mb-2 text-sm font-normal text-[#7a878e] dark:text-white"
                    >
                      Mobile 2
                    </label>
                    <input
                      type="tel"
                      value={Update.mobile_2}
                      className={`w-full border ${
                        nonRequiredValid.mobile_2
                          ? "border-green-400 focus:border-green-400"
                          : "border-opacity-3"
                      } border-solid rounded-md py-1 px-3 focus:outline-none focus:border-orange-500 transition duration-500`}
                      onChange={(e) =>
                        setUpdate({ ...Update, mobile_2: e.target.value })
                      }
                    />
                  </div>

                  <div className="w-[90%] mb-3 col-span-2 px-5">
                    <label
                      htmlFor="tel_fix"
                      className="block mb-2 text-sm font-normal text-[#7a878e] dark:text-white"
                    >
                      Tel Fix
                    </label>
                    <input
                      type="tel"
                      value={Update.tel_fix}
                      className={`w-full border ${
                        nonRequiredValid.tel_fix
                          ? "border-green-400 focus:border-green-400"
                          : "border-opacity-3"
                      } border-solid rounded-md py-1 px-3 focus:outline-none focus:border-orange-500 transition duration-500`}
                      onChange={(e) =>
                        setUpdate({ ...Update, tel_fix: e.target.value })
                      }
                    />
                  </div>
                  <div className="w-[90%] mb-3 col-span-2 px-5">
                    <label
                      htmlFor="fax"
                      className="block mb-2 text-sm font-normal text-[#7a878e] dark:text-white"
                    >
                      Fax
                    </label>
                    <input
                      type="tel"
                      value={Update.fax}
                      className={`w-full border ${
                        nonRequiredValid.fax
                          ? "border-green-400 focus:border-green-400"
                          : "border-opacity-3"
                      } border-solid rounded-md py-1 px-3 focus:outline-none focus:border-orange-500 transition duration-500`}
                      onChange={(e) =>
                        setUpdate({ ...Update, fax: e.target.value })
                      }
                    />
                  </div>

                  <h1 className="mb-3 mt-8 text-2xl font-medium opacity-90">
                    Coordonnées fiscales
                  </h1>
                  <hr className="mb-5 " />

                  <div className="w-[90%] mb-3 col-span-2 px-5">
                    <label
                      htmlFor="registre_commerce"
                      className="block mb-2 text-sm font-normal text-[#7a878e] dark:text-white"
                    >
                      Registre Commerce
                    </label>

                    <InputMask
                      maskChar="_"
                      mask="99_999999-99/99"
                      value={Update.registre_commerce}
                      onChange={(e) =>
                        setUpdate({
                          ...Update,
                          registre_commerce: e.target.value,
                        })
                      }
                      className={`w-full border ${
                        nonRequiredValid.registre_commerce
                          ? "border-green-400 focus:border-green-400"
                          : "border-opacity-3"
                      } border-solid rounded-md py-1 px-3 focus:outline-none focus:border-orange-500 transition duration-500`}
                    />
                  </div>
                  <div className="w-[90%] mb-3 col-span-2 px-5">
                    <label
                      htmlFor="num_identite_fiscal"
                      className="block mb-2 text-sm font-normal text-[#7a878e] dark:text-white"
                    >
                      Num Identite Fiscal
                    </label>
                    <input
                      type="text"
                      value={Update.num_identite_fiscal}
                      className={`w-full border ${
                        nonRequiredValid.num_identite_fiscal
                          ? "border-green-400 focus:border-green-400"
                          : "border-opacity-3"
                      } border-solid rounded-md py-1 px-3 focus:outline-none focus:border-orange-500 transition duration-500`}
                      onChange={(e) =>
                        setUpdate({
                          ...Update,
                          num_identite_fiscal: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="w-[90%] mb-3 col-span-2 px-5">
                    <label
                      htmlFor="num_identite_statistique"
                      className="block mb-2 text-sm font-normal text-[#7a878e] dark:text-white"
                    >
                      Num Identite Statistique
                    </label>
                    <input
                      type="text"
                      value={Update.num_identite_statistique}
                      className={`w-full border ${
                        nonRequiredValid.num_identite_statistique
                          ? "border-green-400 focus:border-green-400"
                          : "border-opacity-3"
                      } border-solid rounded-md py-1 px-3 focus:outline-none focus:border-orange-500 transition duration-500`}
                      onChange={(e) =>
                        setUpdate({
                          ...Update,
                          num_identite_statistique: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="w-[90%] mb-3 col-span-2 px-5">
                    <label
                      htmlFor="article_imposition"
                      className="block mb-2 text-sm font-normal text-[#7a878e] dark:text-white"
                    >
                      Article d'Imposition (AI)
                    </label>
                    <InputMask
                      maskChar="_"
                      mask="99999999999"
                      value={Update.article_imposition}
                      className={`w-full border ${
                        nonRequiredValid.article_imposition
                          ? "border-green-400 focus:border-green-400"
                          : "border-opacity-3"
                      } border-solid rounded-md py-1 px-3 focus:outline-none focus:border-orange-500 transition duration-500`}
                      onChange={(e) =>
                        setUpdate({
                          ...Update,
                          article_imposition: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="w-[90%] mb-3 col-span-2 px-5">
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-normal text-[#7a878e] dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      value={Update.password}
                      className="w-full border border-gray-300 rounded-md py-1 px-3 focus:outline-none focus:border-orange-500"
                      onChange={(e) =>
                        setUpdate({ ...Update, password: e.target.value })
                      }
                    />
                  </div>
                  <div className="w-full text-center">
                    <button className="inline-flex items-center justify-center gap-2.5 rounded-full border border-green-400 mt-6 px-15 py-2 text-center font-medium text-green-400 hover:bg-opacity-90 lg:px-8 xl:px-10 hover:bg-green-300 hover:text-white sm:px-10">
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
    </>
  );
}
