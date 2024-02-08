<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:55',
            'username' => 'nullable|string|max:55',
            'lastname' => 'required|string|max:55',
            'email' => 'required|email|unique:users,email,' .$this->id,
            'raison_social' => 'required|string|max:55',
            'groupe' => 'nullable|string|max:55',
            'region' => 'nullable|string|max:55',
            'seuil_paiement' => 'nullable|numeric|between:0,99999999.99',
            'mobile' => 'numeric|digits_between:1,10',
            'mobile_2' =>'nullable|numeric|digits_between:1,10',
            'tel_fix' => 'nullable|numeric|digits_between:1,10',
            'fax' => 'nullable|numeric|digits_between:1,10',
            'num_identite_fiscal' => 'nullable|numeric',
            'registre_commerce' => 'nullable|string|max:255',
            'num_identite_statistique' => 'nullable|numeric|digits_between:1,100',
            'article_imposition' => 'nullable|string|max:255',
            'adresse' => 'nullable|string|max:255',
            'wilaya' => 'required|string|max:55',
            'commune' => 'required|string|max:55',
            'password' => 'required',
        ];
    }
}