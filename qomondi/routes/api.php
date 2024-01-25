<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MarksController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\api\ClientsController;
use App\Http\Controllers\api\ProductsControllers;

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

    Route::get('/getProduct/{id}', [ProductsControllers::class, 'getProduct']);
    Route::get('/getProducts', [ProductsControllers::class, 'getProducts']);
    Route::delete('/deleteProduct/{id}', [ProductsControllers::class, 'deleteProduct']);
    Route::get('/viewProduct/{id}', [ProductsControllers::class, 'show']);
    Route::post('/createProducts', [ProductsControllers::class, 'store']);
    Route::get('/getMarks', [MarksController::class, 'getMarks']);
    Route::put('/updateProduct/{id}', [ProductsControllers::class, 'updateProduct']);
    
    //category routes
    Route::get('/getCategories', [CategoryController::class, 'index']);
    Route::get('/getCategory', [CategoryController::class, 'index']);
});

Route::post('login', [UserController::class, "login"]);
Route::post('signup', [UserController::class, 'signup']);







// routes/web.php or routes/api.php
// Route::options('/{any}',[ ClientsController::class, "options"])->where('any', '.*');



Route::options('{any}', function () {
    return response()->json(['status' => 'ok'])
        ->header('Access-Control-Allow-Origin', '*')
        ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE , OPTIONS')
        ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
})->where('any', '.*');



// The response() function is used for generating HTTP response