<?php

use App\Http\Controllers\api\Cart;
use App\Http\Controllers\api\CartController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\MarksController;
use App\Http\Controllers\api\ClientsController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\api\OrderController;
use App\Http\Controllers\api\ProductsControllers;
use App\Http\Controllers\api\WilayaCommuneController;
use App\Models\Order;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::middleware('auth:sanctum')->group(function () {
  Route::post('/logout', [UserController::class, 'logout']);

  Route::get('/GetUser', [ClientsController::class, 'GetUser']);

  Route::put('/updateClient/{id}', [ClientsController::class, 'update']);
  Route::post('/CreateClient', [ClientsController::class, 'create']);
  Route::get('/GetClients', [ClientsController::class, 'GetClients']);
  Route::get('/GetClient/{id}', [ClientsController::class, 'GetClient']);
  Route::delete('/deleteClient/{id}', [ClientsController::class, 'destroy']);
  Route::put('/toggleClientState/{id}', [ClientsController::class, 'toggleClientState']);

  Route::get('/getProduct/{id}', [ProductsControllers::class, 'getProduct']);
  Route::get('/getProducts', [ProductsControllers::class, 'getProducts']);
  Route::delete('/deleteProduct/{id}', [ProductsControllers::class, 'deleteProduct']);
  Route::get('/viewProduct/{id}', [ProductsControllers::class, 'show']);
  Route::post('/createProducts', [ProductsControllers::class, 'store']);
  Route::put('/updateProduct/{id}', [ProductsControllers::class, 'updateProduct']);

  //category routes
  Route::get('/getCategories', [CategoryController::class, 'getCategories']);
  Route::get('/getCategory', [CategoryController::class, 'getCategory']);

  //mark routes
  Route::get('/getMarks', [MarksController::class, 'getMarks']);

  //cart routes
  Route::post('/add-to-cart', [CartController::class, 'addToCart']);
  Route::get('/getCart', [CartController::class, 'getCartItems']);
  Route::put('/updateProductQuantity/{productId}',[CartController::class, 'updateProductQuantity']);
  Route::delete('/removeProductInCart/{productId}', [CartController::class, 'removeProductInCart']);


  //order routes
  Route::post('/createOrder', [OrderController::class, 'store']);
  Route::get('/getorders', [OrderController::class, 'getOrders']);
  Route::get('/getOrderDetails/{OrderId}', [OrderController::class, 'getOrder']);

Route::post('/cancel/{id}', [OrderController::class, 'cancelOrder']);
Route::post('/recreate/{id}', [OrderController::class, 'recreateOrder']);




  //willaya and commune routes
  Route::get('/getWilayasAndCommunes', [WilayaCommuneController::class, 'getWilayasAndCommunes']);
});

Route::post('login', [UserController::class, "login"]);
Route::post('signup', [UserController::class, 'signup']);







// routes/web.php or routes/api.php
// Route::options('/{any}',[ ClientsController::class, "options"])->where('any', '.*');



Route::options('{any}', function () {
  return response()->json(['status' => 'ok'])
    ->header('Access-Control-Allow-Origin', '*')
    ->header('Access-Control-Allow-Methods', 'GET,POST, PUT, DELETE, OPTIONS')
    ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
})->where('any', '.*');



// The response() function is used for generating HTTP response