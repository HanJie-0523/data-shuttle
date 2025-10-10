<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'unique_key',
        'title',
        'description',
        'style',
        'sanmar_mainframe_color',
        'size',
        'color_name',
        'piece_price'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
