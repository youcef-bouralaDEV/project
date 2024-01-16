<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'username' => $this->username,
            'lastname' => $this->lastname,
            'email' => $this->email,
            'raison_social' => $this->raison_social,
            'groupe' => $this->groupe,
            'adresse' => $this->adresse,
            'wilaya' => $this->wilaya,
            'commune' => $this->commune,
            'role'     => $this->roles->pluck("name")[0] ?? [],
            // 'permissions' => $this->permissions->pluck('name') ?? [],
            // 'roles.permissions' => $this->getPermissionsViaRoles()->pluck(['name']) ?? [],

        ];
    }
}