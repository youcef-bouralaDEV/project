<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\api\ClientsController;

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
    Route::put('/updateClient/{id}', [ClientsController::class , 'update']);
    Route::post('/GetClient', [ClientsController::class , 'store']);
        Route::get('/GetClients', [ClientsController::class ,'GetClients']);
    Route::get('/GetClient/{id}', [ClientsController::class ,'GetClient']);
    Route::delete('/deleteClient/{id}', [ClientsController::class ,'destroy']);

    Route::get('/getProducts' , [ProductsController::class ,'index']);
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