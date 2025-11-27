<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;

trait Filterable
{
    /**
     * Apply all relevant thread filters.
     *
     * @param  Builder  $query
     * @param  mixed    $filters
     * @return Builder
     */
    public function scopeFilter(Builder $query, $filters)
    {
        return $filters->apply($query);
    }
}
