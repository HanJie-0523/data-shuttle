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
            $method = Str::camel($name);

            if (method_exists($this, $method)) {
                $this->{$method}($value);
            }
        }

        return $this->builder;
    }

    /**
     * Apply sorting to the query.
     *
     * Supports two sorting formats:
     *
     * 1) Separate sort & direction parameters (used by tables / UI):
     *    ?sort=name&direction=asc
     *    ?sort=created_at&direction=desc
     *
     * 2) Comma-separated sort string with optional "-" prefix:
     *    ?sort=name,-created_at
     *
     * Only columns defined in the `$sortable` whitelist are allowed.
     * Invalid columns or directions are silently ignored.
     *
     * @param  string  $value  The raw sort value from the request
     * @return void
     */
    protected function sort($value)
    {
        if ($this->request->filled('direction')) {
            $column = Str::snake($value);
            $direction = strtolower($this->request->get('direction', 'asc'));

            if (
                in_array($column, $this->sortable) &&
                in_array($direction, ['asc', 'desc'])
            ) {
                $this->builder->orderBy($column, $direction);
            }

            return;
        }

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
