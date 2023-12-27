<?php

namespace App\Http\Controllers\api;

use Illuminate\Support\Facades\Log;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\ProductsResource;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;

class ProductsControllers extends Controller
{

    public function getProducts()
    {
        $products = Product::all();
        return response()->json(ProductsResource::collection($products));
    }

    public function show($id)
    {
        $product = Product::find($id);

        return new ProductsResource($product);
    }

    public function store(StoreProductRequest $request)
    {
        return response()->json($request->file('images'), 500);

        $data = $request->validated();

        $product = Product::create($data);

        if ($request->hasFile('image')) {
            foreach ($request->file('images') as $image) {
                $product->addMedia($image)->toMediaCollection('images');
            }
        }
        return new ProductsResource($product);
    }

    public function updateProduct(UpdateProductRequest $request, $id)
    {
        $product = Product::find($id);
        $product->update($request->validated());
        return new ProductsResource($product);
    }

    public function deleteProduct($id)
    {
        $product = Product::find($id);

        $product->delete();
        return response()->json(['message' => 'Product deleted successfully']);
    }
}