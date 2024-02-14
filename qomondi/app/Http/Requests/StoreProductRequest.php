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
            'name' => 'required|string|max:255',
            'category_id' => 'required|integer',
            'mark_id' => 'required|integer',
            'quantity' => 'required|numeric',
            'prix' => 'required|numeric',
            'images' => 'required',
            'code' => 'nullable|numeric|max:255',
            'coulissage' => 'nullable|string|max:255',
            'codebarreEAN13' => 'nullable|max:255|numeric',




            //  'description' => 'string',
            //  'commande_Colis' => 'string|max:255',
            //  'Unité_poids' => 'required|string|max:255',
            // 'prix_dachat' => 'numeric',
            // 'uniteLongueur' => 'string|max:255',
            // 'height' => 'nullable|numeric',
            // 'length' => 'nullable|numeric',
            // 'width' => 'nullable|numeric',
            // 'poid' => 'nullable|numeric',
            //  'grossiste' => 'required|numeric',
            // 
            // 'quantité_minimal' => 'nullable|numeric',

        ];
    }
}