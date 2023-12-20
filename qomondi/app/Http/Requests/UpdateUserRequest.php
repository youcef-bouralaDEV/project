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
            'lastname' => 'required|string|max:55',
            'username' => 'string|max:55',
            'email' => 'required|email|unique:users,email,' .$this->id,
            'raison_social' => 'string|max:55',
            'groupe' => 'string|max:55',
            'adresse' => 'required|string|max:55',
            'wilaya' => 'string|max:55',
            'commune' => 'string|max:55',
            // 'password' => 'required',
        ];
    }
}