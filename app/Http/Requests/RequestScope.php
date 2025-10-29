<?php

namespace App\Http\Requests;

use App\Enumerations\TranslateableEnumeration;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

abstract class RequestScope implements Scope
{
    /**
     * Attributes that can be ordered.
     *
     * @var  array
     */
    protected $orderable = [];

    /**
     * The request which the scope is derived from.
     *
     * @var  \Illuminate\Http\Request
     */
    protected $request;

    /**
     * Build a new scope based on a request.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return  static
     */
    public static function fromRequest(Request $request)
    {
        $scope = new static();

        $scope->request = $request;

        return $scope;
    }

    /**
     * Get the underlying request that is used to build this scope.
     *
     * @return  \Illuminate\Http\Request
     */
    public function getRequest()
    {
        return $this->request;
    }

    /**
     * Apply the scope to a given Eloquent query builder.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $builder
     * @param  \Illuminate\Database\Eloquent\Model  $model
     *
     * @return void
     */
    abstract public function apply(Builder $builder, Model $model);

    /**
     * Apply ordering of a given Eloquent query builder.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  \Illuminate\Database\Eloquent\Model  $model
     *
     * @return  void
     */
    public function applyOrderBy(Builder $query, Model $model)
    {
        if (empty($this->orderable)) {
            return;
        }

        $request = $this->request;

        $request_sort = $request->get('sort');
        $request_order = $request->get('order');

        if (!empty($request_sort)) {
            $custom_ordering_method_name = 'applyOrderBy'.ucfirst(Str::camel($request_sort));

            if (ctype_alnum($custom_ordering_method_name) && method_exists($this, $custom_ordering_method_name)) {
                // Call a child class defined logic when ordering of a specific field using the standard order does not make sense.
                // Say for instance if a you want sort "status" field, with "Open" value first, then define a "applyOrderByStatus" method in the child class.
                return $this->{$custom_ordering_method_name}($query, $model);
            }
        }

        if (array_key_exists($request_sort, $this->orderable)) {
            $sort = $request_sort;
        }

        if (in_array($request_order, ['asc', 'desc'])) {
            $direction = $request_order;
        }

        if (isset($sort)) {
            $query->orderBy($sort, $direction ?? 'asc');
        }
    }

    /**
     * Get a list of options that can be ordered.
     *
     * @return  array
     */
    public static function getOrderableOptions()
    {
        $scope = new static();
        $keyed = $scope->orderable;

        if ($scope instanceof TranslateableEnumeration) {
            $keyed = collect($scope->orderable)->transform(function ($item, $key) use ($scope) {
                                                    // Then translate and transform the value of the items
                                                    return trans($scope->getLangPrefix().$item);
                                                })->toArray();
        }

        return $keyed;
    }
}
