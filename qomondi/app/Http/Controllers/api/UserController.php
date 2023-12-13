<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Http\Requests\authRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;


class UserController extends Controller
{
    // public function signup(RegisterRequest $request)
    // {
    //     // register user
    //     $user = User::create([
    //         'name'        => $request->name,
    //         'email'       => $request->email,
    //         'password'    => bcrypt($request->password)
    //     ]);

    //     // assign role
    //     $user_role = Role::where(['name' => 'user'])->first();
    //     if ($user_role) {
    //         $user->assignRole($user_role);
    //     }

    //     // send response
    //     return new UserResource($user);
    // }
    public function login(authRequest $request)
    {   
    

        if (!Auth::attempt($request->only('email', 'password')) ) {
            return response([
                'message' => 'Provided email or password is incorrect'
            ], 422);
        }
        // send response
        $token = request()->user()->createToken("Token")->plainTextToken;
        return response()->json(['token' => $token, 'user' => new UserResource(request()->user())]);
    }

    public function logout(Request $request)
    {
    
        $user = request()->user();
        $user->tokens()->delete();
        return response()->json(['message' => 'Admin logged out successfully', 'user :' => $user]);
    }
    
}