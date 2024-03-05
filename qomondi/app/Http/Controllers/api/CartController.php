<?php

namespace App\Http\Controllers\api;

use App\Models\Cart;
use App\Models\Product;
use App\Models\ShoppingCart;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CartController extends Controller
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

            $existingCartItem = Cart::where('product_id', $product_id)
                ->where('user_id', $user_id)
                ->first();

            if ($existingCartItem) {
                return response()->json([
                    'status' => 409,
                    'message' => $product->name . ' is already in your cart',
                ], 409);
            }

            $cartItem = Cart::create([
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

            $cartItems = Cart::with('product')->where('user_id', $user_id)->get();
            return response()->json([
                'status' => 200,
                'data' => $cartItems,
            ], 200);
        } catch (\Exception $error) {
            return response()->json(['error' => $error->getMessage()], 500);
        }
    }

    public function updateProductQuantity(Request $request, $productId)
    {
        try {
            $user_id = auth('sanctum')->user()->id;
            $scope = $request->input('scope');

            // Fetch the cart item
            $cartItem = Cart::where('product_id', $productId)
                ->where('user_id', $user_id)
                ->first();

            if (!$cartItem) {
                return response()->json([
                    'status' => 404,
                    'message' => 'Cart item not found',
                ], 404);
            }

            // Update the quantity based on the scope
            if ($scope === 'inc') {
                $cartItem->quantity++;
            } elseif ($scope === 'dec') {
                $cartItem->quantity = max($cartItem->quantity - 1, 0);
            }

            $cartItem->save();

            return response()->json([
                'status' => 200,
                'quantity' => $cartItem->quantity,
            ], 200);
        } catch (\Exception $error) {
            return response()->json(['error' => $error->getMessage()], 500);
        }
    }

    public function removeProductInCart($productId)
    {
        try {
            $user_id = auth('sanctum')->user()->id;

            $cartItem = Cart::where('product_id', $productId)
                ->where('user_id', $user_id)
                ->first();

            if (!$cartItem) {
                return response()->json([
                    'status' => 404,
                    'message' => 'Cart item not found',
                ], 404);
            }

            $cartItem->delete();

            return response()->json([
                'status' => 200,
                'message' => 'Product removed from cart successfully',
            ], 200);
        } catch (\Exception $error) {
            return response()->json(['error' => $error->getMessage()], 500);
        }
        
    }
}