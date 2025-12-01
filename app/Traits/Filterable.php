<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;

trait Filterable
{
    /**
     * Apply all relevant thread filters.
     *
     * @param  Builder  $builder
     * @param  mixed    $filters
     * @return Builder
     */
    public function scopeFilter(Builder $builder, $filters)
    {
        return $filters->apply($builder);
    }
}
