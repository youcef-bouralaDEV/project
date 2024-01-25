<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'category' => $this->category,
            'mark' => $this->mark,
            'code' => $this->code,
            'images' => $this->getFirstMediaUrl("images"),
            'codebarreEAN13' => $this->codebarreEAN13,
            'ref' => $this->ref,
            'quantity' => $this->quantity,
            'quantité_minimal' => $this->quantité_minimal,
            'prix' => $this->prix,
            'prix_dachat' => $this->prix_dachat,
            'grossiste' => $this->grossiste,
            'coulissage' => $this->coulissage,
            'height' => $this->height,
            'length' => $this->length,
            'width' => $this->width,
            'poid' => $this->poid,
            'etat_du_stock' => $this->etat_du_stock,
            'commande_Colis' => $this->commande_Colis,
            'uniteLongueur' => $this->uniteLongueur,
            'Unité_poids' => $this->Unité_poids,
            'description' => $this->description,
            'etat' => $this->etat,

        ];
    }
}