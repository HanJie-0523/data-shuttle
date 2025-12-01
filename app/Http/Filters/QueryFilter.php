<?php

namespace App\Http\Filters;

use Illuminate\Http\Request;
use Illuminate\Support\Str;

abstract class QueryFilter
{
    /**
     * The current Eloquent query builder instance.
     *
     * @var \Illuminate\Database\Eloquent\Builder
     */
    protected $builder;

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
     * @param  \Illuminate\Database\Eloquent\Builder  $builder
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function apply($builder)
    {
        $this->builder = $builder;

        foreach ($this->request->all() as $name => $value) {
            if (method_exists($this, $name)) {
                $this->$name($value);
            }
        }

        return $this->builder;
    }

    /**
     * Apply sorting to the query based on the given value.
     *
     * The value should be a comma-separated list of sortable fields.
     * A leading hyphen (`-`) indicates descending order; otherwise
     * ascending order is applied.
     *
     * Example:
     *   sort=name,-created_at
     *
     * @param  string  $value  The raw sort string from the request (e.g., "name,-created_at")
     * @return void
     */
    protected function sort($value)
    {
        $sortables = explode(',', $value);

        foreach ($sortables as $sortable) {
            $direction = Str::startsWith($sortable, '-') ? 'desc' : 'asc';
            $column = Str::of($sortable)->remove('-')->snake()->value();

            if (in_array($column, $this->sortable)) {
                $this->builder->orderBy($column, $direction);
            }
        }
    }
}
