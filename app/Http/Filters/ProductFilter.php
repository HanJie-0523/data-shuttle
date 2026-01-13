<?php

namespace App\Http\Filters;

use Carbon\Carbon;

class ProductFilter extends QueryFilter
{
    protected $sortable = [
        'id',
        'name',
        'color',
        'price',
        'created_at'
    ];

    public function name($value)
    {
        $this->builder->where('name', 'like', '%' . $value . '%');
    }

    public function color($value)
    {
        $this->builder->where('color', 'like', '%' . $value . '%');
    }

    public function priceGte($value)
    {
        $this->builder->whereIn('price', '>=', $value);
    }

    public function priceLte($value)
    {
        $this->builder->whereIn('price', '<=', $value);
    }

    public function createSince($value)
    {
        $dt = Carbon::parse($value)->startOfDay();
        $this->builder->where('created_at', '>=', $dt);
    }

    public function createUntil($value)
    {
        $dt = Carbon::parse($value)->startOfDay();
        $this->builder->where('created_at', '>=', $dt);
    }

    public function include($value)
    {
        $this->builder->with($value);
    }
}
