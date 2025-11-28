<?php

namespace App\Http\Filters;

use Illuminate\Http\Request;

abstract class QueryFilter
{
    protected $query;
    protected $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function apply($query)
    {
        $this->query = $query;

        foreach ($this->request->all() as $name => $value) {
            if (method_exists($this, $name)) {
                $this->$name($value);
            }
        }

        return $this->query;
    }
}
