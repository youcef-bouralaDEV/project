import React, { useEffect, useState } from "react";
import axios from "../../../../axios";
import { useParams } from "react-router-dom";
import OrderDetails from "./OrderDetails";
import Loading from "../../../../components/Loading";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [orderItem, setorderItem] = useState(null);
  const [previousOrders, setPreviousOrders] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    getOrder();
  }, []);
  async function getOrder() {
    try {
      const response = await axios.get("getOrderDetails/"+id);
      console.log(response.data);
      setOrder(response.data.order);
      setorderItem(response.data.orderItem);
      setPreviousOrders(response.data.previousOrders);
    } catch (err) {
      console.log(err);
    }
  }
  
  return (
    <div>
      {loading ? (
        <Loading loading={loading} />
      ) : order ? (
        <OrderDetails order={order} orderItem={orderItem} previousOrders={previousOrders}/>
      ) : (
        <p>there is no commande</p>
      )}
    </div>
  );
}
