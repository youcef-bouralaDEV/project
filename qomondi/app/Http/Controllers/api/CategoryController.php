<?php

namespace App\Http\Controllers\api;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CategoryController extends Controller
{
    public function getCategories()
{
    try {
        $categories = Category::select('id', 'Nom')->get();

        return response()->json($categories, 200);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Failed to fetch categories', $e], 500);
    }
}
}