import React, { useEffect, useState } from "react";
import OrderDetailsComponent from "../components/OrderDetailsComponent";
import Loading from "../../../components/Loading";
import axios from "../../../axios";

export default function OrderPage() {
  const [order, setOrder] = useState(null);
  const [orderItem, setorderItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSummary();
  }, []);

  async function getSummary() {
    try {
      const response = await axios.post("/createOrder");
      console.log(response.data);
      setOrder(response.data.order);
      setorderItem(response.data.orderItem);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      {loading ? (
        <Loading loading={loading} />
      ) : order ? (
        <OrderDetailsComponent order={order} orderItem={orderItem} />
      ) : (
        <p>there is no commande</p>
      )}
    </div>
  );
}
