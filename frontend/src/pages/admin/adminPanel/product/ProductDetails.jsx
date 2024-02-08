import axios from "../../../../axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";

export default function ProductDetails() {
  const [SingleProduct, setSingleProduct] = useState([]);
  const { id } = useParams();
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
    }
  }, [id]);

  console.log(SingleProduct); // This will still show the previous state

  return (
    <div
      className="container mx-auto my-8 p-6 
     rounded-md"
    >
      <Header/>
      <h2 className="text-2xl font-semibold text-white mb-4">
        SingleProduct Details
      </h2>
      <div>
        <img className="w-[200px]" src={SingleProduct.images} alt="" />
      </div>
      <div className="flex justify-center items-center flex-col gap-4">
        <div className="border border-black p-4 mb-4 ">
          <span className="font-bold">Name:</span>
          <span>{SingleProduct.name}</span>

          <span className="font-bold">Code:</span>
          <span>{SingleProduct.code}</span>
          <div className="flex ">
            <span className="font-bold ">Réf:</span>
            <span>{SingleProduct.ref}</span>
          </div>

          <span className="font-bold">Code Barre (EAN13):</span>
          <p>{SingleProduct.codebarreEAN13}</p>
          <span className="font-bold">Catégorie:</span>
          <p>{SingleProduct.categoryName}</p>
          <span className="font-bold">Type:</span>
          <p>{SingleProduct.type}</p>
          <span className="font-bold">Prix:</span>
          <p>{SingleProduct.prix}</p>
          <span className="font-bold">Prix d'achat:</span>
          <p>{SingleProduct.prix_dachat}</p>
          <span className="font-bold">Quantité:</span>
          <p>{SingleProduct.quantity}</p>
          <span className="font-bold">État du stock:</span>
          <p>{SingleProduct.etat}</p>
          <span className="font-bold">quantité_minimal:</span>
          <p>{SingleProduct.quantité_minimal}</p>

          {/* Add other details as needed */}
        </div>

        <div className="border border-black p-4 mb-4">
          <h1>Prix par groupe de clients</h1>
          <span className="font-bold">Grossite</span>
          <p>{SingleProduct.grossiste}</p>
        </div>
        <div className="border border-black p-4 mb-4">
          <h1>Informations sur le colisage</h1>
          <span className="font-bold">Colisage</span>
          <p>{SingleProduct.coulissage}</p>
          <span className="font-bold">Dimensions ( L X L X H)</span>
          <p>{SingleProduct.uniteLongueur}</p>
          <span className="font-bold">Colisage:</span>
          <p>{SingleProduct.width}</p>
          <span className="font-bold">Poids:</span>
          <p>{SingleProduct.Poid}</p>
        </div>
      </div>
      <Link
        to={"/admin/product"}
        className="bg-blue-500 p-5 rounded text-white font-bold "
      >
        retour
      </Link>
    </div>
  );
}
