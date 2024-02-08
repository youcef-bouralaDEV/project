import { FaLock, FaUnlock } from "react-icons/fa";
import axios from "../../../../../axios";

export default function StateToggleButton({
  clientData,
  id,
  onUpdateClientData,
}) {

  const isUserActive = clientData.etat === "Active";

  const handleToggleClientState = async () => {
    try {
      const response = await axios.put(`/toggleClientState/${id}`);
      const updatedClientData = response.data;
      onUpdateClientData(updatedClientData);
    } catch (error) {
      console.error("Error toggling client state:", error);
    }
    // console.log(clientData);
  };

  return (
    <>
    <button
      onClick={handleToggleClientState}
      className={`px-4 py-1 text-white rounded ${
        isUserActive ? "bg-red-500" : "bg-green-500"
      }`}
    >
      {isUserActive ? (
        <div className="flex justify-center items-center">
          <FaLock className="mr-2" /> Bloquer cet utilisateur
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <FaUnlock className="mr-2" /> Débloquer cet utilisateur
        </div>
      )}
    </button>
    </>
  );
}
