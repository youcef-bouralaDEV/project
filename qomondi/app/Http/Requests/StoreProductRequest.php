<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nom' => 'required|string|max:255',
            'category_id' => 'required|integer',
            'mark_id' => 'required|integer',
            'prix' => 'nullable|numeric',
            'etat_du_stock' => 'required|string|max:255',
            'etat' => 'required|string|max:255',
            'images' => 'required',
            'quantity' => 'nullable|numeric',





























            //  'description' => 'string',
            // 'code' => 'nullable|max:255|numeric',
            // 'codebarreEAN13' => 'nullable|max:255|numeric',
            //  'commande_Colis' => 'string|max:255',
            //  'Unité_poids' => 'required|string|max:255',
            // 'prix_dachat' => 'numeric',
            // 'coulissage' => 'nullable|string|max:255',
            // 'uniteLongueur' => 'string|max:255',
            // 'height' => 'nullable|numeric',
            // 'length' => 'nullable|numeric',
            // 'width' => 'nullable|numeric',
            // 'poid' => 'nullable|numeric',
            // 'ref' => 'nullable|max:255|numeric',
            //  'grossiste' => 'required|numeric',
            // 
            // 'quantité_minimal' => 'nullable|numeric',

        ];
    }
}