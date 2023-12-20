<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\client;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Http\Resources\ClientResource;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;

class ClientsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return UserResource::collection(User::query()->orderBy('id', 'desc')->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \App\Http\Requests\StoreUserRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['password'] = bcrypt($data['password']);
        $user = User::create($data);

        
        $role = Role::where('name', 'user')->first();
        $user->assignRole($role);

        return response(new UserResource($user), 200);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {

        return response(new UserResource($user), 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\UpdateUserRequest $request
     * @param \App\Models\User                     $user
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserRequest $request,  $id)
    
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
        
        $data = $request->validated();
        if (isset($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        }
        $user->update($data);

        return new UserResource($user);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {     
        $user = User::find($id);
        if(!$user){
        return response("error", 401);
            
        }

        $user->delete();

        return response("", 204);
    }

    public function GetClients()
    {
        $clients = User::whereHas('roles', function ($query) {
        $query->where('name', 'user');
    })->get();

        return response()->json(UserResource::collection($clients));
    }

    
    public function GetClient($id)
{
  $client = User::find($id) ;
  if (!$client) {
    return response()->json(['error' => 'Client not found'], 404);
}

return response()->json(new UserResource($client));
 
}

    // public function options()
    // {
    //     return response()->json([], 204)
    //         ->header('Access-Control-Allow-Origin', '*')
    //         ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    //         ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    // }
}