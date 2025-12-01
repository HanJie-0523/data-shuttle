<?php

namespace App\Http\Filters;

class DocumentFilter extends QueryFilter
{
    protected $sortable = [
        'name',
        'created_at',
    ];

    public function status($value)
    {
        $statuses = explode(',', $value);
        $this->builder->whereIn('status', $statuses);
    }

    public function include($value)
    {
        $this->builder->with($value);
    }
}
