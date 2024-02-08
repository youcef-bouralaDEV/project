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
            'region' => $this->region,
            'seuil_paiement' => $this->seuil_paiement,
            'mobile' => $this->mobile,
            'mobile_2' => $this->mobile_2,
            'tel_fix' => $this->tel_fix,
            'fax' => $this->fax,
            'coordonnees_fiscales' => $this->coordonnees_fiscales,
            'registre_commerce' => $this->registre_commerce,
            'num_identite_fiscal' => $this->num_identite_fiscal,
            'num_identite_statistique' => $this->num_identite_statistique,
            'article_imposition' => $this->article_imposition,
            'wilaya' => $this->wilaya,
            'commune' => $this->commune,
            'role'     => $this->roles->pluck("name")[0] ?? [],
            'etat' => $this->etat,
            
        ];
    }
}