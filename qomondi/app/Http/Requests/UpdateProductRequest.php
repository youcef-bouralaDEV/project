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
            'name' => 'required|string|max:255',
            'category_id' => 'required|integer',
            'mark_id' => 'required|integer',
            'prix' => 'nullable|numeric',
            'etat_du_stock' => 'required|string|max:255',
            'etat' => 'required|string|max:255',
          
            'quantity' => 'nullable|numeric',
            // 'code' => 'string|max:255',
            // 'codebarreEAN13' => 'string|max:255',
            // 'ref' => 'string|max:255',
            // 'quantité_minimal' => 'numeric',
            // 'prix' => 'numeric',
            // 'prix_dachat' => 'numeric',
            // 'grossiste' => 'numeric',
            // 'coulissage' => 'string|max:255',
            // 'height' => 'nullable|numeric',
            // 'length' => 'nullable|numeric',
            // 'width' => 'nullable|numeric',
            // 'poid' => 'nullable|numeric',
            // 'commande_Colis' => 'string|max:255',
            // 'uniteLongueur' => 'nullable|string|max:255',
            // 'Unité_poids' => 'nullable|string|max:255',
            // 'description' => 'nullable|string',
            // 'image_path' => 'string|max:255',
        ];
    }
}