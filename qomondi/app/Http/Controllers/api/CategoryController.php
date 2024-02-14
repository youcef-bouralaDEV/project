<?php

namespace App\Http\Controllers\api;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Product;

class CategoryController extends Controller
{

    public function index()
    {
        $category = Category::all();
        if ($category) {

            return response()->json([
                'status' => 200,
                'categories' => 
                $category
            
            ]);
        } else {
            return response()->json([
                'status' => 400,
                'message' => 'No category Available'
            ]);
        }
    }

    public function getCategories()
    {
        try {
            $categories = Category::select('id', 'Nom')->get();

            return response()->json($categories, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch categories', $e], 500);
        }
    }
    public function product($slug)
    {
        $category = Category::where('slug', $slug)->first();
        if ($category) {
            $product = Product::where('category_id', $category->id)->get();
            if ($product) {
                return response()->json([
                    'status' => 200,
                    'product_data' => [
                        'product' => $product,
                        'category' => $category,
                    ]
                ]);
            } else {
                return response()->json([
                    'status' => 400,
                    'message' => 'No Product Available'
                ]);
            }
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'no sush category found '
            ]);
        }
    }
}