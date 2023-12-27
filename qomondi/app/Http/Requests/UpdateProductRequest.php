<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
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
            'nom' => 'string|max:255',
            'category_id' => 'integer',
            'type_id' => 'integer',
            'code' => 'string|max:255',
            'images' => 'string|max:255',
            'codebarreEAN13' => 'string|max:255',
            'ref' => 'string|max:255',
            'quantity' => 'numeric',
            'quantité_minimal' => 'numeric',
            'prix' => 'numeric',
            'prix_dachat' => 'numeric',
            'grossiste' => 'numeric',
            'coulissage' => 'string|max:255',
            'height' => 'nullable|numeric',
            'length' => 'nullable|numeric',
            'width' => 'nullable|numeric',
            'poid' => 'nullable|numeric',
            'etat_du_stock' => 'string|max:255',
            'commande_Colis' => 'string|max:255',
            'uniteLongueur' => 'nullable|string|max:255',
            'Unité_poids' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'etat' => 'string|max:255',
            'image_path' => 'string|max:255',
        ];
    }
}