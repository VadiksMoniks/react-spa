<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        if ($this->isMethod('post')) {
            return [
                'user_id' => ['required', 'integer', 'exists:users,id'],
                'title'   => ['required', 'string', 'unique:posts,title'],
                'content' => ['required', 'string'],
            ];
        }

        if ($this->isMethod('put') || $this->isMethod('patch')) {
            $post_id = $this->route('post_id');

            return [
                'user_id' => ['required', 'integer', 'exists:users,id'],
                'title'   => ['sometimes', 'string', "unique:posts,title,{$post_id}"],
                'content' => ['sometimes', 'string'],
            ];
        }

        return [
            //
        ];
    }
}
