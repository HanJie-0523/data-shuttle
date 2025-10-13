<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DocumentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'name' => $this->name,
            'status' => $this->status,
            'file_path' => $this->file_path,
            'imported_count' => $this->imported_count,
            'error_count' => $this->error_count,
            'created_at' => $this->created_at,
        ];
    }
}
