<?php

use App\Models\User;
use App\Models\client;
use App\Models\Product;
use Illuminate\Support\Facades\Route;
use Spatie\Permission\Contracts\Role;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    // $clientsWithRoles = User::with('roles', 'permissions')->get();
    // return response()->json(  $clientsWithRoles) ;
     $products = Product::all() ;
     return response()->json($products);
    


    
    // $usersWithAdminRole = User::whereHas('roles', function ($query) {
    //     $query->where('name', 'admin');
    // })->get();
    // return response()->json($usersWithAdminRole);


});