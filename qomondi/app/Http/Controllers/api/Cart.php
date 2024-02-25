<?php

namespace App\Http\Controllers\api;

use App\Models\Product;
use App\Models\ShoppingCart;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class Cart extends Controller
{
    public function addToCart(Request $request)
    {
        try {
            $user_id = auth('sanctum')->user()->id;
            $product_id = $request->product_id;
            $product_qty = $request->product_qty;

            $product = Product::find($product_id);

            if (!$product) {
                return response()->json([
                    'status' => 404,
                    'message' => 'Product not found',
                ], 404);
            }

            $existingCartItem = ShoppingCart::where('product_id', $product_id)
                ->where('user_id', $user_id)
                ->first();

            if ($existingCartItem) {
                return response()->json([
                    'status' => 409,
                    'message' => $product->name . ' is already in your cart',
                ], 409);
            }

            $cartItem = ShoppingCart::create([
                'user_id' => $user_id,
                'product_id' => $product_id,
                'quantity' => $product_qty,
            ]);


            return response()->json([
                'status' => 201,
                'message' => $cartItem,
            ], 201);
        } catch (\Exception $error) {
            return response()->json(['error' => $error->getMessage()], 500);
        }
    }


    public function getCartItems()
    {
        try {
            $user_id = auth('sanctum')->user()->id;

            $cartItems = ShoppingCart::with('product')->where('user_id', $user_id)->get();
            return response()->json([
                'status' => 200,
                'data' => $cartItems,
            ], 200);
        } catch (\Exception $error) {
            return response()->json(['error' => $error->getMessage()], 500);
        }
    }
}