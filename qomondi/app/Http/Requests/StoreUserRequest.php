<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class StoreUserRequest extends FormRequest
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
            'prenom' => 'required|string|max:55',
            'username' => 'required|string|max:55',
            'lastname' => 'required|string|max:55',
            'email' => 'required|email|unique:users,email',
            'raison_social' => 'max:55',
            'groupe' => 'max:55',
            'addresse' => 'required|string|max:55',
            'willaya' => 'string|max:55',
            'commune' => 'string|max:55',
            'password' => 'required',
            
            




            
            
        ];
    }
}