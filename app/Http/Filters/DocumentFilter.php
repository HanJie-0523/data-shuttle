<?php

namespace App\Http\Filters;

class DocumentFilter extends QueryFilter
{
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
