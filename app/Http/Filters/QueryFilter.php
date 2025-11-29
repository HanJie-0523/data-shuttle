<?php

namespace App\Http\Filters;

use Illuminate\Http\Request;

abstract class QueryFilter
{
    /**
     * The current Eloquent query builder instance.
     *
     * @var \Illuminate\Database\Eloquent\Builder
     */
    protected $query;

    /**
     * The current HTTP request instance.
     *
     * @var \Illuminate\Http\Request
     */
    protected $request;

    /**
     * Create a new QueryFilter instance.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return void
     */
    public function __construct(Request $request)
    {
        $this->request = $request;
    }


    /**
     * Apply the filter methods based on request query parameters.
     *
     * For each request key, if a method with the same name exists
     * in the concrete filter class, it will be executed.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
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
