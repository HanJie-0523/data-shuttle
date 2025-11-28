<?php

namespace App\Models;

use App\Enums\DocumentStatus;
use App\Traits\Filterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;
    use Filterable;

    protected $fillable = [
        'name',
        'status',
        'file_path',
        'imported_count',
        'error_count',
    ];

    protected function casts(): array
    {
        return [
            'status' => DocumentStatus::class,
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    public function scopeFilter(Builder $query, $filters)
    {
        return $filters->apply($query);
    }
}
