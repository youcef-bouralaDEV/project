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

        $data = $request->validated();

        $product = Product::create($data);

        if ($request->hasFile('images')) {
            $product->addMedia($request->file('images'))->toMediaCollection('images');
        }
        return new ProductsResource($product);
    }

    public function updateProduct(UpdateProductRequest $request, $id)
{   
    try {
        $product = Product::find($id);
        $product->update($request->validated());
        
        if ($request->hasFile('images')) {
            $product->addMedia($request->file('images'))->toMediaCollection('images');
        }
        

        return response()->json(new ProductsResource($product));
    } catch (\Exception $error) {
            return response()->json(['error' => $error->getMessage()], 500);
    }
}
    

    public function deleteProduct($id)
    {
        $product = Product::find($id);

        $product->delete();
        return response()->json(['message' => 'Product deleted successfully']);
    }
    
    public function getProduct($id){
        
        $product = Product::find($id);
        return response()->json(new ProductsResource($product));
        
    }
    
}