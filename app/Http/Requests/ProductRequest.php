<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        switch ($this->method()) {
            case 'GET':
            case 'POST':
            case 'PATCH':
                return true;
            default:
                return false;
        }
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        switch ($this->method()) {
            case 'POST':
                return [
                    'name' => ['required', 'string', 'max:255'],
                    'description' => ['nullable', 'string', 'max:1000'],
                    'color' => ['required'],
                    'price' => ['required', 'numeric', 'integer', 'min:0']
                ];
            case 'PATCH':
                return [
                    'name' => ['required', 'string', 'max:255'],
                    'description' => ['nullable', 'string', 'max:1000'],
                    'color' => ['required'],
                    'price' => ['required', 'numeric', 'integer', 'min:0']
                ];
            default:
                return [];
        }
    }
}
