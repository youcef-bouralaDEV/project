<?php

namespace App\Http\Controllers\api;

use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

use Illuminate\Http\Request;



class OrderController extends Controller
{
    public function getOrders()
    {
        try {
            $user_id = auth('sanctum')->user()->id;
            $orders = Order::where('user_id', $user_id)->get();

            return response()->json(['orders' => $orders], 200);
        } catch (\Exception $error) {
            return response()->json(['error' => $error->getMessage()], 500);
        }
    }
    public function getOrder(Request $request, $id)
    {
        try {
            $user_id = auth('sanctum')->user()->id;
            $order = Order::where('user_id', $user_id)->where('id', $id)->get();
            $orderItem = OrderItem::with('product')->where('order_id', $id)->get();
            $previousOrders = Order::where('user_id', $user_id)->count();

            $order->load('user');    
        
            return response()->json(['order' => $order , 'orderItem' => $orderItem,'previousOrders'=>$previousOrders], 200);
        } catch (\Exception $error) {
            return response()->json(['error' => $error->getMessage()], 500);
        }
    }

    public function store()
    {
        try {
            $user_id = auth('sanctum')->user()->id;
            $cart = Cart::where('user_id', $user_id)->get();


            if (!$cart || count($cart) == 0) {
                return; // Cart is empty, stop the logic here
            }

            $total_ttc = 0;
            $nmb_Items = 0;
            $totalWeight = 0;
            $totalVolume = 0;


            $cartItems_total = Cart::where('user_id', $user_id)->get();

            foreach ($cartItems_total as $prod) {
                $total_ttc += $prod->product->prix * $prod->quantity;
                $totalWeight += $prod->quantity * $prod->product->weight;
                $totalVolume += $prod->quantity * ($prod->product->height * $prod->product->length * $prod->product->width);
                
                $newQuantity = $prod->product->quantity - $prod->quantity;
                $etat_du_stock = ($newQuantity < 1) ? 'Indisponible' : $prod->product->etat_du_stock;

                // Update the product details
                $prod->product->update([
                    'quantity' => $newQuantity,
                    'etat_du_stock' => $etat_du_stock,
                ]);
            }



            $nmb_Items = count($cartItems_total);
            $orderNumber = 'INV ' . date('Y/m');


            $order = Order::create([
                'user_id' => $user_id,
                'order_nmbr' => $orderNumber,
                'orderState' => 'En attente',
                "responsable_commercial" => "client",
                "total_ttc" => $total_ttc,
                "nombre_articles" => $nmb_Items,
                'total_weight' => $totalWeight . ' kg',
                'total_volume' => $totalVolume . ' m3',
            ]);
            $order->load('user');


            $orderItem = [];
            foreach ($cart as $cartItem) {

                $orderItems = OrderItem::create([
                    'order_id' => $order->id,
                    'order_Status' => $order->orderStatus,
                    'product_id' => $cartItem->product->id,
                    'price' => $cartItem->product->prix,
                    'quantity' => $cartItem->quantity,
                ]);
                $orderItems->load('product');
                $orderItem[] = $orderItems;
                // Delete the cart item after creating the order item
                $cartItem->delete();
            }
            return response()->json(['order' => $order, 'orderItem' => $orderItem], 200);
        } catch (\Exception $error) {
            Log::error($error);
            return response()->json(['message' => $error->getMessage()], 500);
        }
    }

    public function cancelOrder($id)
{
    try {
        $order = Order::findOrFail($id);

        // Step 1: Update Order Status
        $order->update([
            'orderState' => 'Annuler',
        ]);

        // Step 2: Rollback Product Quantities
        $orderItems = $order->orderItems;
        foreach ($orderItems as $orderItem) {
            Log::Info("quntity in cart",$orderItem->quantity);
            Log::Info("quntity in product",$orderItem->product->quantity);

            $product = $orderItem->product;
            $newQuantity = $product->quantity + $orderItem->quantity;
            Log::Info($newQuantity);

            // Optionally, update the stock status based on the new quantity
            $etat_du_stock = ($newQuantity < 1) ? 'Indisponible' : $product->etat_du_stock;

            // Update the product details
            $product->update([
                'quantity' => $newQuantity,
                'etat_du_stock' => $etat_du_stock,
            ]);
        }

        return response()->json(['message' => 'Order canceled successfully'], 200);
    } catch (\Exception $error) {
        return response()->json(['error' => $error->getMessage()], 500);
    }
}

    public function recreateOrder($id)
{
    try {
        $order = Order::findOrFail($id);

        // Step 1: Create a New Order
        $newOrder = Order::create([
            'user_id' => $order->user_id,
            'order_nmbr' => 'INV ' . date('Y/m'),
            'orderState' => 'En attente', // Set to the desired initial state
            "responsable_commercial" => "client",
            "total_ttc" => $order->total_ttc,
            "nombre_articles" => $order->nombre_articles,
            'total_weight' => $order->total_weight,
            'total_volume' => $order->total_volume,
        ]);

        // Step 2: Deduct Product Quantities
        $orderItems = $order->orderItems;
        foreach ($orderItems as $orderItem) {
            $product = $orderItem->product;
            $newQuantity = $product->quantity - $orderItem->quantity;

            // Optionally, update the stock status based on the new quantity
            $etat_du_stock = ($newQuantity < 1) ? 'Indisponible' : $product->etat_du_stock;

            // Update the product details
            $product->update([
                'quantity' => $newQuantity,
                'etat_du_stock' => $etat_du_stock,
            ]);

            // Create a new order item
            OrderItem::create([
                'order_id' => $newOrder->id,
                'order_Status' => $newOrder->orderStatus,
                'product_id' => $product->id,
                'price' => $product->prix,
                'quantity' => $orderItem->quantity,
            ]);
        }

        return response()->json(['message' => 'Order recreated successfully'], 200);
    } catch (\Exception $error) {
        return response()->json(['error' => $error->getMessage()], 500);
    }
}

}