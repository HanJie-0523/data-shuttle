<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
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
            'unique_key' => $this->unique_key,
            'name' => $this->name,
            'description' => $this->description,
            'color' => $this->color,
            'price' => $this->price,
            'created_at' => $this->created_at,
        ];
    }
}
