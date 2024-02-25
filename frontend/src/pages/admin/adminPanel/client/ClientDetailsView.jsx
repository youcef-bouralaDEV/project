import React, { useEffect, useState } from "react";
import axiosClient from "../../../../axios";
import { Link, useParams } from "react-router-dom";
import StateToggleButton from "./component/StateToggleButton";
import { MdOutlineModeEditOutline } from "react-icons/md";
import Modal2 from "../../../../modal/Modal2";

export default function ClientDetailsView() {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [clientData, setClientData] = useState({});
  const [generalInfoData, setGeneralInfoData] = useState([]);
  const [contactInfoData, setContactInfoData] = useState([]);
  const [fiscalInfoData, setFiscalInfoData] = useState([]);
  const [addressInfoData, setAddressInfoData] = useState([]);

  //   console.log(id);

  const handleUpdateClientData = (updatedClientData) => {
    setClientData(updatedClientData);
  };
  useEffect(() => {
    if (id) {
      setLoading(true);
      try {
        axiosClient.get(`GetClient/${id}`).then(({ data }) => {
          setClientData(data);
          console.log(data);
          setLoading(false)
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [id]);

  useEffect(() => {
    if (clientData) {
      setGeneralInfoData([
        { key: "Nom", value: clientData.name },
        { key: "Prénom", value: clientData.lastname || "-" },
        { key: "Username", value: clientData.username || "-" },
        { key: "Émail", value: clientData.email || "-" },
        { key: "Raison Social", value: clientData.raison_social || "-" },
        { key: "Nom du groupe", value: clientData.nomGroupe || "-" },
        { key: "Seuil de paiement", value: clientData.seuilPaiement || "--" },
        { key: "Solde", value: clientData.solde || "0,00 DZD" },
        {
          key: "État",
          value: clientData.etat,
        },
      ]);
      console.log(
        "Background Color:",
        clientData.etat === "Active" ? "#8EE4AF" : "#FCA5A5",
        clientData.etat
      );

      setContactInfoData([
        { key: "Mobile", value: clientData.mobile || "-" },
        { key: "Mobile 2", value: clientData.mobile2 || "-" },
        { key: "Tél. Fix", value: clientData.telFix || "-" },
        { key: "Fax", value: clientData.fax || "-" },
      ]);

      setFiscalInfoData([
        {
          key: "Registre de Commerce (RC)",
          value: clientData.registreCommerce || "-",
        },
        {
          key: "Numéro Identité Fiscal (NIF)",
          value: clientData.numIdentiteFiscal || "-",
        },
        {
          key: "Numéro Identité Statistique (NIS)",
          value: clientData.numIdentiteStatistique || "-",
        },
        {
          key: "Article d'Imposition (AI)",
          value: clientData.articleImposition || "-",
        },
      ]);

      setAddressInfoData([
        { key: "Adresse", value: clientData.adresse || "-" },
        { key: "Commune", value: clientData.commune || "-" },
        { key: "Wilaya", value: clientData.wilaya || "-" },
      ]);
    }
  }, [clientData]);

  const renderTable = (data) => (
    <table className="w-full my-3 divide-y divide-gray-900 rounded">
      <tbody className="bg-white divide-y  divide-gray-200">
        {data.map((row, index) => (
          <tr
            key={index}
            className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
          >
            <td className="px-2 py-1.5 text-sm font-bold  whitespace-nowrap text-[#4d627b]">
              {row.key}
            </td>
            {row.value && (
              <td className="px-2 py-1.5 text-sm whitespace-nowrap text-[#7f8da0]">
                {row.value}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
  if (loading) {
    return (
    <div class="flex justify-center items-centre gap-2">
      <div class="w-5 h-5 rounded-full animate-pulse bg-orange-600"></div>
      <div class="w-5 h-5 rounded-full animate-pulse bg-orange-600"></div>
      <div class="w-5 h-5 rounded-full animate-pulse bg-orange-600"></div>
    </div>
    )
  }
  return (
    <div className=" my-4 mx-10 p-10 overflow-hidden bg-white">
      <Modal2 open={open} setOpen={setOpen} message={"rrr"} />
      <div className="flex justify-end items-center mt-4 mr-3">
        <button className="flex justify-center items-center bg-orange-400 px-4 py-1 mr-2 text-white rounded">
          <MdOutlineModeEditOutline className="mr-2" />
          Modifier le mot de passe
        </button>
        <button onClick={() => setOpen(!open)}>
          <StateToggleButton
            clientData={clientData}
            id={id}
            onUpdateClientData={handleUpdateClientData}
          />
        </button>
      </div>
      <div className="my-3 mx-7 px-10 py-7 overflow-hidden bg-white">
        <div className="w-[70%] mx-auto ">
          <h1 className="mb-3 text-lg font-bold opacity-90">
            Informations générales
          </h1>
          <hr />
          {renderTable(generalInfoData)}

          {contactInfoData.length > 1 && (
            <>
              <h1 className="mb-3 mt-8 text-lg font-bold opacity-90">
                Information de contact
              </h1>
              <hr className="mb-5" />
              {renderTable(contactInfoData)}
            </>
          )}

          {fiscalInfoData.length > 1 && (
            <>
              <h1 className="mb-3 text-lg font-bold opacity-90">
                Coordonnées fiscales
              </h1>
              <hr className="mb-5 " />
              {renderTable(fiscalInfoData)}
            </>
          )}

          {addressInfoData.length > 1 && (
            <>
              <h1 className="mb-3 mt-8 text-2xl font-medium opacity-90">
                Adresse
              </h1>
              <hr className="mb-5 " />
              {renderTable(addressInfoData)}
            </>
          )}
        </div>
        <button className="block text-right mt-10 ml-5">
          <Link
            className="bg-orange-400 px-7 py-2 font-bold text-white rounded "
            to={"/admin/client"}
          >
            return
          </Link>
        </button>
      </div>
    </div>
  );
}
